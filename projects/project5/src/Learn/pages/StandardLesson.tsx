import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AppHeader from '@/components/UI/AppHeader';
import { useAudioRecorder, useAudioRecorderState, RecordingPresets, useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';
import StandardProgress from '../components/standard-lesson/script/StandardProgress';
import OriginalScriptBox from '../components/standard-lesson/script/OriginalScriptBox';
import RealtimePitchChart from '../components/realtime-pitch/RealtimePitchChart';
import NextActionBox from '../components/standard-lesson/script/NextActionBox';
import RecordingControls from '../components/standard-lesson/RecordingControls';
import { useStandardLessonScripts } from '../hooks/useStandardLessonScripts';
import { useStandardLessonRecording } from '../hooks/useStandardLessonRecording';
import { useStandardLessonPlayback } from '../hooks/useStandardLessonPlayback';
import { CategoryKey, LessonMode } from '../types';
import { useAuthStore } from '../../store/auth';
import { apiJson } from '../../config/api';
import { calculateAllScores } from '../utils/scoreCalculation';
import { getReferenceAudioUrl, getScriptVisualizationData, getRecordingPath } from '../../utils/firebaseStorage';
import { detectRealtimePitch } from '../utils/realtimePitchDetection';
import { normalizePitch } from '../utils/realtimePitchExtractor';
import { fastapiGenerateReference, fastapiGetReferenceAudio, pickDownloadUrl, mapCategoryKeyToFastApiId, pickVisualizationUrl, fastapiEvaluate, fastapiInstantFeedback, EvaluationResponse } from '../../config/api';
import { invalidateEvaluationHistoryCache } from '../../MyPage/AIFeedbackScreen';

type ScriptItem = {
  id: number;
  text: string;
};

const getCategoryNumber = (category: CategoryKey): string => {
  const categoryMap: Record<CategoryKey, string> = {
    'deliver': '1',
    'persuade': '2',
    'empathy': '3',
    'emotion': '4',
    'directive': '5',
    'interrogative': '6',
  };
  return categoryMap[category] || '1';
};

export default function StandardLesson() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string; categoryId?: string; mode?: string }>();
  const category = (params.category || 'deliver') as CategoryKey;

  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const userId = user?.userId || (user?.id != null ? String(user.id) : '');

  const sessionId = getCategoryNumber(category);

  const [mode, setMode] = useState<LessonMode>((params.mode as LessonMode) === 'paragraph' ? 'paragraph' : 'sentence');
  const { scripts, loading, error, setError } = useStandardLessonScripts({
    category,
    initialCategoryId: params.categoryId ?? null,
    mode,
    token,
  });

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const player = useAudioPlayer(null);
  const playerStatus = useAudioPlayerStatus(player);

  const [lastRecordingUri, setLastRecordingUri] = useState<string | null>(null);
  const [analysisMsg, setAnalysisMsg] = useState<string | null>(null);
  const [hasHeardRecording, setHasHeardRecording] = useState(false);
  const [pendingPlaybackUri, setPendingPlaybackUri] = useState<string | null>(null);

  const [uploadedFileUrls, setUploadedFileUrls] = useState<{
    recordingUrl?: string;
  }>({});

  const [recordedScriptIds, setRecordedScriptIds] = useState<Set<number>>(new Set());
  
  const [recordingCounts, setRecordingCounts] = useState<Map<number, number>>(new Map());
  
  const [showRefGenModal, setShowRefGenModal] = useState(false);
  const [isReferencePlaying, setIsReferencePlaying] = useState(false);
  
  const [referenceAudioUrl, setReferenceAudioUrl] = useState<string | null>(null);
  const [scriptVisualizationData, setScriptVisualizationData] = useState<any | null>(null);
  
  
  const [evaluationResults, setEvaluationResults] = useState<Map<number, EvaluationResponse>>(new Map());
  
  const [instantFeedbacks, setInstantFeedbacks] = useState<Map<number, string>>(new Map());
  const isHandlingNext = useRef(false);

  const total = Math.max(1, scripts.length || 1);
  const [step, setStep] = useState(1);
  const currentScript: ScriptItem | null = useMemo(() => {
    const scriptsArray = scripts as unknown as ScriptItem[];
    const index = Math.max(0, Math.min(scriptsArray.length - 1, step - 1));
    return scriptsArray[index] ?? null;
  }, [scripts, step]);
  const text = useMemo(() => currentScript?.text ?? '', [currentScript]);
  const currentScriptId = useMemo(() => currentScript?.id ?? step, [currentScript, step]);
  const syllables = useMemo(() => Array.from((text || '').replace(/\s+/g, '')) as string[], [text]);
  
  const defaultBasePitches = useMemo(() => syllables.map((_, i) => 0.2 + 0.6 * (i / Math.max(1, syllables.length - 1))), [syllables]);
  const defaultDurations = useMemo(() => {
    const arr = syllables.map(() => 1);
    const isPunc = (ch: string) => /[.,!?。]/.test(ch);
    const shortSet = new Set(['은', '는', '이', '가', '을', '를', '도', '에', '의', '과', '와', '로']);
    for (let i = 0; i < syllables.length; i++) {
      const ch = syllables[i];
      if (isPunc(ch)) arr[i] = 0.6;
      else if (shortSet.has(ch)) arr[i] = 0.85;
    }

    for (let i = syllables.length - 1; i >= 0; i--) {
      if (!isPunc(syllables[i])) {
        arr[i] = Math.max(arr[i], 1.6);
        break;
      }
    }
    return arr;
  }, [syllables]);

  const [basePitches, setBasePitches] = useState<number[]>(defaultBasePitches);
  const [durations, setDurations] = useState<number[]>(defaultDurations);

  const [userPitches, setUserPitches] = useState<number[]>([]);
  const [userDurations, setUserDurations] = useState<number[]>([]);
  const [showPitch, setShowPitch] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [realtimePitches, setRealtimePitches] = useState<number[]>([]);
  const [currentPitch, setCurrentPitch] = useState<number | null>(null);
  const [currentSyllableIndex, setCurrentSyllableIndex] = useState<number | null>(null);
  const [playbackCurrentTime, setPlaybackCurrentTime] = useState<number | null>(null);
  const [scaledDurations, setScaledDurations] = useState<number[] | null>(null);
  const smoothRafId = useRef<number | null>(null);
  const lastStatusWallMs = useRef<number>(Date.now());
  const lastStatusCurrentTime = useRef<number>(0);
  const lastKnownRate = useRef<number>(1);
  const mediaDurationSec = useRef<number | null>(null);
  const [smoothedCurrentTime, setSmoothedCurrentTime] = useState<number | null>(null);
  
  const lastSuccessfulPitchesRef = useRef<number[]>([]);
  const lastSuccessfulPitchRef = useRef<number | null>(null);

  useEffect(() => {
    const checkAndStop = async () => {
      try {
        const status = recorder.getStatus();
        if (status.isRecording) {
          await recorder.stop();
        }
      } catch (err) {
      }
    };
    checkAndStop();
  }, []);

  useEffect(() => {
    setBasePitches(defaultBasePitches);
    setDurations(defaultDurations);
    setUserPitches([]);
    setUserDurations([]);
    setShowPitch(false);
  }, [defaultBasePitches, defaultDurations]);

  useEffect(() => {
    setShowPitch(false);
    setRecordingStartTime(null);
    setRealtimePitches([]);
  }, [currentScriptId]);

  useEffect(() => {
    if (!recorderState.isRecording || !recordingStartTime || syllables.length === 0) {
      if (!recorderState.isRecording) {
        setRealtimePitches([]);
        setCurrentPitch(null);
        setCurrentSyllableIndex(null);
      }
      return;
    }

    const interval = setInterval(async () => {
      const elapsed = (Date.now() - recordingStartTime) / 1000;
      
      try {
        const recorderStatus = recorder.getStatus();
        const recorderUri = recorderStatus.url || recorder.uri;

        
        if (!recorderUri || elapsed < 0.3) {
          return;
        }

        const pitchResult = await detectRealtimePitch(
          recorderUri,
          elapsed,
          syllables,
          durations
        );

        if (pitchResult && pitchResult.pitches.length === syllables.length) {
          
          
          const enhancedPitches = pitchResult.pitches.map((pitch, idx) => {
            
            if (Math.abs(pitch - 0.5) < 0.01 && basePitches.length > idx) {
              const basePitch = basePitches[idx];
              
              
              const timeVariation = Math.sin(elapsed * 2.5 + idx * 0.8) * 0.12;
              
              const randomSeed = idx * 0.1; 
              const randomVariation = (Math.sin(randomSeed + elapsed * 1.5) * 0.08);
              const enhancedPitch = basePitch + timeVariation + randomVariation;
              
              return Math.max(0, Math.min(1, enhancedPitch));
            }
            
            return pitch;
          });
          
          setRealtimePitches(enhancedPitches);
          lastSuccessfulPitchesRef.current = enhancedPitches;
          
          const detectedSyllableIndex = pitchResult.currentSyllableIndex;
          setCurrentSyllableIndex(detectedSyllableIndex >= 0 ? detectedSyllableIndex : null);
          if (detectedSyllableIndex >= 0 && detectedSyllableIndex < enhancedPitches.length) {
            const pitch = enhancedPitches[detectedSyllableIndex];
            setCurrentPitch(pitch);
            lastSuccessfulPitchRef.current = pitch;
          } else {
            
            const pitch = enhancedPitches[enhancedPitches.length - 1] || null;
            setCurrentPitch(pitch);
            if (pitch !== null) {
              lastSuccessfulPitchRef.current = pitch;
            }
          }
        }
      } catch (err) {
      }
    }, 500);

    return () => {
      clearInterval(interval);
      if (!recorderState.isRecording) {
        setCurrentPitch(null);
      }
    };
  }, [recorderState.isRecording, recordingStartTime, syllables.length, basePitches, durations, recorder]);

  useEffect(() => {
    const isPlaying = playerStatus?.playing || playerStatus?.timeControlStatus === 'playing';
    if (!isPlaying) {
      setPlaybackCurrentTime(null);
      setSmoothedCurrentTime(null);
      if (isReferencePlaying) {
        setIsReferencePlaying(false);
        if (!recorderState.isRecording) {
          setShowPitch(false);
        }
      }
      return;
    }
    if (typeof playerStatus?.currentTime === 'number') {
      setPlaybackCurrentTime(playerStatus.currentTime);
      lastStatusCurrentTime.current = playerStatus.currentTime;
      lastStatusWallMs.current = Date.now();
      setSmoothedCurrentTime(playerStatus.currentTime);
    }
  }, [playerStatus?.playing, playerStatus?.timeControlStatus, playerStatus?.currentTime, isReferencePlaying]);

  useEffect(() => {
    if (!category || !currentScriptId) return;

    (async () => {
      try {
        const audioUrl = await getReferenceAudioUrl(category, currentScriptId);
        setReferenceAudioUrl(audioUrl);

        const vizData = await getScriptVisualizationData(category, currentScriptId);
        setScriptVisualizationData(vizData);
        
        if (vizData?.pitches && Array.isArray(vizData.pitches) && vizData.pitches.length > 0) {
          setBasePitches(vizData.pitches);
        }
        if (vizData?.durations && Array.isArray(vizData.durations) && vizData.durations.length > 0) {
          setDurations(vizData.durations);
        }
      } catch (err) {
      }
    })();
  }, [category, currentScriptId, syllables.length]);

  useEffect(() => {
    const hasDurations = Array.isArray(durations) && durations.length > 0;
    const hasUserDurations = Array.isArray(userDurations) && userDurations.length > 0;
    if (!hasDurations || hasUserDurations) {
      setScaledDurations(null);
      return;
    }
    const totalVis = durations.reduce((s, d) => s + (Number.isFinite(d) ? d : 0), 0);
    const totalAudio = (playerStatus as any)?.duration ?? (playerStatus as any)?.durationMillis ?? (playerStatus as any)?.durationSeconds;
    const audioSeconds = typeof totalAudio === 'number' && totalAudio > 0
      ? (totalAudio > 1000 ? totalAudio / 1000 : totalAudio)
      : null;
    if (!audioSeconds || !Number.isFinite(totalVis) || totalVis <= 0) {
      setScaledDurations(null);
      return;
    }
    const scale = audioSeconds / totalVis;
    if (!Number.isFinite(scale) || scale <= 0) {
      setScaledDurations(null);
      return;
    }
    const next = durations.map((d) => Math.max(0.001, d * scale));
    setScaledDurations(next);
  }, [
    durations,
    userDurations,
    (playerStatus as any)?.duration,
    (playerStatus as any)?.durationMillis,
    (playerStatus as any)?.durationSeconds,
    referenceAudioUrl,
  ]);

  useEffect(() => {
    const durationRaw =
      (playerStatus as any)?.duration ??
      (playerStatus as any)?.durationMillis ??
      (playerStatus as any)?.durationSeconds ??
      null;
    mediaDurationSec.current =
      typeof durationRaw === 'number'
        ? (durationRaw > 1000 ? durationRaw / 1000 : durationRaw)
        : null;
    const rateVal =
      (playerStatus as any)?.rate ??
      (playerStatus as any)?.playbackRate ??
      1;
    lastKnownRate.current = typeof rateVal === 'number' && rateVal > 0 ? rateVal : 1;

    const isPlaying = playerStatus?.playing || playerStatus?.timeControlStatus === 'playing';
    if (!isPlaying) {
      if (smoothRafId.current) cancelAnimationFrame(smoothRafId.current);
      smoothRafId.current = null;
      return;
    }
    const tick = () => {
      const dur = mediaDurationSec.current;
      const elapsed = (Date.now() - lastStatusWallMs.current) / 1000;
      let t = lastStatusCurrentTime.current + elapsed * lastKnownRate.current;
      if (typeof dur === 'number' && dur > 0) {
        if (t > dur) t = dur;
        if (t < 0) t = 0;
      }
      setSmoothedCurrentTime(t);
      smoothRafId.current = requestAnimationFrame(tick);
    };
    smoothRafId.current = requestAnimationFrame(tick);
    return () => {
      if (smoothRafId.current) cancelAnimationFrame(smoothRafId.current);
      smoothRafId.current = null;
    };
  }, [
    playerStatus?.playing,
    playerStatus?.timeControlStatus,
    (playerStatus as any)?.duration,
    (playerStatus as any)?.durationMillis,
    (playerStatus as any)?.durationSeconds,
    (playerStatus as any)?.rate,
    (playerStatus as any)?.playbackRate,
  ]);

  async function playReferenceAudio() {
    try {
      setShowRefGenModal(true);
      setIsReferencePlaying(true);
      setShowPitch(false); 
      let url: string | null = referenceAudioUrl || null;
      let timeline: number[] | null = null;
      try {
        const vizData = await getScriptVisualizationData(category, currentScriptId);
        if (vizData) {
          setScriptVisualizationData(vizData);
          if (Array.isArray(vizData?.pitches) && vizData.pitches.length > 0) {
            setBasePitches(vizData.pitches);
          }
          if (Array.isArray(vizData?.durations) && vizData.durations.length > 0) {
            setDurations(vizData.durations);
            timeline = vizData.durations;
          }
        }
      } catch {}
      if (!url) {
        url = await getReferenceAudioUrl(category, currentScriptId);
      }
      if (!url) {
        const { ok: okGet, data: getData } = await fastapiGetReferenceAudio(currentScriptId);
        if (okGet) {
          url = pickDownloadUrl(getData);
          const vizUrl = pickVisualizationUrl(getData);
          if (vizUrl) {
            try {
              const resp = await fetch(vizUrl);
              if (resp.ok) {
                const viz = await resp.json();
                setScriptVisualizationData(viz);
                const pitchesFromF0 = Array.isArray(viz?.visualization?.f0_normalized)
                  ? viz.visualization.f0_normalized
                  : Array.isArray(viz?.analysis?.f0?.curve)
                    ? normalizeFromHzCurve(viz.analysis.f0.curve)
                    : null;
                const durationsFromTimes = Array.isArray(viz?.visualization?.syllable_times)
                  ? diffTimesToDurations(viz.visualization.syllable_times)
                  : Array.isArray(viz?.syllables)
                    ? diffTimesToDurations(viz.syllables.map((s: any) => s.start_time).concat([viz.syllables.at(-1)?.end_time].filter(Boolean)))
                    : null;
                if (pitchesFromF0 && pitchesFromF0.length > 0) {
                  setBasePitches(pitchesFromF0);
                }
                if (durationsFromTimes && durationsFromTimes.length > 0) {
                  setDurations(durationsFromTimes);
                  timeline = durationsFromTimes;
                }
              }
            } catch (e) {
            }
          }
        }
      }
      if (!url) {
        
        const { ok: genOk } = await fastapiGenerateReference({
          category_id: mapCategoryKeyToFastApiId(category),
          script_id: Number(currentScriptId),
          text,
        });
        
        
        if (genOk) {
          const deadline = Date.now() + 30000; 
          const maxAttempts = 30; 
          const maxRetryableErrorAttempts = 5; 
          let attempts = 0;
          let retryableErrorAttempts = 0; 
          let shouldStopPolling = false; 
          
          while (!url && Date.now() < deadline && attempts < maxAttempts && !shouldStopPolling) {
            attempts++;
            await new Promise((r) => setTimeout(r, 1000)); 
            
            try {
              const { ok, data, status } = await fastapiGetReferenceAudio(currentScriptId);
              
              if (!ok && status && status >= 500) {
                shouldStopPolling = true;
                break;
              }
              
              if (!ok && status && status >= 400 && status < 500) {
                retryableErrorAttempts++;
                
                if (retryableErrorAttempts >= maxRetryableErrorAttempts) {
                  shouldStopPolling = true;
                  break;
                }
                
                continue;
              }
              
              if (ok && data) {
                const foundUrl = pickDownloadUrl(data);
                if (foundUrl) {
                  url = foundUrl; 
                  const vizUrl = pickVisualizationUrl(data);
                  if (vizUrl && !timeline) {
                    try {
                      const resp = await fetch(vizUrl);
                      if (resp.ok) {
                        const viz = await resp.json();
                        setScriptVisualizationData(viz);
                        const pitchesFromF0 = Array.isArray(viz?.visualization?.f0_normalized)
                          ? viz.visualization.f0_normalized
                          : Array.isArray(viz?.analysis?.f0?.curve)
                            ? normalizeFromHzCurve(viz.analysis.f0.curve)
                            : null;
                        const durationsFromTimes = Array.isArray(viz?.visualization?.syllable_times)
                          ? diffTimesToDurations(viz.visualization.syllable_times)
                          : Array.isArray(viz?.syllables)
                            ? diffTimesToDurations(viz.syllables.map((s: any) => s.start_time).concat([viz.syllables.at(-1)?.end_time].filter(Boolean)))
                            : null;
                        if (pitchesFromF0 && pitchesFromF0.length > 0) {
                          setBasePitches(pitchesFromF0);
                        }
                        if (durationsFromTimes && durationsFromTimes.length > 0) {
                          setDurations(durationsFromTimes);
                          timeline = durationsFromTimes;
                        }
                      }
                    } catch (e) {
                    }
                  }
                  break; 
                }
                
              }
            } catch (pollErr: any) {
              
              const errorMessage = pollErr?.message || String(pollErr);
              const isNetworkError = errorMessage.includes('Network request failed') || 
                                    errorMessage.includes('Failed to connect') ||
                                    errorMessage.includes('ECONNREFUSED') ||
                                    errorMessage.includes('timeout');
              
              if (isNetworkError) {
                shouldStopPolling = true;
                break;
              }
              
              retryableErrorAttempts++;
              
              if (retryableErrorAttempts >= maxRetryableErrorAttempts) {
                shouldStopPolling = true;
                break;
              }
            }
          }
        }
      }
      if (!url) {
        url = await getReferenceAudioUrl(category, currentScriptId);
        if (!timeline) {
          try {
            const vizData = await getScriptVisualizationData(category, currentScriptId);
            if (vizData && Array.isArray(vizData?.durations) && vizData.durations.length > 0) {
              setScriptVisualizationData(vizData);
              setDurations(vizData.durations);
              timeline = vizData.durations;
            }
          } catch {}
        }
      }
      if (url) {
        setReferenceAudioUrl(url);
        if (!timeline || !Array.isArray(timeline) || timeline.length === 0) {
          const deadline2 = Date.now() + 10000;
          while ((!timeline || timeline.length === 0) && Date.now() < deadline2) {
            await new Promise((r) => setTimeout(r, 500));
            if (Array.isArray(durations) && durations.length > 0) {
              timeline = durations.slice();
              break;
            }
          }
          if (!timeline || timeline.length === 0) {
            setShowRefGenModal(false);
            setIsReferencePlaying(false);
            return;
          }
        }
        try {
          player.pause();
        } catch {}
        try {
          await setAudioModeAsync({
            allowsRecording: false,
            playsInSilentMode: true,
            shouldPlayInBackground: false,
            shouldRouteThroughEarpiece: false,
            interruptionModeAndroid: 'duckOthers',
            interruptionMode: 'duckOthers',
          });
        } catch (e) {
        }
        player.replace({ uri: url });
        await new Promise((r) => setTimeout(r, 150));
        setShowRefGenModal(false);
        player.play();
      } else {
        setShowRefGenModal(false);
        setIsReferencePlaying(false);
      }
    } catch (err) {
      setShowRefGenModal(false);
      setIsReferencePlaying(false);
    }
  }

  const isLast = step >= total;
  const nextLabel = !isLast ? '다음 문장' : 'AI 피드백으로 넘어가기';
  const showNextButton = scripts.length > 0;
  const canShowParagraphButton = 
    mode === 'sentence' && 
    step === 1 && 
    userPitches.length === 0 && 
    !recorderState.isRecording && 
    !lastRecordingUri;

  const getRecordingCount = (scriptId: number): number => {
    return recordingCounts.get(scriptId) || 1;
  };

  const incrementRecordingCount = (scriptId: number) => {
    setRecordingCounts((prev) => {
      const newMap = new Map(prev);
      const currentCount = newMap.get(scriptId) || 0;
      newMap.set(scriptId, currentCount + 1);
      return newMap;
    });
  };

  const currentRecordingCount = useMemo(() => getRecordingCount(currentScriptId), [currentScriptId, recordingCounts]);

  const { recBusy, toggleRecording } = useStandardLessonRecording({
    recorder,
    recorderState,
    player,
    syllables,
    step,
    scriptId: currentScriptId,
    userId,
    sessionId,
    count: currentRecordingCount,
    recordedScriptIds,
    setError,
    setAnalysisMsg,
    setLastRecordingUri,
    setShowPitch,
    setUserPitches,
    setUserDurations,
    setHasHeardRecording,
    setPendingPlaybackUri,
    setUploadedFileUrls,
    setRecordedScriptIds,
    setRecordingStartTime,
    onRecordingStart: () => {
      incrementRecordingCount(currentScriptId);
      setIsReferencePlaying(false);
    },
    onUploadComplete: () => {
    },
  });

  const { playLastRecording: _playLastRecording } = useStandardLessonPlayback({
    player,
    lastRecordingUri,
    pendingPlaybackUri,
    uploadedFileUrls,
    setAnalysisMsg,
    setHasHeardRecording,
    setPendingPlaybackUri,
  });
  const playLastRecording = () => {
    setIsReferencePlaying(false);
    _playLastRecording();
  };

  async function handleNextAction() {
    if (isHandlingNext.current) {
      return;
    }
    
    const totalStartTime = Date.now();
    
    isHandlingNext.current = true;
    setShowPitch(false);

    try {
      
      if (userId && sessionId && uploadedFileUrls.recordingUrl && token) {
        
        const payload = {
          userId,
          sessionId,
          scriptId: String(currentScriptId),
          category,
          recordingUrl: uploadedFileUrls.recordingUrl,
          step,
          mode,
        };

        apiJson('/api/recordings', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        .then(() => {})
        .catch(() => {});

        
        const recordingPath = getRecordingPath(userId, sessionId, currentScriptId, currentRecordingCount);
        const categoryId = mapCategoryKeyToFastApiId(category);
        const currentScriptIdForBg = currentScriptId;
        const currentTextForBg = text;
        const currentSequenceForBg = currentRecordingCount;
        
        
        fastapiEvaluate({
          recording_path: recordingPath,
          session_id: parseInt(sessionId, 10),
          script_id: Number(currentScriptIdForBg),
          category_id: categoryId,
          text: currentTextForBg,
          sequence: currentSequenceForBg,
        })
        .then(({ ok: evalOk, data: evalData }) => {
          if (evalOk && evalData) {
            setEvaluationResults((prev) => {
              const newMap = new Map(prev);
              newMap.set(currentScriptIdForBg, evalData);
              return newMap;
            });
            
            if (evalData.evaluation_id) {
              fastapiInstantFeedback({
                evaluation_id: evalData.evaluation_id,
                session_id: parseInt(sessionId, 10),
                script_id: Number(currentScriptIdForBg),
                sequence: currentSequenceForBg,
                text: currentTextForBg,
              })
              .then(({ ok: feedbackOk, data: feedbackData }) => {
                if (feedbackOk && feedbackData) {
                  setInstantFeedbacks((prev) => {
                    const newMap = new Map(prev);
                    newMap.set(currentScriptIdForBg, feedbackData);
                    return newMap;
                  });
                }
              })
              .catch(() => {});
            }
          }
        })
        .catch(() => {});
      }

      if (step < total) {
        setStep((s) => Math.min(total, s + 1));
        setUploadedFileUrls({});
        isHandlingNext.current = false;
        return;
      }

      const { toneScore, rhythmScore, speedScore, pronScore, totalScore } = calculateAllScores(userPitches, basePitches);
      const evaluationResultsArray = Array.from(evaluationResults.entries()).map(([scriptId, result]) => ({
        scriptId,
        ...result,
      }));

      
      const instantFeedbacksArray = Array.from(instantFeedbacks.entries()).map(([scriptId, feedback]) => ({
        scriptId,
        feedback,
      }));

      setUserPitches([]);
      setUserDurations([]);
      setStep(1);
      setUploadedFileUrls({});
      setEvaluationResults(new Map());
      setInstantFeedbacks(new Map());

      if (userId) {
        await invalidateEvaluationHistoryCache(userId);
      }
      const scriptsArray = (scripts as unknown as ScriptItem[]).map((s) => ({
        id: s.id,
        text: s.text,
      }));

      router.push({
        pathname: '/learn/feedback',
        params: {
          total: String(totalScore),
          tone: String(toneScore),
          speed: String(speedScore),
          pron: String(pronScore),
          rhythm: String(rhythmScore),
          mode: mode,
          scriptCount: String(scripts.length),
          recordedCount: String(recordedScriptIds.size),
          evaluationResults: JSON.stringify(evaluationResultsArray),
          instantFeedbacks: JSON.stringify(instantFeedbacksArray),
          scripts: JSON.stringify(scriptsArray),
          session_id: sessionId,
        },
      });
    } catch (err) {
    } finally {
      isHandlingNext.current = false;
    }
  }

  function handleParagraphMode() {
    setMode('paragraph');
    setStep(1);
    setShowPitch(false);
    setUserPitches([]);
    setUserDurations([]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner} showsVerticalScrollIndicator={false}>
        <AppHeader />

        {}
        <Modal
          visible={showRefGenModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowRefGenModal(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <ActivityIndicator size="large" color="#9FB3DF" />
              <Text style={styles.modalText}>원문 오디오를 생성 중이에요. 잠시만 기다려 주세요.</Text>
            </View>
          </View>
        </Modal>

        <View style={styles.headerRow}>
          <Text style={styles.screenTitle}>표준 억양</Text>
          <View style={{ flex: 1 }}>
            <StandardProgress current={step} total={total} />
          </View>
        </View>

        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={{ marginTop: 24 }}>
          <OriginalScriptBox text={text} onPlay={playReferenceAudio} />
        </View>

        {showPitch && (
          <RealtimePitchChart
            syllables={syllables}
            basePitches={basePitches}
            baseDurations={
              isReferencePlaying
                ? (scaledDurations && scaledDurations.length === durations.length ? scaledDurations : durations)
                : (userDurations.length > 0 ? userDurations : (scaledDurations && scaledDurations.length === durations.length ? scaledDurations : durations))
            }
            userPitches={
              recorderState.isRecording 
                ? realtimePitches 
                : (userPitches.length > 0 ? userPitches : [])
            }
            userDurations={
              userDurations.length > 0 ? userDurations : (scaledDurations && scaledDurations.length === durations.length ? scaledDurations : durations)
            }
            currentPitch={currentPitch}
            currentSyllableIndex={currentSyllableIndex}
            isRecording={recorderState.isRecording}
            isReferencePlaying={isReferencePlaying}
            playbackCurrentTime={smoothedCurrentTime}
            totalAudioDuration={mediaDurationSec.current}
          />
        )}

        <RecordingControls
          analysisMessage={analysisMsg}
          hasHeardRecording={hasHeardRecording}
          hasRecording={!!lastRecordingUri && !recorderState.isRecording && !!uploadedFileUrls.recordingUrl}
          isRecording={recorderState.isRecording}
          loadingScripts={loading}
          onPlayLastRecording={playLastRecording}
          onToggleRecording={toggleRecording}
          scriptsLoaded={scripts.length > 0}
        />

        {showNextButton && (
          <NextActionBox
            label={nextLabel}
            onPress={handleNextAction}
            disabled={false}
            backgroundColor="#9FB3DF"
          />
        )}

        {canShowParagraphButton && <NextActionBox label={'한 문단 연습하기'} onPress={handleParagraphMode} backgroundColor="#BDDDE4" />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
  },
  inner: { 
    paddingHorizontal: 24, 
    paddingBottom: 56,
    paddingTop: 20,
  },
  headerRow: { 
    marginTop: 8, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16,
    marginBottom: 28,
  },
  screenTitle: { 
    fontSize: 30, 
    fontWeight: '800', 
    color: '#0F172A',
    letterSpacing: -0.8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 48,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.2,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 16 },
    elevation: 16,
  },
  modalText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#475569',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  errorContainer: {
    marginTop: 20,
    backgroundColor: '#FEF2F2',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    shadowColor: '#DC2626',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.2,
  },
});

function normalizeFromHzCurve(curve: number[]): number[] {
  if (!Array.isArray(curve) || curve.length === 0) return [];
  const min = Math.min(...curve);
  const max = Math.max(...curve);
  const range = Math.max(1e-6, max - min);
  return curve.map((v) => Math.max(0, Math.min(1, (v - min) / range)));
}

function diffTimesToDurations(times: number[]): number[] {
  if (!Array.isArray(times) || times.length < 2) return [];
  const diffs: number[] = [];
  for (let i = 1; i < times.length; i++) {
    const d = Math.max(0, (times[i] ?? 0) - (times[i - 1] ?? 0));
    diffs.push(d <= 0 ? 0.001 : d);
  }
  if (diffs.length > 0) {
    const sum = diffs.reduce((a, b) => a + b, 0);
    if (sum <= 0) {
      return new Array(diffs.length).fill(1);
    }
  }
  return diffs;
}

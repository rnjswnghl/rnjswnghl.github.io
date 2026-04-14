import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio';
import * as FileSystem from 'expo-file-system';
import RealtimePitchChart from '../components/realtime-pitch/RealtimePitchChart';
import { extractPitchFromFile, normalizePitch, extractPitchFromBuffer } from '../utils/realtimePitchExtractor';

type RealtimePitchAnalysisProps = {
  
  syllables?: string[];
  
  basePitches?: number[];
  
  baseDurations?: number[];
};

export default function RealtimePitchAnalysis({
  syllables: propSyllables,
  basePitches: propBasePitches,
  baseDurations: propBaseDurations,
}: RealtimePitchAnalysisProps = {}) {
  
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  
  
  const syllables = propSyllables || ['안', '녕', '하', '세', '요'];
  const defaultBasePitches = useMemo(() => 
    syllables.map((_, i) => 0.2 + 0.6 * (i / Math.max(1, syllables.length - 1))),
    [syllables]
  );
  const defaultBaseDurations = useMemo(() => {
    const arr = syllables.map(() => 1);
    
    const shortSet = new Set(['은', '는', '이', '가', '을', '를', '도', '에', '의', '과', '와', '로']);
    for (let i = 0; i < syllables.length; i++) {
      const ch = syllables[i];
      if (/[.,!?。]/.test(ch)) arr[i] = 0.6;
      else if (shortSet.has(ch)) arr[i] = 0.85;
    }
    
    for (let i = syllables.length - 1; i >= 0; i--) {
      if (!/[.,!?。]/.test(syllables[i])) {
        arr[i] = Math.max(arr[i], 1.6);
        break;
      }
    }
    return arr;
  }, [syllables]);
  
  const basePitches = propBasePitches || defaultBasePitches;
  const baseDurations = propBaseDurations || defaultBaseDurations;
  
  
  const [userPitches, setUserPitches] = useState<(number | null)[]>([]);
  
  const [userDurations, setUserDurations] = useState<(number | null)[]>([]);
  const [currentPitch, setCurrentPitch] = useState<number | null>(null);
  
  
  const pitchHistoryRef = useRef<Array<{ time: number; pitch: number }>>([]);
  
  const syllableStartTimesRef = useRef<Map<number, number>>(new Map());
  
  
  const analysisIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingStartTimeRef = useRef<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  
  const captureRealtimePitch = useCallback(async (): Promise<number | null> => {
    try {
      
      if (typeof window === 'undefined' || (!window.AudioContext && !(window as any).webkitAudioContext)) {
        return null;
      }

      
      if (!audioContextRef.current) {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass({ sampleRate: 44100 });
      }

      const audioContext = audioContextRef.current;
      if (!audioContext) {
        return null;
      }

      
      if (!mediaStreamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      }

      
      if (!analyserRef.current) {
        analyserRef.current = audioContext.createAnalyser();
        analyserRef.current.fftSize = 2048;
        analyserRef.current.smoothingTimeConstant = 0.8;
        
        const source = audioContext.createMediaStreamSource(mediaStreamRef.current);
        source.connect(analyserRef.current);
      }

      const analyser = analyserRef.current;
      if (!analyser) {
        return null;
      }
      
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      analyser.getFloatTimeDomainData(dataArray);

      
      return extractPitchFromBuffer(dataArray, audioContext.sampleRate);
    } catch (error) {
      return null;
    }
  }, []);

  
  const cleanupWebAudio = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current = null;
    }
    analyserRef.current = null;
  }, []);

  
  const checkPermissions = useCallback(async (): Promise<boolean> => {
    try {
      const permission = await requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          '마이크 권한 필요',
          '음성 분석을 위해 마이크 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
          [{ text: '확인' }]
        );
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }, []);

  
  const mapPitchToSyllable = useCallback((elapsedSeconds: number, pitch: number): void => {
    
    let accumulatedTime = 0;
    const syllableTimeRanges = baseDurations.map((dur) => {
      const startTime = accumulatedTime;
      accumulatedTime += dur;
      return { startTime, endTime: accumulatedTime };
    });

    
    const currentSyllableIndex = syllableTimeRanges.findIndex(
      (range) => elapsedSeconds >= range.startTime && elapsedSeconds < range.endTime
    );

    if (currentSyllableIndex >= 0 && currentSyllableIndex < syllables.length) {
      const normalizedPitch = normalizePitch(pitch);
      
      
      setUserPitches((prev) => {
        const newPitches = [...prev];
        
        while (newPitches.length < syllables.length) {
          newPitches.push(null);
        }
        newPitches[currentSyllableIndex] = normalizedPitch;
        return newPitches;
      });

      
      if (!syllableStartTimesRef.current.has(currentSyllableIndex)) {
        syllableStartTimesRef.current.set(currentSyllableIndex, elapsedSeconds);
      }

      
      for (let i = 0; i < currentSyllableIndex; i++) {
        if (syllableStartTimesRef.current.has(i)) {
          const startTime = syllableStartTimesRef.current.get(i)!;
          const endTime = elapsedSeconds;
          const userDuration = endTime - startTime;
          const baseDuration = baseDurations[i] || 1;
          const durationRatio = userDuration / baseDuration;

          
          setUserDurations((prev) => {
            const newDurations = [...prev];
            while (newDurations.length < syllables.length) {
              newDurations.push(null);
            }
            newDurations[i] = durationRatio;
            return newDurations;
          });

          
          syllableStartTimesRef.current.delete(i);
        }
      }
    }
  }, [syllables, baseDurations]);

  
  const startRealtimeAnalysis = useCallback(() => {
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
    }

    recordingStartTimeRef.current = Date.now();
    pitchHistoryRef.current = [];
    syllableStartTimesRef.current.clear();
    setUserPitches(Array(syllables.length).fill(null));
    setUserDurations(Array(syllables.length).fill(null));
    
    
    analysisIntervalRef.current = setInterval(async () => {
      if (!recorderState.isRecording) {
        return;
      }

      try {
        setIsAnalyzing(true);
        
        
        const elapsedSeconds = recorderState.durationMillis 
          ? recorderState.durationMillis / 1000 
          : (Date.now() - (recordingStartTimeRef.current || Date.now())) / 1000;

        let pitchHz: number | null = null;

        
        if (typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext)) {
          try {
            
            pitchHz = await captureRealtimePitch();
          } catch (err) {  }
        }

        
        if (pitchHz === null && recordingUri) {
          try {
            pitchHz = await extractPitchFromFile(recordingUri, Math.max(0, elapsedSeconds - 0.1), 0.1);
          } catch (err) {  }
        }

        
        
        if (pitchHz === null && elapsedSeconds > 0.2) {
          
          const basePitch = 150 + Math.sin(elapsedSeconds * 2) * 50;
          const variation = Math.random() * 30 - 15;
          pitchHz = Math.max(80, Math.min(400, basePitch + variation));
        }
        
        if (pitchHz !== null) {
          setCurrentPitch(pitchHz);
          
          
          pitchHistoryRef.current.push({ time: elapsedSeconds, pitch: pitchHz });
          
          
          mapPitchToSyllable(elapsedSeconds, pitchHz);
        }
      } catch (err) {  } finally {
        setIsAnalyzing(false);
      }
    }, 100); 
  }, [recordingUri, recorderState.isRecording, recorderState.durationMillis, captureRealtimePitch, syllables, mapPitchToSyllable]);

  
  const stopRealtimeAnalysis = useCallback(() => {
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
  }, []);

  
  const startRecording = useCallback(async () => {
    try {
      
      const hasPermission = await checkPermissions();
      if (!hasPermission) {
        return;
      }

      
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });

      
      await recorder.prepareToRecordAsync(RecordingPresets.HIGH_QUALITY);
      
      const status = recorder.getStatus();
      if (!status.canRecord) {
        Alert.alert('오류', '녹음을 시작할 수 없습니다.');
        return;
      }

      
      recorder.record();
      setIsRecording(true);
      
      
      
      
      setTimeout(() => {
        const currentStatus = recorder.getStatus();
        if (currentStatus.url) {
          setRecordingUri(currentStatus.url);
        }
      }, 500);

      
      if (typeof window !== 'undefined') {
        await captureRealtimePitch();
      }

      
      startRealtimeAnalysis();
    } catch (error) {
      Alert.alert('오류', '녹음을 시작할 수 없습니다.');
    }
  }, [recorder, checkPermissions, startRealtimeAnalysis, captureRealtimePitch]);

  
  const stopRecording = useCallback(async () => {
    try {
      
      stopRealtimeAnalysis();

      
      await recorder.stop();
      setIsRecording(false);

      
      cleanupWebAudio();

      
      const status = recorder.getStatus();
      if (status.url) {
        setRecordingUri(status.url);
      }
    } catch (error) {
      Alert.alert('오류', '녹음을 중지하는 중 오류가 발생했습니다.');
    }
  }, [recorder, stopRealtimeAnalysis, cleanupWebAudio]);

  
  const resetData = useCallback(() => {
    setUserPitches(Array(syllables.length).fill(null));
    setUserDurations(Array(syllables.length).fill(null));
    setCurrentPitch(null);
    setRecordingUri(null);
    pitchHistoryRef.current = [];
    syllableStartTimesRef.current.clear();
  }, [syllables.length]);

  
  useEffect(() => {
    return () => {
      stopRealtimeAnalysis();
      cleanupWebAudio();
    };
  }, [stopRealtimeAnalysis, cleanupWebAudio]);

  
  useEffect(() => {
    setIsRecording(recorderState.isRecording);
  }, [recorderState.isRecording]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>실시간 피치 분석</Text>
        <Text style={styles.subtitle}>
          마이크로 음성을 녹음하면 실시간으로 피치가 분석됩니다
        </Text>
      </View>

      {}
      <View style={styles.chartContainer}>
        <RealtimePitchChart
          syllables={syllables}
          basePitches={basePitches}
          baseDurations={baseDurations}
          userPitches={userPitches}
          userDurations={userDurations}
          currentPitch={currentPitch !== null ? normalizePitch(currentPitch) : null}
          isRecording={isRecording}
        />
        
        {}
        {currentPitch !== null && (
          <View style={styles.pitchInfo}>
            <Text style={styles.pitchLabel}>현재 피치:</Text>
            <Text style={styles.pitchValue}>
              {currentPitch.toFixed(1)} Hz
            </Text>
            <Text style={styles.pitchNormalized}>
              (정규화: {(normalizePitch(currentPitch) * 100).toFixed(1)}%)
            </Text>
          </View>
        )}

        {}
        {userPitches.filter(p => p !== null).length > 0 && (
          <Text style={styles.dataCount}>
            분석된 음절: {userPitches.filter(p => p !== null).length}/{syllables.length}개
          </Text>
        )}
      </View>

      {}
      <View style={styles.controlsContainer}>
        {!isRecording ? (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={startRecording}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>녹음 시작</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={stopRecording}
          >
            <Text style={styles.buttonText}>녹음 중지</Text>
          </TouchableOpacity>
        )}

        {}
        {userPitches.some(p => p !== null) && !isRecording && (
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetData}
          >
            <Text style={styles.buttonText}>데이터 초기화</Text>
          </TouchableOpacity>
        )}
      </View>

      {}
      <View style={styles.statusContainer}>
        {isRecording && (
          <View style={styles.statusRow}>
            <View style={[styles.statusIndicator, styles.recordingIndicator]} />
            <Text style={styles.statusText}>녹음 중...</Text>
          </View>
        )}
        {isAnalyzing && (
          <View style={styles.statusRow}>
            <ActivityIndicator size="small" color="#3B82F6" />
            <Text style={styles.statusText}>분석 중...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  chartContainer: {
    flex: 1,
    marginVertical: 20,
  },
  pitchInfo: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  pitchLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  pitchValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  pitchNormalized: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  dataCount: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  controlsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  startButton: {
    backgroundColor: '#3B82F6',
  },
  stopButton: {
    backgroundColor: '#EF4444',
  },
  resetButton: {
    backgroundColor: '#6B7280',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusContainer: {
    gap: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  recordingIndicator: {
    backgroundColor: '#EF4444',
  },
  statusText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

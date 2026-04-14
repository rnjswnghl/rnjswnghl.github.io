import { useState } from 'react';
import {
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';
import { deleteExistingFiles } from '../../utils/firebaseStorage';
import { analyzeRecording } from '../utils/recordingAnalysis';

type UseStandardLessonRecordingParams = {
  recorder: ReturnType<typeof useAudioRecorder>;
  recorderState: ReturnType<typeof useAudioRecorderState>;
  player: any;
  syllables: string[];
  step: number;
  scriptId: number;
  userId: string;
  sessionId: string;
  count: number;
  recordedScriptIds: Set<number>;
  setError: (error: string | null) => void;
  setAnalysisMsg: (msg: string | null) => void;
  setLastRecordingUri: (uri: string | null) => void;
  setShowPitch: (show: boolean) => void;
  setUserPitches: (pitches: number[]) => void;
  setUserDurations: (durations: number[]) => void;
  setHasHeardRecording: (heard: boolean) => void;
  setPendingPlaybackUri: (uri: string | null) => void;
  setUploadedFileUrls: (urls: { recordingUrl?: string }) => void;
  setRecordedScriptIds: React.Dispatch<React.SetStateAction<Set<number>>>;
  setRecordingStartTime: (time: number | null) => void;
  onAnalysisComplete?: (result: { pitches: number[]; durations: number[] }) => void;
  onUploadComplete?: (urls: { recordingUrl?: string }) => void;
  onRecordingStart?: () => void;
};

export function useStandardLessonRecording({
  recorder,
  recorderState,
  player,
  syllables,
  step,
  scriptId,
  userId,
  sessionId,
  count,
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
  onAnalysisComplete,
  onUploadComplete,
  onRecordingStart,
}: UseStandardLessonRecordingParams) {
  const [recBusy, setRecBusy] = useState(false);

  function ensureFileUri(path: string | null | undefined) {
    if (!path) return null;
    return path.startsWith('file://') ? path : `file://${path}`;
  }

  async function toggleRecording() {
    if (recBusy) {
      return;
    }
    try {
      setRecBusy(true);
      if (!recorderState.isRecording) {
        const perm = await requestRecordingPermissionsAsync();
        if (!perm.granted) {
          setError('마이크 권한이 필요합니다. 설정에서 허용해주세요.');
          setAnalysisMsg('마이크 권한을 허용해야 녹음/분석이 가능합니다.');
          setRecBusy(false);
          return;
        }

        if (userId && sessionId) {
          try {
            await deleteExistingFiles(userId, sessionId, scriptId, count);
          } catch (deleteErr) {
          }
        }

        try {
          await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
        } catch (audioModeErr) {
          setError('오디오 모드 설정에 실패했습니다.');
          setAnalysisMsg('앱을 다시 시작해주세요.');
          setRecBusy(false);
          return;
        }

        try {
          await recorder.prepareToRecordAsync(RecordingPresets.HIGH_QUALITY);

          const statusAfterPrep = recorder.getStatus();

          if (!statusAfterPrep.canRecord) {
            setError('녹음 준비에 실패했습니다.');
            setAnalysisMsg('녹음 기능을 사용할 수 없습니다. 앱을 다시 시작해주세요.');
            setRecBusy(false);
            return;
          }
        } catch (prepErr) {
          setError('녹음을 준비하는 중 오류가 발생했습니다.');
          setAnalysisMsg(
            `오류: ${prepErr instanceof Error ? prepErr.message : String(prepErr)}\n앱을 다시 시작하거나 설정을 확인해주세요.`
          );
          setRecBusy(false);
          return;
        }

        setHasHeardRecording(false);
        try {
          player.pause();
          setPendingPlaybackUri(null);
        } catch (playerErr) {
        }

        try {
          const statusBeforeRecord = recorder.getStatus();

          if (!statusBeforeRecord.canRecord) {
            setError('녹음을 시작할 수 없습니다.');
            setAnalysisMsg('녹음 기능이 준비되지 않았습니다. 다시 시도해주세요.');
            setRecBusy(false);
            return;
          }

          recorder.record();

          onRecordingStart?.();

          let recordingStarted = false;
          for (let i = 0; i < 5; i++) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            const statusAfter = recorder.getStatus();

            if (statusAfter.isRecording) {
              recordingStarted = true;
              break;
            }
          }

          if (!recordingStarted) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            const finalStatus = recorder.getStatus();

            if (!finalStatus.isRecording && !recorderState.isRecording) {
              setError('녹음이 시작되지 않았습니다.');
              setAnalysisMsg('마이크 권한을 확인하거나 앱을 다시 시작해주세요.');
              setRecBusy(false);
              return;
            }
          }
        } catch (recordErr) {
          setError('녹음 시작에 실패했습니다.');
          setAnalysisMsg(`오류: ${recordErr instanceof Error ? recordErr.message : String(recordErr)}`);
          setRecBusy(false);
          return;
        }

        setError(null);
        setShowPitch(true);
        setUserPitches([]);
        setUserDurations([]);
        setRecordingStartTime(Date.now());
      } else {
        try {
          setRecordingStartTime(null);
          try {
            player.pause();
            setPendingPlaybackUri(null);
          } catch {}

          await recorder.stop();

          let finalUri: string | null = null;
          let recordingDurationMs = 0;

          for (let i = 0; i < 10; i++) {
            const status = recorder.getStatus();

            if (status.url) {
              finalUri = status.url;
              if (status.durationMillis) {
                recordingDurationMs = status.durationMillis;
              }
              break;
            }
            if (recorder.uri) {
              finalUri = recorder.uri;
            }
            if (finalUri) {
              const status = recorder.getStatus();
              if (status.durationMillis) {
                recordingDurationMs = status.durationMillis;
              }
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          if (finalUri) {
            finalUri = ensureFileUri(finalUri);

            if (!finalUri) {
              setAnalysisMsg('녹음 파일 경로를 확인할 수 없습니다.');
              setRecBusy(false);
              return;
            }

            try {
              const info = await FileSystem.getInfoAsync(finalUri);

              if (info.exists) {
                if ('size' in info && info.size !== undefined && info.size < 1000) {
                  setAnalysisMsg('녹음이 제대로 저장되지 않았습니다. 다시 녹음해주세요.');
                  setRecBusy(false);
                  return;
                }

                const dest = `${FileSystem.documentDirectory}rec_${Date.now()}${RecordingPresets.HIGH_QUALITY.extension}`;
                await FileSystem.copyAsync({ from: finalUri, to: dest });

                const copiedInfo = await FileSystem.getInfoAsync(dest);
                if (copiedInfo.exists && 'size' in copiedInfo && copiedInfo.size !== undefined && copiedInfo.size < 1000) {
                  setAnalysisMsg('녹음 파일 복사 중 문제가 발생했습니다. 다시 녹음해주세요.');
                  setRecBusy(false);
                  return;
                }

                setLastRecordingUri(dest);
                await analyzeRecording(
                  dest,
                  syllables,
                  recordingDurationMs,
                  recorder,
                  setAnalysisMsg,
                  (result) => {
                    setUserPitches(result.pitches);
                    setUserDurations(result.durations);
                    setShowPitch(true);
                    onAnalysisComplete?.(result);
                  },
                  (urls) => {
                    setUploadedFileUrls(urls);
                    setRecordedScriptIds((prev) => new Set(prev).add(scriptId));
                    onUploadComplete?.(urls);
                  },
                  { userId, sessionId, scriptId, count }
                );
                return;
              }
            } catch (copyErr) {
            }

            setLastRecordingUri(finalUri);
            await analyzeRecording(
              finalUri,
              syllables,
              recordingDurationMs,
              recorder,
              setAnalysisMsg,
              (result) => {
                setUserPitches(result.pitches);
                setUserDurations(result.durations);
                setShowPitch(true);
                onAnalysisComplete?.(result);
              },
              (urls) => {
                setUploadedFileUrls(urls);
                setRecordedScriptIds((prev) => new Set(prev).add(scriptId));
                onUploadComplete?.(urls);
              },
              { userId, sessionId, scriptId, count }
            );
          } else {
            setAnalysisMsg('녹음 파일을 찾을 수 없습니다. 다시 시도해주세요.');
          }
        } catch (stopErr) {
          setError('녹음 중지 중 오류가 발생했습니다.');
          setAnalysisMsg('녹음을 다시 시도해주세요.');
        }
      }
    } catch (e) {
      setError('녹음 처리 중 오류가 발생했습니다.');
      setAnalysisMsg('녹음을 다시 시도해주세요.');
    } finally {
      setRecBusy(false);
    }
  }

  return {
    recBusy,
    toggleRecording,
  };
}


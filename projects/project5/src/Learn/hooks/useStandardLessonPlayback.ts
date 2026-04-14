import { useEffect } from 'react';
import { setAudioModeAsync, useAudioPlayerStatus } from 'expo-audio';
import * as FileSystem from 'expo-file-system/legacy';

type UseStandardLessonPlaybackParams = {
  player: any;
  lastRecordingUri: string | null;
  pendingPlaybackUri: string | null;
  uploadedFileUrls: {
    recordingUrl?: string;
  };
  setAnalysisMsg: (msg: string | null) => void;
  setHasHeardRecording: (heard: boolean) => void;
  setPendingPlaybackUri: (uri: string | null) => void;
};

export function useStandardLessonPlayback({
  player,
  lastRecordingUri,
  pendingPlaybackUri,
  uploadedFileUrls,
  setAnalysisMsg,
  setHasHeardRecording,
  setPendingPlaybackUri,
}: UseStandardLessonPlaybackParams) {
  const playerStatus = useAudioPlayerStatus(player);

  function ensureFileUri(path: string | null | undefined) {
    if (!path) return null;
    return path.startsWith('file://') ? path : `file://${path}`;
  }

  async function playLastRecording() {
    try {
      let playbackUri: string | null = null;

      if (lastRecordingUri) {
        const uri = ensureFileUri(lastRecordingUri);
        if (uri) {
          const info = await FileSystem.getInfoAsync(uri);
          if (!info.exists) {
            setAnalysisMsg('녹음 파일을 찾을 수 없습니다.');
            return;
          }

          if ('size' in info && info.size !== undefined && info.size < 1000) {
            setAnalysisMsg('녹음 파일이 손상되었거나 비어있습니다. 다시 녹음해주세요.');
            return;
          }

          playbackUri = uri;
        }
      }

      if (!playbackUri && uploadedFileUrls.recordingUrl) {
        playbackUri = uploadedFileUrls.recordingUrl;
      }

      if (!playbackUri) {
        setAnalysisMsg('녹음 파일이 없습니다.');
        return;
      }

      try {
        player.pause();
        setPendingPlaybackUri(null);
      } catch (err) {  }

      try {
        await setAudioModeAsync({
          allowsRecording: false,
          playsInSilentMode: false,
        });
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (err) {  }

      try {
        await setAudioModeAsync({
          allowsRecording: false,
          playsInSilentMode: false,
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (err) {  }

      for (let i = 0; i < 2; i++) {
        await setAudioModeAsync({
          allowsRecording: false,
          playsInSilentMode: true,
          shouldPlayInBackground: false,
          shouldRouteThroughEarpiece: false,
          interruptionModeAndroid: 'duckOthers',
          interruptionMode: 'duckOthers',
        });
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      try {
        player.pause();
        player.replace({ uri: undefined });
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (err) {  }

      player.replace({ uri: playbackUri });

      await setAudioModeAsync({
        allowsRecording: false,
        playsInSilentMode: true,
        shouldPlayInBackground: false,
        shouldRouteThroughEarpiece: false,
        interruptionModeAndroid: 'duckOthers',
        interruptionMode: 'duckOthers',
      });
      await new Promise((resolve) => setTimeout(resolve, 300));

      await new Promise((resolve) => setTimeout(resolve, 800));

      let loaded = false;
      for (let i = 0; i < 20; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (playerStatus?.isLoaded) {
          loaded = true;
          break;
        }
        if (i >= 15) {
          loaded = true;
          break;
        }
      }

      try {
        try {
          await player.seekTo(0);
        } catch (err) {  }

        setHasHeardRecording(false);

        await setAudioModeAsync({
          allowsRecording: false,
          playsInSilentMode: true,
          shouldPlayInBackground: false,
          shouldRouteThroughEarpiece: false,
          interruptionModeAndroid: 'duckOthers',
          interruptionMode: 'duckOthers',
        });
        await new Promise((resolve) => setTimeout(resolve, 200));

        player.play();

        await new Promise((resolve) => setTimeout(resolve, 100));
        await setAudioModeAsync({
          allowsRecording: false,
          playsInSilentMode: true,
          shouldPlayInBackground: false,
          shouldRouteThroughEarpiece: false,
          interruptionModeAndroid: 'duckOthers',
          interruptionMode: 'duckOthers',
        });

        let playbackConfirmed = false;
        let lastCurrentTime = playerStatus?.currentTime || 0;

        for (let i = 0; i < 20; i++) {
          await new Promise((resolve) => setTimeout(resolve, 100));

          const currentTime = playerStatus?.currentTime || 0;
          const isPlaying = playerStatus?.playing || playerStatus?.timeControlStatus === 'playing';
          const isLoaded = playerStatus?.isLoaded;

          if (isLoaded && (isPlaying || currentTime > lastCurrentTime + 0.1)) {
            playbackConfirmed = true;

            const isMuted = playerStatus?.mute;

            if (isMuted) {
              setAnalysisMsg('재생 중이지만 음소거 상태입니다. 볼륨을 확인해주세요.');
            }

            break;
          }

          lastCurrentTime = currentTime;
        }
      } catch (playErr) {
        setAnalysisMsg('재생 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setAnalysisMsg('녹음 재생 중 오류가 발생했습니다.');
    }
  }

  useEffect(() => {
    if (!pendingPlaybackUri) return;
    if (!playerStatus?.isLoaded) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    (async () => {
      try {
        await player.seekTo(0);
        setHasHeardRecording(false);

        player.play();

        timeoutId = setTimeout(() => {
          if (!cancelled) {
            const currentStatus = playerStatus;
            if (!currentStatus?.playing && currentStatus?.timeControlStatus !== 'playing') {
              setAnalysisMsg('재생을 시작할 수 없습니다. 다시 시도해주세요.');
              setPendingPlaybackUri(null);
            }
          }
        }, 2000);
      } catch (err) {
        setAnalysisMsg('녹음 파일을 재생하는 중 문제가 발생했습니다.');
        setPendingPlaybackUri(null);
      }
    })();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pendingPlaybackUri, player, playerStatus?.isLoaded]);

  useEffect(() => {
    if (!pendingPlaybackUri) return;
    if (playerStatus?.playing || playerStatus?.timeControlStatus === 'playing') {
      setPendingPlaybackUri(null);
    }
  }, [playerStatus?.playing, playerStatus?.timeControlStatus, pendingPlaybackUri]);

  useEffect(() => {
    if (playerStatus?.didJustFinish) {
      setHasHeardRecording(true);
    }
  }, [playerStatus?.didJustFinish]);

  return {
    playLastRecording,
  };
}

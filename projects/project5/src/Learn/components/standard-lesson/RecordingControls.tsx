import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import MicButton from './script/MicButton';

type Props = {
  analysisMessage: string | null;
  hasHeardRecording: boolean;
  hasRecording: boolean;
  isRecording: boolean;
  loadingScripts: boolean;
  onPlayLastRecording: () => void;
  onToggleRecording: () => void;
  scriptsLoaded: boolean;
};

export default function RecordingControls({
  analysisMessage,
  hasHeardRecording,
  hasRecording,
  isRecording,
  loadingScripts,
  onPlayLastRecording,
  onToggleRecording,
  scriptsLoaded,
}: Props) {
  return (
    <View style={styles.wrapper}>
      {!isRecording && (
        <>
          <Text style={styles.helper}>마이크 버튼을 눌러 시작해보세요</Text>
          {!scriptsLoaded && (
            <Text style={[styles.helper, styles.helperSub]}>
              {loadingScripts ? '문장을 불러오는 중...' : '문장을 먼저 불러와 주세요.'}
            </Text>
          )}
        </>
      )}

      <MicButton onPress={onToggleRecording} />

      {isRecording && <Text style={[styles.helper, styles.recordingText]}>녹음 중.. 다시 누르면 저장됩니다.</Text>}
      {!isRecording && !!analysisMessage && <Text style={[styles.helper, styles.meta]}>{analysisMessage}</Text>}
      {!isRecording && hasRecording && (
        <View style={styles.recordingBox}>
          <Pressable
            style={[styles.listenButton, hasHeardRecording && styles.listenButtonActive]}
            onPress={onPlayLastRecording}
          >
            <Text style={styles.listenButtonText}>녹음 확인하기</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
    alignItems: 'center',
  },
  helper: {
    marginTop: 32,
    textAlign: 'center',
    color: '#475569',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.2,
    lineHeight: 24,
  },
  helperSub: {
    marginTop: 10,
    fontSize: 15,
    color: '#64748B',
    fontWeight: '400',
    letterSpacing: -0.1,
    lineHeight: 22,
  },
  meta: {
    marginTop: 12,
    fontSize: 15,
    color: '#475569',
    fontWeight: '500',
    letterSpacing: -0.1,
    lineHeight: 22,
  },
  recordingText: {
    marginTop: 28,
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
    letterSpacing: -0.1,
    lineHeight: 22,
  },
  recordingBox: {
    marginTop: 32,
    alignItems: 'center',
  },
  listenButton: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#9EC6F3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9EC6F3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    minWidth: 180,
  },
  listenButtonActive: {
    backgroundColor: '#9FB3DF',
    shadowOpacity: 0.45,
  },
  listenButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: -0.3,
  },
});

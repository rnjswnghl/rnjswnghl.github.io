import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthChoiceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.waveOne} />
        <View style={styles.waveTwo} />
        <View style={styles.waveThree} />

        <View style={styles.content}>
          <Text style={styles.greeting}>안녕하세요!</Text>
          <Text style={styles.title}>DalToori에 오신 것을 환영해요</Text>
          <Text style={styles.subtitle}>수달과 함께 발음 연습 여행을 떠나볼까요?</Text>

          <View style={styles.mascotWrapper}>
            <Image
              style={styles.mascot}
              source={require('../assets/images/mascot.png')}
            />
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.9}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.primaryBtnText}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              activeOpacity={0.9}
              onPress={() => router.push('/signup')}
            >
              <Text style={styles.secondaryBtnText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E3F0F9',
  },
  container: {
    flex: 1,
    backgroundColor: '#E3F0F9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  waveOne: {
    position: 'absolute',
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    backgroundColor: '#9FC8FF',
    opacity: 0.25,
    borderRadius: 130,
  },
  waveTwo: {
    position: 'absolute',
    bottom: -140,
    left: -60,
    width: 320,
    height: 320,
    backgroundColor: '#A4E2FF',
    opacity: 0.35,
    borderRadius: 160,
  },
  waveThree: {
    position: 'absolute',
    bottom: -100,
    right: -40,
    width: 220,
    height: 220,
    backgroundColor: '#C7F0FF',
    opacity: 0.3,
    borderRadius: 120,
  },
  content: {
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '600',
  },
  title: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
  },
  mascotWrapper: {
    marginTop: 32,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  mascot: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  buttonGroup: {
    marginTop: 36,
    width: '100%',
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.2)',
  },
  secondaryBtnText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '700',
  },
});

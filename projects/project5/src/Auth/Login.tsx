import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_USER, apiJson } from '../config/api';
import { useAuthStore } from '../store/auth';
import { signInWithGoogle } from '../utils/socialAuth';

type RawUser = {
  id?: number | string;
  userId?: string;
  name?: string;
  nickname?: string;
  profileImageUrl?: string; 
};

export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const mapUser = (u: RawUser | null | undefined) => {
    if (!u) return null;
    const idNum = typeof u.id === 'string' ? Number(u.id) : u.id;
    return {
      id: idNum ?? 0,
      userId: u.userId,                
      name: u.name,                    
      nickname: u.nickname ?? undefined,
      profileImageUrl: u.profileImageUrl ?? undefined,
    };
  };

  const onLogin = async () => {
    if (loading) return;

    if (!userId.trim() || !password) {
      Alert.alert('입력 필요', '아이디와 비밀번호를 입력해 주세요.', [{ text: '확인' }]);
      return;
    }

    setLoading(true);
    try {
      const { ok, data, raw, status } = await apiJson('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ userId, password }),
      });

      if (!ok) {
        Alert.alert('로그인 실패', '로그인에 실패했습니다. 다시 시도해주세요.', [{ text: '확인' }]);
        return;
      }

      const token: string =
        (data as any)?.accessToken ||
        (data as any)?.token ||
        (data as any)?.jwt ||
        (data as any)?.id_token;

      if (!token) {
        Alert.alert('로그인 실패', '로그인에 실패했습니다. 다시 시도해주세요.', [{ text: '확인' }]);
        return;
      }

      
      const profileRes = await apiJson(API_USER, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      let user = null;
      if (profileRes.ok) {
        user = mapUser(profileRes.data as RawUser);
        if (user) user.userId = user.userId ?? userId;
      }

      if (!user) {
        user = { id: 0, userId, name: undefined, nickname: undefined, profileImageUrl: undefined };
      }

      if (user) user.userId = user.userId ?? userId;
      login({ token, user: user as any });
      router.replace('/(drawer)/Home');
    } catch (err: any) {
      Alert.alert('로그인 실패', '로그인에 실패했습니다. 다시 시도해주세요.', [{ text: '확인' }]);
    } finally {
      setLoading(false);
    }
  };

  const onGoogleLogin = async () => {
    if (loading || socialLoading) return;
    setSocialLoading(true);

    try {
      const result = await signInWithGoogle();
      if (!result) {
        setSocialLoading(false);
        return;
      }

      const { backendToken, user } = result;
      login({ token: backendToken, user: user as any });
      router.replace('/(drawer)/Home');
    } catch (err: any) {
      const errorMsg = err?.message || 'Google 로그인에 실패했습니다.';
      Alert.alert('로그인 실패', errorMsg, [{ text: '확인' }]);
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.logoArea}>
          <Image style={styles.logo} source={require('../../assets/images/Daltoori logo.png')} />
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="아이디"
              autoCapitalize="none"
              value={userId}
              onChangeText={setUserId}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.passwordRow}>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="비밀번호"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <Pressable style={styles.eyeBtn} onPress={() => setShowPassword((v) => !v)}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#111827" />
            </Pressable>
          </View>

          <TouchableOpacity 
            style={styles.loginBtn} 
            activeOpacity={0.9} 
            onPress={onLogin} 
            disabled={loading}
          >
            <Text style={styles.loginText}>{loading ? '로그인 중...' : '로그인'}</Text>
          </TouchableOpacity>

          <View style={styles.signupArea}>
            <Text style={styles.signupText}>아직 회원이 아니신가요?</Text>
            <Text style={styles.signupLink} onPress={() => router.push('/signup')}>
              회원가입
            </Text>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialArea}>
            <TouchableOpacity
              style={styles.googleIconButton}
              activeOpacity={0.9}
              onPress={onGoogleLogin}
              disabled={loading || socialLoading}
            >
              <Image 
                source={require('../../assets/images/google_logo.png')} 
                style={styles.googleLogo}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F0F9' },
  inner: { 
    flex: 1, 
    paddingHorizontal: 20,
    justifyContent: 'center',
    zIndex: 1,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 400,
    height: 137,
    resizeMode: 'contain',
  },
  form: {
    width: '100%',
    paddingHorizontal: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  passwordRow: {
    position: 'relative',
    marginBottom: 20,
  },
  eyeBtn: {
    position: 'absolute',
    right: 16,
    top: 14,
    height: 28,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  loginBtn: {
    marginTop: 8,
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  signupArea: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  signupText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signupLink: {
    color: '#6B7280',
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 8,
    fontSize: 14,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#9CA3AF',
    fontSize: 12,
  },
  socialArea: {
    alignItems: 'center',
    marginTop: 0,
  },
  googleIconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleLogo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

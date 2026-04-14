import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { apiJson } from '../config/api';

type UploadAsset = { uri: string; name: string; type: string };

export default function SignupScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileAsset, setProfileAsset] = useState<UploadAsset | null>(null);

  const validate = () => {
    if (!name.trim()) return '이름을 입력해주세요.';
    if (!userId.trim()) return '아이디를 입력해주세요.';
    if (!nickname.trim()) return '닉네임을 입력해주세요.';
    if (password.length < 4) return '비밀번호는 4자 이상 입력해주세요.';
    if (password !== confirm) return '비밀번호가 일치하지 않습니다.';
    return null;
  };

  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      userId.trim() !== '' &&
      nickname.trim() !== '' &&
      password.length >= 4 &&
      password === confirm
    );
  };

  const ensureImagePermission = async () => {
    const current = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (current.granted) return true;

    const req = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (req.granted) return true;

    if (!req.canAskAgain) {
      Alert.alert(
        '권한 필요',
        '사진을 선택하려면 설정에서 사진/미디어 권한을 허용해주세요.',
        [
          { text: '설정 열기', onPress: () => Linking.openSettings() },
          { text: '취소', style: 'cancel' },
        ],
      );
    } else {
      Alert.alert('권한 필요', '사진(갤러리) 접근 권한이 필요합니다.');
    }
    return false;
  };

  const pickImage = async () => {
    const ok = await ensureImagePermission();
    if (!ok) return;

    
    const pickerOpts: any = { allowsEditing: true, aspect: [1, 1], quality: 0.8 };
    const OldEnum = (ImagePicker as any).MediaTypeOptions;
    const NewEnum = (ImagePicker as any).MediaType;
    if (OldEnum && OldEnum.Images != null) {
      pickerOpts.mediaTypes = OldEnum.Images;
    } else if (NewEnum && NewEnum.Images != null) {
      pickerOpts.mediaTypes = [NewEnum.Images];
    }
    const result = await ImagePicker.launchImageLibraryAsync(pickerOpts);

    if (!result.canceled) {
      const a = result.assets[0];
      const uri = a.uri;
      const name = (a as any).fileName || uri.split('/').pop() || 'profile.jpg';
      const type = (a as any).mimeType || 'image/jpeg';
      setProfileAsset({ uri, name, type });
    }
  };

  const onSignup = async () => {
    if (loading) return;
    setError(null);

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append('userId', userId);
      form.append('password', password);
      form.append('name', name);
      if (nickname) form.append('nickname', nickname);
      if (profileAsset) {
        form.append('profile', {
          uri: profileAsset.uri,
          name: profileAsset.name,
          type: profileAsset.type,
        } as any);
      }

      
      
      const { ok, data, raw } = await apiJson('/auth/register', {
        method: 'POST',
        body: form,
      });

      if (!ok) {
        
        const errMsg = (data as any)?.message || (data as any)?.error || '회원가입에 실패했어요.';
        setError(errMsg);
        return;
      }

      Alert.alert('회원가입 완료', '로그인 화면으로 이동합니다.');
      router.replace('/login');
    } catch (e: any) {
      setError(e?.message ?? '알 수 없는 오류가 발생했어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <View style={styles.headerArea}>
          <Text style={styles.title}>회원가입</Text>
        </View>

        <View style={styles.profileSection}>
          <Pressable onPress={pickImage} style={styles.profileImageContainer}>
            <View style={styles.profileCircle}>
              {profileAsset ? (
                <Image style={styles.profileImg} source={{ uri: profileAsset.uri }} />
              ) : (
                <Image
                  style={styles.profileImg}
                  source={require('../../assets/images/mascot.png')}
                />
              )}
            </View>
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </View>
          </Pressable>
          <Text style={styles.profileLabel}>프로필 사진 (선택)</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="이름을 입력하세요"
                value={name}
                onChangeText={setName}
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={[styles.inputContainer, { marginTop: 12 }]}>
              <Ionicons name="phone-portrait" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="아이디를 입력하세요"
                autoCapitalize="none"
                value={userId}
                onChangeText={setUserId}
                returnKeyType="next"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={[styles.inputContainer, { marginTop: 12 }]}>
              <Ionicons name="happy" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="닉네임을 입력하세요"
                autoCapitalize="none"
                value={nickname}
                onChangeText={setNickname}
                returnKeyType="next"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="비밀번호를 입력하세요"
                secureTextEntry={!showPw}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
              />
              <Pressable style={styles.eyeBtn} onPress={() => setShowPw(v => !v)}>
                <Ionicons name={showPw ? 'eye-off' : 'eye'} size={20} color="#6B7280" />
              </Pressable>
            </View>

            <View style={[styles.inputContainer, { marginTop: 12 }]}>
              <Ionicons name="checkmark-circle" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="비밀번호를 다시 입력하세요"
                secureTextEntry={!showPw2}
                value={confirm}
                onChangeText={setConfirm}
                autoCapitalize="none"
                placeholderTextColor="#9CA3AF"
              />
              <Pressable style={styles.eyeBtn} onPress={() => setShowPw2(v => !v)}>
                <Ionicons name={showPw2 ? 'eye-off' : 'eye'} size={20} color="#6B7280" />
              </Pressable>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onSignup}
            disabled={loading || !isFormValid()}
            style={[
              styles.primaryBtn,
              isFormValid() ? styles.primaryBtnActive : styles.primaryBtnDisabled,
              loading && { opacity: 0.7 }
            ]}
          >
            <Text style={styles.primaryBtnText}>{loading ? '가입 중…' : '가입하기'}</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginHint}>이미 계정이 있으신가요? </Text>
            <Text style={styles.loginLink} onPress={() => router.replace('/login')}>
              로그인
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  inner: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },

  headerArea: { alignItems: 'center', marginTop: 20, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#111827' },

  profileSection: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  profileImageContainer: { position: 'relative', alignItems: 'center' },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: { width: 100, height: 100, resizeMode: 'cover' },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileLabel: { marginTop: 12, fontSize: 14, color: '#111827', fontWeight: '500' },

  form: { marginTop: 10 },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: 'rgba(0,0,0,0.08)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    padding: 0,
  },
  eyeBtn: {
    padding: 4,
    marginLeft: 8,
  },

  primaryBtn: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnActive: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryBtnDisabled: {
    backgroundColor: '#D1D5DB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryBtnText: { color: '#ffffff', fontSize: 18, fontWeight: '700' },

  errorText: { color: '#DC2626', marginTop: 12, fontSize: 14, textAlign: 'center' },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  loginHint: { color: '#6B7280', fontSize: 14 },
  loginLink: { color: '#3B82F6', fontWeight: '700', fontSize: 14 },
});

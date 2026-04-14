import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { API_USER, apiJson } from '../config/api';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [saving, setSaving] = useState(false);

  const onChangePassword = async () => {
    if (saving) return;

    if (!currentPw || !newPw || !confirmPw) {
      Alert.alert('입력 필요', '현재/새/확인 비밀번호를 모두 입력하세요.');
      return;
    }
    if (newPw.length < 6) {
      Alert.alert('유효하지 않음', '새 비밀번호는 6자 이상이어야 해요.');
      return;
    }
    if (newPw !== confirmPw) {
      Alert.alert('불일치', '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setSaving(true);
      
      const payload: Record<string, string> = { password: newPw };
      if (currentPw) {
        payload.currentPassword = currentPw;
      }

      const { ok, status, data } = await apiJson(API_USER, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (!ok) {
        
        const msg = (data as any)?.message || (data as any)?.error || '비밀번호 변경 중 오류가 발생했습니다.';
        Alert.alert('변경 실패', msg);
        return;
      }

      Alert.alert('변경 완료', '비밀번호가 변경되었습니다.');
      router.back();
    } catch (e) {
      Alert.alert('변경 실패', '네트워크 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>비밀번호 변경</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeText}>닫기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formBlock}>
        <Text style={styles.label}>현재 비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="현재 비밀번호"
          secureTextEntry
          value={currentPw}
          onChangeText={setCurrentPw}
        />

        <Text style={[styles.label, { marginTop: 12 }]}>새 비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="새 비밀번호"
          secureTextEntry
          value={newPw}
          onChangeText={setNewPw}
        />

        <Text style={[styles.label, { marginTop: 12 }]}>새 비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          placeholder="새 비밀번호 확인"
          secureTextEntry
          value={confirmPw}
          onChangeText={setConfirmPw}
        />

        <TouchableOpacity
          onPress={onChangePassword}
          activeOpacity={0.9}
          style={[styles.saveBtn, saving && { opacity: 0.6 }]}
          disabled={saving}
        >
          <Text style={styles.saveBtnText}>{saving ? '변경 중...' : '변경하기'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  closeBtn: { paddingHorizontal: 8, paddingVertical: 4 },
  closeText: { color: '#6B7280', fontWeight: '700' },
  formBlock: { marginTop: 16 },
  label: { color: '#111827', fontSize: 14 },
  input: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  saveBtn: {
    marginTop: 16,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
  },
  saveBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
});

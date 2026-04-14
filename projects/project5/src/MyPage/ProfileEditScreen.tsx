import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileEditScreen() {
  const [name, setName] = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const onPickImage = () => {
    Alert.alert('사진 선택', '갤러리에서 사진 선택 기능은 추후 연결할게요.');
  };

  const onSave = () => {
    Alert.alert('저장', '프로필 저장 API 연동 전, 임시 동작입니다.');
  };

  const onWithdraw = () => {
    Alert.alert(
      '회원 탈퇴',
      '정말로 탈퇴하시겠습니까?\n탈퇴 시 모든 학습 기록은 삭제되며 복원할 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '탈퇴하기',
          style: 'destructive',
          onPress: () => {
                        Alert.alert('탈퇴 요청됨', '탈퇴 처리는 API 연동 시 적용됩니다.');
          },
        },
      ]
    );
  };

  const onChangePassword = () => {
    if (!currentPw || !newPw || !confirmPw) {
      Alert.alert('입력 필요', '현재/새/확인 비밀번호를 모두 입력하세요.');
      return;
    }
    if (newPw.length < 4) {
      Alert.alert('유효성', '새 비밀번호는 4자 이상이어야 합니다.');
      return;
    }
    if (newPw !== confirmPw) {
      Alert.alert('불일치', '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }
    Alert.alert('변경 완료', '비밀번호가 변경되었습니다.');
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
  };

  return (
    <View>
      <View style={styles.avatarRow}>
        <View style={styles.avatarCircle}>
          <Image style={styles.avatarImg} source={require('../../assets/images/mascot.png')} />
        </View>
        <TouchableOpacity onPress={onPickImage} activeOpacity={0.9} style={styles.imageBtn}>
          <Text style={styles.imageBtnText}>이미지 변경</Text>
        </TouchableOpacity>
      </View>

      {}
      <View style={styles.formBlock}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력하세요"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity onPress={onSave} activeOpacity={0.9} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>저장하기</Text>
        </TouchableOpacity>
      </View>

      {}
      <View style={styles.formBlock}>
        <Text style={styles.sectionTitle}>비밀번호 변경</Text>
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
        <TouchableOpacity onPress={onChangePassword} activeOpacity={0.9} style={styles.changePwBtn}>
          <Text style={styles.changePwBtnText}>비밀번호 변경</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onWithdraw} activeOpacity={0.8} style={styles.withdrawTextBtn}>
        <Text style={styles.withdrawText}>회원 탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarRow: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: { width: 72, height: 72, borderRadius: 36, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E5E7EB' },
  avatarImg: { width: 56, height: 56, opacity: 0.8 },
  imageBtn: { marginLeft: 12, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', borderRadius: 10 },
  imageBtnText: { color: '#111827', fontWeight: '700' },
  formBlock: { marginTop: 16 },
  label: { color: '#111827', fontSize: 14 },
  input: { marginTop: 8, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', paddingHorizontal: 12, paddingVertical: 12, fontSize: 16, color: '#111827' },
  saveBtn: { marginTop: 16, backgroundColor: '#6366F1', borderRadius: 12, alignItems: 'center', paddingVertical: 12 },
  saveBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  sectionTitle: { color: '#111827', fontWeight: '800', marginBottom: 8 },
  changePwBtn: { marginTop: 16, backgroundColor: '#111827', borderRadius: 12, alignItems: 'center', paddingVertical: 12 },
  changePwBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  withdrawTextBtn: { marginTop: 24, alignSelf: 'center', paddingVertical: 8 },
  withdrawText: { color: '#DC2626', fontWeight: '700' },
});

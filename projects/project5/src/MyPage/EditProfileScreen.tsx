import React, { useState, useMemo } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useAuthStore } from '../store/auth';
import { API_USER, apiJson } from '../config/api';
import { uploadProfileImage, deleteImageFromFirebase } from '../utils/uploadImage';

export default function EditProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  const originalName = user?.name ?? '';
  const originalNickname = user?.nickname ?? '';
  const originalImageUri = user?.profileImageUrl ?? '';

  
  const [name, setName] = useState(originalName);
  const [nickname, setNickname] = useState(originalNickname);
  const [imageUri, setImageUri] = useState<string | undefined>(originalImageUri || undefined);
  const [newImageSelected, setNewImageSelected] = useState(false); 
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false); 
  
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [changingPw, setChangingPw] = useState(false);
  
  
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [withdrawConfirmText, setWithdrawConfirmText] = useState('');
  const [withdrawTargetText, setWithdrawTargetText] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);

  
  const hasChanges = useMemo(() => {
    return (
      (name ?? '').trim() !== (originalName ?? '') ||
      (nickname ?? '').trim() !== (originalNickname ?? '') ||
      newImageSelected
    );
  }, [name, nickname, newImageSelected, originalName, originalNickname]);

  
  const endsWithConsonant = (word: string) => {
    if (!word) return false;
    const code = word.charCodeAt(word.length - 1) - 0xac00;
    if (code < 0 || code > 11171) return false;
    return code % 28 !== 0;
  };

  
  const buildChangedMessage = () => {
    const changed: string[] = [];
    if ((name ?? '').trim() !== (originalName ?? '')) changed.push('이름');
    if ((nickname ?? '').trim() !== (originalNickname ?? '')) changed.push('닉네임');
    if (newImageSelected) changed.push('프로필 사진');
    if (changed.length === 0) return '변경된 항목이 없습니다.';
    const last = changed[changed.length - 1];
    const josa = endsWithConsonant(last) ? '을' : '를';
    return `${changed.join(', ')}${josa} 수정했어요.`;
  };

  
  const onPickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진 보관함 접근 권한을 허용해주세요.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return;

    const asset = result.assets?.[0];
    const uri = asset?.uri;
    if (!uri) return;

    
    try {
      
      
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 400, height: 400 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

      
      
      setImageUri(manipulatedImage.uri);
      setNewImageSelected(true);
    } catch (error) {
      
      setImageUri(uri);
      setNewImageSelected(true);
    }
  };

  
  const onSave = async () => {
    if (saving) return;
    if (!hasChanges) {
      Alert.alert('알림', '변경된 내용이 없습니다.');
      return;
    }

    try {
      setSaving(true);

      const nameChanged = (name ?? '').trim() !== (originalName ?? '');
      const nickChanged = (nickname ?? '').trim() !== (originalNickname ?? '');

      
      let uploadedImageUrl: string | undefined;
      
      if (newImageSelected && imageUri && !imageUri.startsWith('http')) {
        try {
          setUploading(true);
          
          
          
          if (originalImageUri && originalImageUri.includes('firebasestorage.googleapis.com')) {
            
            deleteImageFromFirebase(originalImageUri)
              .then(() => {
              })
              .catch((deleteError) => {
                
              });
          }
          
          
          const userId = user?.userId || 'unknown';
          uploadedImageUrl = await uploadProfileImage(imageUri, userId);
          
          setUploading(false);
        } catch (error) {
          setUploading(false);
          Alert.alert(
            '이미지 업로드 실패',
            '이미지를 업로드하는 중 오류가 발생했습니다. 다시 시도해주세요.',
            [{ text: '확인' }]
          );
          return;
        }
      }

      
      const payload: Record<string, string> = {};
      if (nameChanged) payload.name = (name ?? '').trim();
      if (nickChanged) payload.nickname = (nickname ?? '').trim();
      if (uploadedImageUrl) {
        payload.profileImageUrl = uploadedImageUrl;
      }

      if (Object.keys(payload).length === 0) {
        Alert.alert('알림', '변경된 내용이 없습니다.');
        return;
      }

      const { ok, status, data } = await apiJson(API_USER, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (!ok) {
        const errText = (data as any)?.message || (data as any)?.error || '프로필 저장 중 오류가 발생했습니다.';
        Alert.alert('저장 실패', errText);
        return;
      }

      try {
        const responseData = data as any;
        
        if (responseData && (responseData.id || responseData.userId || responseData.name)) {
          const u: any = responseData;
          const idNum = typeof u.id === 'string' ? Number(u.id) : u.id;
          
          const serverImageUrl = u.profileImageUrl ?? u.profile_image_url;
          
          setUser({
            id: idNum ?? user?.id ?? 0,
            userId: u.userId ?? user?.userId,
            name: u.name ?? name.trim(),
            nickname: u.nickname ?? nickname.trim(),
            profileImageUrl: serverImageUrl ?? uploadedImageUrl ?? imageUri,
          });
        } else {
          setUser({
            ...(user ?? { id: 0 }),
            userId: user?.userId,
            name: name.trim() || user?.name,
            nickname: nickname.trim() || user?.nickname,
            profileImageUrl: uploadedImageUrl ?? imageUri ?? user?.profileImageUrl,
          });
        }
        
        Alert.alert('저장 완료', buildChangedMessage());
        router.back();
      } catch (error) {
        setUser({
          ...(user ?? { id: 0 }),
          userId: user?.userId,
          name: name.trim(),
          nickname: nickname.trim(),
          profileImageUrl: uploadedImageUrl ?? imageUri ?? user?.profileImageUrl,
        });
        
        Alert.alert('저장 완료', buildChangedMessage());
        router.back();
      }
    } catch (e) {
      Alert.alert('저장 실패', '예상치 못한 오류가 발생했습니다.');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  
  const onSaveImageOnly = async () => {
    if (saving || uploading) return;
    if (!imageUri) {
      Alert.alert('알림', '먼저 프로필 사진을 선택해주세요.');
      return;
    }
    try {
      setSaving(true);
      let uploadedImageUrl: string | undefined;
      if (imageUri && !imageUri.startsWith('http')) {
        try {
          setUploading(true);
          if (originalImageUri && originalImageUri.includes('firebasestorage.googleapis.com')) {
            deleteImageFromFirebase(originalImageUri).catch(() => {});
          }
          const userId = user?.userId || 'unknown';
          uploadedImageUrl = await uploadProfileImage(imageUri, userId);
          setUploading(false);
        } catch (e) {
          setUploading(false);
          Alert.alert('업로드 실패', '이미지 업로드 중 오류가 발생했습니다.');
          return;
        }
      } else {
        uploadedImageUrl = imageUri;
      }
      const payload: Record<string, string> = {};
      if (uploadedImageUrl) payload.profileImageUrl = uploadedImageUrl;
      const { ok, status, data } = await apiJson(API_USER, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      if (!ok) {
        const msg = (data as any)?.message || (data as any)?.error || `저장 실패 (status ${status})`;
        Alert.alert('저장 실패', msg);
        return;
      }
      
      setUser({
        ...(user ?? { id: 0 }),
        userId: user?.userId,
        name: user?.name,
        nickname: user?.nickname,
        profileImageUrl: uploadedImageUrl,
      });
      setNewImageSelected(false);
      Alert.alert('저장 완료', '프로필 사진이 변경되었습니다.');
    } catch (e) {
      Alert.alert('저장 실패', '예상치 못한 오류가 발생했습니다.');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  
  const onChangePassword = async () => {
    if (changingPw) return;
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
      setChangingPw(true);
      const payload: Record<string, string> = { password: newPw, currentPassword: currentPw };
      const { ok, status, data } = await apiJson(API_USER, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      if (!ok) {
        const msg = (data as any)?.message || (data as any)?.error || `비밀번호 변경 실패 (status ${status})`;
        Alert.alert('변경 실패', msg);
        return;
      }
      Alert.alert('변경 완료', '비밀번호가 변경되었습니다.');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } catch (e) {
      Alert.alert('변경 실패', '네트워크 오류가 발생했습니다.');
    } finally {
      setChangingPw(false);
    }
  };

  
  const WITHDRAW_CONFIRM_TEXTS = [
    '회원탈퇴를 진행하겠습니다',
    '정말로 탈퇴하시겠습니까',
    '모든 데이터를 삭제하겠습니다',
    '계정을 영구적으로 삭제하겠습니다',
    '회원 탈퇴를 최종 확인합니다',
    '데이터 삭제에 동의합니다',
    '계정 삭제를 진행하겠습니다',
    '회원 탈퇴를 확정합니다',
    '영구 삭제에 동의합니다',
    '모든 학습 기록과 데이터를 영구 삭제하겠습니다',
    '계정 및 모든 정보를 완전히 삭제하겠습니다',
    '회원 탈퇴를 최종적으로 확정하겠습니다',
    '데이터 복구 불가능한 영구 삭제에 동의합니다',
    '계정과 모든 연관 데이터를 삭제하겠습니다',
    '회원 탈퇴 및 모든 정보 삭제를 진행하겠습니다',
  ];

  
  const onWithdraw = () => {
    
    const randomIndex = Math.floor(Math.random() * WITHDRAW_CONFIRM_TEXTS.length);
    const selectedText = WITHDRAW_CONFIRM_TEXTS[randomIndex];
    setWithdrawTargetText(selectedText);
    setWithdrawConfirmText('');
    setWithdrawModalVisible(true);
  };

  
  const onConfirmWithdraw = async () => {
    if (!withdrawConfirmText.trim()) {
      Alert.alert('입력 필요', '확인 문구를 입력해주세요.');
      return;
    }

    
    const trimmedInput = withdrawConfirmText.trim();
    const trimmedTarget = withdrawTargetText.trim();

    if (trimmedInput !== trimmedTarget) {
      Alert.alert('문구 불일치', `입력하신 문구가 일치하지 않습니다.\n\n정확히 "${withdrawTargetText}"를 입력해주세요.`);
      return;
    }

    
    try {
      setWithdrawing(true);
      
      const { ok, status, data } = await apiJson('/auth/delete_account', { method: 'DELETE' });
      if (!ok) {
        const msg = (data as any)?.message || (data as any)?.error || `탈퇴 실패 (status ${status})`;
        Alert.alert('탈퇴 실패', msg);
        setWithdrawModalVisible(false);
        return;
      }
      setWithdrawModalVisible(false);
      Alert.alert('탈퇴 완료', '그동안 이용해 주셔서 감사합니다.', [
        {
          text: '확인',
          onPress: () => {
            logout();
            router.replace('/login');
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('탈퇴 실패', error?.message || '알 수 없는 오류가 발생했습니다.');
      setWithdrawModalVisible(false);
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={styles.closeBtn}>
          <Ionicons name="close" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>

      {}
      <View style={styles.card}>
        <View style={styles.avatarRow}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.avatarImg} />
              ) : (
                <Image source={require('../../assets/images/mascot.png')} style={styles.avatarImg} />
              )}
              {uploading && (
                <View style={styles.uploadingOverlay}>
                  <ActivityIndicator size="small" color="#FFF" />
                </View>
              )}
            </View>
            <TouchableOpacity onPress={onPickImage} activeOpacity={0.9} disabled={uploading || saving} style={styles.avatarEditBtn}>
              <Ionicons name="camera" size={16} color="#111827" />
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 12, justifyContent: 'center' }}>
            <Text style={styles.nameTitle}>{(name?.trim() || user?.name || user?.nickname || '사용자') + '님'}</Text>
          </View>
        </View>
        {newImageSelected && !uploading ? (
          <View style={styles.imageSelectedRow}>
            <Text style={styles.imageSelectedText}>✓ 새로운 이미지가 선택되었습니다.</Text>
            <TouchableOpacity onPress={onSaveImageOnly} activeOpacity={0.9} style={[styles.imageApplyBtn, saving && { opacity: 0.6 }]} disabled={saving}>
              <Text style={styles.imageApplyBtnText}>사진 적용하기</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {}
      <View style={[styles.card, { marginTop: 12 }]}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력해주세요"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          returnKeyType="done"
          editable={!saving}
        />

        <Text style={[styles.label, { marginTop: 12 }]}>닉네임</Text>
        <TextInput
          style={styles.input}
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChangeText={setNickname}
          autoCapitalize="none"
          returnKeyType="done"
          editable={!saving}
        />

        <TouchableOpacity onPress={onSave} activeOpacity={0.9} style={[styles.saveBtn, (saving || uploading) && { opacity: 0.6 }]} disabled={saving || uploading}>
          {(saving || uploading) ? (
            <View style={styles.savingRow}>
              <ActivityIndicator size="small" color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.saveBtnText}>{uploading ? '이미지 업로드 중...' : '저장 중...'}</Text>
            </View>
          ) : <Text style={styles.saveBtnText}>저장하기</Text>}
        </TouchableOpacity>
      </View>

      {}
      <View style={[styles.card, { marginTop: 12 }]}>
        <Text style={styles.label}>현재 비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="현재 비밀번호를 입력하세요"
          secureTextEntry
          value={currentPw}
          onChangeText={setCurrentPw}
        />
        <Text style={[styles.label, { marginTop: 12 }]}>새 비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="새 비밀번호를 입력하세요"
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
        <TouchableOpacity onPress={onChangePassword} activeOpacity={0.9} style={[styles.saveBtn, changingPw && { opacity: 0.6 }]} disabled={changingPw}>
          <Text style={styles.saveBtnText}>{changingPw ? '변경 중...' : '비밀번호 변경'}</Text>
        </TouchableOpacity>
      </View>

      {}
      <TouchableOpacity onPress={onWithdraw} activeOpacity={0.8} style={[styles.withdrawTextBtn, { marginTop: 16 }]}>
        <Text style={styles.withdrawText}>회원 탈퇴</Text>
      </TouchableOpacity>
      </ScrollView>

      {}
      <Modal
        visible={withdrawModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setWithdrawModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>회원 탈퇴 확인</Text>
            <Text style={styles.modalWarning}>
              정말로 탈퇴하시겠습니까?{'\n'}
              탈퇴 시 모든 학습 기록은 삭제되며 복원할 수 없습니다.
            </Text>
            <View style={styles.confirmTextContainer}>
              <Text style={styles.confirmLabel}>아래 문구를 정확히 입력해주세요:</Text>
              <View style={styles.targetTextBox}>
                <Text style={styles.targetText}>{`"${withdrawTargetText}"`}</Text>
              </View>
            </View>
            <TextInput
              style={styles.confirmInput}
              placeholder="위 문구를 정확히 입력하세요"
              value={withdrawConfirmText}
              onChangeText={setWithdrawConfirmText}
              autoCapitalize="none"
              editable={!withdrawing}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                onPress={() => {
                  setWithdrawModalVisible(false);
                  setWithdrawConfirmText('');
                }}
                style={[styles.modalButton, styles.modalCancelButton]}
                disabled={withdrawing}
              >
                <Text style={styles.modalCancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onConfirmWithdraw}
                style={[styles.modalButton, styles.modalConfirmButton, withdrawing && { opacity: 0.6 }]}
                disabled={withdrawing}
              >
                {withdrawing ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.modalConfirmText}>탈퇴하기</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: { fontSize: 18, fontWeight: '800', color: '#111827' },
  closeBtn: { 
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  closeText: { color: '#6B7280', fontWeight: '700' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)', padding: 14 },
  sectionTitle: { color: '#111827', fontWeight: '800', marginBottom: 10 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  avatarImg: { width: 64, height: 64, resizeMode: 'cover', borderRadius: 32 },
  avatarWrap: { position: 'relative', width: 72, height: 72 },
  avatarEditBtn: { position: 'absolute', right: -6, bottom: -6, width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)', alignItems: 'center', justifyContent: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  nameTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBtn: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
  },
  imageBtnText: { color: '#111827', fontWeight: '700' },
  imageSelectedText: {
    marginTop: 8,
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
  },
  imageSelectedRow: { marginTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  imageApplyBtn: { marginLeft: 12, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#6366F1', borderRadius: 10 },
  imageApplyBtnText: { color: '#FFFFFF', fontWeight: '800' },
  formBlock: { marginTop: 16 },
  label: { color: '#6B7280', fontSize: 13, fontWeight: '700' },
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
    backgroundColor: '#6366F1', 
    borderRadius: 12, 
    alignItems: 'center', 
    paddingVertical: 12 
  },
  saveBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  savingRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  withdrawTextBtn: { marginTop: 6, marginBottom: 4, alignSelf: 'center', paddingVertical: 6, paddingHorizontal: 8 },
  withdrawText: { color: '#DC2626', fontWeight: '700' },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalWarning: {
    fontSize: 14,
    color: '#DC2626',
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  confirmTextContainer: {
    marginBottom: 16,
  },
  confirmLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '600',
  },
  targetTextBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  targetText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '700',
    textAlign: 'center',
  },
  confirmInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  modalCancelText: {
    color: '#6B7280',
    fontWeight: '700',
    fontSize: 16,
  },
  modalConfirmButton: {
    backgroundColor: '#DC2626',
  },
  modalConfirmText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});

import AppHeader from '@/components/UI/AppHeader';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import React, { useEffect, useCallback, useMemo } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/auth';
import { API_USER, API_BASE, apiJson } from '../config/api';
import AIFeedback from './AIFeedbackScreen';

const MOTIVATION_QUOTES: string[] = [
  '오늘도 한 걸음, 꾸준함이 실력을 만듭니다',
  '작은 연습이 큰 변화를 이끕니다',
  '어제의 나보다 한 뼘 더',
  '지금 이 순간의 연습이 내일의 자신감',
  '기록은 솔직합니다. 오늘도 한 줄',
  '꾸준함은 최고의 재능입니다',
  '집중 10분, 성장은 하루 종일',
  '완벽보다 꾸준함',
  '목표에 가까워지는 중',
  '목소리, 매일 조금씩 성장 중',
  '지금의 선택이 실력이 됩니다',
  '포기하고 싶은 순간이 성장의 문턱입니다',
];

export default function ProfileTabs() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);
  const dailyQuote = useMemo(() => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const daySeed = Math.floor(startOfDay / 86400000); // days since epoch
    const userSeed = Number.isFinite(user?.id as any) ? Number(user?.id) * 31 : (user?.name?.length ?? 0) * 17;
    const idx = Math.abs((daySeed + userSeed) % MOTIVATION_QUOTES.length);
    return MOTIVATION_QUOTES[idx];
  }, [user?.id, user?.name]);

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    try {
      const { ok, status, data } = await apiJson(API_USER, { method: 'GET' });
      if (!ok) {
        return;
      }
      
      if (data) {
        const u: any = data as any;
        const currentUser = useAuthStore.getState().user;
        const idNum = typeof u.id === 'string' ? Number(u.id) : u.id;
        
        let profileImageUrl = u.profileImageUrl ?? u.profile_image_url ?? u.profile ?? u.profileUrl;
        
        if (profileImageUrl) {
          if (!profileImageUrl.startsWith('http') && !profileImageUrl.startsWith('file://') && !profileImageUrl.startsWith('data:')) {
            profileImageUrl = `${API_BASE}${profileImageUrl.startsWith('/') ? '' : '/'}${profileImageUrl}`;
          }
        }
        
        let finalProfileImageUrl: string | undefined;
        if (profileImageUrl) {
          finalProfileImageUrl = profileImageUrl;
        } else if (currentUser?.profileImageUrl?.startsWith('data:')) {
          finalProfileImageUrl = currentUser.profileImageUrl;
        } else {
          finalProfileImageUrl = currentUser?.profileImageUrl;
        }
        
        setUser({
          id: idNum ?? currentUser?.id ?? 0,
          userId: u.userId ?? currentUser?.userId,
          name: u.name ?? currentUser?.name,
          nickname: u.nickname ?? currentUser?.nickname,
          profileImageUrl: finalProfileImageUrl,
        });
      }
    } catch (error) {
    }
  }, [token, setUser]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pagePad}>
          <View style={styles.navRow}>
            <AppHeader />
          </View>

          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                {user?.profileImageUrl ? (
                  <Image
                    style={styles.avatarImg}
                    source={{ uri: user.profileImageUrl }}
                  />
                ) : (
                  <Image
                    style={styles.avatarImg}
                    source={require('../../assets/images/mascot.png')}
                  />
                )}
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="프로필 수정"
                onPress={() => router.push('/edit-profile')}
                activeOpacity={0.9}
                style={styles.editButton}
              >
                <Ionicons name="create-outline" size={16} color="#9FB3DF" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.nameText}>{`${user?.name ?? user?.nickname ?? '진주'}님`}</Text>
            
            <View style={styles.quoteContainer}>
              <Ionicons name="sparkles" size={16} color="#F59E0B" style={styles.quoteIcon} />
              <Text style={styles.quoteText}>{dailyQuote}</Text>
            </View>
          </View>

          <View style={styles.feedbackSection}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>AI 학습 피드백</Text>
                <Text style={styles.sectionSubtitle}>학습 후 받은 AI 피드백을 확인하세요</Text>
              </View>
            </View>
            <AIFeedback />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  scrollContent: { 
    paddingBottom: 32 
  },
  pagePad: { 
    paddingHorizontal: 20 
  },
  navRow: { 
    marginTop: 8, 
    width: '100%' 
  },
  
  profileSection: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 0,
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#9FB3DF',
  },
  avatarImg: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 45,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#9FB3DF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1D5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 0,
    maxWidth: '90%',
  },
  quoteIcon: {
    marginRight: 8,
  },
  quoteText: {
    flex: 1,
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  
  feedbackSection: {
    marginTop: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});

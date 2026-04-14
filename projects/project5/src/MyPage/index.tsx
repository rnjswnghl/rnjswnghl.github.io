import AppHeader from '@/components/UI/AppHeader';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AIFeedback from './AIFeedbackScreen';
import Dashboard from './DashboardScreen';
import { apiJson } from '../config/api';
import { useAuthStore } from '../store/auth';

type TabKey = 'dashboard' | 'ai';
type IoniconName = keyof typeof Ionicons.glyphMap;

type StudyInfo = {
  name: string;
  studyDays: number;
  totalScore: number;
  recentActivity: string;
};

export default function ProfileTabs() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>('dashboard');
  const [studyInfo, setStudyInfo] = useState<StudyInfo | null>(null);
  const user = useAuthStore((s) => s.user);

  
  useEffect(() => {
    let cancelled = false;
    const fetchStudyInfo = async () => {
      try {
        const { ok, data } = await apiJson<StudyInfo>('/api/user/study-info', { method: 'GET' });
        if (ok && data && !cancelled) {
          setStudyInfo(data);
        }
      } catch (err) {  }
    };
    fetchStudyInfo();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayName = studyInfo?.name || user?.name || user?.nickname || '사용자';
  const displayDays = studyInfo?.studyDays || 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.pagePad}>
          <View style={styles.navRow}>
            <AppHeader />
          </View>

          <View style={styles.headerCard}>
            <View style={styles.headerRow}>
              <View style={styles.avatarCircle}>
                <Image
                  style={styles.avatarImg}
                  source={require('../../assets/images/mascot.png')}
                />
              </View>
              <View style={styles.headerInfo}>
                <Text style={styles.nameText}>{displayName}</Text>
                <Text style={styles.subtitleText}>사투리 학습 {displayDays}일째</Text>
              </View>
            </View>

            <View style={styles.segmentRow}>
              <Segment
                label="프로필 수정"
                icon="create-outline"
                active={false}
                onPress={() => router.push('/edit-profile')}
              />
              <Segment
                label="대시보드"
                icon="stats-chart-outline"
                active={tab === 'dashboard'}
                onPress={() => setTab('dashboard')}
              />
              <Segment
                label="AI 피드백"
                icon="chatbubbles-outline"
                active={tab === 'ai'}
                onPress={() => setTab('ai')}
              />
            </View>
          </View>

          <View style={styles.content}>
            {tab === 'dashboard' && <Dashboard />}
            {tab === 'ai' && <AIFeedback />}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Segment({
  label,
  active,
  onPress,
  icon,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  icon?: IoniconName;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.segment, active && styles.segmentActive]}
    >
      <View style={styles.segmentInner}>
        {icon ? (
          <Ionicons
            name={icon}
            size={14}
            color={active ? '#fff' : '#111827'}
            style={styles.segmentIcon}
          />
        ) : null}
        <Text style={[styles.segmentLabel, active && styles.segmentLabelActive]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF1D5' },
  scrollContent: { paddingBottom: 24 },
  pagePad: { paddingHorizontal: 16 },
  navRow: { marginTop: 8, width: '100%' },
  headerCard: {
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#E0E7FF',
    padding: 16,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: { width: 56, height: 56, resizeMode: 'cover', borderRadius: 28 },
  headerInfo: { marginLeft: 12 },
  nameText: { fontSize: 18, fontWeight: '800', color: '#111827' },
  subtitleText: { marginTop: 4, color: '#6B7280' },
  segmentRow: { flexDirection: 'row', marginTop: 12 },
  segment: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  segmentActive: { backgroundColor: '#6366F1', borderColor: '#6366F1' },
  segmentInner: { flexDirection: 'row', alignItems: 'center' },
  segmentIcon: { marginRight: 4 },
  segmentLabel: { fontSize: 13, fontWeight: '700', color: '#111827' },
  segmentLabelActive: { color: '#FFFFFF' },
  content: { marginTop: 16 },
});

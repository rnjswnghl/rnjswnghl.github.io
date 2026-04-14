import AppHeader from '@/components/UI/AppHeader';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/auth';
import { API_USER, apiJson, fastapiGetEvaluationHistory, EvaluationHistorySession } from '../config/api';

export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);
  const userName = user?.name ?? user?.nickname ?? '사용자';

  const greetText = React.useMemo(() => {
    
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); 
    const koreaTime = new Date(utcTime + (9 * 60 * 60 * 1000)); 
    const hour = koreaTime.getHours();

    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    let text = '';
    if (hour < 5) {
      text = pick([
        '오늘의 작은 한 걸음이 내일을 바꿔요. 지금 시작해볼까요?',
        '고요한 새벽, 집중하기 딱 좋은 시간이에요.',
        '늦은 시간에도 멋져요! 가볍게 하나만 해볼까요?',
      ]);
    } else if (hour < 9) {
      text = pick([
        '좋은 아침이에요! 상쾌하게 시작해볼까요?',
        '아침 10분 투자로 하루를 바꿔봐요.',
        '오늘도 한 단계 성장하는 하루로 만들어봐요!',
      ]);
    } else if (hour < 12) {
      text = pick([
        '집중력이 좋은 오전, 목표 하나 정복해볼까요?',
        '지금이 가장 생산적인 시간! 학습 스타트!',
        '작은 성취를 하나 쌓아볼 시간이에요.',
      ]);
    } else if (hour < 14) {
      text = pick([
        '점심 후 가볍게 워밍업해요. 짧고 굵게!',
        '부담 없이 10분만 투자해볼까요?',
        '리프레시 겸 퀵 학습, 지금 시작!',
      ]);
    } else if (hour < 18) {
      text = pick([
        '오후의 몰입 타임! 한 챕터만 끝내봐요.',
        '꾸준함이 실력을 만들어요. 오늘도 한 걸음!',
        '성장 곡선을 이어가볼까요?',
      ]);
    } else if (hour < 21) {
      text = pick([
        '오늘 마무리는 학습으로 깔끔하게!',
        '하루를 정리하며 복습해볼까요?',
        '편안한 집중으로 차근차근 나아가요.',
      ]);
    } else {
      text = pick([
        '하루를 잘 보냈어요. 가볍게 복습하고 쉬어요.',
        '오늘의 배움을 내 것으로! 짧게 정리해볼까요?',
        '작은 습관이 큰 변화를 만듭니다.',
      ]);
    }
    return text;
  }, []);

  
  const [recentSummary, setRecentSummary] = React.useState<{
    category: string;
    pronunciationScore: number;
    accuracyGrade: string;
    speed: string;
    studyMinutes: number;
  } | null>(null);
  const evaluationHistoryRequestedRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const { ok, data } = await apiJson(API_USER, { method: 'GET' });
        if (ok && data && !cancelled) {
          const u: any = data as any;
          const idNum = typeof u.id === 'string' ? Number(u.id) : u.id;
          const currentUser = useAuthStore.getState().user;
          setUser({
            id: idNum ?? 0,
            userId: u.userId ?? currentUser?.userId,
            
            name: currentUser?.name ?? u.name ?? '사용자',
            nickname: currentUser?.nickname ?? u.nickname ?? undefined,
            profileImageUrl: currentUser?.profileImageUrl ?? u.profileImageUrl ?? u.profile_image_url ?? undefined,
          });
        }
      } catch {}
    };
    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, [token, setUser]);

  
  
  const userId = user?.userId || (user?.id != null ? String(user.id) : undefined);
  useEffect(() => {
    if (!userId) {
      return;
    }
    if (evaluationHistoryRequestedRef.current === userId) {
      return;
    }
    evaluationHistoryRequestedRef.current = userId;

    let cancelled = false;
    const fetchRecentSummary = async () => {
      
      try {
        
        let categoryMap = new Map<number, string>();
        try {
          const qs = new URLSearchParams();
          qs.set('userId', userId);
          const { ok: catOk, data: catData } = await apiJson<any>(`/api/category?${qs.toString()}`, {
            method: 'GET',
          });
          if (catOk && catData) {
            const list: any[] = Array.isArray(catData)
              ? catData
              : (Array.isArray((catData as any).items) && (catData as any).items) ||
                (Array.isArray((catData as any).data) && (catData as any).data) ||
                (Array.isArray((catData as any).list) && (catData as any).list) ||
                (Array.isArray((catData as any).rows) && (catData as any).rows) ||
                (Array.isArray((catData as any).categories) && (catData as any).categories) ||
                [];
            
            list.forEach((item: any) => {
              const rawId = item?.id ?? item?.categoryId ?? item?.category_id;
              const id = typeof rawId === 'string' ? Number(rawId) : rawId;
              const title = item?.title ?? item?.name ?? item?.label ?? '';
              if (id != null && !Number.isNaN(id) && title) {
                categoryMap.set(id, title);
              }
            });
          }
        } catch (err) {  }

        
        const { ok, data } = await fastapiGetEvaluationHistory({ limit: 1, offset: 0 });
        if (ok && data && data.data && data.data.length > 0 && !cancelled) {
          
          const latestSession: EvaluationHistorySession = data.data[0];
          
          
          const getAccuracyGrade = (score: number): string => {
            if (score >= 90) return '상급';
            if (score >= 80) return '중급';
            if (score >= 70) return '초급';
            return '입문';
          };
          
          
          const speedScore = latestSession.overall?.average_scores?.['7_speech_rate'] ?? 0;
          const getSpeedLabel = (score: number): string => {
            if (score >= 80) return '적절';
            if (score >= 60) return '보통';
            return '느림';
          };
          
          
          
          let categoryId: number | undefined = (latestSession as any)?.category_id;
          
          
          if (!categoryId && latestSession.detailed && latestSession.detailed.length > 0) {
            categoryId = (latestSession.detailed[0] as any)?.category_id;
          }
          
          
          let categoryName = '학습'; 
          if (categoryId && categoryMap.has(categoryId)) {
            categoryName = categoryMap.get(categoryId)!;
          }
          
          
          const overallScore = latestSession.overall_score 
            ?? latestSession.overall?.average_scores?.total 
            ?? 0;
          
          
          const studyMinutes = latestSession.detailed?.length 
            ? latestSession.detailed.length * 2 
            : 0;
          
          setRecentSummary({
            category: categoryName,
            pronunciationScore: Math.round(overallScore),
            accuracyGrade: getAccuracyGrade(overallScore),
            speed: getSpeedLabel(speedScore),
            studyMinutes: studyMinutes,
          });
        }
      } catch (err) {  }
    };
    fetchRecentSummary();
    return () => {
      cancelled = true;
    };
  }, [userId]); 

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner}>
        <AppHeader />

        <View style={styles.main}>
          <View style={styles.hero}>
            <Image style={styles.dari} source={require('../../assets/images/mascot.png')} />
          </View>

          <View style={styles.greeting}>
            <Text style={styles.greetTitle} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
              안녕하세요! {userName}님
            </Text>
            <Text style={styles.greetSub}>{greetText}</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryHeaderRow}>
              <Text style={styles.summaryIcon}>📚</Text>
              <Text style={styles.summaryTitle}>지난 학습 요약</Text>
              <Pressable style={{ marginLeft: 'auto' }} onPress={() => router.push('/profile')}>
                <Text style={styles.summaryLink}>자세히 보기 &gt;</Text>
              </Pressable>
            </View>
            <View style={styles.summaryBody}>
              {recentSummary ? (
                <>
                  <Text style={styles.summaryText}>카테고리: {recentSummary.category}</Text>
                  <Text style={styles.summaryText}>
                    발음 정확도 {recentSummary.pronunciationScore}점 / 유지 정확도 {recentSummary.accuracyGrade}, 속도: {recentSummary.speed}
                  </Text>
                  <Text style={styles.summaryText}>학습 시간: {recentSummary.studyMinutes}분</Text>
                </>
              ) : (
                <Text style={styles.summaryText}>학습 기록이 없습니다</Text>
              )}
            </View>
          </View>

          <Pressable style={styles.primaryBtn} onPress={() => router.push('/learn')}>
            <Text style={styles.primaryBtnText}>시작하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  inner: { flex: 1, paddingHorizontal: 24 },
  main: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -80 },
  hero: { alignItems: 'center', marginBottom: 16 },
  dari: { width: 200, height: 200, resizeMode: 'contain', marginBottom: -8 },
  greeting: { alignItems: 'center', marginBottom: 32, paddingHorizontal: 16 },
  greetTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
    width: '100%',
  },
  greetSub: { fontSize: 15, color: '#475569', lineHeight: 22, textAlign: 'center' },
  summaryCard: {
    backgroundColor: '#FFF1D5',
    borderRadius: 20,
    padding: 24,
    borderWidth: 0,
    width: '100%',
    marginTop: 24,
    marginBottom: 32,
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  summaryHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  summaryIcon: { fontSize: 20, marginRight: 8 },
  summaryTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A', flex: 1 },
  summaryLink: { fontSize: 13, color: '#9FB3DF', fontWeight: '700', letterSpacing: -0.2 },
  summaryBody: { gap: 8 },
  summaryText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  primaryBtn: {
    backgroundColor: '#9FB3DF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9FB3DF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
    alignSelf: 'stretch',
    marginTop: 0,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: -0.3 },
});

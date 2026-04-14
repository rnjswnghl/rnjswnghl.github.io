import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fastapiGetEvaluationHistory, EvaluationHistorySession, EvaluationHistoryResponse } from '../config/api';
import { useAuthStore } from '../store/auth';

type SortKey = 'latest' | 'score';

type FeedbackItem = {
  id: string;
  timestamp: number;
  date: string;
  categoryTitle: string;
  type: string;
  totalScore: number;
  text: string;
  sessionId?: number;
};

function convertSessionToFeedbackItem(session: EvaluationHistorySession, index?: number): FeedbackItem {
  const generatedAt = session.generated_at || '';
  const timestamp = generatedAt ? new Date(generatedAt).getTime() : Date.now();
  
  const dateStr = generatedAt 
    ? new Date(generatedAt).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];
  
  const categoryTitle = '학습';
  
  const totalScore = session.overall_score || session.overall?.average_scores?.total || 0;
  
  let feedbackText = session.comprehensive_feedback || '';
  if (!feedbackText) {
    if (totalScore >= 90) {
      feedbackText = '훌륭한 발음입니다! 계속 이렇게 연습하세요.';
    } else if (totalScore >= 80) {
      feedbackText = '좋은 발음입니다. 조금만 더 연습하면 완벽해질 거예요.';
    } else if (totalScore >= 70) {
      feedbackText = '꾸준히 연습하면 더 좋아질 거예요. 화이팅!';
    } else {
      feedbackText = '기초를 다지고 반복 연습하세요.';
    }
  }
  
  const result = {
    id: `session_${session.session_id || Date.now()}_${index || 0}`,
    timestamp,
    date: dateStr,
    categoryTitle,
    type: '표준어',
    totalScore: Math.round(totalScore),
    text: feedbackText,
    sessionId: session.session_id,
  };
  
  return result;
}

const getCacheKey = (userId: string): string => {
  return `evaluation_history:${userId}`;
};

const loadCachedData = async (userId: string): Promise<{ data: EvaluationHistoryResponse; timestamp: number } | null> => {
  try {
    const cacheKey = getCacheKey(userId);
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      return parsed;
    }
  } catch (error) {
  }
  return null;
};

const saveToCache = async (userId: string, data: EvaluationHistoryResponse): Promise<void> => {
  try {
    const cacheKey = getCacheKey(userId);
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
  }
};

export const invalidateEvaluationHistoryCache = async (userId: string): Promise<void> => {
  try {
    const cacheKey = getCacheKey(userId);
    await AsyncStorage.removeItem(cacheKey);
  } catch (error) {
  }
};

export default function AIFeedbackScreen() {
  const [sort, setSort] = useState<SortKey>('latest');
  const [ddOpen, setDdOpen] = useState(false);
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionsMap, setSessionsMap] = useState<Map<number, EvaluationHistorySession>>(new Map());
  const user = useAuthStore((s) => s.user);
  const userId = user?.userId || (user?.id != null ? String(user.id) : '');
  const evaluationHistoryRequestedRef = useRef<string | null>(null);

  const applyDataToState = (responseData: EvaluationHistoryResponse, cancelled: boolean) => {
    if (cancelled) return;
    
    if (responseData && responseData.data && Array.isArray(responseData.data)) {
      const uniqueSessionsMap = new Map<number, EvaluationHistorySession>();
      responseData.data.forEach((session) => {
        if (session.session_id !== undefined && session.session_id !== null) {
          const existing = uniqueSessionsMap.get(session.session_id);
          if (!existing) {
            uniqueSessionsMap.set(session.session_id, session);
          } else {
            const existingDate = existing.generated_at ? new Date(existing.generated_at).getTime() : 0;
            const currentDate = session.generated_at ? new Date(session.generated_at).getTime() : 0;
            if (currentDate > existingDate) {
              uniqueSessionsMap.set(session.session_id, session);
            }
          }
        }
      });
      
      const uniqueSessions = Array.from(uniqueSessionsMap.values());
      
      const convertedItems = uniqueSessions.map((session, index) => {
        return convertSessionToFeedbackItem(session, index);
      });
      
      setItems(convertedItems);
      
      const newSessionsMap = new Map<number, EvaluationHistorySession>();
      uniqueSessions.forEach((session) => {
        if (session.session_id) {
          newSessionsMap.set(session.session_id, session);
        }
      });
      setSessionsMap(newSessionsMap);
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const fetchFeedbacks = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      if (evaluationHistoryRequestedRef.current === userId) {
        return;
      }
      evaluationHistoryRequestedRef.current = userId;

      const startTime = Date.now();
      
      const cached = await loadCachedData(userId);
      if (cached && cached.data && cached.data.data && Array.isArray(cached.data.data) && cached.data.data.length > 0) {
        applyDataToState(cached.data, cancelled);
        setLoading(false);
        
        const cacheAge = Date.now() - cached.timestamp;
        const CACHE_MAX_AGE = 5 * 60 * 1000;
        if (cacheAge < CACHE_MAX_AGE) {
          return;
        }
      }
      
      try {
        if (!cached) {
          setLoading(true);
        }
        
        const requestParams = {
          limit: 50,
          offset: 0,
        };
        
        const { ok, data: responseData, status, raw } = await fastapiGetEvaluationHistory(requestParams);
        
        const elapsed = Date.now() - startTime;
        
        if (ok && responseData && responseData.data && Array.isArray(responseData.data)) {
          if (!cancelled) {
            applyDataToState(responseData, cancelled);
            await saveToCache(userId, responseData);
          }
        } else {
          if (!cancelled) {
            setItems([]);
          }
        }
      } catch (error: any) {
        const elapsed = Date.now() - startTime;
        
        if (!cancelled) {
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          const totalElapsed = Date.now() - startTime;
        }
      }
    };
    fetchFeedbacks();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const sorted = useMemo(() => {
    const c = [...items];
    if (sort === 'latest') {
      return c.sort((a, b) => b.timestamp - a.timestamp);
    } else {
      return c.sort((a, b) => b.totalScore - a.totalScore);
    }
  }, [items, sort]);

  return (
    <View style={styles.container}>
      <View style={styles.dropdownRow}>
        <Dropdown
          value={sort}
          open={ddOpen}
          onToggle={() => setDdOpen((v) => !v)}
          onChange={(v) => {
            setSort(v);
            setDdOpen(false);
          }}
          options={[
            { label: '최신순', value: 'latest' },
            { label: '점수 높은 순', value: 'score' },
          ]}
        />
      </View>

      {ddOpen ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setDdOpen(false)}
          style={styles.overlay}
        />
      ) : null}

      {loading ? (
        <View style={styles.emptyState}>
          <Ionicons name="hourglass-outline" size={32} color="#9FB3DF" />
          <Text style={styles.emptyText}>로딩 중...</Text>
        </View>
      ) : sorted.length === 0 ? (
        <View style={{ paddingVertical: 40, alignItems: 'center' }}>
          <Text style={{ color: '#6B7280', fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
            아직 학습 이력이 없습니다
          </Text>
          <Text style={{ color: '#9CA3AF', fontSize: 14, textAlign: 'center', paddingHorizontal: 20 }}>
            표준 억양 학습을 완료하면{'\n'}AI 피드백을 확인할 수 있습니다
          </Text>
        </View>
      ) : (
        sorted.map((f) => (
          <FeedbackCard
            key={f.id}
            date={f.date}
            title={`${f.type} · ${f.categoryTitle}`}
            score={f.totalScore}
            text={f.text}
            sessionId={f.sessionId}
            sessionData={f.sessionId ? sessionsMap.get(f.sessionId) : undefined}
          />
        ))
      )}
    </View>
  );
}

function Dropdown<T extends string>({ value, onChange, options, open, onToggle }: { value: T; onChange: (v: T) => void; options: { label: string; value: T }[]; open: boolean; onToggle: () => void }) {
  const current = options.find((o) => o.value === value);
  return (
    <View style={styles.ddWrap}>
      <TouchableOpacity style={styles.ddBtn} activeOpacity={0.9} onPress={onToggle}>
        <Text style={styles.ddBtnLabel}>{current?.label ?? ''}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={16} color="#111827" />
      </TouchableOpacity>
      {open ? (
        <View style={styles.ddMenu}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              activeOpacity={0.9}
              style={styles.ddItem}
              onPress={() => onChange(opt.value)}
            >
              <Text style={[styles.ddItemLabel, value === opt.value && styles.ddItemActive]}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function FeedbackCard({ date, title, score, text, sessionId, sessionData }: { date: string; title: string; score: number; text: string; sessionId?: number; sessionData?: EvaluationHistorySession }) {
  const router = useRouter();
  
  const handlePress = () => {
    if (sessionId) {
      const params: Record<string, string> = {
        session_id: String(sessionId),
      };
      
      if (sessionData) {
        params.session_data = JSON.stringify(sessionData);
      }
      
      router.push({
        pathname: '/learn/feedback',
        params,
      });
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.mute}>{date}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <Text style={styles.score}>{score}</Text>
      </View>
      <Text style={styles.cardText}>{text}</Text>
      <View style={styles.progressBg}>
        <View style={[styles.progressBar, { width: `${score}%` }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { 
    position: 'relative',
  },
  dropdownRow: { 
    justifyContent: 'flex-end', 
    marginBottom: 16,
    zIndex: 100,
  },
  
  feedbackList: {
  },
  
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 0,
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    marginTop: 12,
  },
  cardFirst: {
    marginTop: 0,
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  mute: { 
    color: '#475569',
    fontSize: 12,
    fontWeight: '500',
  },
  cardTitle: { 
    color: '#0F172A', 
    fontWeight: '700', 
    fontSize: 15,
    marginTop: 4,
    lineHeight: 20,
  },
  score: { 
    color: '#9FB3DF', 
    fontWeight: '800', 
    fontSize: 24,
    marginLeft: 12,
  },
  cardText: { 
    color: '#475569', 
    marginTop: 12, 
    lineHeight: 22,
    fontSize: 14,
  },
  progressBg: { 
    marginTop: 16, 
    height: 8, 
    backgroundColor: '#F3F4F6', 
    borderRadius: 999, 
    overflow: 'hidden',
  },
  progressBar: { 
    height: '100%', 
    backgroundColor: '#9FB3DF',
    borderRadius: 999,
  },
  
  ddWrap: { 
    position: 'relative', 
    zIndex: 100,
    alignSelf: 'flex-end',
  },
  ddBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: 'rgba(0,0,0,0.08)',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  ddBtnLabel: { 
    color: '#0F172A', 
    fontWeight: '600', 
    fontSize: 14,
    marginRight: 8,
  },
  ddMenu: { 
    position: 'absolute', 
    top: 48, 
    right: 0, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: 'rgba(0,0,0,0.08)', 
    shadowColor: '#9FB3DF', 
    shadowOpacity: 0.15, 
    shadowRadius: 12, 
    elevation: 8, 
    zIndex: 1000, 
    overflow: 'hidden',
    minWidth: 140,
  },
  ddItem: { 
    paddingHorizontal: 16, 
    paddingVertical: 12,
  },
  ddItemLabel: { 
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '500',
  },
  ddItemActive: { 
    fontWeight: '700', 
    color: '#9FB3DF',
  },
  overlay: { 
    position: 'absolute', 
    left: 0, 
    top: 0, 
    right: 0, 
    bottom: 0, 
    zIndex: 90,
  },
  
  emptyState: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#475569',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyText: {
    color: '#475569',
    fontSize: 14,
    marginTop: 12,
  },
});

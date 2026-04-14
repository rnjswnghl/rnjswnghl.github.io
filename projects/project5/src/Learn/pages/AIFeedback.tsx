import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AppHeader from '@/components/UI/AppHeader';
import { LessonMode } from '../types';
import { FeedbackData } from '../types/feedbackTypes';
import { parseDetailedFeedback } from '../utils/feedbackUtils';
import OverallFeedbackTab from '../components/ai-feedback/OverallFeedbackTab';
import DetailedFeedbackTab from '../components/ai-feedback/DetailedFeedbackTab';
import { fastapiComprehensiveFeedback, ComprehensiveFeedbackResponse, EvaluationHistorySession } from '../../config/api';
import { useAuthStore } from '../../store/auth';

export default function AIFeedback() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    mode?: string;
    scriptCount?: string;
    recordedCount?: string;
    evaluationResults?: string;
    instantFeedbacks?: string;
    scripts?: string;
    session_id?: string;
    session_data?: string; // 저장된 세션 데이터 (JSON 문자열)
  }>();

  const user = useAuthStore((s) => s.user);
  const userId = user?.userId || (user?.id != null ? String(user.id) : '');

  const mode: LessonMode = (params.mode === 'paragraph' ? 'paragraph' : 'sentence');
  const scriptCount = params.scriptCount ? parseInt(params.scriptCount, 10) : 5;
  const recordedCount = params.recordedCount ? parseInt(params.recordedCount, 10) : 0;
  const sessionId = params.session_id || '1';
  
  const [selectedTab, setSelectedTab] = useState<'전체' | number>('전체');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comprehensiveFeedbackData, setComprehensiveFeedbackData] = useState<ComprehensiveFeedbackResponse | null>(null);
  
  const maxTabs = useMemo(() => {
    if (comprehensiveFeedbackData?.detailed && comprehensiveFeedbackData.detailed.length > 0) {
      return Math.min(5, Math.max(1, comprehensiveFeedbackData.detailed.length));
    }
    return Math.min(5, Math.max(1, scriptCount));
  }, [comprehensiveFeedbackData, scriptCount]);

  const convertSessionToComprehensiveFeedback = useMemo(() => {
    return (session: EvaluationHistorySession): ComprehensiveFeedbackResponse => {
      const averageScores: { [key: string]: number; total: number } = {
        total: session.overall?.average_scores?.total || session.overall_score || 0,
      };
      
      if (session.overall?.average_scores) {
        Object.keys(session.overall.average_scores).forEach((key) => {
          const value = session.overall!.average_scores![key as keyof typeof session.overall.average_scores];
          if (value !== undefined && typeof value === 'number') {
            averageScores[key] = value;
          }
        });
      }

      return {
        status: 'success',
        user_id: userId || '',
        session_id: session.session_id || 0,
        comprehensive_feedback: session.comprehensive_feedback || '',
        overall_score: session.overall_score || 0,
        overall: {
          average_scores: averageScores,
          improvement: {
            score_change: session.overall?.improvement?.score_change || 0,
            trend: (session.overall?.improvement?.trend === '개선' ? '개선' : 
                   session.overall?.improvement?.trend === '악화' ? '악화' : '유지') as '개선' | '유지' | '악화',
          },
          summary_feedback: session.overall?.summary_feedback || '',
        },
        detailed: session.detailed?.map((item) => {
          return {
            recording_num: item.recording_num || 0,
            script: item.script || '',
            script_id: item.script_id,
            scores: {
              ...item.scores,
              total: item.scores?.total || 0,
            },
            detailed_feedback: item.detailed_feedback || '',
            reference_audio: item.reference_audio,
            user_recording: item.user_recording,
          };
        }) || [],
        suggestions: session.suggestions || [],
        strengths: session.strengths || [],
        improvement_areas: session.improvement_areas || [],
      };
    };
  }, [userId]);

  useEffect(() => {
    const fetchComprehensiveFeedback = async () => {
      if (params.session_data) {
        try {
          const sessionData: EvaluationHistorySession = JSON.parse(params.session_data);
          const convertedData = convertSessionToComprehensiveFeedback(sessionData);
          setComprehensiveFeedbackData(convertedData);
          setLoading(false);
          setError(null);
          return;
        } catch (err: any) {
        }
      }

      if (!userId || !sessionId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const { ok, status, data } = await fastapiComprehensiveFeedback({
          user_id: userId,
          session_id: sessionId,
        });

        if (ok && data) {
          setComprehensiveFeedbackData(data);
        } else {
          setError('종합 피드백을 가져오는데 실패했습니다.');
        }
      } catch (err: any) {
        setError(err?.message || '종합 피드백을 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchComprehensiveFeedback();
  }, [userId, sessionId, params.session_data, convertSessionToComprehensiveFeedback]);

  const evaluationResults = useMemo(() => {
    try {
      return params.evaluationResults ? JSON.parse(params.evaluationResults) : [];
    } catch {
      return [];
    }
  }, [params.evaluationResults]);

  const instantFeedbacks = useMemo(() => {
    try {
      return params.instantFeedbacks ? JSON.parse(params.instantFeedbacks) : [];
    } catch {
      return [];
    }
  }, [params.instantFeedbacks]);

  const scripts = useMemo(() => {
    try {
      return params.scripts ? JSON.parse(params.scripts) : [];
    } catch {
      return [];
    }
  }, [params.scripts]);

  const feedbackData = useMemo<FeedbackData>(() => {
    if (comprehensiveFeedbackData) {
      return {
        overall: {
          average_scores: comprehensiveFeedbackData.overall.average_scores,
          improvement: {
            score_change: comprehensiveFeedbackData.overall.improvement.score_change,
            trend: comprehensiveFeedbackData.overall.improvement.trend === '악화' ? '저하' : 
                   comprehensiveFeedbackData.overall.improvement.trend === '개선' ? '개선' : '유지',
          },
          summary_feedback: comprehensiveFeedbackData.overall.summary_feedback,
        },
        detailed: comprehensiveFeedbackData.detailed.map(item => {
          return {
            recording_num: item.recording_num,
            script: item.script || '',
            scores: item.scores,
            detailed_feedback: item.detailed_feedback || '',
            reference_audio: item.reference_audio,
            user_recording: item.user_recording,
            analysis: (item as any).analysis,
          };
        }),
      };
    }

    if (evaluationResults.length === 0 && instantFeedbacks.length === 0) {
      return {
        overall: {
          average_scores: {
            total: 0,
          } as any,
          improvement: {
            score_change: 0,
            trend: '유지' as const,
          },
          summary_feedback: '피드백 데이터가 없습니다.',
        },
        detailed: [],
      };
    }

    const detailed = evaluationResults.map((evalResult: any, index: number) => {
      const scriptId = evalResult.scriptId || (index + 1);
      const script = scripts.find((s: any) => s.id === scriptId) || scripts[index] || { text: '' };
      const instantFeedback = instantFeedbacks.find((fb: any) => fb.scriptId === scriptId);
      
      const scores = evalResult.scores || {};
      const totalScore = evalResult.total_score || 
        (scores['1_wer_per'] || 0) * 0.1 + 
        (scores['2_clarity'] || 0) * 0.1 + 
        (scores['3_rules'] || 0) * 0.1 +
        (scores['4_pitch'] || 0) * 0.1 +
        (scores['5_stress'] || 0) * 0.1 +
        (scores['6_ending'] || 0) * 0.1 +
        (scores['7_speech_rate'] || 0) * 0.1 +
        (scores['8_pause'] || 0) * 0.1 +
        (scores['9_rhythm'] || 0) * 0.1;

      return {
        recording_num: index + 1,
        script: script.text || '',
        scores: {
          ...scores,
          total: totalScore,
        },
        detailed_feedback: instantFeedback?.feedback || '피드백을 생성하는 중입니다...',
      };
    });

    const totalScores = detailed.map((d: { scores: { total: number } }) => d.scores.total);
    const avgTotal = totalScores.length > 0 
      ? totalScores.reduce((a: number, b: number) => a + b, 0) / totalScores.length 
      : 0;

    const avgScores = detailed.length > 0 
      ? detailed.reduce((acc: Record<string, number>, item: { scores: Record<string, number> }) => {
          Object.keys(item.scores).forEach(key => {
            if (key !== 'total') {
              acc[key] = (acc[key] || 0) + (item.scores[key] || 0);
            }
          });
          return acc;
        }, {} as Record<string, number>)
      : {};

    if (detailed.length > 0) {
      Object.keys(avgScores).forEach(key => {
        avgScores[key] = avgScores[key] / detailed.length;
      });
    }

    return {
      overall: {
        average_scores: {
          ...avgScores,
          total: avgTotal,
        } as any,
        improvement: {
          score_change: 0,
          trend: '유지' as const,
        },
        summary_feedback: `전체적으로 ${avgTotal.toFixed(1)}점의 점수를 받았습니다.`,
      },
      detailed,
    };
  }, [comprehensiveFeedbackData, evaluationResults, instantFeedbacks, scripts]);
  
  const hasRecordings = feedbackData.detailed && feedbackData.detailed.length > 0;
  
  const currentItem = useMemo(() => {
    if (selectedTab === '전체') return null;
    return feedbackData.detailed.find(item => item.recording_num === selectedTab);
  }, [selectedTab, feedbackData]);

  const parsedFeedback = useMemo(() => {
    if (!currentItem) return null;
    return parseDetailedFeedback(currentItem.detailed_feedback);
  }, [currentItem]);

  const handlePracticeAgain = () => {
    router.push('/learn');
  };


  const tabs = useMemo(() => {
    const prefix = mode === 'sentence' ? '문장' : '문단';
    const tabList: ('전체' | number)[] = ['전체'];
    const actualCount = comprehensiveFeedbackData?.detailed?.length || maxTabs;
    const countToUse = Math.min(5, Math.max(1, actualCount));
    for (let i = 1; i <= countToUse; i++) {
      tabList.push(i);
    }
    return { tabList, prefix };
  }, [mode, maxTabs, comprehensiveFeedbackData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner} showsVerticalScrollIndicator={false}>
        <AppHeader />

        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
            {tabs.tabList.map((tab) => (
              <Pressable
                key={tab}
                style={[styles.tab, selectedTab === tab && styles.tabActive]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                  {tab === '전체' ? '전체' : `${tabs.prefix} ${tab}`}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#9FB3DF" />
            <Text style={styles.loadingText}>종합 피드백을 생성하는 중...</Text>
          </View>
        ) : error ? (
          <View style={styles.noRecordingContainer}>
            <MaterialCommunityIcons name="alert-circle" size={48} color="#DC2626" />
            <Text style={styles.noRecordingText}>{error}</Text>
          </View>
        ) : !hasRecordings ? (
          <View style={styles.noRecordingContainer}>
            <MaterialCommunityIcons name="microphone-off" size={48} color="#9CA3AF" />
            <Text style={styles.noRecordingText}>녹음된 내용이 없습니다</Text>
          </View>
        ) : selectedTab === '전체' ? (
          <OverallFeedbackTab 
            overall={feedbackData.overall} 
            comprehensiveFeedback={comprehensiveFeedbackData?.comprehensive_feedback}
            comprehensiveData={comprehensiveFeedbackData}
          />
        ) : currentItem && parsedFeedback ? (
          <DetailedFeedbackTab
            recordingNum={selectedTab}
            item={currentItem}
            parsedFeedback={parsedFeedback}
          />
        ) : (
          <View style={styles.noRecordingContainer}>
            <MaterialCommunityIcons name="information-outline" size={48} color="#9CA3AF" />
            <Text style={styles.noRecordingText}>해당 {mode === 'sentence' ? '문장' : '문단'}에 대한 피드백이 없습니다</Text>
          </View>
        )}

        <View style={styles.actionButtons}>
          <Pressable style={[styles.actionButton, styles.secondaryButton]} onPress={handlePracticeAgain}>
            <MaterialCommunityIcons name="repeat" size={18} color="#9FB3DF" />
            <Text style={[styles.actionButtonText, { color: '#9FB3DF' }]}>다시 연습하기</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  inner: { paddingHorizontal: 24, paddingBottom: 40, paddingTop: 20 },
  actionButtons: { flexDirection: 'row', gap: 16, marginTop: 40, justifyContent: 'center' },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    minWidth: 180,
  },
  primaryButton: { 
    backgroundColor: '#9FB3DF',
    shadowColor: '#9FB3DF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  secondaryButton: { 
    backgroundColor: '#FFF1D5', 
    borderWidth: 1.5,
    borderColor: '#9EC6F3',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  actionButtonText: { fontSize: 17, fontWeight: '700', letterSpacing: -0.3 },
  tabContainer: {
    marginTop: 24,
    marginBottom: 20,
  },
  tabScrollContent: {
    gap: 12,
    paddingRight: 24,
    paddingLeft: 24,
  },
  tab: {
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 16,
    backgroundColor: '#FFF1D5',
    borderWidth: 1.5,
    borderColor: '#9EC6F3',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  tabActive: {
    backgroundColor: '#9EC6F3',
    borderColor: '#9EC6F3',
    shadowColor: '#9EC6F3',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: -0.2,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  noRecordingContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  noRecordingText: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  loadingContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  loadingText: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    textAlign: 'center',
    letterSpacing: -0.2,
    lineHeight: 26,
  },
});


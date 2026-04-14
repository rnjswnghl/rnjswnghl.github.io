import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card } from '@/components/UI/Card';
import { OverallData } from '../../types/feedbackTypes';
import { getScoreColor, getScoreLabel } from '../../utils/feedbackUtils';
import { ComprehensiveFeedbackResponse } from '../../../config/api';

type OverallFeedbackTabProps = {
  overall: OverallData;
  comprehensiveFeedback?: string;
  comprehensiveData?: ComprehensiveFeedbackResponse | null;
};

function getLevelLabel(score: number): string {
  if (score >= 90) return '상급';
  if (score >= 80) return '중급';
  if (score >= 70) return '초급';
  return '입문';
}

function getScoreColorWithOpacity(score: number, opacity: number = 0.1): string {
  const color = getScoreColor(score);
  
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

type CategoryItem = {
  key: string;
  label: string;
  weight: number;
  optional?: boolean;
};

function getCategoryMapping(): Record<string, { weight: number; items: CategoryItem[] }> {
  return {
    '분절적 정확성': {
      weight: 40,
      items: [
        { key: '1_wer_per', label: '음소/음절 인지용', weight: 15 },
        { key: '3_pronunciation_rules', label: '발음 규칙 적용 정확도', weight: 15 },
        { key: '2_clarity', label: '발음 선명도 및 명료성', weight: 10 },
      ],
    },
    '초분절적 운율': {
      weight: 40,
      items: [
        { key: '4_tone', label: '음질 피치 패턴 유사도', weight: 15 },
        { key: '7_intonation', label: '단어/구 강조 일치도', weight: 10 },
        { key: '6_rhythm', label: '문장 종결 억양 적절성', weight: 10 },
        { key: '9_articulation', label: '피치 절대 높이', weight: 5 },
      ],
    },
    '발화 유창성 및 흐름': {
      weight: 20,
      items: [
        { key: '5_speed', label: '발화 속도 인지도', weight: 8 },
        { key: '8_fluency', label: '휴지 위치 및 길이', weight: 7 },
        { key: '6_rhythm', label: '음절 저속 시간 균형성', weight: 3, optional: true },
        { key: '8_fluency', label: '호흡 처리', weight: 2, optional: true },
      ],
    },
  };
}

export default function OverallFeedbackTab({ overall, comprehensiveFeedback, comprehensiveData }: OverallFeedbackTabProps) {
  const totalScore = overall.average_scores.total;
  const levelLabel = getLevelLabel(totalScore);
  const categoryMapping = getCategoryMapping();
  
  
  const categoryScores: Record<string, number> = {};
  Object.entries(categoryMapping).forEach(([categoryName, category]) => {
    const validItems = category.items.filter(item => overall.average_scores[item.key] !== undefined);
    if (validItems.length > 0) {
      const avgScore = validItems.reduce((sum, item) => {
        const score = overall.average_scores[item.key] || 0;
        return sum + (score * item.weight / 100);
      }, 0);
      categoryScores[categoryName] = Math.round(avgScore);
    }
  });
  
  return (
    <>
      {}
      <Card className="mt-3" style={{ marginTop: 20 }}>
        <View style={styles.totalScoreCard}>
          <View style={styles.totalScoreHeader}>
            <Text style={styles.totalScoreLabel}>총점</Text>
            <View style={styles.scoreRow}>
              <View style={styles.scoreBadge}>
                <Text style={[styles.totalScoreLarge, { color: getScoreColor(totalScore) }]}>
                  {Math.round(totalScore)}
                </Text>
                <Text style={styles.totalScoreUnit}>점</Text>
              </View>
              <View style={[styles.levelBadge, { backgroundColor: getScoreColorWithOpacity(totalScore, 0.15) }]}>
                <Text style={[styles.levelLabel, { color: getScoreColor(totalScore) }]}>{levelLabel}</Text>
              </View>
            </View>
          </View>
          <View style={styles.summaryContainer}>
            <Text style={styles.totalScoreMessage}>{overall.summary_feedback}</Text>
          </View>
        </View>
      </Card>

      {}
      {Object.entries(categoryMapping).map(([categoryName, category]) => {
        const categoryScore = categoryScores[categoryName];
        if (!categoryScore) return null;
        
        return (
          <Card key={categoryName} className="mt-3" style={{ marginTop: 20 }}>
            <View style={styles.detailScoreCard}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{categoryName}</Text>
                <View style={styles.categoryScoreRow}>
                  <Text style={[styles.categoryScore, { color: getScoreColor(categoryScore) }]}>
                    {categoryScore}점
                  </Text>
                  <Text style={styles.categoryWeight}>가중치: {category.weight}%</Text>
                </View>
              </View>
              <View style={styles.metricsGrid}>
                {category.items
                  .filter(item => !item.optional || overall.average_scores[item.key] !== undefined)
                  .map((item, idx) => {
                    const score = overall.average_scores[item.key];
                    if (score === undefined) return null;
                    return (
                      <View key={`${item.key}-${idx}`} style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                          <Text style={styles.metricLabel}>{item.label}</Text>
                          <Text style={styles.metricWeight}>({item.weight}%)</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                          <View style={styles.progressBarTrack}>
                            <View style={[styles.progressBarFill, { width: `${score}%`, backgroundColor: getScoreColor(score) }]} />
                          </View>
                          <Text style={styles.progressBarPercent}>{Math.round(score)}%</Text>
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>
          </Card>
        );
      })}

      {}
      {(comprehensiveData?.strengths || comprehensiveData?.improvement_areas || comprehensiveData?.suggestions) && (
        <Card className="mt-3" style={{ marginTop: 20 }}>
          <View style={styles.comprehensiveFeedbackCard}>
            <View style={styles.comprehensiveFeedbackHeader}>
              <View style={styles.iconBadge}>
                <MaterialCommunityIcons name="message-text-outline" size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.cardTitle}>종합 피드백</Text>
            </View>
            
            {comprehensiveData.strengths && comprehensiveData.strengths.length > 0 && (
              <View style={styles.feedbackSection}>
                <View style={styles.feedbackSectionHeader}>
                  <View style={[styles.statusBadge, { backgroundColor: '#D1FAE5' }]}>
                    <MaterialCommunityIcons name="thumb-up" size={18} color="#10B981" />
                  </View>
                  <Text style={styles.feedbackSectionTitle}>잘한 점</Text>
                </View>
                {comprehensiveData.strengths.map((item, idx) => (
                  <Text key={idx} style={styles.feedbackItem}>• {item}</Text>
                ))}
              </View>
            )}
            
            {comprehensiveData.improvement_areas && comprehensiveData.improvement_areas.length > 0 && (
              <View style={styles.feedbackSection}>
                <View style={styles.feedbackSectionHeader}>
                  <View style={[styles.statusBadge, { backgroundColor: '#FEF3C7' }]}>
                    <MaterialCommunityIcons name="cog" size={18} color="#F59E0B" />
                  </View>
                  <Text style={styles.feedbackSectionTitle}>개선점</Text>
                </View>
                {comprehensiveData.improvement_areas.map((item, idx) => (
                  <Text key={idx} style={styles.feedbackItem}>• {item}</Text>
                ))}
              </View>
            )}
            
            {comprehensiveData.suggestions && comprehensiveData.suggestions.length > 0 && (
              <View style={styles.feedbackSection}>
                <View style={styles.feedbackSectionHeader}>
                  <View style={[styles.statusBadge, { backgroundColor: '#DBEAFE' }]}>
                    <MaterialCommunityIcons name="lightbulb" size={18} color="#3B82F6" />
                  </View>
                  <Text style={styles.feedbackSectionTitle}>다음 학습 추천</Text>
                </View>
                {comprehensiveData.suggestions.map((item, idx) => (
                  <Text key={idx} style={styles.feedbackItem}>• {item}</Text>
                ))}
              </View>
            )}
          </View>
        </Card>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  totalScoreCard: { 
    backgroundColor: '#FFF1D5', 
    borderRadius: 28, 
    padding: 32, 
    borderWidth: 0, 
    shadowColor: '#9FB3DF', 
    shadowOpacity: 0.2, 
    shadowRadius: 28, 
    shadowOffset: { width: 0, height: 12 }, 
    elevation: 12,
  },
  totalScoreHeader: { marginBottom: 24 },
  totalScoreLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  scoreRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 18, 
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  totalScoreLarge: { 
    fontSize: 56, 
    fontWeight: '900', 
    letterSpacing: -1.5,
  },
  totalScoreUnit: {
    fontSize: 22,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  levelBadge: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  levelLabel: { 
    fontSize: 18, 
    fontWeight: '700', 
    letterSpacing: -0.3,
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTitle: { 
    fontSize: 21, 
    fontWeight: '800', 
    color: '#0F172A', 
    letterSpacing: -0.5,
    flex: 1,
  },
  totalScoreMessage: {
    fontSize: 16,
    fontWeight: '400',
    color: '#475569',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#9EC6F3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9EC6F3',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  statusBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailScoreCard: { 
    backgroundColor: '#FFF1D5', 
    borderRadius: 28, 
    padding: 32, 
    borderWidth: 0, 
    shadowColor: '#9FB3DF', 
    shadowOpacity: 0.2, 
    shadowRadius: 28, 
    shadowOffset: { width: 0, height: 12 }, 
    elevation: 12,
  },
  categoryHeader: { marginBottom: 28 },
  categoryTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#0F172A', 
    marginBottom: 14, 
    letterSpacing: -0.5,
  },
  categoryScoreRow: { 
    flexDirection: 'row', 
    alignItems: 'baseline', 
    gap: 16,
  },
  categoryScore: { 
    fontSize: 24, 
    fontWeight: '800', 
    letterSpacing: -0.6,
  },
  categoryWeight: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#64748B', 
    letterSpacing: -0.2,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  metricsGrid: { gap: 16 },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  metricHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 14,
  },
  metricLabel: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#0F172A', 
    flex: 1, 
    letterSpacing: -0.2,
  },
  metricWeight: { 
    fontSize: 13, 
    fontWeight: '500', 
    color: '#64748B', 
    letterSpacing: -0.1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  progressBarContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16,
  },
  progressBarTrack: { 
    flex: 1, 
    height: 12, 
    backgroundColor: '#E2E8F0', 
    borderRadius: 6, 
    overflow: 'hidden',
  },
  progressBarFill: { 
    height: '100%', 
    borderRadius: 6,
  },
  progressBarPercent: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#64748B', 
    minWidth: 44, 
    textAlign: 'right', 
    letterSpacing: -0.1,
  },
  comprehensiveFeedbackCard: { 
    backgroundColor: '#FFF1D5', 
    borderRadius: 28, 
    padding: 32, 
    borderWidth: 0, 
    shadowColor: '#9FB3DF', 
    shadowOpacity: 0.2, 
    shadowRadius: 28, 
    shadowOffset: { width: 0, height: 12 }, 
    elevation: 12,
  },
  comprehensiveFeedbackHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16, 
    marginBottom: 28,
  },
  feedbackSection: { marginBottom: 28 },
  feedbackSectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    marginBottom: 16,
  },
  feedbackSectionTitle: { 
    fontSize: 19, 
    fontWeight: '700', 
    color: '#0F172A', 
    letterSpacing: -0.4,
  },
  feedbackItem: { 
    fontSize: 16, 
    fontWeight: '400', 
    color: '#475569', 
    lineHeight: 26, 
    marginBottom: 12, 
    letterSpacing: -0.2,
    paddingLeft: 4,
  },
});

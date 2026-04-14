import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card } from '@/components/UI/Card';
import { DetailedItem, ParsedFeedback } from '../../types/feedbackTypes';
import { getScoreColor, parseMarkdownFeedbackStructure } from '../../utils/feedbackUtils';
import StructuredFeedbackRenderer from './StructuredFeedbackRenderer';

type DetailedFeedbackTabProps = {
  recordingNum: number;
  item: DetailedItem;
  parsedFeedback: ParsedFeedback;
};

export default function DetailedFeedbackTab({ recordingNum, item, parsedFeedback }: DetailedFeedbackTabProps) {

  
  const isMarkdownFormat = item.detailed_feedback && (
    item.detailed_feedback.includes('##') || 
    item.detailed_feedback.includes('###') ||
    item.detailed_feedback.includes('**')
  );

  const structuredFeedback = useMemo(() => {
    if (!item.detailed_feedback) return null;
    const trimmed = item.detailed_feedback.trim();

    if (!trimmed || !/^[\[{]/.test(trimmed)) {
      const markdownStructured = parseMarkdownFeedbackStructure(trimmed);
      return markdownStructured;
    }

    try {
      const parsed = JSON.parse(trimmed);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (error) {
      return null;
    }
  }, [item.detailed_feedback]);

  return (
    <>
      <Card className="mt-3" style={{ marginTop: 20 }}>
        <View style={styles.detailHeaderCard}>
          <View style={styles.detailHeaderRow}>
            <View style={styles.iconBadge}>
              <MaterialCommunityIcons name="microphone" size={22} color="#FFFFFF" />
            </View>
            <Text style={styles.detailHeaderTitle}>{recordingNum}번 녹음 상세 피드백</Text>
          </View>
          <View style={styles.detailScoreHeader}>
            <View style={styles.scoreBadge}>
              <Text style={[styles.detailTotalScore, { color: getScoreColor(item.scores.total) }]}>
                {item.scores.total.toFixed(1)}
              </Text>
              <Text style={styles.detailTotalScoreUnit}>점</Text>
            </View>
          </View>
          {item.script && (
            <View style={styles.scriptContainer}>
              <Text style={styles.detailScript}>{item.script}</Text>
            </View>
          )}
        </View>
      </Card>

      {}
      {structuredFeedback ? (
        <StructuredFeedbackRenderer data={structuredFeedback} />
      ) : isMarkdownFormat ? (
        <Card className="mt-3" style={{ marginTop: 20 }}>
          <View style={styles.feedbackBox}>
            <View style={styles.feedbackHeader}>
              <View style={styles.iconBadgeSmall}>
                <MaterialCommunityIcons name="file-document-outline" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.feedbackTitle}>상세 피드백</Text>
            </View>
            <Text style={styles.markdownText}>{item.detailed_feedback}</Text>
          </View>
        </Card>
      ) : parsedFeedback.syllableAnalysis.length > 0 && (
        <Card className="mt-3" style={{ marginTop: 20 }}>
          <View style={styles.feedbackBox}>
            <View style={styles.feedbackHeader}>
              <View style={styles.iconBadgeSmall}>
                <MaterialCommunityIcons name="format-list-bulleted" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.feedbackTitle}>음절별 분석</Text>
            </View>
            <View style={styles.syllableList}>
              {parsedFeedback.syllableAnalysis.map((analysis, idx) => (
                <View key={idx} style={styles.syllableItem}>
                  <Text style={styles.syllableText}>{analysis}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      )}

      {(parsedFeedback.overallAnalysis.best.length > 0 || parsedFeedback.overallAnalysis.needsImprovement.length > 0) && (
        <Card className="mt-3" style={{ marginTop: 20 }}>
          <View style={styles.feedbackBox}>
            <View style={styles.feedbackHeader}>
              <View style={styles.iconBadgeSmall}>
                <MaterialCommunityIcons name="chart-bar" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.feedbackTitle}>종합 분석</Text>
            </View>
            
            {parsedFeedback.overallAnalysis.best.length > 0 && (
              <View style={styles.analysisSection}>
                <View style={styles.analysisSectionHeader}>
                  <View style={[styles.statusBadge, { backgroundColor: '#D1FAE5' }]}>
                    <MaterialCommunityIcons name="check-circle" size={16} color="#10B981" />
                  </View>
                  <Text style={[styles.analysisSectionTitle, { color: '#10B981' }]}>가장 잘한 부분</Text>
                </View>
                {parsedFeedback.overallAnalysis.best.map((item, idx) => (
                  <View key={idx} style={styles.analysisItem}>
                    <Text style={styles.analysisText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

            {parsedFeedback.overallAnalysis.needsImprovement.length > 0 && (
              <View style={styles.analysisSection}>
                <View style={styles.analysisSectionHeader}>
                  <View style={[styles.statusBadge, { backgroundColor: '#FEF3C7' }]}>
                    <MaterialCommunityIcons name="alert-circle" size={16} color="#F59E0B" />
                  </View>
                  <Text style={[styles.analysisSectionTitle, { color: '#F59E0B' }]}>개선이 필요한 부분</Text>
                </View>
                {parsedFeedback.overallAnalysis.needsImprovement.map((item, idx) => (
                  <View key={idx} style={styles.analysisItem}>
                    <Text style={styles.analysisText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Card>
      )}

      {parsedFeedback.improvementMethods.length > 0 && (
        <Card className="mt-3" style={{ marginTop: 20 }}>
          <View style={styles.feedbackBox}>
            <View style={styles.feedbackHeader}>
              <View style={[styles.iconBadgeSmall, { backgroundColor: '#FBBF24' }]}>
                <MaterialCommunityIcons name="lightbulb-on" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.feedbackTitle}>구체적 개선 방법</Text>
            </View>
            <View style={styles.improvementMethodsList}>
              {parsedFeedback.improvementMethods.map((method, idx) => (
                <View key={idx} style={styles.improvementMethodItem}>
                  <View style={styles.methodNumber}>
                    <Text style={styles.methodNumberText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.methodText}>{method}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      )}

      {parsedFeedback.encouragement && (
        <Card className="mt-3" style={{ marginTop: 20 }}>
          <View style={styles.feedbackBox}>
            <View style={styles.feedbackHeader}>
              <View style={[styles.iconBadgeSmall, { backgroundColor: '#FCA5A5' }]}>
                <MaterialCommunityIcons name="heart" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.feedbackTitle}>격려 메시지</Text>
            </View>
            <Text style={styles.encouragementText}>{parsedFeedback.encouragement}</Text>
          </View>
        </Card>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  detailHeaderCard: { 
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
  detailHeaderRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 14, 
    marginBottom: 28,
  },
  iconBadge: {
    width: 40,
    height: 40,
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
  iconBadgeSmall: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#9EC6F3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9EC6F3',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  detailHeaderTitle: { 
    fontSize: 21, 
    fontWeight: '800', 
    color: '#0F172A', 
    letterSpacing: -0.5,
    flex: 1,
  },
  detailScoreHeader: { 
    marginBottom: 24,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  detailTotalScore: { 
    fontSize: 46, 
    fontWeight: '900', 
    letterSpacing: -1.5,
  },
  detailTotalScoreUnit: { 
    fontSize: 20, 
    fontWeight: '600', 
    color: '#64748B', 
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  scriptContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  detailScript: { 
    fontSize: 17, 
    color: '#1E293B', 
    lineHeight: 28, 
    letterSpacing: -0.2,
    fontWeight: '400',
  },
  feedbackBox: { 
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
  feedbackHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 14, 
    marginBottom: 28,
  },
  feedbackTitle: { 
    fontSize: 21, 
    fontWeight: '800', 
    color: '#0F172A', 
    letterSpacing: -0.5,
    flex: 1,
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  syllableList: { gap: 16 },
  syllableItem: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#9EC6F3',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  syllableText: { 
    fontSize: 16, 
    color: '#475569', 
    lineHeight: 26, 
    letterSpacing: -0.15,
    fontWeight: '400',
  },
  analysisSection: { marginBottom: 28 },
  analysisSectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    marginBottom: 18,
  },
  analysisSectionTitle: { 
    fontSize: 19, 
    fontWeight: '700', 
    color: '#0F172A', 
    letterSpacing: -0.4,
  },
  analysisItem: {
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  analysisText: { 
    fontSize: 16, 
    color: '#475569', 
    lineHeight: 26, 
    letterSpacing: -0.15,
    fontWeight: '400',
  },
  improvementMethodsList: { gap: 18 },
  improvementMethodItem: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'flex-start',
  },
  methodNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9FB3DF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  methodNumberText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  methodText: {
    flex: 1,
    fontSize: 16,
    color: '#475569',
    lineHeight: 26,
    letterSpacing: -0.15,
    fontWeight: '400',
    paddingTop: 2,
  },
  encouragementText: {
    fontSize: 17,
    color: '#92400E',
    lineHeight: 28,
    padding: 24,
    backgroundColor: '#FEF9C3',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    letterSpacing: -0.2,
    fontWeight: '500',
    shadowColor: '#F59E0B',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  markdownText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 28,
    letterSpacing: -0.2,
    fontWeight: '400',
  },
});

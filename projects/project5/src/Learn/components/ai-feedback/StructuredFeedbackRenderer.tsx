import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card } from '@/components/UI/Card';

type StructuredValue =
  | string
  | number
  | boolean
  | null
  | StructuredValue[]
  | { [key: string]: StructuredValue };

type StructuredFeedbackRendererProps = {
  data: StructuredValue;
};

const KEY_LABELS: Record<string, string> = {
  summary: '요약',
  overview: '요약',
  key_points: '핵심 포인트',
  strengths: '잘한 점',
  positives: '잘한 점',
  positives_points: '잘한 점',
  improvement: '개선 영역',
  improvements: '개선 영역',
  improvement_points: '개선 영역',
  improvement_areas: '개선 영역',
  opportunities: '기회 영역',
  tips: 'TIP',
  recommendations: '추천 학습',
  suggestions: '추천 학습',
  action_items: '실천 과제',
  action_plan: '실천 계획',
  next_steps: '다음 단계',
  goals: '목표',
  warnings: '주의 사항',
  cautions: '주의 사항',
  encouragement: '격려 메시지',
  praise: '격려 메시지',
  observation: '관찰 내용',
  observations: '관찰 내용',
  sections: '세부 분석',
  details: '세부 분석',
};

const ICON_MAP: Record<string, string> = {
  summary: 'text-short',
  overview: 'text-short',
  key_points: 'star-circle',
  strengths: 'thumb-up',
  positives: 'thumb-up',
  improvement: 'trending-down',
  improvements: 'trending-down',
  improvement_points: 'trending-down',
  improvement_areas: 'trending-down',
  recommendations: 'lightbulb-on',
  suggestions: 'lightbulb-on',
  tips: 'lightbulb',
  action_items: 'clipboard-check',
  action_plan: 'calendar-check',
  next_steps: 'map-marker-path',
  goals: 'target',
  warnings: 'alert',
  cautions: 'alert',
  encouragement: 'heart',
  praise: 'heart',
  observation: 'eye',
  observations: 'eye',
  sections: 'format-list-bulleted',
  details: 'format-list-bulleted',
};

const STATUS_BADGE_COLORS: Record<string, { text: string; background: string }> = {
  good: { text: '#0F766E', background: '#CCFBF1' },
  positive: { text: '#0F766E', background: '#CCFBF1' },
  success: { text: '#0F766E', background: '#CCFBF1' },
  neutral: { text: '#1D4ED8', background: '#DBEAFE' },
  warning: { text: '#92400E', background: '#FEF3C7' },
  caution: { text: '#92400E', background: '#FEF3C7' },
  danger: { text: '#B91C1C', background: '#FEE2E2' },
  negative: { text: '#B91C1C', background: '#FEE2E2' },
};

type SectionTheme = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  accent: string;
  badgeBg: string;
  badgeText: string;
  chipBg: string;
  chipText: string;
};

const POSITIVE_THEME: SectionTheme = {
  icon: 'thumb-up',
  accent: '#10B981',
  badgeBg: '#D1FAE5',
  badgeText: '#047857',
  chipBg: '#ECFDF5',
  chipText: '#065F46',
};

const WARNING_THEME: SectionTheme = {
  icon: 'alert-octagon',
  accent: '#F97316',
  badgeBg: '#FEF3C7',
  badgeText: '#B45309',
  chipBg: '#FFFBEB',
  chipText: '#92400E',
};

const NEUTRAL_THEME: SectionTheme = {
  icon: 'format-list-bulleted',
  accent: '#6366F1',
  badgeBg: '#E0E7FF',
  badgeText: '#3730A3',
  chipBg: '#EEF2FF',
  chipText: '#312E81',
};

type SectionEntry = {
  key: string;
  value: StructuredValue;
  level?: number;
  isParent?: boolean;
  isChild?: boolean;
};

function sanitizeRecordingLabel(text: string): string {
  return text.replace(/\(\s*\d+\s*번\s*녹음\s*\)/g, '').trim();
}

function formatKeyLabel(key: string): string {
  const normalized = key.replace(/[\s-]+/g, '_').toLowerCase();
  if (KEY_LABELS[normalized]) {
    return KEY_LABELS[normalized];
  }

  return sanitizeRecordingLabel(
    key
    .replace(/_/g, ' ')
    .replace(/^\w/, (char) => char.toUpperCase())
  );
}

function getIconName(key: string): string {
  const normalized = key.replace(/[\s-]+/g, '_').toLowerCase();
  return ICON_MAP[normalized] || 'text-box-outline';
}

function isPrimitiveValue(value: StructuredValue): value is string | number | boolean | null {
  return (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  );
}

function formatPrimitive(value: string | number | boolean | null): string {
  if (value === null) return '';
  if (typeof value === 'boolean') return value ? '예' : '아니오';
  return String(value);
}

function hasParagraphBulletContent(value: any) {
  if (!value || typeof value !== 'object') return false;
  return (
    (Array.isArray((value as any).paragraphs) && (value as any).paragraphs.length > 0) ||
    (Array.isArray((value as any).bullets) && (value as any).bullets.length > 0)
  );
}

function extractParagraphs(value: any): string[] {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === 'string') as string[];
  }
  if (Array.isArray(value?.paragraphs)) {
    return value.paragraphs.filter((item: unknown) => typeof item === 'string');
  }
  if (typeof value === 'string') {
    return [value];
  }
  return [];
}

function extractBullets(value: any): string[] {
  if (Array.isArray(value?.bullets)) {
    return value.bullets.filter((item: unknown) => typeof item === 'string');
  }
  return [];
}

function renderParagraphBulletBlock(theme: SectionTheme, value: any) {
  const paragraphs = extractParagraphs(value);
  const bullets = extractBullets(value);

  if (paragraphs.length === 0 && bullets.length === 0) return null;

  return (
    <View style={styles.customContent}>
      {paragraphs.map((text, idx) => (
        <View key={`p-${idx}`} style={[styles.paragraphCard, { borderLeftColor: theme.accent }]}>
          <Text style={styles.valueText}>{text}</Text>
        </View>
      ))}
      {bullets.length > 0 && (
        <View style={styles.chipContainer}>
          {bullets.map((item, idx) => (
            <View key={`b-${idx}`} style={[styles.chip, { backgroundColor: theme.chipBg }]}>
              <MaterialCommunityIcons name="checkbox-blank-circle" size={8} color={theme.chipText} />
              <Text style={[styles.chipText, { color: theme.chipText }]}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function renderValue(value: StructuredValue, depth: number = 0): React.ReactNode {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return (
      <Text
        style={[
          styles.valueText,
          depth > 0 ? styles.valueTextNested : undefined,
        ]}
      >
        {formatPrimitive(value)}
      </Text>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return null;
    const everyPrimitive = value.every((item) => isPrimitiveValue(item));

    if (everyPrimitive) {
      return (
        <View style={[styles.listContainer, depth > 0 && styles.nestedBlock]}>
          {value.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.listBullet} />
              <Text style={styles.listText}>{formatPrimitive(item)}</Text>
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={[styles.objectList, depth > 0 && styles.nestedBlock]}>
        {value.map((item, index) => (
          <View key={index} style={styles.objectCard}>
            {typeof item === 'object' && item !== null && (
              <>
                {('title' in item || 'heading' in item || 'label' in item) && (
                  <Text style={styles.objectCardTitle}>
                    {String(
                      (item as any).title ||
                      (item as any).heading ||
                      (item as any).label ||
                      ''
                    )}
                  </Text>
                )}
                <View style={{ width: '100%' }}>
                  {renderValue(item as StructuredValue, depth + 1)}
                </View>
              </>
            )}
            {isPrimitiveValue(item) && (
              <Text style={styles.listText}>{formatPrimitive(item)}</Text>
            )}
          </View>
        ))}
      </View>
    );
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    const isParagraphBulletOnly =
      keys.length > 0 && keys.every((key) => key === 'paragraphs' || key === 'bullets');
    if (isParagraphBulletOnly) {
      return renderParagraphBulletBlock(NEUTRAL_THEME, value);
    }

    const entries = Object.entries(value).filter(([, childValue]) => {
      if (childValue === null || childValue === undefined) return false;
      if (Array.isArray(childValue) && childValue.length === 0) return false;
      if (typeof childValue === 'string' && childValue.trim().length === 0) return false;
      return true;
    });

    if (entries.length === 0) return null;

    const statusEntry = entries.find(([key]) => key.toLowerCase() === 'status');
    const badge = statusEntry ? getStatusBadge(String(statusEntry[1])) : null;

    return (
      <View style={[styles.objectContainer, depth > 0 && styles.nestedBlock]}>
        {badge && (
          <View style={[styles.statusBadge, { backgroundColor: badge.background }]}>
            <Text style={[styles.statusBadgeText, { color: badge.text }]}>{badge.label}</Text>
          </View>
        )}
        {entries.map(([childKey, childValue]) => {
          if (childKey.toLowerCase() === 'status') return null;
          return (
            <View key={childKey} style={styles.objectRow}>
              <Text style={styles.objectKey}>{formatKeyLabel(childKey)}</Text>
              <View style={styles.objectValue}>{renderValue(childValue, depth + 1)}</View>
            </View>
          );
        })}
      </View>
    );
  }

  return null;
}

function getStatusBadge(value: string) {
  const normalized = value.toLowerCase();
  if (STATUS_BADGE_COLORS[normalized]) {
    const palette = STATUS_BADGE_COLORS[normalized];
    let label = '';
    switch (normalized) {
      case 'good':
      case 'positive':
      case 'success':
        label = '좋아요';
        break;
      case 'neutral':
        label = '보통';
        break;
      case 'warning':
      case 'caution':
        label = '주의';
        break;
      case 'danger':
      case 'negative':
        label = '개선 필요';
        break;
      default:
        label = value;
    }
    return { ...palette, label };
  }
  return null;
}

function normalizeEntries(data: StructuredValue): SectionEntry[] {
  if (
    data &&
    typeof data === 'object' &&
    'sections' in (data as Record<string, StructuredValue>) &&
    Array.isArray((data as any).sections)
  ) {
    const entries: SectionEntry[] = [];
    if ((data as any).summary) {
      entries.push({ key: 'summary', value: (data as any).summary });
    }
    (data as any).sections.forEach((section: any, idx: number) => {
      
      if (section?.subsections && Array.isArray(section.subsections) && section.subsections.length > 0) {
        
        entries.push({
          key: section?.title || `섹션 ${idx + 1}`,
          value: {
            paragraphs: section?.paragraphs || [],
            bullets: section?.bullets || [],
          },
          level: section?.level,
          isParent: true,
        });
        
        section.subsections.forEach((sub: any) => {
          const subTitle = sub?.title || `하위 섹션`;
          
          const isPlainSubSection = subTitle.includes('종합 평가') || subTitle.includes('개선 방안');
          entries.push({
            key: subTitle,
            value: {
              paragraphs: sub?.paragraphs || [],
              bullets: sub?.bullets || [],
            },
            level: sub?.level,
            isChild: !isPlainSubSection, 
            isParent: isPlainSubSection, 
          });
        });
      } else {
        entries.push({
          key: section?.title || `섹션 ${idx + 1}`,
          value: {
            paragraphs: section?.paragraphs || [],
            bullets: section?.bullets || [],
          },
          level: section?.level,
        });
      }
    });

    const rest = { ...data } as any;
    delete rest.summary;
    delete rest.sections;
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        entries.push({ key, value: value as StructuredValue });
      }
    });
    return entries;
  }

  if (Array.isArray(data)) {
    return data.map((item, index) => {
      if (item && typeof item === 'object') {
        const { title, heading, label, ...rest } = item as Record<string, StructuredValue>;
        const cardTitle = title || heading || label;
        if (cardTitle) {
          const value = Object.keys(rest).length > 0 ? (rest as StructuredValue) : item;
          return { key: String(cardTitle), value };
        }
      }
      return { key: `섹션 ${index + 1}`, value: item as StructuredValue };
    });
  }

  if (data && typeof data === 'object') {
    return Object.entries(data).map(([key, value]) => ({ key, value }));
  }

  return [{ key: '피드백', value: data }];
}

export default function StructuredFeedbackRenderer({ data }: StructuredFeedbackRendererProps) {
  const entries = normalizeEntries(data);

  return (
    <>
      {entries.map(({ key, value, level, isParent, isChild }, index) => (
        <StructuredSection 
          key={`${key}-${index}`} 
          title={key} 
          value={value} 
          level={level}
          isParent={isParent}
          isChild={isChild}
        />
      ))}
    </>
  );
}

function getSectionTheme(title: string): SectionTheme {
  const normalized = title.toLowerCase();
  if (
    normalized.includes('잘한') ||
    normalized.includes('우수') ||
    normalized.includes('강점') ||
    normalized.includes('strength')
  ) {
    return POSITIVE_THEME;
  }
  if (
    normalized.includes('개선') ||
    normalized.includes('필요') ||
    normalized.includes('문제') ||
    normalized.includes('risk') ||
    normalized.includes('주의')
  ) {
    return WARNING_THEME;
  }
  return NEUTRAL_THEME;
}

function StructuredSection({ title, value, level, isParent, isChild }: { title: string; value: StructuredValue; level?: number; isParent?: boolean; isChild?: boolean }) {
  const theme = getSectionTheme(title);
  const label = formatKeyLabel(title);
  const iconName = getIconName(title);
  const structured = hasParagraphBulletContent(value) || typeof value === 'string';
  const plain = shouldRenderAsPlainSection(label) || isParent;
  const isSubSection = plain && level !== undefined && level >= 3 && !isParent && !isChild;
  
  const isSubParent = isParent && (label.includes('종합 평가') || label.includes('개선 방안'));
  const marginTop = isChild || isSubParent ? 12 : 20; 

  
  if (isParent) {
    return (
      <View style={[styles.plainSection, { marginTop }]}>
        <View style={styles.plainSectionHeader}>
          <Text style={styles.plainSectionTitle}>{label}</Text>
        </View>
      </View>
    );
  }

  
  if (isChild) {
    return (
      <Card className="mt-3" style={{ marginTop }}>
        <View style={[styles.sectionCard, { borderLeftColor: theme.accent }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: theme.accent }]}>
              <MaterialCommunityIcons name={iconName as any} size={18} color="#FFFFFF" />
            </View>
            <Text style={styles.sectionTitle}>{label}</Text>
          </View>
          <View style={styles.sectionBody}>
            {structured ? renderParagraphBulletBlock(theme, value) : renderValue(value, 1)}
          </View>
        </View>
      </Card>
    );
  }

  if (plain) {
    return (
      <View style={[styles.plainSection, isSubSection && styles.plainSubSection, { marginTop }]}>
        {isSubSection ? (
          <Text style={styles.plainSubSectionTitle}>{label}</Text>
        ) : (
          <View style={styles.plainSectionHeader}>
            <Text style={styles.plainSectionTitle}>{label}</Text>
          </View>
        )}
        <View style={[styles.plainSectionBody, isSubSection && styles.plainSubSectionBody]}>
          {structured ? renderParagraphBulletBlock(NEUTRAL_THEME, value) : renderValue(value, isSubSection ? 2 : 1)}
        </View>
      </View>
    );
  }

  return (
    <Card className="mt-3" style={{ marginTop }}>
      <View style={[styles.sectionCard, { borderLeftColor: theme.accent }]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIcon, { backgroundColor: theme.accent }]}>
            <MaterialCommunityIcons name={iconName as any} size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.sectionTitle}>{label}</Text>
          <View style={[styles.sectionBadge, { backgroundColor: theme.badgeBg }]}>
            <Text style={[styles.sectionBadgeText, { color: theme.badgeText }]}>FOCUS</Text>
          </View>
        </View>
        <View style={styles.sectionBody}>
          {structured ? renderParagraphBulletBlock(theme, value) : renderValue(value, 1)}
        </View>
      </View>
    </Card>
  );
}

function shouldRenderAsPlainSection(title: string): boolean {
  const lowered = title.toLowerCase();
  if (lowered.includes('종합 평가') || lowered.includes('개선 방안')) {
    return true;
  }
  return lowered.includes('분석') || lowered.includes('피드백') || lowered.includes('보고서');
}

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 24,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  sectionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  sectionBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionBody: {
    gap: 16,
  },
  valueText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 26,
    letterSpacing: -0.15,
  },
  valueTextNested: {
    marginLeft: 8,
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  listBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9EC6F3',
    marginTop: 8,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: '#475569',
    lineHeight: 26,
    letterSpacing: -0.15,
  },
  customContent: {
    gap: 16,
  },
  paragraphCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  plainSection: {
    
  },
  plainSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
  },
  plainSectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plainSectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  plainSectionBody: {
    gap: 12,
  },
  plainSubSection: {
    marginTop: 12,
  },
  plainSubSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 10,
    letterSpacing: -0.2,
    textAlign: 'center',
  },
  plainSubSectionBody: {
    gap: 10,
  },
  objectContainer: {
    gap: 18,
  },
  objectRow: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  objectKey: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  objectValue: {
    gap: 12,
  },
  objectList: {
    gap: 18,
  },
  objectCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  objectCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  nestedBlock: {
    marginLeft: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});

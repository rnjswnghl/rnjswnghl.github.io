import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';

type DashboardData = {
  totalDays: number;
  totalSentences: number;
  lastStudyDate: string;
  weeklySentences: number[];
};

export default function DashboardScreen() {
  const dashboardData: DashboardData = {
    totalDays: 0,
    totalSentences: 0,
    lastStudyDate: '-',
    weeklySentences: [0, 0, 0, 0, 0, 0, 0],
  };

  const weeklySentences = dashboardData.weeklySentences;
  const maxVal = Math.max(...weeklySentences, 1);

  const displayData = dashboardData;

  return (
    <View>
      <View style={styles.cardsRow}>
        <DashCard
          title="누적 학습 일수"
          value={`${displayData.totalDays}일`}
          iconBg="#EEF2FF"
          icon={<Ionicons name="calendar-outline" size={18} color="#6366F1" />}
          style={{ marginRight: 12 }}
        />
        <DashCard
          title="학습한 문장"
          value={`${displayData.totalSentences}`}
          iconBg="#ECFDF5"
          icon={<Ionicons name="radio-button-on-outline" size={18} color="#10B981" />}
          style={{ marginRight: 12 }}
        />
        <DashCard
          title="최근 학습 일자"
          value={displayData.lastStudyDate}
          iconBg="#FFFBEB"
          icon={<Ionicons name="trending-up-outline" size={18} color="#D97706" />}
        />
      </View>

      <View style={styles.weekCard}>
        <View style={styles.weekHeaderRow}>
          <Text style={styles.weekTitle}>주간 학습 현황</Text>
          <Text style={styles.mute}>이번 주</Text>
        </View>
        <LineChart data={weeklySentences} max={maxVal} />

        <Text style={[styles.mute, styles.center, { marginTop: 8 }]}>이번 주 총 {weeklySentences.reduce((a,b)=>a+b,0)}개 문장 학습</Text>
      </View>
    </View>
  );
}

function DashCard({ title, value, icon, iconBg, style }: { title: string; value: string; icon: React.ReactNode; iconBg: string; style?: any }) {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>{icon}</View>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsRow: { flexDirection: 'row', marginTop: 16 },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)'
  },
  iconCircle: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  cardValue: { marginTop: 12, color: '#111827', fontWeight: '800', fontSize: 18 },
  cardTitle: { marginTop: 4, color: '#6B7280', fontSize: 12 },
  weekCard: { marginTop: 16, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)' },
  weekHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  weekTitle: { color: '#111827', fontWeight: '800' },
  mute: { color: '#6B7280' },
  chartArea: { marginTop: 12 },
  daysRow: { marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 },
  dayText: { color: '#6B7280', fontSize: 12 },
  center: { textAlign: 'center' },
});

function LineChart({ data, max }: { data: number[]; max: number }) {
  const [w, setW] = useState(0);
  const h = 160;
  const padX = 12;
  const padTop = 12;
  const padBottom = 22;
  const innerH = h - padTop - padBottom;

  const labels = ['월','화','수','목','금','토','일'];
  
  const fixed = useMemo(() => labels.map((_, i) => Math.max(0, data[i] ?? 0)), [data]);
  const maxV = Math.max(max || 0, ...fixed, 1);

  const onLayout = (e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width);

  const points = useMemo(() => {
    const n = fixed.length;
    if (!w || n === 0) return [] as { x: number; y: number; v: number }[];
    const step = (w - padX * 2) / Math.max(n - 1, 1);
    return fixed.map((v, i) => {
      const ratio = maxV ? v / maxV : 0;
      const x = padX + step * i;
      const y = padTop + (1 - ratio) * innerH;
      return { x, y, v };
    });
  }, [w, fixed, maxV]);

  return (
    <View style={styles.chartArea}>
      <View style={{ height: h, backgroundColor: '#F9FAFB', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' }} onLayout={onLayout}>
        {}
        <View style={{ position: 'absolute', left: 0, right: 0, top: padTop, bottom: padBottom }} pointerEvents="none">
          {[0.25, 0.5, 0.75].map((r) => (
            <View key={r} style={{ position: 'absolute', left: 0, right: 0, top: r * innerH, height: 1, backgroundColor: 'rgba(17,24,39,0.06)' }} />
          ))}
        </View>

        {}
        <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }} pointerEvents="none">
          {points.map((p, i) => {
            if (i === 0) return null;
            const p0 = points[i - 1];
            const dx = p.x - p0.x;
            const dy = p.y - p0.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const angle = Math.atan2(dy, dx);
            const midX = (p0.x + p.x) / 2;
            const midY = (p0.y + p.y) / 2;
            return (
              <View
                key={`seg-${i}`}
                style={{ position: 'absolute', left: midX - len / 2, top: midY - 1, width: len, height: 2, backgroundColor: '#6366F1', transform: [{ rotateZ: `${angle}rad` }], borderRadius: 2 }}
              />
            );
          })}
        </View>

        {}
        {points.map((p, i) => (
          <View key={`pt-${i}`} style={{ position: 'absolute', left: p.x - 4, top: p.y - 4, width: 8, height: 8, borderRadius: 4, backgroundColor: '#6366F1', borderWidth: 1, borderColor: 'white' }} />
        ))}
      </View>

      {}
      <View style={{ marginTop: 6, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4 }}>
        {labels.map((d) => (
          <Text key={d} style={{ color: '#6B7280', fontSize: 12 }}>{d}</Text>
        ))}
      </View>
    </View>
  );
}

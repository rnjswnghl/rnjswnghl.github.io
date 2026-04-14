import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent, Animated, Easing } from 'react-native';

type Props = {
  syllables: string[];
  basePitches?: number[];
  userPitches?: number[];
  durations?: number[];
  currentPlaybackTime?: number | null;
  isPlaying?: boolean;
  alwaysShowUserPitches?: boolean;
};

export default function PitchBoard({ syllables, basePitches = [], userPitches = [], durations = [], currentPlaybackTime = null, isPlaying = false, alwaysShowUserPitches = false }: Props) {
  const count = Math.max(syllables.length, basePitches.length, userPitches.length);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const slideX = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);

  const hasUserPitches = (userPitches && userPitches.length > 0) || alwaysShowUserPitches;

  const norm = (arr: number[]) => Array.from({ length: count }, (_, i) => (arr[i] ?? arr[arr.length - 1] ?? 0.5));
  const normBase = useMemo(() => norm(basePitches), [count, basePitches]);
  const normUser = useMemo(() => hasUserPitches ? norm(userPitches) : [], [count, userPitches, hasUserPitches]);

  const getPitchColor = (pitch: number): string => {
    const normalizedPitch = Math.max(0, Math.min(1, pitch));
    
    let r, g, b;
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    
    if (normalizedPitch < 0.2) {
      const t = normalizedPitch / 0.2;
      r = Math.round(59 + t * (6 - 59));
      g = Math.round(130 + t * (182 - 130));
      b = Math.round(246 + t * (212 - 246));
    } else if (normalizedPitch < 0.4) {
      const t = (normalizedPitch - 0.2) / 0.2;
      r = Math.round(6 + t * (16 - 6));
      g = Math.round(182 + t * (185 - 182));
      b = Math.round(212 + t * (129 - 212));
    } else if (normalizedPitch < 0.6) {
      const t = (normalizedPitch - 0.4) / 0.2;
      r = Math.round(16 + t * (251 - 16));
      g = Math.round(185 + t * (191 - 185));
      b = Math.round(129 + t * (36 - 129));
    } else if (normalizedPitch < 0.8) {
      const t = (normalizedPitch - 0.6) / 0.2;
      r = Math.round(251 + t * (249 - 251));
      g = Math.round(191 + t * (115 - 191));
      b = Math.round(36 + t * (22 - 36));
    } else {
      const t = (normalizedPitch - 0.8) / 0.2;
      r = Math.round(249 + t * (239 - 249));
      g = Math.round(115 + t * (68 - 115));
      b = Math.round(22 + t * (68 - 22));
    }
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const syllableTimeRanges = useMemo(() => {
    if (!durations || durations.length === 0) return [];
    
    let currentTime = 0;
    return durations.map((dur) => {
      const startTime = currentTime;
      const endTime = currentTime + dur;
      currentTime = endTime;
      return { startTime, endTime };
    });
  }, [durations]);

  const currentSyllableIndex = useMemo(() => {
    if (!isPlaying || syllableTimeRanges.length === 0) return -1;
    
    if (currentPlaybackTime == null) return -1;
    
    if (currentPlaybackTime === 0) return 0;
    
    const index = syllableTimeRanges.findIndex(
      (range) => currentPlaybackTime >= range.startTime && currentPlaybackTime < range.endTime
    );
    
    if (index === -1 && currentPlaybackTime >= syllableTimeRanges[syllableTimeRanges.length - 1]?.startTime) {
      return syllableTimeRanges.length - 1;
    }
    
    return index;
  }, [currentPlaybackTime, isPlaying, syllableTimeRanges]);

  const items = Array.from({ length: count }, (_, i) => ({
    text: syllables[i] ?? '',
    baseY: normBase[i],
    userY: normUser[i] ?? 0.5,
    len: Math.max(0.5, Math.min(2, durations[i] ?? 1)),
    isPlaying: isPlaying && i === currentSyllableIndex,
  }));

  const calcColsPerRow = () => {
    if (size.w <= 0)
      return {
        first: Math.min(count, 5),
        second: 0,
        leftPad: 40,
        usable: Math.max(0, size.w - 80),
        maxCols: 5,
        pageSize: Math.max(1, Math.min(count, 5)),
        pages: Math.max(1, Math.ceil(count / Math.max(1, Math.min(count, 5)))),
        colGap: 10,
        baseBarW: 56,
      } as const;
    const leftPad = 20;
    const rightPad = 10;
    const usable = Math.max(0, size.w - leftPad - rightPad);
    const baseBarW = 56;
    const colGap = 12;
    const STEP = baseBarW + colGap;
    const maxCols = 5;
    const pageSize = maxCols;
    const start = page * pageSize;
    const remain = Math.max(0, count - start);
    const first = Math.min(remain, maxCols);
    const pages = Math.max(1, Math.ceil(count / pageSize));
    return { first, leftPad, usable, maxCols, pageSize, pages, colGap, baseBarW } as const;
  };
  const mapX = (row: number, col: number, rowCount: number) => {
    if (size.w <= 0) return 0;
    const { leftPad, usable, maxCols, baseBarW, colGap } = calcColsPerRow();
    const STEP = baseBarW + colGap;
    const groupWidth = Math.max(0, (Math.max(1, rowCount) - 1) * STEP);
    const isFull = rowCount >= maxCols;
    const startX = isFull ? leftPad + Math.max(0, (usable - groupWidth) / 2) : leftPad;
    const _startX = leftPad;
    return Math.round(_startX + STEP * col);
  };
  const rowLayout = () => {
    const topPad = Math.round(size.h * 0.12);
    const bottomPad = Math.round(size.h * 0.12);
    const gap = 22;
    const available = Math.max(0, size.h - topPad - bottomPad - gap);
    const rowH = Math.max(1, Math.round(available / 2));
    const top0 = topPad;
    const top1 = top0 + rowH + gap;
    return { rowH, gap, tops: [top0, top1] as const };
  };
  const mapY = (row: number, r: number) => {
    if (size.h <= 0) return 0;
    const v = Math.max(0, Math.min(1, r));
    const bandRatio = 0.6;
    const bandH = Math.max(1, Math.round(size.h * bandRatio));
    const top = Math.round((size.h - bandH) / 2);
    return top + Math.round(v * bandH);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.w || height !== size.h) setSize({ w: width, h: height });
  };

  useEffect(() => {
    if (size.w <= 0) return;
    const { pageSize, pages } = calcColsPerRow();
    if (pages <= 1) {
      setPage(0);
      return;
    }
    let current = 0;
    const advance = () => {
      if (current >= pages - 1) return;
      slideX.setValue(size.w);
      Animated.timing(slideX, {
        toValue: 0,
        duration: 360,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start();
      current += 1;
      setPage(current);
    };
    slideX.setValue(size.w);
    Animated.timing(slideX, { toValue: 0, duration: 360, easing: Easing.out(Easing.quad), useNativeDriver: false }).start();
    const id = setInterval(advance, 3500);
    return () => clearInterval(id);
  }, [size.w, count]);

  return (
    <View style={styles.wrap} onLayout={onLayout}>
      <Animated.View style={{ transform: [{ translateX: slideX }] }}>
        {(() => {
          const { first, pageSize, baseBarW, leftPad, usable, colGap } = calcColsPerRow();
          const startIndex = page * pageSize;
          const render = (row: number, start: number, countInRow: number) => {
            const rowItems = items.slice(startIndex + start, startIndex + start + countInRow);
            const widthsRaw = rowItems.map((it) => Math.round(baseBarW * it.len));
            const avail = Math.max(0, usable - Math.max(0, countInRow - 1) * colGap);
            const totalRaw = widthsRaw.reduce((a, b) => a + b, 0);
            const scale = totalRaw > 0 ? Math.min(1, avail / totalRaw) : 1;
            const widths = widthsRaw.map((w) => Math.max(8, Math.round(w * scale)));
            let left = leftPad;
            return rowItems.map((it, idx) => {
              const w = widths[idx];
              const cy = mapY(row, it.baseY);
              const h = 18;
              const isCurrentBar = it.isPlaying;
              const el = (
                <View key={`b-${row}-${idx}`} style={{ position: 'absolute', left, top: cy - Math.round(h / 2) }}>
                  <View 
                    style={[
                      styles.barBase, 
                      { width: w, height: h },
                      isCurrentBar && styles.barBasePlaying
                    ]} 
                  />
                  <Text style={[styles.labelText, { top: h + 6, width: w, left: 0, textAlign: 'center' }]}>{it.text}</Text>
                </View>
              );
              left += w + colGap;
              return el;
            });
          };
          return <>{render(0, 0, first)}</>;
        })()}
      </Animated.View>

      {hasUserPitches && (
        <Animated.View style={{ transform: [{ translateX: slideX }] }}>
          {(() => {
            const { first, pageSize, baseBarW, leftPad, usable, colGap } = calcColsPerRow();
            const startIndex = page * pageSize;
            const render = (row: number, start: number, countInRow: number) => {
              const rowItems = items.slice(startIndex + start, startIndex + start + countInRow);
              const widthsRaw = rowItems.map((it) => Math.round(baseBarW * it.len));
              const avail = Math.max(0, usable - Math.max(0, countInRow - 1) * colGap);
              const totalRaw = widthsRaw.reduce((a, b) => a + b, 0);
              const scale = totalRaw > 0 ? Math.min(1, avail / totalRaw) : 1;
              const widths = widthsRaw.map((w) => Math.max(8, Math.round(w * scale)));
              let left = leftPad;
              return rowItems.map((it, idx) => {
                const w = widths[idx];
                const cy = mapY(row, it.userY);
                const h = 14;
                const pitchColor = getPitchColor(it.userY);
                const isCurrentBar = it.isPlaying;
                const el = (
                  <View key={`u-${row}-${idx}`} style={{ position: 'absolute', left, top: cy - Math.round(h / 2) }}>
                    <View 
                      style={[
                        styles.barUser, 
                        { width: w, height: h, backgroundColor: pitchColor },
                        isCurrentBar && styles.barUserPlaying
                      ]} 
                    />
                  </View>
                );
                left += w + colGap;
                return el;
              });
            };
            return <>{render(0, 0, first)}</>;
          })()}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 12,
    height: 160,
    borderRadius: 16,
    backgroundColor: '#e6fbffff',
    borderWidth: 0,
    overflow: 'hidden',
  },
  barBase: {
    backgroundColor: '#9ca3af',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d1d5db',
    shadowColor: '#6b7280',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  barBasePlaying: {
    borderWidth: 2,
    borderColor: '#4b5563',
    shadowColor: '#374151',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    transform: [{ scale: 1.05 }],
  },
  barUser: {
    backgroundColor: '#7fc7ff',
    borderRadius: 999,
    borderWidth: 0,
    opacity: 0.92,
  },
  barUserPlaying: {
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    transform: [{ scale: 1.08 }],
    opacity: 1,
  },
  labelText: {
    position: 'absolute',
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '700',
  },
});

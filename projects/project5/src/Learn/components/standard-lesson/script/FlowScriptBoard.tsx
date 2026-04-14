import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, ViewStyle } from 'react-native';
import { Card } from '@/components/UI/Card';

type Props = {
  text: string | string[];
  durationMs?: number;
  maxCharsPerLine?: number;
  paused?: boolean;
  style?: ViewStyle;
  onRoundEnd?: () => void;
  rounds?: number;
};

export default function FlowScriptBoard({
  text,
  durationMs = 3200,
  maxCharsPerLine = 16,
  paused = false,
  style,
  onRoundEnd,
  rounds,
}: Props) {
  const lines = useMemo(() => normalizeLines(text, maxCharsPerLine), [text, maxCharsPerLine]);
  const [idx, setIdx] = useState(0);
  const transY = useRef(new Animated.Value(0)).current;
  const roundsRef = useRef(0);

  useEffect(() => {
    transY.setValue(0);
    setIdx(0);
    roundsRef.current = 0;
  }, [text]);

  useEffect(() => {
    if (paused || lines.length <= 1) return;
    let timer: any;
    let cancelled = false;

    const tick = () => {
      timer = setTimeout(() => {
        Animated.timing(transY, {
          toValue: -LINE_H - GAP,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (!finished || cancelled) return;
          setIdx((prev) => {
            const next = (prev + 1) % lines.length;
            if (next === 0) {
              roundsRef.current += 1;
              onRoundEnd?.();
              if (typeof rounds === 'number' && roundsRef.current >= rounds) {
                cancelled = true;
                return next;
              }
            }
            return next;
          });
          if (!cancelled) {
            transY.setValue(0);
            tick();
          }
        });
      }, durationMs);
    };

    tick();
    return () => {
      cancelled = true;
      clearTimeout(timer);
      transY.stopAnimation();
    };
  }, [lines, durationMs, paused, transY, onRoundEnd, rounds]);

  const top = lines[idx] ?? '';
  const bottom = lines[(idx + 1) % lines.length] ?? '';

  return (
    <Card className="mt-3">
      <View style={[styles.wrap, style]}>
        <Animated.View style={{ transform: [{ translateY: transY }] }}>
          <Text style={[styles.line, styles.active]} numberOfLines={1}>
            {top}
          </Text>
          <View style={{ height: GAP }} />
          <Text style={[styles.line, styles.next]} numberOfLines={1}>
            {bottom}
          </Text>
        </Animated.View>
      </View>
    </Card>
  );
}

const LINE_H = 28;
const GAP = 8;

function normalizeLines(input: string | string[], maxChars: number): string[] {
  if (Array.isArray(input)) return input.length ? input : [''];
  return wrapToLines(input ?? '', maxChars);
}

function wrapToLines(input: string, maxChars: number): string[] {
  const words = input.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [input];
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const tentative = cur ? cur + ' ' + w : w;
    if (displayLen(tentative) <= maxChars) {
      cur = tentative;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function displayLen(s: string) {
  let acc = 0;
  for (const ch of s) acc += /[\x00-\x7F]/.test(ch) ? 0.7 : 1;
  return acc;
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    overflow: 'hidden',
    height: LINE_H * 2 + GAP,
    alignItems: 'center',
  },
  line: {
    height: LINE_H,
    lineHeight: LINE_H,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  active: {
    color: '#1E293B',
    textShadowColor: '#93C5FD',
    textShadowRadius: 4,
  },
  next: {
    color: '#64748B',
  },
});

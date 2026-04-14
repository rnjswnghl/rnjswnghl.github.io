import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, Pressable, Animated, Easing, UIManager } from 'react-native';
import { Category, CategoryKey } from '../../types';

type Props = {
  category: Category;
  phase?: number;
  onPress?: () => void;
  disabled?: boolean;
  size?: number;
  tint?: number; 
};

const EMOJI: Record<CategoryKey, { icon: string; bgFrom: string; bgTo: string; fill: string }> = {
  deliver: { icon: '📝', bgFrom: '#E8F1FF', bgTo: '#F2F6FF', fill: '#D9F0F7' },
  persuade: { icon: '🙏', bgFrom: '#E6FFF6', bgTo: '#F0FFF9', fill: '#DFF7EE' },
  empathy: { icon: '💬', bgFrom: '#F4E9FF', bgTo: '#F8F2FF', fill: '#EBDDFF' },
  emotion: { icon: '🎭', bgFrom: '#FFE9EE', bgTo: '#FFF3F6', fill: '#FFE0E7' },
  directive: { icon: '📣', bgFrom: '#FFF4E1', bgTo: '#FFF9EE', fill: '#FFECCB' },
  interrogative: { icon: '❓', bgFrom: '#EAF6FF', bgTo: '#F3F9FF', fill: '#E0F0FF' },
};

export default function FloatingCategoryBubble({ category, phase = 0, onPress, disabled, size: sizeProp, tint = 0 }: Props) {
  const translate = useMemo(() => new Animated.Value(0), []);
  const size = Math.max(120, Math.min(190, sizeProp ?? 150));
  const hasNativeBlur = !!UIManager.getViewManagerConfig?.('ExpoBlurView');
  let BlurViewComp: any = null;
  if (hasNativeBlur) {
    try {
      const mod = require('expo-blur');
      BlurViewComp = mod?.BlurView ?? null;
    } catch {}
  }

  useEffect(() => {
    const amplitude = 6;
    const duration = 2800 + Math.round((phase % 1) * 1200);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(translate, { toValue: -amplitude, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(translate, { toValue: amplitude, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [translate, phase]);

  const badge = EMOJI[category.key] ?? { icon: '', bgFrom: '#F3F4F6', bgTo: '#FFFFFF', fill: '#EEF2F7' };

  const radius = size / 2;
  const circleStyle = { width: size, height: size, borderRadius: radius } as const;
  const wrapStyle = { borderRadius: radius } as const;
  const blurWrapStyle = { borderRadius: radius } as const;
  const innerStyle = { borderRadius: radius, borderWidth: 1 } as const;
  const fillInset = 10;
  const colorFillStyle = {
    top: fillInset,
    bottom: fillInset,
    left: fillInset,
    right: fillInset,
    borderRadius: radius - fillInset,
  } as const;

  const Content = (
    <Animated.View style={[styles.circle, circleStyle, { transform: [{ translateY: translate }] }]}>
      <View style={[styles.shadowWrap, wrapStyle]}>
        {BlurViewComp ? (
          <BlurViewComp intensity={50} tint="light" style={[styles.blurWrap, blurWrapStyle]}>
            <View style={[styles.inner, innerStyle, { backgroundColor: '#ffffff22', borderColor: '#ffffff55' }]}>
              <View style={[styles.colorFill, colorFillStyle, { backgroundColor: badge.fill }]} />
              {!!tint && (
                <View
                  style={[
                    styles.tintOverlay,
                    colorFillStyle,
                    {
                      backgroundColor: tint >= 0 ? '#ffffff' : '#000000',
                      opacity: Math.min(0.08, Math.abs(tint)),
                    },
                  ]}
                />
              )}
              <View style={[styles.ring, { borderRadius: radius - 4 }]} />
              <View style={[styles.ringSoft, { borderRadius: radius - 12 }]} />
              <View style={[
                styles.gloss,
                {
                  width: size * 0.52,
                  height: size * 0.24,
                  borderRadius: size,
                  transform: [{ rotate: '-25deg' }],
                },
              ]} />
              <View style={styles.emojiWrap}>
                <Text style={styles.emoji}>{badge.icon}</Text>
              </View>
              <Text style={styles.title}>{category.title}</Text>
            </View>
          </BlurViewComp>
        ) : (
          <View style={[styles.glass, wrapStyle]}>
            <View style={[styles.inner, innerStyle, { backgroundColor: '#ffffff33', borderColor: '#ffffff66' }]}>
              <View style={[styles.colorFill, colorFillStyle, { backgroundColor: badge.fill }]} />
              {!!tint && (
                <View
                  style={[
                    styles.tintOverlay,
                    colorFillStyle,
                    {
                      backgroundColor: tint >= 0 ? '#ffffff' : '#000000',
                      opacity: Math.min(0.08, Math.abs(tint)),
                    },
                  ]}
                />
              )}
              <View style={[styles.ring, { borderRadius: radius - 4 }]} />
              <View style={[styles.ringSoft, { borderRadius: radius - 12 }]} />
              <View style={[
                styles.gloss,
                {
                  width: size * 0.52,
                  height: size * 0.24,
                  borderRadius: size,
                  transform: [{ rotate: '-25deg' }],
                },
              ]} />
              <View style={styles.emojiWrap}>
                <Text style={styles.emoji}>{badge.icon}</Text>
              </View>
              <Text style={styles.title}>{category.title}</Text>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} disabled={disabled} style={styles.pressable} android_ripple={{ color: '#00000018', borderless: true }}>
        {Content}
      </Pressable>
    );
  }
  return Content;
}

const styles = StyleSheet.create({
  pressable: { alignItems: 'center', justifyContent: 'center' },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowWrap: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  glass: {
    flex: 1,
    backgroundColor: '#ffffff22',
    borderWidth: 1,
    borderColor: '#ffffff55',
    backdropFilter: 'blur(8px)' as any, 
  },
  blurWrap: {
    flex: 1,
    overflow: 'hidden',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorFill: {
    position: 'absolute',
    opacity: 0.9,
  },
  emojiWrap: { marginBottom: 10 },
  emoji: { fontSize: 28 },
  title: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  ring: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    right: 4,
    borderWidth: 1,
    borderColor: '#ffffffaa',
  },
  ringSoft: {
    position: 'absolute',
    top: 12,
    bottom: 12,
    left: 12,
    right: 12,
    borderWidth: 1,
    borderColor: '#ffffff55',
  },
  gloss: {
    position: 'absolute',
    top: 14,
    left: 18,
    backgroundColor: '#ffffff80',
    opacity: 0.6,
  },
  tintOverlay: {
    position: 'absolute',
  },
});

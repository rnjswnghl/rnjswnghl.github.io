import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Category, CategoryKey } from '../../types';

type Props = {
  category: Category;
  size: 'full' | 'half';
  onPress: () => void;
};

const COLORS: Record<CategoryKey, { bg: string; border: string }> = {
  deliver: { bg: '#E8F2FF', border: '#DCE8FA' },
  persuade: { bg: '#FFF7D9', border: '#F6EBC2' },
  empathy: { bg: '#F2ECFF', border: '#E8DDFB' },
  emotion: { bg: '#FBEAEE', border: '#F2DCE2' },
  directive: { bg: '#FFF2DD', border: '#F5E5CB' },
  interrogative: { bg: '#EAF6FF', border: '#D8ECFF' },
};

const EMOJIS: Record<CategoryKey, string> = {
  deliver: '📣',
  persuade: '🗣️',
  empathy: '🥹',
  emotion: '🥲',
  directive: '📝',
  interrogative: '❓',
};

export default function CategoryPanel({ category, size, onPress }: Props) {
  const c = COLORS[category.key] ?? { bg: '#F3F4F6', border: '#E5E7EB' };
  const emoji = EMOJIS[category.key] ?? '📚';
  return (
    <Pressable onPress={onPress} android_ripple={{ color: '#00000010' }} style={[styles.card, size === 'full' ? styles.full : styles.half, { backgroundColor: c.bg, borderColor: c.border }]}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
        <View style={styles.textCol}>
          <Text style={styles.title}>{category.title}</Text>
          <Text style={styles.subtitle}>{category.subtitle}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  full: { width: '100%', minHeight: 120 },
  half: { width: '100%', minHeight: 120 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    backgroundColor: '#ffffff80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  textCol: { flex: 1, gap: 4 },
  title: { fontSize: 18, fontWeight: '900', color: '#0F172A' },
  subtitle: { fontSize: 12, color: '#6B7280' },
});

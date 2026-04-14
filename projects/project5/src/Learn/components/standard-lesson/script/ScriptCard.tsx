import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card } from '@/components/UI/Card';

type Props = {
  title?: string;
  text: string;
  onPlay?: () => void;
};

export default function ScriptCard({ title = '원본 스크립트', text, onPlay }: Props) {
  return (
    <Card className="mt-3">
      <View style={styles.cardHead}>
        <MaterialCommunityIcons name="script-text-outline" size={16} color="#334155" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.body}>{text}</Text>
      <Pressable style={styles.playBtn} onPress={onPlay} accessibilityRole="button">
        <MaterialCommunityIcons name="play" size={16} color="#0F172A" />
        <Text style={styles.playText}>원본 음성 듣기</Text>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {},
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  title: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  body: { marginTop: 10, color: '#334155', fontSize: 14, lineHeight: 20 },
  playBtn: {
    marginTop: 12,
    height: 40,
    backgroundColor: '#BDDDE4',
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#9EC6F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  playText: { color: '#0F172A', fontWeight: '700' },
});

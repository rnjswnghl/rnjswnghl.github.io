import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Card } from '@/components/UI/Card';

type Props = {
  text: string;
  onPlay?: () => void;
};

export default function OriginalScriptBox({ text, onPlay }: Props) {
  const [fontSize, setFontSize] = useState(18);
  const dec = () => setFontSize((s) => Math.max(14, s - 2));
  const inc = () => setFontSize((s) => Math.min(22, s + 2));

  return (
    <Card className="mt-3">
      <View style={styles.container}>
        <View style={styles.headRow}>
          <View style={styles.headLeft}>
            <View style={styles.badge}>
              <MaterialCommunityIcons name="script-text-outline" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>원본 스크립트</Text>
          </View>
          <View style={styles.fontRow}>
            <Pressable onPress={dec} style={styles.fontBtn}>
              <Text style={styles.fontBtnText}>가-</Text>
            </Pressable>
            <Pressable onPress={inc} style={[styles.fontBtn, { marginLeft: 6 }]}>
              <Text style={styles.fontBtnText}>가+</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView style={styles.textBox} showsVerticalScrollIndicator={false}>
          <Text selectable style={[styles.body, { fontSize }]}>
            {text}
          </Text>
        </ScrollView>

        <Pressable onPress={onPlay} style={styles.playBtn}>
          <View style={styles.playIconWrapper}>
            <MaterialCommunityIcons name="play" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.playText}>원본 음성 듣기</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF1D5',
    borderRadius: 28,
    padding: 28,
    borderWidth: 0,
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.2,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  headRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headLeft: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
  },
  badge: {
    backgroundColor: '#9EC6F3',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 0,
    shadowColor: '#9EC6F3',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: { 
    fontSize: 19, 
    fontWeight: '800', 
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  fontRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8,
  },
  fontBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#9EC6F3',
    shadowColor: '#9EC6F3',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  fontBtnText: { 
    color: '#9FB3DF', 
    fontWeight: '700', 
    fontSize: 15,
    letterSpacing: -0.2,
  },
  textBox: {
    maxHeight: 260,
    marginTop: 20,
    marginBottom: 28,
    paddingVertical: 8,
  },
  body: { 
    lineHeight: 32, 
    color: '#1E293B',
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.15,
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#9EC6F3',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#9EC6F3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  playIconWrapper: {
    marginRight: 10,
  },
  playText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: -0.3,
  },
});

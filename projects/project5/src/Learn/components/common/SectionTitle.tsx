import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.title} testID="section-title">{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    marginTop: 22,
    marginBottom: 8,
    color: '#475569',
    fontWeight: '800',
    fontSize: 14,
  },
});

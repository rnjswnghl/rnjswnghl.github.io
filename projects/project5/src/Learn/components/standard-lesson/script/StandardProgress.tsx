import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  current: number;
  total: number;
};

export default function StandardProgress({ current, total }: Props) {
  const ratio = Math.max(0, Math.min(1, total ? current / total : 0));
  return (
    <View style={styles.container}>
      <View style={styles.barWrap}>
        <View style={[styles.barFill, { width: `${ratio * 100}%` }]} />
        <View pointerEvents="none" style={styles.overlay}>
          <Text style={styles.counterInBar}>{current}/{total}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginTop: 8, 
    width: '100%',
  },
  barWrap: { 
    position: 'relative', 
    height: 14, 
    backgroundColor: '#E2E8F0', 
    borderRadius: 999, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  barFill: { 
    height: '100%', 
    backgroundColor: '#9FB3DF', 
    borderRadius: 999,
    shadowColor: '#9FB3DF',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  overlay: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'flex-end',
  },
  counterInBar: { 
    marginRight: 14, 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 12,
    letterSpacing: -0.1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

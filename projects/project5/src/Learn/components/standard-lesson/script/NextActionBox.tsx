import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/UI/Card';

type Props = {
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  backgroundColor?: string;
};

export default function NextActionBox({ label = '다음 문장', onPress, disabled = false, backgroundColor = '#9FB3DF' }: Props) {
  return (
    <Card className="items-center" style={{ marginTop: 28 }}>
      <Pressable 
        onPress={onPress} 
        accessibilityRole="button" 
        hitSlop={8}
        disabled={disabled}
        style={disabled && styles.disabled}
      >
        <View style={[styles.labelBox, { backgroundColor: disabled ? undefined : backgroundColor, shadowColor: disabled ? undefined : backgroundColor }, disabled && styles.labelBoxDisabled]}>
          <Text style={[styles.label, disabled && styles.labelDisabled]}>
            {disabled ? '평가 중...' : label}
          </Text>
        </View>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  labelBox: {
    backgroundColor: '#9FB3DF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    shadowColor: '#9FB3DF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
  },
  labelBoxDisabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  labelDisabled: {
    color: '#94A3B8',
  },
  disabled: {
    opacity: 0.65,
  },
});

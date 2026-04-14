import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = {
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress?: () => void;
  tint?: string;
  className?: string;
  iconBgClassName?: string;
};

export function ModeCard({
  title,
  icon,
  onPress,
  
  tint = '#9FB3DF',
  className,
  iconBgClassName,
}: Props) {
  return (
    <Pressable onPress={onPress} style={{ width: '100%' }}>
      <View style={styles.card}>
        <View style={[styles.iconBox, iconBgClassName ? undefined : null]}>
          <MaterialCommunityIcons name={icon} size={26} color={tint} />
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 16, fontWeight: '600', color: '#111827' },
});

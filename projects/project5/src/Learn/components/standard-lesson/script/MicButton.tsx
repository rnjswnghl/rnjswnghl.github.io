import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View, Animated, Easing } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = {
  onPress?: () => void;
};

export default function MicButton({ onPress }: Props) {
  const scale = useMemo(() => new Animated.Value(1), []);
  const pulse = useMemo(() => new Animated.Value(0), []);

  const handleIn = () => {
    Animated.timing(scale, { toValue: 0.96, duration: 120, useNativeDriver: true, easing: Easing.out(Easing.quad) }).start();
  };
  const handleOut = () => {
    Animated.timing(scale, { toValue: 1, duration: 140, useNativeDriver: true, easing: Easing.out(Easing.quad) }).start();
  };

  Animated.loop(
    Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 1400, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
      Animated.timing(pulse, { toValue: 0, duration: 1400, useNativeDriver: true, easing: Easing.in(Easing.quad) }),
    ])
  ).start();

  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.16] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.16, 0.02] });

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.ring, { transform: [{ scale: ringScale }], opacity: ringOpacity }]} />
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          style={styles.btn}
          onPress={onPress}
          onPressIn={handleIn}
          onPressOut={handleOut}
          android_ripple={{ color: '#00000014' }}
        >
          <MaterialCommunityIcons name="microphone" size={40} color="#FFFFFF" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { 
    marginTop: 36, 
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: '#9EC6F3',
    opacity: 0.3,
  },
  btn: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: '#9EC6F3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#9EC6F3',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
});

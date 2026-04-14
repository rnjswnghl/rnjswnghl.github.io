import { Text, TextProps } from 'react-native';

export const H1 = (p: TextProps & { className?: string }) =>
  <Text {...p} className={`text-2xl font-bold text-ink ${p.className ?? ''}`} />;

export const P = (p: TextProps & { className?: string }) =>
  <Text {...p} className={`text-base text-mute ${p.className ?? ''}`} />;

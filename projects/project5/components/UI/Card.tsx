import { View, ViewProps } from 'react-native';

export function Card(props: ViewProps & { className?: string }) {
  const { className, ...rest } = props as any;
  return <View {...rest} className={`bg-white rounded-2xl p-4 shadow-md border border-black/5 ${className ?? ''}`} />;
}

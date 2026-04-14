import { Pressable, Text, ActivityIndicator } from 'react-native';

export function Button({ children, onPress, loading = false }: any) {
  return (
    <Pressable
      className="h-11 px-4 rounded-2xl bg-sky active:bg-periwinkle items-center justify-center"
      onPress={onPress}
      disabled={loading}
    >
      {loading ? <ActivityIndicator /> : <Text className="text-white font-semibold">{children}</Text>}
    </Pressable>
  );
}
import { NavbarHamburger } from '@/components/UI/NavbarHamburger';
import { useAuthStore } from '@/src/store/auth';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { API_BASE } from '@/src/config/api';

type Props = { hideHomeIcon?: boolean };

export default function AppHeader({ hideHomeIcon }: Props) {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const onLogoutPress = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/login');
          },
        },
      ],
    );
  };

  
  const profileImageSource = useMemo(() => {
    if (!user?.profileImageUrl) {
      return require('../../assets/images/mascot.png');
    }
    const url = user.profileImageUrl;
    
    if (url.startsWith('http') || url.startsWith('file://') || url.startsWith('data:')) {
      return { uri: url };
    }
    
    return { uri: `${API_BASE}${url.startsWith('/') ? '' : '/'}${url}` };
  }, [user?.profileImageUrl]);

  const [imageFailed, setImageFailed] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <NavbarHamburger />
      </View>
      <View style={styles.right}>
        <Pressable onPress={() => router.replace('/(drawer)/Home')} hitSlop={8} style={styles.iconBtn}>
          <Text style={styles.homeText}>HOME</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/(drawer)/profile')} hitSlop={8} style={styles.profileBtn}>
          <Image
            source={imageFailed ? require('../../assets/images/mascot.png') : profileImageSource}
            style={styles.profileImage}
            resizeMode="cover"
            onError={(e) => {
              setImageFailed(true);
              try {
                const src = (profileImageSource as any)?.uri || 'local-image';
                console.log({
                  uri: typeof src === 'string' ? src.substring(0, 100) : src,
                  error: e?.nativeEvent?.error,
                });
              } catch {}
            }}
          />
        </Pressable>
        <Text style={styles.logout} onPress={onLogoutPress}>로그아웃</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginTop: 10,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  right: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 12 },
  brand: { color: '#111827', fontSize: 14, fontWeight: '700', marginLeft: 8 },
  iconBtn: { paddingHorizontal: 0, paddingVertical: 0 },
  homeText: { color: '#6B7280', fontSize: 13, fontWeight: '600' },
  profileBtn: { marginRight: 0, paddingHorizontal: 0, paddingVertical: 0 },
  profileImage: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)' },
  
  logout: { color: 'black', fontSize: 13, fontWeight: '600', marginLeft: 0 },
});

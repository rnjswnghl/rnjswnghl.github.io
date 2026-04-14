import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../../src/store/auth';

export default function DrawerLayout() {
  const isAuthed = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthed) return <Redirect href="/login" />;

  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" options={{ drawerLabel: 'Home' }} />
      <Drawer.Screen name="learn" options={{ drawerLabel: 'Learn' }} />
      <Drawer.Screen name="profile" options={{ drawerLabel: 'Profile' }} />
    </Drawer>
  );
}

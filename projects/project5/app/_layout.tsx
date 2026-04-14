import "react-native-gesture-handler";
import "nativewind";
import React, { useEffect, useRef } from "react";
import { Stack, useRouter } from "expo-router";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { StatusBar, Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { setAuthTokenGetter, setAuthExpiredHandler } from "../src/config/api";
import { useAuthStore } from "../src/store/auth";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = { anchor: "(drawer)" };

setAuthTokenGetter(() => useAuthStore.getState().token);

export default function RootLayout() {
  const scheme = useColorScheme();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const alertShownRef = useRef(false);

  
  useEffect(() => {
    setAuthExpiredHandler(() => {
      
      if (alertShownRef.current) return;
      alertShownRef.current = true;

      
      
      logout();
      
      
      setTimeout(() => {
        router.replace('/login');
        alertShownRef.current = false;
      }, 100);
    });

    
    return () => {
      alertShownRef.current = false;
    };
  }, [logout, router]);

  
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#E3F0F9', true);
      StatusBar.setBarStyle('dark-content', true);
    }
  }, []);

  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar 
        backgroundColor="#E3F0F9" 
        barStyle="dark-content" 
        translucent={false}
      />
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#E3F0F9' }, 
        }}
      >
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
        <Stack.Screen name="edit-profile" options={{ presentation: "modal", title: "프로필 수정" }} />
        <Stack.Screen name="change-password" options={{ presentation: "modal", title: "비밀번호 변경" }} />
      </Stack>
    </ThemeProvider>
  );
}

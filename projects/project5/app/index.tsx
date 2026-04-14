import { useEffect, useState, useLayoutEffect } from 'react';
import { Redirect } from 'expo-router';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import LoadingScreen from '@/components/LoadingScreen';
import { useAuthStore } from '../src/store/auth';
import { setAuthTokenGetter } from '../src/config/api';

setAuthTokenGetter(() => useAuthStore.getState().token);

export default function Index() {
  const isAuthed = useAuthStore((s) => s.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  
  useLayoutEffect(() => {
    
    SplashScreen.hideAsync().catch(() => {
      
    });
  }, []);

  useEffect(() => {

    async function initializeApp() {
      try {
        
        const startTime = Date.now();
        const minLoadTime = 1500; 

        
        
        
        await new Promise(resolve => setTimeout(resolve, 300));

        
        
        await Promise.all([
          
        ]);

        
        const elapsed = Date.now() - startTime;
        if (elapsed < minLoadTime) {
          await new Promise(resolve => setTimeout(resolve, minLoadTime - elapsed));
        }
      } catch (err) {  } finally {
        
        setIsLoading(false);
      }
    }

    initializeApp();
  }, []);

  
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#E3F0F9' }}>
        <LoadingScreen />
      </View>
    );
  }

  
  return <Redirect href={isAuthed ? '/(drawer)/Home' : '/login'} />;
}

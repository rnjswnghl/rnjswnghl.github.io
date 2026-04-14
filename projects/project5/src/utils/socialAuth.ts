import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { 
  signInWithCredential, 
  GoogleAuthProvider,
  User as FirebaseUser 
} from 'firebase/auth';
import { auth } from '../config/firebase';

WebBrowser.maybeCompleteAuthSession();

// 환경 변수에서만 Google Web Client ID 가져오기 (하드코딩 완전 제거)
const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '';
if (!GOOGLE_WEB_CLIENT_ID) {
  console.error('❌ EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID 환경 변수가 설정되지 않았습니다!');
  console.error('📝 .env 파일에 EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID을 설정하세요.');
}

export async function signInWithGoogle(): Promise<{
  backendToken: string; // Firebase ID 토큰을 backendToken으로 반환 (기존 코드 호환성)
  user: {
    id: number;
    userId?: string;
    name?: string;
    nickname?: string;
    profileImageUrl?: string;
  };
} | null> {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: 'daltoori',
    });

    const request = new AuthSession.AuthRequest({
      clientId: GOOGLE_WEB_CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.IdToken,
      redirectUri,
      extraParams: {},
    });

    const discovery = {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
    };

    const result = await request.promptAsync(discovery, {
      showInRecents: true,
    });

    if (result.type !== 'success') {
      return null;
    }

    const { id_token } = result.params;
    if (!id_token) {
      throw new Error('Google ID 토큰을 받지 못했습니다.');
    }

    const credential = GoogleAuthProvider.credential(id_token);
    const firebaseUserCredential = await signInWithCredential(auth, credential);
    const firebaseUser = firebaseUserCredential.user;

    const firebaseIdToken = await firebaseUser.getIdToken();

    const uidHash = firebaseUser.uid.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    const userId = Math.abs(uidHash);

    const user = {
      id: userId,
      userId: firebaseUser.email?.split('@')[0] ?? firebaseUser.uid.substring(0, 8),
      name: firebaseUser.displayName ?? undefined,
      nickname: firebaseUser.displayName ?? undefined,
      profileImageUrl: firebaseUser.photoURL ?? undefined,
    };

    return {
      backendToken: firebaseIdToken,
      user,
    };
  } catch (error: any) {
    throw error;
  }
}

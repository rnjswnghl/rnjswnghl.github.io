import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

let AsyncStorage: any = null
try {
  // 웹/데모 환경에서는 native AsyncStorage가 없을 수 있음
  AsyncStorage = require('@react-native-async-storage/async-storage').default
} catch {}

const DEMO =
  !process.env.EXPO_PUBLIC_API_BASE_URL &&
  !process.env.EXPO_PUBLIC_FASTAPI_BASE_URL

const memoryStorage = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: async (name: string) => store[name] ?? null,
    setItem: async (name: string, value: string) => {
      store[name] = value
    },
    removeItem: async (name: string) => {
      delete store[name]
    },
  }
})()

export type User = {
  id: number;
  userId?: string;
  name?: string;                        
  nickname?: string;
  profileImageUrl?: string;
};

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (payload: { token: string; user: User }) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: DEMO ? 'demo-token' : null,
      isAuthenticated: DEMO ? true : false,
      user: DEMO
        ? { id: 1, userId: 'demo', nickname: 'Demo User' }
        : null,
      login: ({ token, user }) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'daltoori-auth',
      storage: createJSONStorage(() => (AsyncStorage?.getItem ? AsyncStorage : memoryStorage)),
    }
  )
);

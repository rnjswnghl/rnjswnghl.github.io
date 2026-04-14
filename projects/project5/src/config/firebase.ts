import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { getFirestore, type Firestore } from 'firebase/firestore'

// ⚠️ 환경변수를 .env 파일에 설정해야 합니다!
// .env.example 파일을 참고하여 .env 파일을 생성하세요.
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const DEMO =
  !process.env.EXPO_PUBLIC_FIREBASE_API_KEY &&
  !process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID &&
  !process.env.EXPO_PUBLIC_API_BASE_URL &&
  !process.env.EXPO_PUBLIC_FASTAPI_BASE_URL

// 필수 환경변수 검증
if (!DEMO && (!firebaseConfig.apiKey || !firebaseConfig.projectId)) {
  console.error('❌ Firebase 환경변수가 설정되지 않았습니다!');
  console.error('📝 .env.example 파일을 .env로 복사하고 실제 값을 입력하세요.');
}

const googleProvider = new GoogleAuthProvider()

// 데모(정적 웹)에서는 Firebase 초기화를 하지 않고, 필요한 경우에만 runtime 에러로 알려준다.
function demoStub<T extends object>(name: string): T {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(
          `[Daltoori Demo] Firebase(${name})는 데모 빌드에서 비활성화되어 있습니다.`,
        )
      },
    },
  ) as T
}

let app: FirebaseApp
let auth: Auth
let storage: FirebaseStorage
let db: Firestore

if (DEMO) {
  app = demoStub<FirebaseApp>('app')
  auth = demoStub<Auth>('auth')
  storage = demoStub<FirebaseStorage>('storage')
  db = demoStub<Firestore>('firestore')
} else {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  storage = getStorage(app)
  db = getFirestore(app)
}

export { app, auth, googleProvider, storage, db }
export default app

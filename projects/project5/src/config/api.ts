import { Platform } from 'react-native'

const fromEnv = process.env.EXPO_PUBLIC_API_BASE_URL?.replace(/\/+$/, '')
const DEMO =
  !process.env.EXPO_PUBLIC_API_BASE_URL &&
  !process.env.EXPO_PUBLIC_FASTAPI_BASE_URL

// 환경 변수에서만 API Base URL 가져오기 (하드코딩 완전 제거)
if (!fromEnv) {
  console.error('❌ EXPO_PUBLIC_API_BASE_URL 환경 변수가 설정되지 않았습니다!');
  console.error('📝 .env 파일에 EXPO_PUBLIC_API_BASE_URL을 설정하세요.');
}
const REAL_API_BASE = fromEnv || ''

const fromFastApiEnv = process.env.EXPO_PUBLIC_FASTAPI_BASE_URL?.replace(/\/+$/, '')
// 개발 환경에서는 .env 파일에 EXPO_PUBLIC_FASTAPI_BASE_URL을 설정하세요
const FASTAPI_BASE =
  fromFastApiEnv ||
  (Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000')

function getApiBase(path: string): string {
  if (path.startsWith('/fastapi')) {
    return FASTAPI_BASE;
  }
  
  if (fromEnv) return fromEnv;
  
  return REAL_API_BASE;
}

export const API_BASE = REAL_API_BASE;
export const API_USER = '/api/user';
export const FASTAPI_BASE_URL = FASTAPI_BASE;

const joinPath = (base: string, path: string) =>
  `${base}${path.startsWith('/') ? path : `/${path}`}`

type TokenGetter = () => string | null | undefined;
let tokenGetter: TokenGetter | null = null;
export const setAuthTokenGetter = (fn: TokenGetter) => { tokenGetter = fn; };

type AuthExpiredHandler = () => void;
let authExpiredHandler: AuthExpiredHandler | null = null;
export const setAuthExpiredHandler = (fn: AuthExpiredHandler) => { authExpiredHandler = fn; };

export async function apiFetch(path: string, init: RequestInit = {}) {
  if (DEMO) {
    // 데모(정적 웹)에서는 네트워크 호출 대신 최소 응답을 반환
    return new Response(JSON.stringify({ demo: true, path }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const isFormData = typeof FormData !== 'undefined' && init.body instanceof FormData;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(!isFormData && init.body ? { 'Content-Type': 'application/json' } : {}),
    ...(init.headers as Record<string, string> | undefined),
  };
  const token = tokenGetter?.();
  if (token) headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

  
  const apiBase = getApiBase(path);
  const fullUrl = joinPath(apiBase, path);
  const isImportantPath = path.includes('/recordings') || path.includes('/evaluation/evaluate');
  
  const method = init.method || (init.body ? 'POST' : 'GET');
  const fetchOptions: RequestInit = {
    method: method,
    headers: {
      ...headers,
      
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
    },
    body: init.body,
    
    ...(Platform.OS !== 'android' && { credentials: 'include' }),
  };
  
  try {
    let res: Response;
    try {
      res = await fetch(fullUrl, fetchOptions);
    } catch (fetchErr: any) {
      throw fetchErr;
    }

    return res;
  } catch (fetchError: any) {
    const errorMsg = fetchError?.message || String(fetchError);
    const isNetworkError = errorMsg.includes('Network request failed') || 
                          errorMsg.includes('Failed to connect') ||
                          errorMsg.includes('ECONNREFUSED');
    
    let errorMessage = `네트워크 요청 실패: ${fullUrl}`;
    if (isNetworkError) {
      errorMessage += `\n\n해결 방법:\n`;
      errorMessage += `1. 서버가 실행 중인지 확인\n`;
      errorMessage += `2. 인터넷 연결 상태 확인\n`;
      errorMessage += `3. .env 파일의 서버 주소가 올바른지 확인\n`;
      if (Platform.OS === 'android' && fullUrl.includes('10.0.2.2')) {
        errorMessage += `4. Android 실제 기기를 사용하는 경우: .env 파일에 EXPO_PUBLIC_API_BASE_URL을 실제 IP 주소로 설정\n`;
      } else if (fullUrl.includes('localhost') || fullUrl.includes('127.0.0.1')) {
        errorMessage += `4. 실제 기기를 사용하는 경우: .env 파일에 EXPO_PUBLIC_API_BASE_URL을 실제 IP 주소로 설정\n`;
        errorMessage += `5. 컴퓨터 IP 확인: Windows(ipconfig), Mac/Linux(ifconfig 또는 ip addr)\n`;
      }
    } else {
      errorMessage += `\n에러: ${errorMsg}`;
    }
    
    throw new Error(errorMessage);
  }
}

export async function apiJson<T = unknown>(path: string, init?: RequestInit) {
  if (DEMO) {
    const demoCategories = [
      { id: 1, key: 'deliver', title: '전달' },
      { id: 2, key: 'persuade', title: '설득' },
      { id: 3, key: 'empathy', title: '교감' },
      { id: 4, key: 'emotion', title: '감정' },
      { id: 5, key: 'directive', title: '지시' },
      { id: 6, key: 'interrogative', title: '질의형' },
    ]
    const demoScripts: Record<number, { id: number; text: string }[]> = {
      1: [
        { id: 101, text: '안녕하세요. Daltoori 데모 문장입니다.' },
        { id: 102, text: '발음과 억양을 또렷하게 연습해보세요.' },
      ],
      2: [
        { id: 201, text: '이 제안은 사용자 경험을 더 좋게 만듭니다.' },
        { id: 202, text: '핵심은 명확한 발음과 자연스러운 리듬입니다.' },
      ],
      3: [{ id: 301, text: '괜찮아요. 천천히 다시 해봐도 돼요.' }],
      4: [{ id: 401, text: '오늘은 정말 기분이 좋아요!' }],
      5: [{ id: 501, text: '지금부터 한 문장씩 따라 읽어보세요.' }],
      6: [{ id: 601, text: '오늘 면접은 몇 시에 시작하나요?' }],
    }

    const url = new URL(`http://demo${path.startsWith('/') ? '' : '/'}${path}`)
    const pathname = url.pathname

    if (pathname === '/api/category') {
      return { ok: true, status: 200, data: demoCategories as any as T, raw: null as any }
    }
    const scriptsMatch = pathname.match(/^\/api\/category\/(\d+)\/scripts$/)
    if (scriptsMatch) {
      const id = Number(scriptsMatch[1])
      return {
        ok: true,
        status: 200,
        data: (demoScripts[id] ?? demoScripts[1]) as any as T,
        raw: null as any,
      }
    }

    if (pathname.startsWith('/fastapi/evaluation/')) {
      return { ok: true, status: 200, data: ({ status: 'demo' } as any) as T, raw: null as any }
    }

    return { ok: true, status: 200, data: ({ status: 'demo' } as any) as T, raw: null as any }
  }

  const apiJsonStartTime = Date.now();
  const isImportantPath = path.includes('/recordings') || path.includes('/evaluation/evaluate');
  
  let res: Response;
  try {
    res = await apiFetch(path, init);
  } catch (fetchError: any) {
    return {
      ok: false,
      status: 0,
      data: {
        error: fetchError?.message || String(fetchError),
        message: fetchError?.message || '네트워크 요청에 실패했습니다.',
      } as T,
      raw: null as any,
    };
  }
  
  let data: any = null;
  let responseText: string = '';
  
  try {
    
    responseText = await res.text();
    
    
    if (!responseText || responseText.trim().length === 0) {
      data = null;
    } else {
      
      try {
        data = JSON.parse(responseText);
        
        
        if (path.includes('/api/category') && !path.includes('/scripts') && Array.isArray(data)) {
          data = data.map((item: any) => {
            if (item && typeof item === 'object') {
              
              if (item.title === '질의형' && !item.key) {
                return { ...item, key: 'interrogative' };
              }
              
              const titleToKeyMap: Record<string, string> = {
                '전달': 'deliver',
                '설득': 'persuade',
                '교감': 'empathy',
                '감정': 'emotion',
                '지시': 'directive',
                '질의형': 'interrogative',
                '질의': 'interrogative',
              };
              if (!item.key && item.title && titleToKeyMap[item.title]) {
                return { ...item, key: titleToKeyMap[item.title] };
              }
            }
            return item;
          });
        }
      } catch {
        
        
        if (res.ok) {
          
          data = { 
            message: responseText, 
            raw: responseText 
          };
        } else {
          
          data = { 
            message: responseText, 
            error: responseText,
            raw: responseText 
          };
        }
      }
    }
  } catch (textError) {
    data = { 
      message: '응답을 읽을 수 없습니다.', 
      error: String(textError) 
    };
  }
  
  
  if (!res.ok) {
    const isAuthError = res.status === 401 || res.status === 403;
    
    
    const hasToken = !!tokenGetter?.();
    const lowerResponseText = responseText.toLowerCase();
    const lowerError = (data as any)?.error?.toLowerCase() || '';
    const lowerMessage = (data as any)?.message?.toLowerCase() || '';
    
    
    const hasAuthKeyword = 
      lowerError.includes('token') ||
      lowerError.includes('인증') ||
      lowerError.includes('expired') ||
      lowerError.includes('unauthorized') ||
      lowerMessage.includes('token') ||
      lowerMessage.includes('인증') ||
      lowerMessage.includes('expired') ||
      lowerMessage.includes('unauthorized') ||
      lowerResponseText.includes('token') ||
      lowerResponseText.includes('인증') ||
      lowerResponseText.includes('expired') ||
      lowerResponseText.includes('unauthorized');
    
    
    
    const isAuthRelated500 = res.status === 500 && hasToken && (
      hasAuthKeyword ||
      
      (!responseText || responseText.trim().length === 0) ||
      (!lowerResponseText.includes('internal server error') &&
       !lowerResponseText.includes('서버 내부 오류') &&
       !lowerResponseText.includes('database') &&
       !lowerResponseText.includes('db error') &&
       !lowerResponseText.includes('sql'))
    );
    
    if (isAuthError || isAuthRelated500) {
      
      if (authExpiredHandler) {
        
        setTimeout(() => {
          authExpiredHandler?.();
        }, 100);
      }
    }
  }
  
  return { ok: res.ok, status: res.status, data: data as T, raw: res };
}

export type ReferenceAudioResponse = {
  status?: string;
  script_id?: number | string;
  reference_audio_id?: number | string;
  hello_tts_download_url?: string;
  reference_tts_download_url?: string;
  download_url?: string;
  url?: string;
  visualization_json_url?: string;
  [k: string]: any;
};

export async function fastapiGetReferenceAudio(scriptId: number | string) {
  return apiJson<ReferenceAudioResponse>(`/fastapi/evaluation/reference_audio/${encodeURIComponent(String(scriptId))}`, {
    method: 'GET',
  });
}

export async function fastapiGenerateReference(params: { category_id: number | string; script_id: number | string; text: string }) {
  return apiJson<{ message?: string }>(`/fastapi/evaluation/generate-reference`, {
    method: 'POST',
    body: JSON.stringify({
      category_id: typeof params.category_id === 'string' ? parseInt(params.category_id, 10) : params.category_id,
      script_id: typeof params.script_id === 'string' ? parseInt(params.script_id, 10) : params.script_id,
      text: params.text,
    }),
  });
}

export function pickDownloadUrl(data: ReferenceAudioResponse | null | undefined): string | null {
  if (!data || typeof data !== 'object') return null;
  const candidates: (string | undefined)[] = [
    
    data.hello_tts_download_url,
    data.reference_tts_download_url,
    data.melo_tts_download_url,
    data.melo_tts_url,
    data.download_url,
    data.url,
  ];
  for (const u of candidates) {
    if (typeof u === 'string' && /^https?:\/\/.+/.test(u)) return u;
  }
  
  const tokenUrl = (data as any)?.hello_tts_url || (data as any)?.reference_tts_url || (data as any)?.melo_tts_url;
  if (typeof tokenUrl === 'string' && /^https?:\/\/.+/.test(tokenUrl)) return tokenUrl;
  return null;
}

export function mapCategoryKeyToFastApiId(categoryKey: string): number {
  const normalized = String(categoryKey || '').toLowerCase();
  switch (normalized) {
    case 'deliver': return 1;        
    case 'persuade': return 2;       
    case 'empathy': return 3;         
    case 'emotion': return 4;        
    case 'directive': return 5;      
    case 'interrogative': return 6;  
    default: return 1;               
  }
}

export function pickVisualizationUrl(data: ReferenceAudioResponse | null | undefined): string | null {
  if (!data || typeof data !== 'object') return null;
  const candidates: (string | undefined)[] = [
    (data as any).visualization_json_download_url,
    (data as any).visualization_download_url,
    (data as any).visualization_json_url,
    (data as any).visualization_url,
  ];
  for (const u of candidates) {
    if (typeof u === 'string' && /^https?:\/\/.+/.test(u)) return u;
  }
  return null;
}

export type EvaluationResponse = {
  status?: string;
  recording_id?: number;
  evaluation_id?: number;
  scores?: {
    '1_wer_per'?: number;
    '2_clarity'?: number;
    '3_rules'?: number;
    '4_pitch'?: number;
    '5_stress'?: number;
    '6_ending'?: number;
    '7_speech_rate'?: number;
    '8_pause'?: number;
    '9_rhythm'?: number;
  };
  categories?: {
    segmental?: number;
    prosodic?: number;
    fluency?: number;
  };
  total_score?: number;
  evaluated_at?: string;
  [k: string]: any;
};

function extractStoragePath(url: string): string {
  let path = url.replace(/^gs:\/\/[^/]+\//, '');
  
  const firebaseUrlMatch = path.match(/\/o\/([^?]+)/);
  if (firebaseUrlMatch) {
    path = decodeURIComponent(firebaseUrlMatch[1]);
  } else {
    path = path.split('?')[0];
    
    const pathMatch = path.match(/users\/[^/]+\/sessions\/[^/]+\/recordings\/[^?]+/);
    if (pathMatch) {
      path = pathMatch[0];
    }
  }
  
  return path;
}

export async function fastapiEvaluate(params: {
  recording_path: string; 
  session_id: number | string;
  script_id: number | string;
  category_id: number | string;
  text: string;
  sequence?: number | string;
}): Promise<{ ok: boolean; status: number; data: EvaluationResponse; raw: Response }> {
  
  let recordingPath = params.recording_path;
  // 환경 변수에서만 Firebase Storage Bucket 가져오기 (하드코딩 완전 제거)
  const FIREBASE_BUCKET = process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!FIREBASE_BUCKET) {
    throw new Error('❌ EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET 환경 변수가 설정되지 않았습니다. .env 파일을 확인하세요.');
  }
  
  
  if (recordingPath.startsWith('gs://')) {
    
  }
  
  else if (recordingPath.startsWith('http://') || recordingPath.startsWith('https://')) {
    const extractedPath = extractStoragePath(recordingPath);
    recordingPath = `gs://${FIREBASE_BUCKET}/${extractedPath}`;
  }
  
  else if (recordingPath.startsWith('users/')) {
    recordingPath = `gs://${FIREBASE_BUCKET}/${recordingPath}`;
  }
  
  else {
    recordingPath = `gs://${FIREBASE_BUCKET}/${recordingPath}`;
  }
  
  const formData = new FormData();
  formData.append('recording_path', recordingPath);
  formData.append('session_id', String(params.session_id));
  formData.append('script_id', String(params.script_id));
  formData.append('category_id', String(params.category_id));
  formData.append('text', params.text);
  if (params.sequence !== undefined) {
    formData.append('sequence', String(params.sequence));
  }
  
  return apiJson<EvaluationResponse>(`/fastapi/evaluation/evaluate`, {
    method: 'POST',
    body: formData,
    headers: {},
  });
}

export async function fastapiInstantFeedback(params: {
  evaluation_id: number | string;
  session_id: number | string;
  script_id: number | string;
  sequence: number | string;
  text: string;
}): Promise<{ ok: boolean; status: number; data: string; raw: Response }> {
  const requestBody = {
    evaluation_id: Number(params.evaluation_id),
    session_id: Number(params.session_id),
    script_id: Number(params.script_id),
    sequence: Number(params.sequence),
    text: params.text,
  };

  return apiJson<string>(`/fastapi/evaluation/instant-feedback`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
}

export type EvaluationHistoryDetailItem = {
  recording_num?: number;
  script?: string;
  script_id?: number;
  scores?: {
    '1_wer_per'?: number;
    '2_clarity'?: number;
    '3_rules'?: number;
    '4_pitch'?: number;
    '5_stress'?: number;
    '6_ending'?: number;
    '7_speech_rate'?: number;
    '8_pause'?: number;
    '9_rhythm'?: number;
    total?: number;
  };
  detailed_feedback?: string;
  reference_audio?: {
    url?: string;
    download_url?: string;
  };
  user_recording?: {
    url?: string;
    download_url?: string;
  };
  [k: string]: any;
};

export type EvaluationHistorySession = {
  session_id?: number;
  generated_at?: string;
  overall_score?: number;
  comprehensive_feedback?: string;
  overall?: {
    average_scores?: {
      '1_wer_per'?: number;
      '2_clarity'?: number;
      '3_rules'?: number;
      '4_pitch'?: number;
      '5_stress'?: number;
      '6_ending'?: number;
      '7_speech_rate'?: number;
      '8_pause'?: number;
      '9_rhythm'?: number;
      total?: number;
    };
    improvement?: {
      score_change?: number;
      trend?: string;
    };
    summary_feedback?: string;
  };
  detailed?: EvaluationHistoryDetailItem[];
  suggestions?: string[];
  strengths?: string[];
  improvement_areas?: string[];
  [k: string]: any;
};

export type EvaluationHistoryResponse = {
  status?: string;
  user_id?: string;
  data?: EvaluationHistorySession[];
  total?: number;
  returned?: number;
  limit?: number;
  offset?: number;
  [k: string]: any;
};

export type EvaluationHistoryItem = EvaluationHistorySession;

export async function fastapiGetEvaluationHistory(params: {
  limit?: number;
  offset?: number;
}): Promise<{ ok: boolean; status: number; data: EvaluationHistoryResponse; raw: Response }> {
  const startTime = Date.now();
  
  const queryParams = new URLSearchParams();
  if (params.limit !== undefined) {
    queryParams.append('limit', String(params.limit));
  }
  if (params.offset !== undefined) {
    queryParams.append('offset', String(params.offset));
  }
  
  const queryString = queryParams.toString();
  const path = `/fastapi/evaluation/history${queryString ? `?${queryString}` : ''}`;
  
  try {
    const result = await apiJson<EvaluationHistoryResponse>(path, {
      method: 'GET',
    });
    
    return result;
  } catch (error: any) {
    throw error;
  }
}

export type ComprehensiveFeedbackResponse = {
  status: string;
  feedback_id?: string;
  user_id: string;
  session_id: number;
  comprehensive_feedback: string;
  overall_score: number;
  overall: {
    average_scores: {
      [key: string]: number; 
      total: number;
    };
    improvement: {
      score_change: number;
      trend: '개선' | '유지' | '악화';
    };
    summary_feedback: string;
  };
  detailed: {
    recording_num: number;
    script: string;
    scores: {
      [key: string]: number;
      total: number;
    };
    detailed_feedback: string;
    reference_audio?: {
      url?: string;
      download_url?: string;
    };
    user_recording?: {
      url?: string;
      download_url?: string;
    };
  }[];
  suggestions?: string[];
  strengths?: string[];
  improvement_areas?: string[];
  generated_at?: string;
};

export async function fastapiComprehensiveFeedback(params: {
  user_id: string | number;
  session_id: number | string;
  script_id?: number | string;
  text?: string;
}): Promise<{ ok: boolean; status: number; data: ComprehensiveFeedbackResponse; raw: Response }> {
  const requestBody: any = {
    user_id: String(params.user_id),
    session_id: Number(params.session_id),
  };
  
  if (params.script_id !== undefined) {
    requestBody.script_id = Number(params.script_id);
  }
  
  if (params.text !== undefined) {
    requestBody.text = params.text;
  }

  return apiJson<ComprehensiveFeedbackResponse>(`/fastapi/evaluation/feedback`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
}

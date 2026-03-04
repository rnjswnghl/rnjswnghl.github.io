import { axiosInstance } from '@/utils/axios'
import { MOCK_MODE } from '@/utils/mockData'
import type { QuizSet, QuizResult } from '@/types/quiz'

// 🧪 Mock 데이터 (MOCK_MODE일 때 사용, groupId는 MOCK_STUDIES와 일치)
const MOCK_QUIZ_SETS: QuizSet[] = [
  {
    id: 'quiz-1',
    groupId: '1',
    title: '파일 업로드 기반 퀴즈',
    description: '업로드된 파일을 분석하여 생성된 퀴즈입니다.',
    questions: [
      {
        id: 'q1',
        question: '다음 중 Vue.js의 특징이 아닌 것은?',
        type: 'multiple-choice',
        options: ['반응형 데이터 바인딩', '컴포넌트 기반 아키텍처', '서버 사이드 렌더링', '양방향 데이터 바인딩'],
        correctAnswer: '서버 사이드 렌더링',
        explanation: 'Vue.js는 클라이언트 사이드 프레임워크입니다.',
        difficulty: 'medium'
      },
      {
        id: 'q2',
        question: 'Vue 3에서 Composition API를 사용하는 것이 옳은가?',
        type: 'true-false',
        correctAnswer: 'true',
        explanation: 'Vue 3에서는 Composition API를 권장합니다.',
        difficulty: 'easy'
      },
      {
        id: 'q3',
        question: 'Vue.js에서 상태 관리를 위해 사용하는 라이브러리는?',
        type: 'short-answer',
        correctAnswer: 'Pinia',
        explanation: 'Vue 3에서는 Pinia를 권장합니다.',
        difficulty: 'easy'
      }
    ],
    totalQuestions: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceFiles: ['document1.pdf', 'document2.txt']
  },
  {
    id: 'quiz-2',
    groupId: '3',
    title: 'React/Next.js 퀴즈',
    description: '프론트엔드 스터디 퀴즈입니다.',
    questions: [
      {
        id: 'q1',
        question: 'React에서 컴포넌트를 정의하는 방법은?',
        type: 'short-answer',
        correctAnswer: '함수 또는 클래스',
        explanation: 'React는 함수형 컴포넌트와 클래스 컴포넌트를 지원합니다.',
        difficulty: 'easy'
      }
    ],
    totalQuestions: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceFiles: ['react-guide.pdf']
  }
]

/**
 * 스터디 그룹의 퀴즈 목록 조회
 * GET /api/studies/{groupId}/quizzes
 */
// groupId 정규화: 'FM_1' -> '1', '1' -> '1'
function normalizeGroupId(g: string): string {
  return g.startsWith('FM_') ? g.replace('FM_', '') : g
}

export async function getQuizSets(groupId: string): Promise<QuizSet[]> {
  try {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const norm = normalizeGroupId(groupId)
      return MOCK_QUIZ_SETS.filter(quiz => normalizeGroupId(quiz.groupId) === norm)
    }

    const response = await axiosInstance.get(`/studies/${groupId}/quizzes`)
    console.log('✅ 퀴즈 목록 조회 성공:', response.data)
    return response.data.data || response.data
  } catch (error) {
    console.error('❌ 퀴즈 목록 조회 실패:', error)

    // 에러 발생 시 Mock 데이터 반환 (개발 편의)
    if (MOCK_MODE) {
      console.log('🧪 에러 발생으로 Mock 데이터 반환')
      return MOCK_QUIZ_SETS.filter(quiz => quiz.groupId === groupId)
    }

    throw error
  }
}

/**
 * 특정 퀴즈 세트 상세 조회
 * GET /api/studies/{groupId}/quizzes/{quizId}
 */
export async function getQuizSet(groupId: string, quizId: string): Promise<QuizSet> {
  try {
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300))
      const norm = normalizeGroupId(groupId)
      const quiz = MOCK_QUIZ_SETS.find(q => q.id === quizId && normalizeGroupId(q.groupId) === norm)
      if (!quiz) throw new Error('퀴즈를 찾을 수 없습니다.')
      return quiz
    }

    const response = await axiosInstance.get(`/studies/${groupId}/quizzes/${quizId}`)
    console.log('✅ 퀴즈 세트 상세 조회 성공:', response.data)
    return response.data.data || response.data
  } catch (error) {
    console.error('❌ 퀴즈 세트 상세 조회 실패:', error)

    if (MOCK_MODE) {
      const norm = normalizeGroupId(groupId)
      const quiz = MOCK_QUIZ_SETS.find(q => q.id === quizId && normalizeGroupId(q.groupId) === norm)
      if (!quiz) throw new Error('퀴즈를 찾을 수 없습니다.')
      return quiz
    }
    throw error
  }
}

/**
 * 퀴즈 결과 제출
 * POST /api/studies/{groupId}/quizzes/{quizId}/results
 */
export async function submitQuizResult(
  groupId: string,
  quizId: string,
  result: Omit<QuizResult, 'quizId' | 'completedAt'>
): Promise<QuizResult> {
  try {
    if (MOCK_MODE) {
      console.log('🧪 Mock 모드: 퀴즈 결과 제출 성공')
      await new Promise(resolve => setTimeout(resolve, 200))
      return {
        ...result,
        quizId,
        completedAt: new Date().toISOString()
      }
    }

    const response = await axiosInstance.post(`/studies/${groupId}/quizzes/${quizId}/results`, result)
    console.log('✅ 퀴즈 결과 제출 성공:', response.data)
    return response.data.data || response.data
  } catch (error) {
    console.error('❌ 퀴즈 결과 제출 실패:', error)

    // 에러 발생 시 Mock 응답 반환 (개발 편의)
    if (MOCK_MODE) {
      console.log('🧪 에러 발생으로 Mock 응답 반환')
      return {
        ...result,
        quizId,
        completedAt: new Date().toISOString()
      }
    }

    throw error
  }
}

/**
 * 사용자의 퀴즈 결과 조회
 * GET /api/studies/{groupId}/quizzes/{quizId}/results
 */
export async function getQuizResults(groupId: string, quizId: string): Promise<QuizResult[]> {
  try {
    if (MOCK_MODE) {
      console.log('🧪 Mock 모드: 퀴즈 결과 조회 (빈 배열 반환)')
      await new Promise(resolve => setTimeout(resolve, 200))
      return []
    }

    const response = await axiosInstance.get(`/studies/${groupId}/quizzes/${quizId}/results`)
    console.log('✅ 퀴즈 결과 조회 성공:', response.data)
    return response.data.data || response.data
  } catch (error) {
    console.error('❌ 퀴즈 결과 조회 실패:', error)

    // 에러 발생 시 Mock 응답 반환 (개발 편의)
    if (MOCK_MODE) {
      console.log('🧪 에러 발생으로 Mock 응답 반환')
      return []
    }

    throw error
  }
}

// 출석 체크용 퀴즈 문제 조회
export const getAttendanceQuiz = () => {
  return axiosInstance.get('/quiz/attendance')
}

// 출석 체크용 퀴즈 정답 제출
export const submitAttendanceQuiz = (quizId: number, answer: string) => {
  return axiosInstance.post('/quiz/attendance/submit', { quiz_id: quizId, answer })
}

// AI 퀴즈 시작
export const startAIQuiz = (category: string) => {
  return axiosInstance.post('/quiz/ai/start', { category })
}

// AI 퀴즈 정답 제출
export const submitAIQuiz = (sessionId: string, quizId: number, answer: string) => {
  return axiosInstance.post('/quiz/ai/submit', { session_id: sessionId, quiz_id: quizId, answer })
}

// AI 퀴즈 결과 확인
export const getAIQuizResult = (sessionId: string) => {
  return axiosInstance.get('/quiz/ai/result', { params: { session_id: sessionId } })
}

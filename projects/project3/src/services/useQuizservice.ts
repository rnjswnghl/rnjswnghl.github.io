// services/useQuizservice.ts
// 통합 퀴즈 서비스 - 하드코딩 모드와 백엔드 연결 모드 전환 가능

// 목데이터 제거
import {
  getAttendanceQuiz as apiGetAttendanceQuiz,
  submitAttendanceQuiz as apiSubmitAttendanceQuiz,
  startAIQuiz as apiStartAIQuiz,
  submitAIQuiz as apiSubmitAIQuiz,
  getAIQuizResult as apiGetAIQuizResult
} from '@/api/quiz'

export const useQuizService = () => {
  console.log('🌐 퀴즈 서비스: 백엔드 API 연동 모드로 실행 중')

  const getAttendanceQuiz = () => apiGetAttendanceQuiz()

  const submitAttendanceQuiz = (quizId: number, answer: string) => apiSubmitAttendanceQuiz(quizId, answer)

  const startAIQuiz = (category: string) => apiStartAIQuiz(category)

  const submitAIQuiz = (sessionId: string, quizId: number, answer: string) => apiSubmitAIQuiz(sessionId, quizId, answer)

  const getAIQuizResult = (sessionId: string) => apiGetAIQuizResult(sessionId)

  return {
    getAttendanceQuiz,
    submitAttendanceQuiz,
    startAIQuiz,
    submitAIQuiz,
    getAIQuizResult,
  }
}

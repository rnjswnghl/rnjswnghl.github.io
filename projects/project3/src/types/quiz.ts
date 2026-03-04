// src/types/quiz.ts

// 퀴즈 문제 타입
export interface QuizQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  options?: string[]  // 객관식인 경우
  correctAnswer: string | string[]
  explanation?: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

// 퀴즈 세트 타입
export interface QuizSet {
  id: string
  groupId: string
  title: string
  description?: string
  questions: QuizQuestion[]
  totalQuestions: number
  createdAt: string
  updatedAt: string
  sourceFiles?: string[]  // 퀴즈 생성에 사용된 파일들
}

// 퀴즈 결과 타입
export interface QuizResult {
  quizId: string
  userId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  answers: {
    questionId: string
    userAnswer: string
    isCorrect: boolean
    timeSpent: number  // 초 단위
  }[]
  completedAt: string
}

// 퀴즈 상태 타입
export interface QuizState {
  currentQuizSet: QuizSet | null
  currentQuestionIndex: number
  userAnswers: Record<string, string>
  isCompleted: boolean
  startTime: Date | null
  endTime: Date | null
}

// 요청 타입 (추정/예시)
export interface StartAIQuizRequest {
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
}

export interface SubmitAIQuizRequest {
  answers: {
    problemId: number
    answer: string
  }[]
}

export interface AttendanceQuizRequest {
  studyId: number
  answer: string
}

// AI 퀴즈 응답 타입
export interface QuizResponse {
  quiz: string
  quizType: 'ox' | 'subject'
  answer: string
}

// AI 퀴즈 데이터 타입
export interface AIQuizData {
  groupId: string
  questions: QuizResponse[]
  generatedAt: string
  sourceFiles?: string[]
}

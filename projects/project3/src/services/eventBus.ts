import mitt from 'mitt'

// 로컬 테스트를 위한 파일

type Events = {
  // (옵션) 화면에서 강제로 토스트 띄우고 싶을 때 사용
  'toast:file-upload': { groupId: string }
  // 리더가 업로드 끝냈을 때 알림(시그널 대체/보강)
  'upload:done': { groupId: string }
  // 퀴즈 생성 완료 알림
  'quiz:generated': { groupId: string; quizData: any }
}

const bus = mitt<Events>()
export default bus

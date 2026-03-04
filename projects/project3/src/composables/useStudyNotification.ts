import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'

interface StudySchedule {
  id: number
  name: string
  category: string
  time: string
  schedule: string
  day_of_week: string
  startTime: string
  period: string[]
}

interface StudyNotification {
  studyName: string
  startTime: string
  visible: boolean
}

export function useStudyNotification() {
  const userStore = useUserStore()

  const userStudies = ref<StudySchedule[]>([])
  const currentNotification = ref<StudyNotification | null>(null)
  const notificationTimer = ref<NodeJS.Timeout | null>(null)
  const checkTimer = ref<NodeJS.Timeout | null>(null)

  // 로그인 상태 확인 - 스토어의 isLoggedIn 사용
  const isLoggedIn = computed(() => {
    return userStore.isLoggedIn
  })

  // 오늘의 스터디 일정 가져오기
  const getTodayStudies = (): StudySchedule[] => {
    if (!isLoggedIn.value) return []

    const today = new Date()
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][today.getDay()]

    return userStudies.value.filter(study => {
      const studyDays = study.day_of_week.split(',')
      return studyDays.includes(dayOfWeek)
    })
  }

  // 스터디 시작 10분 전인지 확인
  const isStudyStartingSoon = (study: StudySchedule): boolean => {
    const now = new Date()
    const [hours, minutes] = study.startTime.split(':').map(Number)
    const studyTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)

    const diff = studyTime.getTime() - now.getTime()
    const minutesLeft = Math.floor(diff / (1000 * 60))

    // 10분 전 ~ 시작 시간까지
    return minutesLeft >= -5 && minutesLeft <= 10
  }

  // 알림 표시
  const showNotification = (study: StudySchedule) => {
    currentNotification.value = {
      studyName: study.name,
      startTime: study.startTime,
      visible: true
    }

    // 5초 후 자동으로 숨기기
    notificationTimer.value = setTimeout(() => {
      hideNotification()
    }, 5000)
  }

  // 알림 숨기기
  const hideNotification = () => {
    if (currentNotification.value) {
      currentNotification.value.visible = false
    }
    if (notificationTimer.value) {
      clearTimeout(notificationTimer.value)
      notificationTimer.value = null
    }
  }

  // 알림 체크
  const checkForNotifications = () => {
    if (!isLoggedIn.value) return

    const todayStudies = getTodayStudies()
    const upcomingStudy = todayStudies.find(study => isStudyStartingSoon(study))

    if (upcomingStudy && (!currentNotification.value || currentNotification.value.studyName !== upcomingStudy.name)) {
      showNotification(upcomingStudy)
    }
  }

  // 스터디 데이터 로드 - API 명세서에 없으므로 비활성화
  const loadUserStudies = async () => {
    // 스터디 일정 캘린더 비활성화 (API 명세서에 해당 기능 없음)
    // const enableStudyCalendar = ref(false)
    userStudies.value = []
  }

  // 주기적으로 알림 체크 (1분마다)
  const startNotificationCheck = () => {
    checkTimer.value = setInterval(checkForNotifications, 60000) // 1분마다
  }

  // 알림 체크 중지
  const stopNotificationCheck = () => {
    if (checkTimer.value) {
      clearInterval(checkTimer.value)
      checkTimer.value = null
    }
  }

  // 초기화
  onMounted(() => {
    loadUserStudies()
    if (isLoggedIn.value) {
      startNotificationCheck()
      // 초기 체크
      setTimeout(checkForNotifications, 1000)
    }
  })

  // 정리
  onUnmounted(() => {
    stopNotificationCheck()
    hideNotification()
  })

  // 로그인 상태 변경 감지
  watch(isLoggedIn, (newValue) => {
    if (newValue) {
      loadUserStudies()
      startNotificationCheck()
      setTimeout(checkForNotifications, 1000)
    } else {
      stopNotificationCheck()
      hideNotification()
      userStudies.value = []
    }
  })

  return {
    currentNotification,
    hideNotification,
    isLoggedIn
  }
}

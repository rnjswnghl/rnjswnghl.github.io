import { axiosInstance } from '@/utils/axios'
import { MOCK_MODE } from '@/utils/mockData'
import { getUserStudySchedule } from '@/utils/mockData'

/**
 * 내 스터디 캘린더 조회
 * GET /api/calendar/my
 */
export async function getMyCalendar() {
  if (MOCK_MODE) {
    const loginId = localStorage.getItem('loginId')
    if (!loginId) return { status: 'SUCCESS', data: [] }
    const schedules = getUserStudySchedule(loginId)
    const studies = schedules.map((s: any) => ({
      id: s.id,
      studyId: s.studyId,
      studyName: s.studyName,
      category: s.category,
      time: s.time,
      dayOfWeek: s.day_of_week || s.schedule,
      startTime: s.startTime || s.time,
      period: Array.isArray(s.period) ? { start: s.period[0], end: s.period[1] } : s.period
    }))
    return { status: 'SUCCESS', data: [{ date: new Date().toISOString().slice(0, 10), studies }] }
  }
  try {
    const response = await axiosInstance.get('/calendar/my')
    return response.data
  } catch (error) {
    console.error('❌ 내 스터디 캘린더 조회 실패:', error)
    throw error
  }
}

/**
 * 특정 날짜의 스터디 일정 조회
 * GET /api/calendar/my/{date}
 */
export async function getMyCalendarByDate(date: string) {
  if (MOCK_MODE) {
    const calendarData = await getMyCalendar()
    return calendarData
  }
  try {
    const response = await axiosInstance.get(`/calendar/my/${date}`)
    return response.data
  } catch (error) {
    console.error('❌ 특정 날짜 스터디 일정 조회 실패:', error)
    throw error
  }
}

export interface StudySchedule {
  id: number
  studyId: number
  studyName: string
  category: string
  time: number
  dayOfWeek: string | string[]
  startTime: string
  period: {
    start: string
    end: string
  }
}

export interface CalendarData {
  date: string
  studies: StudySchedule[]
}

export interface MyCalendarResponse {
  status: string
  data: CalendarData[]
}

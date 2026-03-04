import { axiosInstance } from '@/utils/axios'

export const getMyProfile = () => {
  return axiosInstance.get('/user/me')
}

export const updateMyProfile = (data: {
  profileImg?: string
  nickname?: string
  email?: string
  studyTime?: number
  webNotify?: boolean
  emailNotify?: boolean
  interests?: Array<{ field: string }>
  timeId?: number
}) => {
  return axiosInstance.put('/user/update', data)
}

export const updateGoal = (data: { goal: string }) => {
  return axiosInstance.put('/user/goal', data)
}

export const updateDday = (data: { d_day: string }) => {
  console.log('🔍 updateDday API 호출:', { data, url: '/user/d-day' })
  return axiosInstance.put('/user/d-day', data)
}

export const checkNickname = (nickname: string) => {
  return axiosInstance.get(`/user/check-nickname?nickname=${nickname}`)
}

export const checkId = (loginId: string) => {
  return axiosInstance.get(`/user/check-id?loginId=${loginId}`)
}

export const checkEmail = (email: string) => {
  return axiosInstance.get(`/user/check-email?email=${email}`)
}

export const deleteUser = () => {
  return axiosInstance.delete('/user/delete')
}

export const getStudyStatus = (studyId?: number) => {
  return axiosInstance.get('/user/study-status', {
    params: studyId ? { studyId } : undefined,
  })
}

export const getActivityLog = () => {
  return axiosInstance.get('/user/activity-log')
}

export const getActivityLogByDate = (date: string) => {
  return axiosInstance.get(`/user/activity-log/${date}`)
}

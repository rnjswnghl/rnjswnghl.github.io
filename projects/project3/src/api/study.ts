import { axiosInstance } from '@/utils/axios'
import { MOCK_MODE, getStudies as getMockStudies, MOCK_STUDY_DETAILS } from '@/utils/mockData'
import type {
  StudyResponse,
  CreateStudyRequest,
  UpdateStudyRequest,
  CreatePostRequest,
  UpdatePostRequest,
  StudyFilterParams,
  StudyDetail,
  Notice,
  Post,
  StudyFile
} from '@/types/study'

// 스터디 목록 조회 (백엔드 API 스펙에 맞춤)
export const getStudies = (params?: StudyFilterParams) => {
  if (MOCK_MODE) {
    const keyword = params?.keyword as string | undefined
    const categoryId = params?.categoryId
    const category = Array.isArray(categoryId) ? String(categoryId[0]) : categoryId ? String(categoryId) : undefined
    const list = getMockStudies(keyword, category)
    return Promise.resolve({ data: list })
  }
  // 백엔드에서 요구하는 형태로 파라미터 변환
  const apiParams: Record<string, any> = {}

  if (params?.keyword) {
    apiParams.keyword = params.keyword
  }

  // categoryId는 항상 배열로 전달 (백엔드 스펙에 맞춤)
  if (params?.categoryId) {
    // 단일 값인 경우 배열로 변환
    apiParams.categoryId = Array.isArray(params.categoryId) ? params.categoryId : [params.categoryId]
  } else if (params?.categoryIds && params.categoryIds.length > 0) {
    // categoryIds가 있는 경우 categoryId로 변환
    apiParams.categoryId = params.categoryIds
  }

  if (params?.tag && params.tag.length > 0) {
    // tag 배열을 그대로 전달
    apiParams.tag = params.tag
  }

  if (params?.maxMembers) {
    apiParams.maxMembers = params.maxMembers
  }

  if (params?.minMembers) {
    apiParams.minMembers = params.minMembers
  }

  if (params?.timeId) {
    apiParams.timeId = params.timeId
  }

  // 배열 파라미터를 올바른 형태로 변환
  const queryParams = new URLSearchParams()

  if (apiParams.keyword) {
    queryParams.append('keyword', apiParams.keyword)
  }

  if (apiParams.categoryId && Array.isArray(apiParams.categoryId)) {
    apiParams.categoryId.forEach(id => {
      queryParams.append('categoryId', String(id))
    })
  }

  if (apiParams.tag && Array.isArray(apiParams.tag)) {
    apiParams.tag.forEach(tag => {
      queryParams.append('tag', tag)
    })
  }

  if (apiParams.maxMembers) {
    queryParams.append('maxMembers', String(apiParams.maxMembers))
  }

  if (apiParams.minMembers) {
    queryParams.append('minMembers', String(apiParams.minMembers))
  }

  if (apiParams.timeId) {
    queryParams.append('timeId', String(apiParams.timeId))
  }

  const queryString = queryParams.toString()
  const url = queryString ? `/studies/filter?${queryString}` : '/studies/filter'

  const response = axiosInstance.get<StudyResponse[]>(url)
  return response
}

// 스터디 상세 정보 조회
export const getStudyDetail = (studyId: number) => {
  if (MOCK_MODE) {
    const detail = (MOCK_STUDY_DETAILS as Record<number, any>)[studyId]
    return Promise.resolve({ data: detail || null })
  }
  return axiosInstance.get<StudyDetail>(`/studies/${studyId}`)
}

// 전체 스터디 목록 조회 (키워드 검색)
export const searchStudies = (keyword?: string) => {
  return axiosInstance.get<StudyResponse[]>('/studies/filter', {
    params: { keyword }
  })
}

// 스터디 생성
export const createStudy = (data: CreateStudyRequest) => {
  return axiosInstance.post('/studies/create', data)
}

// 스터디 참여
export const joinStudy = (studyId: number) => {
  return axiosInstance.post(`/studies/${studyId}/join`)
}

// 스터디 비밀번호로 참여
export const joinStudyWithPassword = (studyId: number, password: string) => {
  return axiosInstance.post(`/studies/${studyId}/join-with-password`, { password })
}

// 스터디 탈퇴
export const leaveStudy = (studyId: number) => {
  return axiosInstance.post(`/studies/${studyId}/leave`)
}

// 스터디 삭제
export const deleteStudy = (studyId: number) => {
  return axiosInstance.delete(`/studies/${studyId}/delete`)
}

// 스터디 비밀번호 확인
export const verifyStudyPassword = (studyId: number, password: string) => {
  return axiosInstance.post(`/studies/${studyId}/verify-password`, { password })
}

// 스터디 정보 수정
export const updateStudy = (studyId: number, data: UpdateStudyRequest) => {
  return axiosInstance.patch(`/studies/${studyId}/update`, data)
}

// 스터디 화상회의방 입장
export const enterVideoRoom = (studyId: number) => {
  return axiosInstance.get<{ url: string }>(`/studies/${studyId}/video-room`)
}

// 스터디 멤버 목록 조회
export const getStudyMembers = (studyId: number) => {
  return axiosInstance.get(`/studies/${studyId}/members`)
}

// 스터디 멤버 상세 정보 조회
export const getStudyMemberDetail = (studyId: number, memberId: number) => {
  return axiosInstance.get(`/studies/${studyId}/members/${memberId}`)
}

// 공지사항 작성
export const createNotice = (groupId: number, data: { title: string; notice: string }) => {
  return axiosInstance.post(`/studies/${groupId}/write-notice`, data)
}

// 공지사항 조회
export const getNotices = (groupId: number) => {
  if (MOCK_MODE) {
    const mockNotices = [
      { id: 1, title: '스터디 공지', notice: '매주 월, 수, 금 저녁 8시에 모입니다.', content: '매주 월, 수, 금 저녁 8시에 모입니다.', authorName: '스터디장', writer: '스터디장', createdAt: '2025-01-15', created_at: '2025-01-15' },
      { id: 2, title: '과제 안내', notice: '이번 주 과제: 백준 실버 3문제 풀기', content: '이번 주 과제: 백준 실버 3문제 풀기', authorName: '스터디장', writer: '스터디장', createdAt: '2025-01-16', created_at: '2025-01-16' },
    ]
    return Promise.resolve({ data: mockNotices })
  }
  return axiosInstance.get<Notice[]>(`/studies/${groupId}/view-notice`)
}

// 공지사항 수정
export const updateNotice = (groupId: number, noticeId: number, data: { title: string; notice: string }) => {
  return axiosInstance.patch(`/studies/${groupId}/edit-notice/${noticeId}`, data)
}

// 공지사항 삭제
export const deleteNotice = (groupId: number, noticeId: number) => {
  return axiosInstance.delete(`/studies/${groupId}/delete-notice/${noticeId}`)
}

// 자료 다운로드 목록 조회
export const getStudyFiles = (studyId: number) => {
  return axiosInstance.get<StudyFile[]>(`/studies/${studyId}/downloads`)
}

// 자료 업로드
export const uploadStudyFile = (studyId: number, file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return axiosInstance.post(`/studies/${studyId}/downloads/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 게시글 목록 조회
export const getPosts = (studyId: number) => {
  if (MOCK_MODE) {
    const mockPosts = [
      { id: 1, title: '첫 번째 게시글', notice: '스터디 화이팅!', content: '스터디 화이팅!', authorName: '테스트', writer: '테스트', createdAt: '2025-01-15', created_at: '2025-01-15' },
      { id: 2, title: '과제 제출', notice: '이번 주 과제 제출 완료했습니다.', content: '이번 주 과제 제출 완료했습니다.', authorName: '앨리스', writer: '앨리스', createdAt: '2025-01-16', created_at: '2025-01-16' },
    ]
    return Promise.resolve({ data: { data: mockPosts, status: 'success' } })
  }
  return axiosInstance.get<{data: Post[], status: string}>(`/studies/${studyId}/view-post`)
}

// 게시글 작성
export const createPost = (studyId: number, data: CreatePostRequest) => {
  return axiosInstance.post(`/studies/${studyId}/write-post`, data)
}

// 게시글 수정
export const updatePost = (studyId: number, postId: number, data: UpdatePostRequest) => {
  return axiosInstance.patch(`/studies/${studyId}/edit-post/${postId}`, data)
}

// 게시글 삭제
export const deletePost = (studyId: number, postId: number) => {
  return axiosInstance.delete(`/studies/${studyId}/delete-post/${postId}`)
}

// 방장 권한 위임
export const transferOwnership = (studyId: number, newOwnerId: number) => {
  return axiosInstance.put(`/studies/${studyId}/leader`, { userId: newOwnerId })
}

// 팀원 퇴출 (방장만 가능)
export const expelMember = (studyId: number, memberId: number) => {
  return axiosInstance.delete(`/studies/${studyId}/members/${memberId}`)
}

// 사용자 스터디 현황 조회 (API 명세서 기반)
export const getUserStudyStatus = () => {
  return axiosInstance.get('/user/study-status')
}

// 사용자가 소속된 스터디 목록 조회
export const getUserStudies = () => {
  return axiosInstance.get('/user/studies')
}

// 스터디 상세 정보 조회 (일정 포함)
export const getStudyDetailWithSchedule = (studyId: number) => {
  return axiosInstance.get(`/studies/${studyId}/detail`)
}

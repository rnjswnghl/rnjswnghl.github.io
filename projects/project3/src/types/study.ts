// 스터디 관련 타입 정의

// 기본 스터디 정보
export interface Study {
  id: number
  name: string
  category: string
  subCategory?: string
  time: string | number | null
  level: string
  currentMembers: number
  maxMembers: number
  nickname: string
  matchScore?: number
  // 새로운 필드들
  imageUrl?: string
  summary?: string
  rules?: string[]
  schedule?: string
  period?: string[] // [시작일, 종료일]
  isLeader?: boolean // 스터디장 여부
  // 새로운 API 응답 구조
  studyName?: string
  interestName?: string
  scheduleDays?: string[]
  // 백엔드 API 필드들
  categoryId?: number // 카테고리 ID (중분류)
  studyTime?: number // 스터디 시간
  groupScore?: number // 스터디 점수/시간
  currentMemberCount?: number // 현재 멤버 수
  memberCount?: number // 멤버 수 (다른 필드명)
  totalMembers?: number // 총 멤버 수 (다른 필드명)
  maxMemberCount?: number // 최대 멤버 수 (다른 필드명)
  leaderName?: string // 스터디장 이름
  leaderNickname?: string // 스터디장 닉네임
  leaderId?: number // 스터디장 ID
  createdAt?: string // 생성일
  endedAt?: string // 종료일
  interestId?: number // 관심분야 ID
  hashtags?: string[] // 해시태그
  dayIds?: number[] // 요일 ID 배열
  password?: string // 비밀번호
  rule?: string // 규칙
  noticeable?: boolean // 공지사항 여부
  startTime?: number // 시작 시간 (시간)
}

// 백엔드 API 응답 타입들 (실제 응답 구조에 맞춤)
export interface StudyResponse {
  id: number
  studyName: string
  categoryId: number
  hashtags: string[]
  time: number
  startTime: number
  createdAt: string
  currentMembers: number
  endedAt: string
  leaderNickname: string
  maxMembers: number
}

export interface CreateStudyRequest {
  studyName: string
  createdAt: string
  endedAt: string
  interestId: number
  hashtags: string[]
  dayIds: number[]
  maxMembers: number
  password: string
  rule: string
  summary: string
  leader: number
  groupScore: number
  noticeable: boolean
}

// 스터디 수정 요청 타입 (null은 유지, []는 비움 반영)
export interface UpdateStudyRequest {
  studyName?: string
  createdAt?: string
  endedAt?: string
  interestId?: number
  hashtags?: string[]
  dayIds?: number[]
  maxMembers?: number
  password?: string
  rule?: string
  summary?: string
  leader?: number
  groupScore?: number
  noticeable?: boolean
}

// 백엔드 API 스펙에 맞춘 필터 파라미터
export interface StudyFilterParams {
  keyword?: string
  categoryId?: number | number[] // interest field id (단일 값 또는 배열)
  categoryIds?: number[] // 대분류 선택 시 모든 중분류 ID 배열 (호환성)
  tag?: string[] // hash tag 문자열 배열
  maxMembers?: number // 최대 인원수
  minMembers?: number // 최소 인원수 (선택적)
  timeId?: number // 선호시간대 ID
}

// 스터디 멤버 관련 타입들
export interface StudyMember {
  userId: number
  nickname: string
  leader: boolean
  attendanceRate: number
  joinedDate: string
}

export interface StudyMemberDetail extends StudyMember {
  participationCount: number
  postCount: number
  lastActivity: string | null
}

// 백엔드 API 응답 타입
export interface StudyMembersResponse {
  data: StudyMember[]
  status: string
}

export interface StudyMemberDetailResponse {
  data: StudyMemberDetail
  status: string
}

// 검색 관련 타입들
export interface SearchFilters {
  selectedMain: string
  selectedSub: string
  rawTags: string
  preferredTime: number
  studyAmount: string
  memberCount: string
}

export interface SearchParams {
  keyword?: string
  category?: string
  'sub-category'?: string
  time?: string
  level?: string
  minMembers?: number
  maxMembers?: number
  'detail-category'?: string
}

export interface UserProfile {
  interest_id?: string
  time_id?: number
  interests?: string[]
  timeSlot?: string
}

export interface MatchingResult {
  bestMatch: Study | null
  allMatches: Study[]
  totalCount: number
}

// 스터디 상세 정보
export interface StudyDetail {
  id: number
  name: string
  category: string
  'sub-category'?: string
  'detail-category'?: string
  rules?: string
  maxMembers: number
  currentMembers: number
  time: number
  day_of_week: string
  created_at: string
  ended_at: string
  notice_able: boolean
  password?: string
  imageUrl?: string
  summary?: string
  groupId?: number // ✅ groupId 추가 (studyId와 동일한 값)
  leader: {
    id: number
    nickname: string
    profile_img?: string
  }
  members: Array<{
    id: number
    nickname: string
    profile_img?: string
  }>
}

// 공지사항
export interface Notice {
  id: number
  title: string
  content: string
  created_at: string
  writer: string
}

// 게시글
export interface Post {
  id: number
  title: string
  content: string
  writer: string
  created_at: string
}

// 게시글 작성/수정 요청 타입
export interface CreatePostRequest {
  title: string
  content: string
}

export interface UpdatePostRequest {
  title: string
  content: string
}

// 파일 업로드
export interface StudyFile {
  id: number
  filename: string
  url: string
  uploaded_at: string
  uploaded_by: string
}

// src/types/study.ts
export interface StudyLog {
  date: string
  attendance: 'present' | 'absent' // 출석 여부
  participationMinutes: number // 참여 시간(분)
  quiz: {
    question: string
    answer: string
  }[]
}

// services/useStudyService.ts
// 스터디 서비스 - 백엔드 API 연동

import { ref } from 'vue'
import {
  getStudies as apiGetStudies,
  getStudyDetail as apiGetStudyDetail,
  createStudy as apiCreateStudy,
  joinStudy as apiJoinStudy,
  leaveStudy as apiLeaveStudy,
  deleteStudy as apiDeleteStudy,
  verifyStudyPassword as apiVerifyStudyPassword,
  updateStudy as apiUpdateStudy,
  enterVideoRoom as apiEnterVideoRoom,
  createNotice as apiCreateNotice,
  getNotices as apiGetNotices,
  getStudyFiles as apiGetStudyFiles,
  uploadStudyFile as apiUploadStudyFile,
  getPosts as apiGetPosts,
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  transferOwnership as apiTransferOwnership,
  getUserStudyStatus as apiGetUserStudyStatus
} from '@/api/study'
import type { SearchParams, UserProfile, MatchingResult, CreateStudyRequest, UpdateStudyRequest, CreatePostRequest, UpdatePostRequest } from '@/types/study'

export function useStudyService() {
  const getStudyList = (keyword?: string, categoryId?: string | number | number[]) => {
    const params: Record<string, any> = {}

    if (keyword) {
      params.keyword = keyword
    }

    if (categoryId) {
      // categoryId를 배열로 변환 (백엔드 스펙에 맞춤)
      if (Array.isArray(categoryId)) {
        params.categoryId = categoryId
      } else if (typeof categoryId === 'string') {
        params.categoryId = [Number(categoryId)]
      } else {
        params.categoryId = [categoryId]
      }
    }

    console.log('📋 getStudyList 호출 - 파라미터:', params)
    return apiGetStudies(params)
  }

  // 카테고리별 스터디 필터링 (백엔드 API 스펙에 맞춤)
  const getStudiesByCategory = (filters: {
    keyword?: string
    categoryIds?: number[]
    tags?: string[]
    maxMembers?: number
  }) => {
    const params: Record<string, any> = {}

    if (filters.keyword) {
      params.keyword = filters.keyword
    }

    if (filters.categoryIds && filters.categoryIds.length > 0) {
      params.categoryIds = filters.categoryIds
    }

    if (filters.tags && filters.tags.length > 0) {
      params.tags = filters.tags
    }

    if (filters.maxMembers) {
      params.maxMembers = filters.maxMembers
    }

    return apiGetStudies(params)
  }

  const getStudyDetail = (studyId: number) =>
    apiGetStudyDetail(studyId)

  const getUserStudyStatus = () =>
    apiGetUserStudyStatus()

  const createStudy = (payload: CreateStudyRequest) =>
    apiCreateStudy(payload)

  const joinStudy = (studyId: number) =>
    apiJoinStudy(studyId)

  const leaveStudy = (studyId: number) =>
    apiLeaveStudy(studyId)

  const deleteStudy = (studyId: number) =>
    apiDeleteStudy(studyId)

  const getMatchingStudy = (query: Record<string, unknown>, userProfile?: UserProfile) => {
    // 백엔드 API에서 매칭 스터디 조회
    return apiGetStudies(query as any)
  }

  // 추가 API 함수들
  const verifyStudyPassword = (studyId: number, password: string): Promise<any> =>
    apiVerifyStudyPassword(studyId, password)

  const updateStudy = (studyId: number, updateData: UpdateStudyRequest): Promise<any> =>
    apiUpdateStudy(studyId, updateData)

  const enterVideoRoom = (studyId: number): Promise<any> =>
    apiEnterVideoRoom(studyId)

  const createNotice = (studyId: number, noticeData: Record<string, unknown>): Promise<any> =>
    apiCreateNotice(studyId, noticeData as any)

  const getNotices = (studyId: number): Promise<any> =>
    apiGetNotices(studyId)

  const getStudyFiles = (studyId: number): Promise<any> =>
    apiGetStudyFiles(studyId)

  const uploadStudyFile = (studyId: number, fileData: Record<string, unknown>): Promise<any> =>
    apiUploadStudyFile(studyId, fileData as any)

  const getPosts = (studyId: number): Promise<any> =>
    apiGetPosts(studyId)

  const createPost = (studyId: number, postData: CreatePostRequest): Promise<any> =>
    apiCreatePost(studyId, postData)

  const updatePost = (studyId: number, postId: number, postData: UpdatePostRequest): Promise<any> =>
    apiUpdatePost(studyId, postId, postData)

  const transferOwnership = (studyId: number, newOwnerId: number): Promise<any> =>
    apiTransferOwnership(studyId, newOwnerId)

  return {
    getStudyList,
    getStudyDetail,
    getUserStudyStatus,
    createStudy,
    joinStudy,
    leaveStudy,
    deleteStudy,
    getMatchingStudy,
    getStudiesByCategory,
    // 추가 API 함수들
    verifyStudyPassword,
    updateStudy,
    enterVideoRoom,
    createNotice,
    getNotices,
    getStudyFiles,
    uploadStudyFile,
    getPosts,
    createPost,
    updatePost,
    transferOwnership
  }
}

// utils/navigation.ts
// 스터디 관련 네비게이션 유틸리티 함수들

import type { Router } from 'vue-router'


/**
 * 사용자의 역할에 따라 적절한 스터디 상세 페이지로 이동하는 함수
 * @param studyId 스터디 ID
 * @param router Vue Router 인스턴스
 */
export function navigateToStudyDetail(studyId: number, router: Router) {
  // 현재 로그인한 사용자의 loginId 가져오기
  const userStr = localStorage.getItem('user')
  if (!userStr) {
    // 로그인하지 않은 경우 기본 상세 페이지로 이동
    router.push(`/study/${studyId}`)
    return
  }

  try {
    const user = JSON.parse(userStr)
    // 백엔드 API에서 사용자 역할 확인 예정
    const userRole = null

    if (userRole === 'leader') {
      // 방장인 경우 방장용 상세 페이지로 이동
      router.push(`/study/${studyId}/leader`)
    } else if (userRole === 'member') {
      // 참여자인 경우 팀메이트용 상세 페이지로 이동
      router.push(`/study/${studyId}/teammate`)
    } else {
      // 참여하지 않은 스터디인 경우 기본 상세 페이지로 이동
      router.push(`/study/${studyId}`)
    }
  } catch (error) {
    console.error('사용자 정보 파싱 실패:', error)
    // 에러 발생 시 기본 상세 페이지로 이동
    router.push(`/study/${studyId}`)
  }
}

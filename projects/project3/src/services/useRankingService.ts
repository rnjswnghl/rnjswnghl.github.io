// 랭킹 기능 비활성화
// services/useRankingService.ts
// 통합 랭킹 서비스 - 하드코딩 모드와 백엔드 연결 모드 전환 가능


// import {
//   getUserRanking as apiGetUserRanking,
//   getStudyRanking as apiGetStudyRanking
// } from '@/api/ranking'

// export const useRankingService = () => {
//   // 하드코딩 모드인지 확인
//   if (MOCK_MODE) {
//     console.log('🔧 랭킹 서비스: 하드코딩 모드로 실행 중')

//     // 하드코딩 모드용 랭킹 서비스
//     const getUserRanking = async () => {
//       await new Promise(resolve => setTimeout(resolve, 300))
//       return { data: getRankings('user') }
//     }

//     const getStudyRanking = async () => {
//       await new Promise(resolve => setTimeout(resolve, 300))
//       return { data: getRankings('study') }
//     }

//     return {
//       getUserRanking,
//       getStudyRanking,
//     }
//   }

//   // 백엔드 연결 모드
//   console.log('🌐 랭킹 서비스: 백엔드 연결 모드로 실행 중')

//   const getUserRanking = () => apiGetUserRanking()

//   const getStudyRanking = () => apiGetStudyRanking()

//   return {
//     getUserRanking,
//     getStudyRanking,
//   }
// }

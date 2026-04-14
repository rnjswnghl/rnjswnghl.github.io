import { createDemoAxios } from '@/common/core/createDemoAxios'

// Runpod 프록시용 Axios 인스턴스
// 포트폴리오 데모 목적: 항상 mock adapter만 사용
const apiRunpodInstance = createDemoAxios('runpod')

export default apiRunpodInstance

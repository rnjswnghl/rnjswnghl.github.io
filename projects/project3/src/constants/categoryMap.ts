// src/constants/categoryMap.ts
// 카테고리 ID 매핑 (백엔드 API 스펙에 맞춰 정의)
export const CATEGORY_IDS = {
  // 대분류: 어학 (ID: 39)
  '어학': {
    id: 39,
    subCategories: {
      '영어': { id: 1, parentId: 39 },
      '일본어': { id: 2, parentId: 39 },
      '중국어': { id: 3, parentId: 39 },
      '스페인어': { id: 4, parentId: 39 },
      '제2외국어': { id: 5, parentId: 39 }
    }
  },
  // 대분류: IT (ID: 40)
  'IT': {
    id: 40,
    subCategories: {
      '프로그래밍 언어': { id: 6, parentId: 40 },
      '알고리즘': { id: 7, parentId: 40 },
      '프론트엔드': { id: 8, parentId: 40 },
      '백엔드': { id: 9, parentId: 40 },
      'AI': { id: 10, parentId: 40 },
      'CS': { id: 11, parentId: 40 }
    }
  },
  // 대분류: 자격증 (ID: 41)
  '자격증': {
    id: 41,
    subCategories: {
      '어학': { id: 12, parentId: 41 },
      'IT / 컴퓨터': { id: 13, parentId: 41 },
      '금융 / 경영': { id: 14, parentId: 41 },
      '행정 / 공공': { id: 15, parentId: 41 },
      '교육 / 자격 교원': { id: 16, parentId: 41 },
      '디자인 / 콘텐츠': { id: 17, parentId: 41 },
      '건설 / 산업기술': { id: 18, parentId: 41 },
      '보건 / 의료': { id: 19, parentId: 41 },
      '기타': { id: 20, parentId: 41 }
    }
  },
  // 대분류: 공무원 / 임용 (ID: 42)
  '공무원 / 임용': {
    id: 42,
    subCategories: {
      '9급 공무원(행정)': { id: 21, parentId: 42 },
      '7급 공무원': { id: 22, parentId: 42 },
      '경찰 / 소방 공무원': { id: 23, parentId: 42 },
      '군무원 / 국방직': { id: 24, parentId: 42 },
      '교정 / 보호 / 출입국': { id: 25, parentId: 42 },
      '기술직 공무원': { id: 26, parentId: 42 },
      '교육공무직 / 학교직원': { id: 27, parentId: 42 },
      '기타특수직': { id: 28, parentId: 42 }
    }
  },
  // 대분류: 프로젝트 / 팀 활동 (ID: 43)
  '프로젝트 / 팀 활동': {
    id: 43,
    subCategories: {
      '공모전': { id: 29, parentId: 43 },
      '대회': { id: 30, parentId: 43 },
      '논문': { id: 31, parentId: 43 },
      '팀플레이': { id: 32, parentId: 43 },
      '발표': { id: 33, parentId: 43 }
    }
  },
  // 대분류: 취업 및 멘토 (ID: 44)
  '취업 및 멘토': {
    id: 44,
    subCategories: {
      '이력서 / 포트폴리오 작성': { id: 34, parentId: 44 },
      '자소서 피드백': { id: 35, parentId: 44 },
      '모의 면접': { id: 36, parentId: 44 },
      '기업 / 직무 분석': { id: 37, parentId: 44 },
      '시사 뉴스 토론': { id: 38, parentId: 44 }
    }
  }
}

// 해시태그 문자열 매핑 (백엔드에서 문자열로 받음)
export const TAG_NAMES = {
  '면접': '면접',
  '코테': '코테',
  '알고리즘': '알고',
  '프로젝트': '프로젝트',
  '포트폴리오': '포트폴리오',
  '자격증': '자격증',
  '공모전': '공모전',
  '대회': '대회',
  '논문': '논문',
  '팀플': '팀플',
  '발표': '발표',
  '영어': '영어',
  '일본어': '일본어',
  '중국어': '중국어',
  '스페인어': '스페인어',
  '프로그래밍': '프로그래밍',
  'AI': 'AI',
  '머신러닝': '머신러닝',
  '딥러닝': '딥러닝',
  '웹개발': '웹개발',
  '앱개발': '앱개발',
  '데이터분석': '데이터분석',
  '데이터베이스': '데이터베이스',
  '클라우드': '클라우드',
  '보안': '보안',
  '네트워크': '네트워크',
  '운영체제': '운영체제',
  '컴퓨터구조': '컴퓨터구조',
  '자료구조': '자료구조',
  '수학': '수학',
  '통계': '통계',
  '확률': '확률',
  '선형대수': '선형대수',
  '미적분학': '미적분학',
  '이산수학': '이산수학',
  '논리학': '논리학',
  '집합론': '집합론',
  '그래프이론': '그래프이론',
  '조합론': '조합론',
  '정수론': '정수론',
  '기하학': '기하학',
  '위상수학': '위상수학',
  '해석학': '해석학',
  '대수학': '대수학',
  '군론': '군론',
  '환론': '환론',
  '체론': '체론',
  '가환대수': '가환대수',
  '호몰로지대수': '호몰로지대수',
  '카테고리론': '카테고리론'
}

// 기존 카테고리 맵 (UI용)
export const categoryMap = {
  '어학': ['영어', '일본어', '중국어', '스페인어', '제2외국어'],
  'IT': ['프로그래밍 언어', '알고리즘', '프론트엔드', '백엔드', 'AI', 'CS'],
  '자격증': ['어학', 'IT / 컴퓨터', '금융 / 경영', '행정 / 공공', '교육 / 자격 교원', '디자인 / 콘텐츠', '건설 / 산업기술', '보건 / 의료', '기타'],
  '공무원 / 임용': ['9급 공무원(행정)', '7급 공무원', '경찰 / 소방 공무원', '군무원 / 국방직', '교정 / 보호 / 출입국', '기술직 공무원', '교육공무직 / 학교직원', '기타특수직'],
  '프로젝트 / 팀 활동': ['공모전', '대회', '논문', '팀플레이', '발표'],
  '취업 및 멘토': ['이력서 / 포트폴리오 작성', '자소서 피드백', '모의 면접', '기업 / 직무 분석', '시사 뉴스 토론']
}

// 유틸리티 함수들
export function getCategoryId(mainCategory: string, subCategory?: string): number {
  const category = CATEGORY_IDS[mainCategory as keyof typeof CATEGORY_IDS]
  if (!category) return 0

  if (subCategory) {
    const subCat = category.subCategories[subCategory as keyof typeof category.subCategories] as { id: number } | undefined
    return subCat ? subCat.id : category.id
  }

  return category.id
}

// 대분류가 선택되었을 때 모든 중분류 ID들을 반환하는 함수
export function getCategoryIds(mainCategory: string, subCategory?: string): number[] {
  console.log('🔍 getCategoryIds 호출:', { mainCategory, subCategory })

  const category = CATEGORY_IDS[mainCategory as keyof typeof CATEGORY_IDS]
  if (!category) {
    console.log('❌ 카테고리를 찾을 수 없음:', mainCategory)
    return []
  }

  if (subCategory && subCategory.trim() !== '') {
    // 중분류가 선택된 경우 해당 중분류 ID만 반환
    const subCat = category.subCategories[subCategory as keyof typeof category.subCategories] as { id: number } | undefined
    if (subCat) {
      console.log('✅ 중분류 ID 반환:', subCat.id)
      return [subCat.id]
    } else {
      console.log('❌ 중분류를 찾을 수 없음:', subCategory)
      return []
    }
  }

  // 대분류만 선택된 경우 모든 중분류 ID들을 반환
  const allSubIds = Object.values(category.subCategories).map(subCat => subCat.id)
  console.log('✅ 대분류의 모든 중분류 ID 반환:', allSubIds)
  return allSubIds
}

// 카테고리 ID로부터 카테고리 이름 가져오기
export function getCategoryNameById(categoryId: number): { mainCategory: string; subCategory?: string } | null {
  for (const [mainCategory, category] of Object.entries(CATEGORY_IDS)) {
    // 대분류 ID 확인
    if (category.id === categoryId) {
      return { mainCategory }
    }

    // 중분류 ID 확인
    for (const [subCategory, subCat] of Object.entries(category.subCategories)) {
      if (subCat.id === categoryId) {
        return { mainCategory, subCategory }
      }
    }
  }

  return null
}

export function getTagNames(tags: string[]): string[] {
  return tags
    .map(tag => TAG_NAMES[tag as keyof typeof TAG_NAMES])
    .filter(name => name !== undefined)
}

export function extractTagsFromText(text: string): string[] {
  return text.match(/#(\S+)/g)?.map(tag => tag.replace('#', '')) || []
}

// interestName에서 대분류와 중분류 분리
export function parseInterestName(interestName: string): { mainCategory: string; subCategory: string } | null {
  if (!interestName) return null

  const parts = interestName.split(',')
  if (parts.length !== 2) return null

  const mainCategory = parts[0].trim()
  const subCategory = parts[1].trim()

  return { mainCategory, subCategory }
}

// 시간 계산 함수 (시작시간과 종료시간으로부터)
export function calculateStudyTime(startTime: string, endTime: string): number {
  try {
    const start = new Date(`2000-01-01T${startTime}`)
    const end = new Date(`2000-01-01T${endTime}`)

    if (end < start) {
      // 다음날로 넘어가는 경우
      end.setDate(end.getDate() + 1)
    }

    const diffMs = end.getTime() - start.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)

    return Math.round(diffHours * 10) / 10 // 소수점 첫째자리까지
  } catch (error) {
    console.error('시간 계산 오류:', error)
    return 0
  }
}

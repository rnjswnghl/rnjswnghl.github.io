// utils/mockData.ts
// 하드코딩된 데이터 관리 - 백엔드 연결 전까지 사용

// 환경 설정
export const MOCK_MODE = true // true: 하드코딩 모드, false: 백엔드 연결 모드

// 이미지 경로 (빌드 시 BASE_URL 적용, iframe/데모 환경 대응)
const _IMG_BASE = (() => {
  const base = import.meta.env.BASE_URL || '/'
  return base.endsWith('/') ? base + 'images/' : base + '/images/'
})()
export const IMG_MEETING = _IMG_BASE + 'meeting.png'
export const IMG_LOGO = _IMG_BASE + 'logo.jpg'

// ===== 스터디 상세 데이터 =====
export const MOCK_STUDY_DETAILS = {
  1: {
    id: 1,
    name: '알고리즘 마스터 스터디',
    category: 'IT',
    'sub-category': '알고리즘',
    'detail-category': '#백준 #프로그래머스 #코딩테스트',
    rules: '백준, 프로그래머스 문제 풀이와 코드 리뷰를 통해 알고리즘 실력을 향상시키는 스터디입니다.',
    maxMembers: 5,
    currentMembers: 3,
    time: 2,
    day_of_week: '월, 수, 금 저녁 8시',
    created_at: '2025-01-01',
    ended_at: '2025-03-31',
    notice_able: true,
    password: '123456',
    imageUrl: IMG_MEETING,
    leader: {
      id: 1,
      nickname: '앨리스',
      profile_img: IMG_MEETING
    },
    members: [
      {
        id: 2,
        nickname: '밥',
        profile_img: IMG_MEETING
      },
      {
        id: 3,
        nickname: '찰리',
        profile_img: IMG_MEETING
      }
    ]
  },
  2: {
    id: 2,
    name: '해외 취업 대비 영어 말하기 준비 스터디',
    category: '어학',
    'sub-category': '영어',
    'detail-category': '#면접 #취업 #회화',
    rules: '해외 취업 인터뷰와 실무 회화를 대비한 실전 영어 말하기 스터디입니다.',
    maxMembers: 8,
    currentMembers: 6,
    time: 2,
    day_of_week: '매주 토요일 오후 7시~9시',
    created_at: '2025-07-01',
    ended_at: '2025-12-31',
    notice_able: true,
    password: '123456',
    imageUrl: IMG_MEETING,
    leader: {
      id: 4,
      nickname: '김지현',
      profile_img: IMG_MEETING
    },
    members: [
      {
        id: 5,
        nickname: '박영희',
        profile_img: IMG_MEETING
      },
      {
        id: 6,
        nickname: '이민수',
        profile_img: IMG_MEETING
      },
      {
        id: 7,
        nickname: '최지원',
        profile_img: IMG_MEETING
      },
      {
        id: 8,
        nickname: '정수진',
        profile_img: IMG_MEETING
      }
    ]
  },
  3: {
    id: 3,
    name: 'React/Next.js 현대적 웹 개발',
    category: 'IT',
    'sub-category': '프론트엔드',
    'detail-category': '#React #Next.js #TypeScript',
    rules: 'React와 Next.js를 활용한 현대적인 웹 개발을 학습하는 스터디입니다.',
    maxMembers: 4,
    currentMembers: 2,
    time: 2,
    day_of_week: '화, 목 저녁 7시',
    created_at: '2025-02-01',
    ended_at: '2025-05-31',
    notice_able: true,
    password: '123456',
    imageUrl: IMG_MEETING,
    leader: {
      id: 2,
      nickname: '밥',
      profile_img: IMG_MEETING
    },
    members: [
      {
        id: 1,
        nickname: '앨리스',
        profile_img: IMG_MEETING
      }
    ]
  },
  4: {
    id: 4,
    name: '토익 900점 목표 스터디',
    category: '어학',
    'sub-category': '영어',
    'detail-category': '#토익 #영어 #고득점',
    rules: '토익 900점 달성을 목표로 하는 체계적인 학습과 실전 연습을 진행합니다.',
    maxMembers: 6,
    currentMembers: 4,
    time: 2,
    day_of_week: '월, 수, 금 아침 7시',
    created_at: '2025-01-15',
    ended_at: '2025-06-15',
    notice_able: true,
    password: '123456',
    imageUrl: IMG_MEETING,
    leader: {
      id: 5,
      nickname: '에드워드',
      profile_img: IMG_MEETING
    },
    members: [
      {
        id: 1,
        nickname: '앨리스',
        profile_img: IMG_MEETING
      },
      {
        id: 2,
        nickname: '밥',
        profile_img: IMG_MEETING
      },
      {
        id: 3,
        nickname: '찰리',
        profile_img: IMG_MEETING
      }
    ]
  },
  5: {
    id: 5,
    name: 'Spring Boot 백엔드 마스터',
    category: 'IT',
    'sub-category': '백엔드',
    'detail-category': '#Spring #Java #백엔드',
    rules: 'Spring Boot를 활용한 백엔드 개발과 RESTful API 설계를 학습합니다.',
    maxMembers: 5,
    currentMembers: 3,
    time: 2,
    day_of_week: '화, 목 저녁 8시',
    created_at: '2025-02-15',
    ended_at: '2025-05-15',
    notice_able: true,
    password: '123456',
    imageUrl: IMG_MEETING,
    leader: {
      id: 3,
      nickname: '찰리',
      profile_img: IMG_MEETING
    },
    members: [
      {
        id: 1,
        nickname: '앨리스',
        profile_img: IMG_MEETING
      },
      {
        id: 2,
        nickname: '밥',
        profile_img: IMG_MEETING
      }
    ]
  }
}

// ===== 공지사항 데이터 =====
export const MOCK_NOTICES = {
  1: [
    {
      id: 1,
      title: '[공지사항] 알고리즘 스터디 시작 안내',
      content: `
        <p>안녕하세요, 알고리즘 마스터 스터디원 여러분!</p>
        <p>1월 첫 주 스터디 계획을 공유드립니다.</p>

        <ol>
          <li><strong>일시:</strong> 1월 6일 (월) 저녁 8시~10시 (Zoom)</li>
          <li><strong>주제:</strong> "기초 알고리즘 개념 및 백준 문제 풀이"</li>
          <li><strong>과제:</strong>
            <ul>
              <li>백준 1000번, 1001번 문제 풀이</li>
              <li>알고리즘 기초 개념 정리 노트 작성</li>
            </ul>
          </li>
          <li><strong>진행 방식:</strong> 개별 문제 풀이 후 코드 리뷰</li>
          <li><strong>리마인드:</strong>
            <ul>
              <li>원활한 스터디 진행을 위해 10분 전 접속</li>
              <li>코드 에디터 준비 (VS Code 권장)</li>
              <li>질문과 답변 적극 참여</li>
            </ul>
          </li>
        </ol>

        <p>이번 스터디에서는 알고리즘 기초 개념을 다지고 실제 문제 풀이를 통해 실력을 향상시킬 예정입니다.</p>
        <p>참석이 어려우신 분은 최소 하루 전에 스터디장에게 미리 알려주세요.</p>
      `,
      writer: '앨리스',
      created_at: '2025-01-02'
    },
    {
      id: 2,
      title: '[공지사항] 알고리즘 스터디 규칙',
      content: `
        <p>알고리즘 스터디 진행을 위한 규칙을 안내드립니다.</p>

        <ol>
          <li>매일 최소 1문제 이상 풀기</li>
          <li>코드 리뷰 참여 필수</li>
          <li>스터디 시간 30분 이상 참여</li>
          <li>부득이한 경우 사전 공지</li>
          <li>주말에는 난이도 높은 문제 도전</li>
        </ol>

        <p>모든 규칙은 스터디의 원활한 진행과 구성원들의 학습 효과를 위한 것입니다.</p>
        <p>함께 성장하는 스터디가 되도록 협조해 주세요.</p>
      `,
      writer: '앨리스',
      created_at: '2025-01-01'
    },
    {
      id: 3,
      title: '[공지사항] 다음 주 알고리즘 스터디 준비사항',
      content: `
        <p>안녕하세요, 알고리즘 스터디원 여러분!</p>
        <p>다음 주 스터디 준비사항을 안내드립니다.</p>

        <ol>
          <li><strong>일시:</strong> 1월 13일 (월) 저녁 8시~10시</li>
          <li><strong>주제:</strong> "정렬 알고리즘과 시간복잡도 분석"</li>
          <li><strong>준비 과제:</strong>
            <ul>
              <li>버블 정렬, 선택 정렬, 삽입 정렬 구현</li>
              <li>각 정렬의 시간복잡도 분석</li>
              <li>백준 2750번, 2751번 문제 풀이</li>
            </ul>
          </li>
          <li><strong>발표자:</strong> 밥 (버블 정렬), 찰리 (선택 정렬)</li>
          <li><strong>토론 주제:</strong> 실제 상황에서 어떤 정렬을 선택할 것인가?</li>
        </ol>

        <p>정렬 알고리즘은 알고리즘의 기초이므로 충분히 이해하고 오시기 바랍니다.</p>
        <p>질문이나 어려운 부분이 있으시면 미리 공유해 주세요!</p>
      `,
      writer: '앨리스',
      created_at: '2025-01-08'
    }
  ],
  2: [
    {
      id: 1,
      title: '[공지사항] 7월 첫 주 스터디 일정 안내',
      content: `
        <p>안녕하세요, 해외 취업 대비 영어 말하기 준비 스터디원 여러분!</p>
        <p>7월 첫 주 스터디 계획을 공유드립니다.</p>

        <ol>
          <li><strong>일시:</strong> 7월 5일 (토) 오후 7시~9시 (Zoom)</li>
          <li><strong>주제:</strong> "해외 기업 문화 및 자기 PR 스피치 (2분)"</li>
          <li><strong>과제:</strong>
            <ul>
              <li>각자 목표 기업을 하나 선정하고, 그 기업에서 자신을 PR하는 2분 스피치 준비</li>
              <li>스피치에 사용할 키워드 5개 작성 (영어로)</li>
            </ul>
          </li>
          <li><strong>발표 방식:</strong> 개별 발표 후 2명씩 짝을 지어 Q&A 진행</li>
          <li><strong>리마인드:</strong>
            <ul>
              <li>원활한 스터디 진행을 위해 10분 전 접속</li>
              <li>카메라 ON & 배경 소음 최소화</li>
              <li>피드백 시 '칭찬 1개 + 개선점 1개' 방식으로</li>
            </ul>
          </li>
        </ol>

        <p>이번 스터디에서는 발표자와 청자의 역할을 나눠 실제 면접 상황을 시뮬레이션할 예정입니다.</p>
        <p>참석이 어려우신 분은 최소 하루 전에 스터디장에게 미리 알려주세요.</p>
      `,
      writer: '김지현',
      created_at: '2025-07-02'
    },
    {
      id: 2,
      title: '[공지사항] 영어 스터디 규칙 안내',
      content: `
        <p>영어 스터디 진행을 위한 규칙을 안내드립니다.</p>

        <ol>
          <li>매주 지정된 주제에 맞춰 2분 스피치 준비하기</li>
          <li>지각 시 벌금 1,000원 (누적 관리)</li>
          <li>피드백은 서로 존중하는 태도로 제공하기</li>
          <li>무단 결석 2회 시 강제 퇴출</li>
          <li>스터디 시간 준수하기</li>
        </ol>

        <p>모든 규칙은 스터디의 원활한 진행과 구성원들의 학습 효과를 위한 것입니다.</p>
        <p>함께 성장하는 스터디가 되도록 협조해 주세요.</p>
      `,
      writer: '김지현',
      created_at: '2025-07-01'
    },
    {
      id: 3,
      title: '[공지사항] 다음 주 영어 면접 준비 안내',
      content: `
        <p>안녕하세요, 영어 스터디원 여러분!</p>
        <p>다음 주 스터디 준비사항을 안내드립니다.</p>

        <ol>
          <li><strong>일시:</strong> 7월 12일 (토) 오후 7시~9시</li>
          <li><strong>주제:</strong> "영어 면접 실전 연습 - 기술 면접"</li>
          <li><strong>준비 과제:</strong>
            <ul>
              <li>자신의 기술 스택을 영어로 설명하는 연습</li>
              <li>프로젝트 경험을 영어로 발표하기</li>
              <li>기술 관련 질문 10개 준비 (영어로)</li>
            </ul>
          </li>
          <li><strong>면접관 역할:</strong> 김지현, 박영희</li>
          <li><strong>면접자:</strong> 이민수, 최지원, 정수진</li>
        </ol>

        <p>실제 면접과 동일한 환경에서 연습하므로 긴장감을 가지고 준비해 주세요.</p>
        <p>질문이나 준비사항이 있으시면 미리 공유해 주세요!</p>
      `,
      writer: '김지현',
      created_at: '2025-07-08'
    }
  ],
  3: [
    {
      id: 1,
      title: '[공지사항] React/Next.js 스터디 시작',
      content: `
        <p>React/Next.js 현대적 웹 개발 스터디가 시작됩니다!</p>
        <p>첫 주차는 React 기초 개념과 컴포넌트 구조를 다루겠습니다.</p>
        <p><strong>준비사항:</strong> Node.js 설치, VS Code 에디터 준비</p>
      `,
      writer: '밥',
      created_at: '2025-02-01'
    }
  ],
  4: [
    {
      id: 1,
      title: '[공지사항] 토익 900점 목표 스터디 시작',
      content: `
        <p>토익 900점 목표 스터디가 시작됩니다!</p>
        <p>매주 월, 수, 금 아침 7시에 진행됩니다.</p>
        <p><strong>첫 주차 주제:</strong> 토익 리스닝 기초 및 파트 1, 2 연습</p>
      `,
      writer: '에드워드',
      created_at: '2025-01-15'
    }
  ],
  5: [
    {
      id: 1,
      title: '[공지사항] Spring Boot 백엔드 마스터 스터디 시작',
      content: `
        <p>Spring Boot 백엔드 마스터 스터디가 시작됩니다!</p>
        <p>첫 주차는 Spring Boot 기초와 프로젝트 설정을 다루겠습니다.</p>
        <p><strong>준비사항:</strong> Java 11 이상, IntelliJ IDEA 또는 Eclipse</p>
      `,
      writer: '찰리',
      created_at: '2025-02-15'
    }
  ]
}

// ===== 게시판 데이터 =====
export const MOCK_POSTS = {
  1: [
    {
      id: 1,
      title: '백준 문제 풀이 노하우',
      content: '백준 문제를 풀면서 정리한 노하우를 공유합니다. 특히 DP 문제에서 많이 헤매셨는데...',
      writer: '밥',
      created_at: '2025-01-15',
      viewCount: 28,
      commentCount: 7
    },
    {
      id: 2,
      title: '알고리즘 공부 방법',
      content: '알고리즘 공부를 시작하는 분들을 위한 방법을 정리했습니다. 처음에는 어려워 보이지만...',
      writer: '찰리',
      created_at: '2025-01-10',
      viewCount: 35,
      commentCount: 12
    }
  ],
  2: [
    {
      id: 1,
      title: '영어 면접 준비 팁 공유',
      content: '영어 면접 준비하면서 정리한 팁들을 공유합니다. 특히 자기소개 부분에서 많이 어려워하시는 것 같아서...',
      writer: '박영희',
      created_at: '2025-07-28',
      viewCount: 15,
      commentCount: 3
    },
    {
      id: 2,
      title: '해외 취업 준비 과정 후기',
      content: '해외 취업을 준비하면서 겪은 경험들을 공유합니다. 준비 과정에서 많은 도움을 받았는데...',
      writer: '이민수',
      created_at: '2025-07-25',
      viewCount: 23,
      commentCount: 5
    }
  ],

  3: [
    {
      id: 1,
      title: 'React Hooks 사용법 정리',
      content: 'React Hooks를 사용하면서 정리한 내용을 공유합니다. useState, useEffect, useContext...',
      writer: '밥',
      created_at: '2025-02-10',
      viewCount: 18,
      commentCount: 4
    }
  ],
  4: [
    {
      id: 1,
      title: '토익 리스닝 공부법',
      content: '토익 리스닝 점수를 올리는 방법을 공유합니다. 특히 파트 3, 4에서 많이 어려워하시는데...',
      writer: '앨리스',
      created_at: '2025-01-20',
      viewCount: 42,
      commentCount: 8
    }
  ],
  5: [
    {
      id: 1,
      title: 'Spring Boot 프로젝트 구조',
      content: 'Spring Boot 프로젝트의 구조를 정리했습니다. 패키지 구조와 설정 파일들...',
      writer: '앨리스',
      created_at: '2025-02-18',
      viewCount: 25,
      commentCount: 6
    }
  ]
}





// ===== 사용자 스터디 상태 데이터 =====
export const MOCK_STUDY_STATUS = {
  commitment: '매일 2시간씩 공부하기',
  targetDate: '2025-12-31',
  ddayDescription: '정보처리기사 시험',
  targetStudyTime: 120,
  actualStudyTime: 45,
  weeklyStudyTime: [1.5, 1, 2, 4, 3, 4, 2.5]
}

// ===== 활동 로그 데이터 =====
export const MOCK_ACTIVITY_LOGS = [
  {
    date: '2025-07-26',
    quiz_taken: true,
    quiz_id: 123,
    available: true
  },
  {
    date: '2025-07-25',
    quiz_taken: false,
    quiz_id: null,
    available: true
  },
  {
    date: '2025-07-24',
    quiz_taken: true,
    quiz_id: 122,
    available: false
  }
]

// ===== AI 퀴즈 세션 데이터 =====
export const MOCK_AI_QUIZ_SESSIONS: Record<string, {
  session_id: string;
  questions: Array<{
    id: number;
    type: string;
    question: string;
    options?: string[];
    answer: string;
  }>;
}> = {
  'mock_session_123': {
    session_id: 'mock_session_123',
    questions: [
      {
        id: 1,
        type: 'OX',
        question: 'JavaScript는 객체지향 프로그래밍 언어이다.',
        options: ['O', 'X'],
        answer: 'O'
      },
      {
        id: 2,
        type: 'OBJECTIVE',
        question: '다음 중 JavaScript의 기본 데이터 타입이 아닌 것은?',
        options: ['string', 'number', 'boolean', 'array'],
        answer: 'array'
      },
      {
        id: 3,
        type: 'SUBJECTIVE',
        question: 'JavaScript에서 변수를 선언하는 방법을 설명하세요.',
        answer: 'var, let, const 키워드를 사용한다.'
      }
    ]
  }
}

// ===== AI 퀴즈 결과 데이터 =====
export const MOCK_AI_QUIZ_RESULTS: Record<string, {
  total_correct: number;
  total_xp: number;
  bonuses: Array<{
    type: string;
    description: string;
    bonus_xp: number;
  }>;
}> = {
  'mock_session_123': {
    total_correct: 7,
    total_xp: 150,
    bonuses: [
      {
        type: '연속 정답',
        description: '3문제 연속 정답',
        bonus_xp: 20
      },
      {
        type: '완벽한 정답',
        description: '모든 문제 정답',
        bonus_xp: 50
      }
    ]
  }
}

// ===== 멤버 데이터 =====
export const MOCK_MEMBERS = {
  1: [
    {
      id: 2,
      nickname: '밥',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 88,
      joinedAt: '2025-01-05',
      studyCount: 15,
      postCount: 8,
      commentCount: 12,
      lastActivity: '2025-07-25',
      consecutiveAttendance: 3,
      preferredTime: '오후 8시',
      lastMonthAttendance: 85
    },
    {
      id: 3,
      nickname: '찰리',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 95,
      joinedAt: '2025-01-10',
      studyCount: 12,
      postCount: 6,
      commentCount: 8,
      lastActivity: '2025-07-26',
      consecutiveAttendance: 5,
      preferredTime: '오후 7시',
      lastMonthAttendance: 92
    }
  ],
  2: [
    {
      id: 5,
      nickname: '박영희',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 85,
      joinedAt: '2025-07-15',
      studyCount: 8,
      postCount: 3,
      commentCount: 10,
      lastActivity: '2025-07-25',
      consecutiveAttendance: 3,
      preferredTime: '오후 7시',
      lastMonthAttendance: 90
    },
    {
      id: 6,
      nickname: '이민수',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 92,
      joinedAt: '2025-07-10',
      studyCount: 10,
      postCount: 5,
      commentCount: 15,
      lastActivity: '2025-07-20',
      consecutiveAttendance: 1,
      preferredTime: '오후 8시',
      lastMonthAttendance: 95
    },
    {
      id: 7,
      nickname: '최지원',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 78,
      joinedAt: '2025-07-20',
      studyCount: 6,
      postCount: 2,
      commentCount: 5,
      lastActivity: '2025-07-22',
      consecutiveAttendance: 0,
      preferredTime: '오후 9시',
      lastMonthAttendance: 80
    },
    {
      id: 8,
      nickname: '정수진',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 95,
      joinedAt: '2025-07-05',
      studyCount: 12,
      postCount: 7,
      commentCount: 20,
      lastActivity: '2025-07-25',
      consecutiveAttendance: 2,
      preferredTime: '오후 7시',
      lastMonthAttendance: 92
    }
  ],
  3: [
    {
      id: 1,
      nickname: '앨리스',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 90,
      joinedAt: '2024-02-05',
      studyCount: 8,
      postCount: 4,
      commentCount: 6,
      lastActivity: '2025-07-24',
      consecutiveAttendance: 2,
      preferredTime: '오후 6시',
      lastMonthAttendance: 88
    }
  ],
  4: [
    {
      id: 1,
      nickname: '앨리스',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 92,
      joinedAt: '2024-01-20',
      studyCount: 10,
      postCount: 5,
      commentCount: 8,
      lastActivity: '2025-07-23',
      consecutiveAttendance: 4,
      preferredTime: '오전 7시',
      lastMonthAttendance: 90
    },
    {
      id: 2,
      nickname: '밥',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 85,
      joinedAt: '2024-01-25',
      studyCount: 8,
      postCount: 3,
      commentCount: 7,
      lastActivity: '2025-07-22',
      consecutiveAttendance: 1,
      preferredTime: '오전 7시',
      lastMonthAttendance: 87
    },
    {
      id: 3,
      nickname: '찰리',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 88,
      joinedAt: '2024-02-01',
      studyCount: 6,
      postCount: 2,
      commentCount: 4,
      lastActivity: '2025-07-21',
      consecutiveAttendance: 0,
      preferredTime: '오전 7시',
      lastMonthAttendance: 85
    }
  ],
  5: [
    {
      id: 1,
      nickname: '앨리스',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 87,
      joinedAt: '2024-02-20',
      studyCount: 9,
      postCount: 4,
      commentCount: 6,
      lastActivity: '2025-07-20',
      consecutiveAttendance: 2,
      preferredTime: '오후 8시',
      lastMonthAttendance: 85
    },
    {
      id: 2,
      nickname: '밥',
      profile_img: IMG_MEETING,
      isLeader: false,
      isTemporaryLeader: false,
      tempLeaderUntil: '',
      attendanceRate: 93,
      joinedAt: '2024-02-25',
      studyCount: 11,
      postCount: 6,
      commentCount: 9,
      lastActivity: '2025-07-19',
      consecutiveAttendance: 3,
      preferredTime: '오후 8시',
      lastMonthAttendance: 90
    }
  ]
}

// ===== 스터디장 데이터 =====
export const MOCK_STUDY_LEADERS = {
  1: {
    id: 1,
    nickname: '앨리스',
    profile_img: IMG_MEETING,
    isLeader: true,
    isTemporaryLeader: false,
    tempLeaderUntil: '',
    attendanceRate: 100,
    joinedAt: '2025-01-01',
    studyCount: 12,
    postCount: 8,
    commentCount: 30,
    lastActivity: '2025-07-25',
    consecutiveAttendance: 4,
    preferredTime: '오후 6시',
    lastMonthAttendance: 100
  },
  2: {
    id: 4,
    nickname: '김지현',
    profile_img: IMG_MEETING,
    isLeader: true,
    isTemporaryLeader: false,
    tempLeaderUntil: '',
    attendanceRate: 98,
    joinedAt: '2025-07-01',
    studyCount: 15,
    postCount: 10,
    commentCount: 25,
    lastActivity: '2025-07-26',
    consecutiveAttendance: 6,
    preferredTime: '오후 7시',
    lastMonthAttendance: 95
  },
  3: {
    id: 2,
    nickname: '밥',
    profile_img: IMG_MEETING,
    isLeader: true,
    isTemporaryLeader: false,
    tempLeaderUntil: '',
    attendanceRate: 95,
    joinedAt: '2025-02-01',
    studyCount: 10,
    postCount: 6,
    commentCount: 18,
    lastActivity: '2025-07-24',
    consecutiveAttendance: 3,
    preferredTime: '오후 7시',
    lastMonthAttendance: 92
  },
  4: {
    id: 5,
    nickname: '에드워드',
    profile_img: IMG_MEETING,
    isLeader: true,
    isTemporaryLeader: false,
    tempLeaderUntil: '',
    attendanceRate: 96,
    joinedAt: '2025-01-15',
    studyCount: 14,
    postCount: 9,
    commentCount: 22,
    lastActivity: '2025-07-25',
    consecutiveAttendance: 5,
    preferredTime: '오전 7시',
    lastMonthAttendance: 94
  },
  5: {
    id: 3,
    nickname: '찰리',
    profile_img: IMG_MEETING,
    isLeader: true,
    isTemporaryLeader: false,
    tempLeaderUntil: '',
    attendanceRate: 94,
    joinedAt: '2025-02-15',
    studyCount: 11,
    postCount: 7,
    commentCount: 20,
    lastActivity: '2025-07-23',
    consecutiveAttendance: 4,
    preferredTime: '오후 8시',
    lastMonthAttendance: 91
  }
}

// ===== 스터디 파일 데이터 =====
export const MOCK_STUDY_FILES = {
  1: {
    recordings: [
      {
        id: 1,
        filename: '2025-01-15_알고리즘_스터디_녹화본.mp4',
        fileSize: '312MB',
        uploaded_at: '2025-01-15',
        uploaded_by: '앨리스',
        duration: '02:30:15'
      }
    ],
    summaries: [
      {
        id: 1,
        filename: '백준_문제_풀이_노트.pdf',
        fileSize: '4.1MB',
        uploaded_at: '2025-01-12',
        uploaded_by: '밥',
        pageCount: 18
      }
    ],
    materials: [
      {
        id: 1,
        filename: '알고리즘_기초_개념_정리.pdf',
        fileSize: '8.5MB',
        uploaded_at: '2025-01-08',
        uploaded_by: '앨리스',
        pageCount: 32
      }
    ]
  },
  2: {
    recordings: [
      {
        id: 1,
        filename: '2025-07-15_영어면접_스터디_녹화본.mp4',
        fileSize: '245MB',
        uploaded_at: '2025-07-15',
        uploaded_by: '김지현',
        duration: '02:15:30'
      },
      {
        id: 2,
        filename: '2025-07-08_자기소개_스피치_녹화본.mp4',
        fileSize: '198MB',
        uploaded_at: '2025-07-08',
        uploaded_by: '김지현',
        duration: '01:45:20'
      }
    ],
    summaries: [
      {
        id: 1,
        filename: '2025-07-15_스터디_요약본.pdf',
        fileSize: '2.3MB',
        uploaded_at: '2025-07-15',
        uploaded_by: '박영희',
        pageCount: 8
      },
      {
        id: 2,
        filename: '영어면접_주요_질문_정리.docx',
        fileSize: '1.8MB',
        uploaded_at: '2025-07-10',
        uploaded_by: '이민수',
        pageCount: 12
      }
    ],
    materials: [
      {
        id: 1,
        filename: '영어면접_기출문제_모음.pdf',
        fileSize: '5.2MB',
        uploaded_at: '2025-07-05',
        uploaded_by: '김지현',
        pageCount: 25
      },
      {
        id: 2,
        filename: '자기소개_템플릿.pptx',
        fileSize: '3.1MB',
        uploaded_at: '2025-07-03',
        uploaded_by: '최지원',
        pageCount: 15
      }
    ]
  },
  3: {
    recordings: [],
    summaries: [
      {
        id: 1,
        filename: 'React_Hooks_정리.pdf',
        fileSize: '2.8MB',
        uploaded_at: '2025-02-05',
        uploaded_by: '밥',
        pageCount: 14
      }
    ],
    materials: [
      {
        id: 1,
        filename: 'Next.js_프로젝트_템플릿.zip',
        fileSize: '15.2MB',
        uploaded_at: '2025-02-01',
        uploaded_by: '밥',
        pageCount: 0
      }
    ]
  },
  4: {
    recordings: [
      {
        id: 1,
        filename: '2025-01-20_토익_리스닝_연습.mp4',
        fileSize: '156MB',
        uploaded_at: '2025-01-20',
        uploaded_by: '에드워드',
        duration: '01:20:45'
      }
    ],
    summaries: [
      {
        id: 1,
        filename: '토익_문법_정리.pdf',
        fileSize: '3.2MB',
        uploaded_at: '2025-01-18',
        uploaded_by: '앨리스',
        pageCount: 22
      }
    ],
    materials: [
      {
        id: 1,
        filename: '토익_실전_모의고사_1회.pdf',
        fileSize: '6.8MB',
        uploaded_at: '2025-01-15',
        uploaded_by: '에드워드',
        pageCount: 28
      }
    ]
  },
  5: {
    recordings: [
      {
        id: 1,
        filename: '2025-02-20_Spring_Boot_스터디_녹화본.mp4',
        fileSize: '278MB',
        uploaded_at: '2025-02-20',
        uploaded_by: '찰리',
        duration: '02:15:30'
      }
    ],
    summaries: [
      {
        id: 1,
        filename: 'Spring_Boot_기초_개념.pdf',
        fileSize: '4.5MB',
        uploaded_at: '2025-02-18',
        uploaded_by: '앨리스',
        pageCount: 20
      }
    ],
    materials: [
      {
        id: 1,
        filename: 'Spring_Boot_프로젝트_예제.zip',
        fileSize: '12.3MB',
        uploaded_at: '2025-02-15',
        uploaded_by: '찰리',
        pageCount: 0
      }
    ]
  }
}

// ===== 스터디 일정 데이터 =====
export const MOCK_STUDY_SCHEDULES = {
  'test': [
    {
      id: 1,
      studyId: 1,
      studyName: '알고리즘 마스터 스터디',
      category: 'IT',
      time: '20:00',
      schedule: '월, 수, 금',
      day_of_week: '월, 수, 금',
      startTime: '20:00',
      period: ['2025-01-01', '2025-03-31']
    },
    {
      id: 2,
      studyId: 3,
      studyName: 'React/Next.js 현대적 웹 개발',
      category: 'IT',
      time: '19:00',
      schedule: '화, 목',
      day_of_week: '화, 목',
      startTime: '19:00',
      period: ['2025-02-01', '2025-05-31']
    }
  ],
  'alice': [
    {
      id: 1,
      studyId: 1,
      studyName: '알고리즘 마스터 스터디',
      category: 'IT',
      time: '20:00',
      schedule: '월, 수, 금',
      day_of_week: '월, 수, 금',
      startTime: '20:00',
      period: ['2025-01-01', '2025-03-31']
    },
    {
      id: 2,
      studyId: 3,
      studyName: 'React/Next.js 현대적 웹 개발',
      category: 'IT',
      time: '19:00',
      schedule: '화, 목',
      day_of_week: '화, 목',
      startTime: '19:00',
      period: ['2025-02-01', '2025-05-31']
    },
    {
      id: 3,
      studyId: 4,
      studyName: '토익 900점 목표 스터디',
      category: '어학',
      time: '07:00',
      schedule: '월, 수, 금',
      day_of_week: '월, 수, 금',
      startTime: '07:00',
      period: ['2025-01-15', '2025-06-15']
    }
  ],
  'bob': [
    {
      id: 1,
      studyId: 1,
      studyName: '알고리즘 마스터 스터디',
      category: 'IT',
      time: '20:00',
      schedule: '월, 수, 금',
      day_of_week: '월, 수, 금',
      startTime: '20:00',
      period: ['2025-01-01', '2025-03-31']
    },
    {
      id: 2,
      studyId: 5,
      studyName: 'Spring Boot 백엔드 마스터',
      category: 'IT',
      time: '20:00',
      schedule: '화, 목',
      day_of_week: '화, 목',
      startTime: '20:00',
      period: ['2025-02-15', '2025-05-15']
    },
    {
      id: 3,
      studyId: 4,
      studyName: '토익 900점 목표 스터디',
      category: '어학',
      time: '07:00',
      schedule: '월, 수, 금',
      day_of_week: '월, 수, 금',
      startTime: '07:00',
      period: ['2025-01-15', '2025-06-15']
    }
  ],
  'charlie': [
    {
      id: 1,
      studyId: 1,
      studyName: '알고리즘 마스터 스터디',
      category: 'IT',
      time: '20:00',
      schedule: '월, 수, 금',
      day_of_week: '월, 수, 금',
      startTime: '20:00',
      period: ['2025-01-01', '2025-03-31']
    },
    {
      id: 2,
      studyId: 5,
      studyName: 'Spring Boot 백엔드 마스터',
      category: 'IT',
      time: '20:00',
      schedule: '화, 목',
      day_of_week: '화, 목',
      startTime: '20:00',
      period: ['2025-02-15', '2025-05-15']
    },
    {
      id: 3,
      studyId: 4,
      studyName: '토익 900점 목표 스터디',
      category: '어학',
      time: '07:00',
      schedule: '월, 수, 금',
      day_of_week: '월, 수, 금',
      startTime: '07:00',
      period: ['2025-01-15', '2025-06-15']
    }
  ],
  'diana': [
    {
      id: 1,
      studyId: 2,
      studyName: '해외 취업 대비 영어 말하기 준비 스터디',
      category: '어학',
      time: '19:00',
      schedule: '토',
      day_of_week: '토',
      startTime: '19:00',
      period: ['2025-07-01', '2025-12-31']
    }
  ],
  'edward': [
    {
      id: 1,
      studyId: 4,
      studyName: '토익 900점 목표 스터디',
      category: '어학',
      time: '07:00',
      schedule: '월, 수, 금',
      day_of_week: '월, 수, 금',
      startTime: '07:00',
      period: ['2025-01-15', '2025-06-15']
    }
  ]
}

// ===== 사용자 데이터 =====
// 데모용 기본 계정: test / testpw
let MOCK_USERS = [
  {
    loginId: 'test',
    password: 'testpw',
    user: {
      profile_img: IMG_LOGO,
      nickname: '테스트',
      login_id: 'test',
      email: 'test@example.com',
      gender: 'M',
      time_id: 2,
      interest_id: 'IT',
      interests: ['IT', '프론트엔드'],
      studies: [
        { study_id: 1, study_name: '알고리즘 마스터 스터디', role: 'leader' },
        { study_id: 3, study_name: 'React/Next.js 현대적 웹 개발', role: 'member' }
      ]
    }
  },
  {
    loginId: 'alice',
    password: '1234',
    user: {
      profile_img: IMG_LOGO,
      nickname: '앨리스',
      login_id: 'alice',
      email: 'alice@example.com',
      gender: 'F',
      time_id: 2,
      interest_id: 'IT',
      interests: ['IT', '자격증'],
              studies: [
          { study_id: 1, study_name: '알고리즘 마스터 스터디', role: 'leader' },
          { study_id: 3, study_name: 'React/Next.js 현대적 웹 개발', role: 'member' }
        ]
    }
  },
  {
    loginId: 'bob',
    password: '1234',
    user: {
      profile_img: IMG_LOGO,
      nickname: '밥',
      login_id: 'bob',
      email: 'bob@example.com',
      gender: 'M',
      time_id: 1,
      interest_id: 'IT',
      interests: ['IT'],
              studies: [
          { study_id: 1, study_name: '알고리즘 마스터 스터디', role: 'member' },
          { study_id: 5, study_name: 'Spring Boot 백엔드 마스터', role: 'leader' }
        ]
    }
  },
  {
    loginId: 'charlie',
    password: '1234',
    user: {
      profile_img: IMG_LOGO,
      nickname: '찰리',
      login_id: 'charlie',
      email: 'charlie@example.com',
      gender: 'M',
      time_id: 3,
      interest_id: 'IT',
      interests: ['IT'],
              studies: [
          { study_id: 1, study_name: '알고리즘 마스터 스터디', role: 'member' },
          { study_id: 10, study_name: 'AI/머신러닝 연구실', role: 'leader' }
        ]
    }
  },
  {
    loginId: 'diana',
    password: '1234',
    user: {
      profile_img: IMG_LOGO,
      nickname: '다이애나',
      login_id: 'diana',
      email: 'diana@example.com',
      gender: 'F',
      time_id: 2,
      interest_id: '자격증',
      interests: ['자격증'],
              studies: [
          { study_id: 2, study_name: '해외 취업 대비 영어 말하기 준비 스터디', role: 'member' }
        ]
    }
  },
  {
    loginId: 'edward',
    password: '1234',
    user: {
      profile_img: IMG_LOGO,
      nickname: '에드워드',
      login_id: 'edward',
      email: 'edward@example.com',
      gender: 'M',
      time_id: 1,
      interest_id: '어학',
      interests: ['어학'],
              studies: [
          { study_id: 4, study_name: '토익 900점 목표 스터디', role: 'leader' }
        ]
    }
  }
]

// ===== 스터디 데이터 =====
export const MOCK_STUDIES = [
  {
    id: 1,
    groupId: 'FM_1',
    name: '알고리즘 마스터 스터디',
    category: 'IT',
    subCategory: '알고리즘',
    time: '저녁',
    level: '중급',
    currentMembers: 3,
    maxMembers: 5,
    nickname: '앨리스',
    imageUrl: IMG_MEETING,
    summary: '백준, 프로그래머스 문제 풀이와 코드 리뷰를 통해 알고리즘 실력을 향상시키는 스터디입니다.',
    rules: [
      '매일 최소 1문제 이상 풀기',
      '코드 리뷰 참여 필수',
      '스터디 시간 30분 이상 참여',
      '부득이한 경우 사전 공지',
      '주말에는 난이도 높은 문제 도전'
    ],
    schedule: '월, 수, 금 저녁 8시',
    period: ['2025-01-01', '2025-03-31']
  },
  {
    id: 2,
    groupId: 'FM_2',
    name: '웹 개발 입문 스터디',
    category: 'IT',
    subCategory: '프론트엔드',
    time: '아침',
    level: '초급',
    currentMembers: 2,
    maxMembers: 4,
    nickname: '앨리스',
    imageUrl: IMG_MEETING,
    summary: 'HTML, CSS, JavaScript 기초부터 시작하여 웹 개발의 첫걸음을 내딛는 스터디입니다.',
    rules: [
      '주 3회 이상 학습 참여',
      '과제 제출 필수',
      '질문과 답변 적극 참여',
      '개인 프로젝트 진행'
    ],
    schedule: '화, 목, 토 아침 9시',
    period: ['2025-01-15', '2025-04-15']
  },
  {
    id: 3,
    groupId: 'FM_3',
    name: 'UI/UX 디자인 워크샵',
    category: '자격증',
            subCategory: '디자인 / 콘텐츠',
    time: '점심',
    level: '고급',
    currentMembers: 1,
    maxMembers: 3,
    nickname: '다이애나',
    imageUrl: IMG_MEETING,
    summary: '사용자 경험을 중심으로 한 UI/UX 디자인 방법론과 실무 프로젝트를 진행합니다.',
    rules: [
      '디자인 포트폴리오 제작',
      '사용자 리서치 참여',
      '디자인 시스템 구축',
      '실무 프로젝트 진행'
    ],
    schedule: '월, 금 점심 12시',
    period: ['2025-02-01', '2025-05-01']
  },
  {
    id: 4,
    groupId: 'FM_4',
    name: '영어 회화 클럽',
    category: '어학',
    subCategory: '영어',
    time: '저녁',
    level: '초급',
    currentMembers: 4,
    maxMembers: 6,
    nickname: '에드워드',
    imageUrl: IMG_MEETING,
    summary: '자연스러운 영어 회화를 위한 실전 연습과 문화 교류를 하는 스터디입니다.',
    rules: [
      '영어로만 대화하기',
      '주제별 토론 참여',
      '발음 교정 연습',
      '영어 영화/드라마 감상 후 토론'
    ],
    schedule: '화, 목 저녁 7시',
    period: ['2025-01-10', '2025-06-10']
  },
  {
    id: 5,
    groupId: 'FM_5',
    name: 'JLPT N2 합격 도전',
    category: '어학',
    subCategory: '일본어',
    time: '아침',
    level: '중급',
    currentMembers: 2,
    maxMembers: 4,
    nickname: '사쿠라',
    imageUrl: IMG_MEETING,
    summary: 'JLPT N2 합격을 목표로 하는 체계적인 일본어 학습과 시험 대비를 진행합니다.',
    rules: [
      '매주 모의고사 응시',
      '문법 정리 노트 작성',
      '듣기 연습 매일 30분',
      '일본 드라마/애니메이션 감상'
    ],
    schedule: '월, 수, 금 아침 7시',
    period: ['2025-01-20', '2025-07-20']
  },
  {
    id: 6,
    groupId: 'FM_6',
    name: '정보처리기사 실기 대비',
    category: '자격증',
            subCategory: 'IT / 컴퓨터',
    time: '저녁',
    level: '중급',
    currentMembers: 5,
    maxMembers: 8,
    nickname: '자격증왕',
    imageUrl: IMG_MEETING,
    summary: '정보처리기사 실기 합격을 위한 실전 문제 풀이와 코딩 연습을 진행합니다.',
    rules: [
      '매주 실기 문제 풀이',
      '오답 노트 작성',
      '시험 전 모의고사 응시',
      '알고리즘 문제 연습'
    ],
    schedule: '화, 목, 토 저녁 8시',
    period: ['2025-01-05', '2025-05-05']
  },
  {
    id: 7,
    groupId: 'FM_7',
    name: '토익 900점 목표 스터디',
    category: '어학',
    subCategory: '영어',
    time: '아침',
    level: '고급',
    currentMembers: 3,
    maxMembers: 5,
    nickname: '에드워드',
    imageUrl: IMG_MEETING,
    summary: '토익 900점 이상을 목표로 하는 고득점 전략과 실전 문제 풀이를 진행합니다.',
    rules: [
      '매일 RC/LC 문제 풀이',
      '오답 분석 및 복습',
      '실전 모의고사 주 1회',
      '고득점 팁 공유'
    ],
    schedule: '월, 수, 금 아침 8시',
    period: ['2025-01-25', '2025-04-25']
  },
  {
    id: 8,
    groupId: 'FM_8',
    name: 'React/Next.js 현대적 웹 개발',
    category: 'IT',
    subCategory: '프론트엔드',
    time: '저녁',
    level: '중급',
    currentMembers: 2,
    maxMembers: 4,
    nickname: '앨리스',
    imageUrl: IMG_MEETING,
    summary: 'React와 Next.js를 활용한 현대적인 웹 개발과 실무 프로젝트를 진행합니다.',
    rules: [
      '주간 프로젝트 진행',
      '코드 리뷰 참여',
      '최신 기술 트렌드 공유',
      '실무 사례 분석'
    ],
    schedule: '화, 목 저녁 9시',
    period: ['2025-02-10', '2025-05-10']
  },
  {
    id: 9,
    groupId: 'FM_9',
    name: 'Spring Boot 백엔드 마스터',
    category: 'IT',
    subCategory: '백엔드',
    time: '점심',
    level: '중급',
    currentMembers: 3,
    maxMembers: 5,
    nickname: '밥',
    imageUrl: IMG_MEETING,
    summary: 'Spring Boot를 활용한 백엔드 개발과 API 설계, 데이터베이스 설계를 학습합니다.',
    rules: [
      'RESTful API 설계',
      '데이터베이스 설계',
      '보안 및 인증 구현',
      '실무 프로젝트 진행'
    ],
    schedule: '월, 수, 금 점심 1시',
    period: ['2025-01-30', '2025-04-30']
  },
  {
    id: 10,
    groupId: 'FM_10',
    name: 'AI/머신러닝 연구실',
    category: 'IT',
    subCategory: 'AI',
    time: '저녁',
    level: '고급',
    currentMembers: 1,
    maxMembers: 3,
    nickname: '찰리',
    imageUrl: IMG_MEETING,
    summary: '인공지능과 머신러닝의 최신 기술을 연구하고 실습하는 고급 스터디입니다.',
    rules: [
      '논문 리뷰 발표',
      '실험 결과 공유',
      '오픈소스 프로젝트 참여',
      '연구 논문 작성'
    ],
    schedule: '화, 목 저녁 10시',
    period: ['2025-02-15', '2025-08-15']
  },
  {
    id: 11,
    groupId: 'FM_11',
    name: '중국어 HSK 4급 도전',
    category: '어학',
    subCategory: '중국어',
    time: '저녁',
    level: '중급',
    currentMembers: 2,
    maxMembers: 4,
    nickname: '리밍',
    imageUrl: IMG_MEETING,
    summary: 'HSK 4급 합격을 목표로 하는 중국어 학습과 문화 이해를 진행합니다.',
    rules: [
      '매일 중국어 회화 연습',
      'HSK 모의고사 응시',
      '중국 문화 학습',
      '중국 드라마 감상'
    ],
    schedule: '월, 수, 금 저녁 7시',
    period: ['2025-02-01', '2025-06-01']
  },
  {
    id: 12,
    groupId: 'FM_12',
    name: '스페인어 입문 스터디',
    category: '어학',
    subCategory: '스페인어',
    time: '아침',
    level: '초급',
    currentMembers: 3,
    maxMembers: 5,
    nickname: '카를로스',
    imageUrl: IMG_MEETING,
    summary: '스페인어 기초부터 시작하여 회화와 문법을 함께 학습하는 스터디입니다.',
    rules: [
      '기초 문법 학습',
      '일상 회화 연습',
      '스페인 문화 이해',
      '스페인 음악 감상'
    ],
    schedule: '화, 목, 토 아침 8시',
    period: ['2025-01-15', '2025-04-15']
  },
  {
    id: 13,
    groupId: 'FM_13',
    name: '컴퓨터 구조론 스터디',
    category: 'IT',
    subCategory: 'CS',
    time: '저녁',
    level: '중급',
    currentMembers: 2,
    maxMembers: 4,
    nickname: '박교수',
    imageUrl: IMG_MEETING,
    summary: '컴퓨터 구조와 운영체제의 원리를 깊이 있게 학습하는 스터디입니다.',
    rules: [
      '주제별 발표 준비',
      '실습 과제 수행',
      '시험 대비 문제 풀이',
      '최신 기술 동향 공유'
    ],
    schedule: '월, 수, 금 저녁 9시',
    period: ['2025-02-01', '2025-05-01']
  },
  {
    id: 14,
    groupId: 'FM_14',
    name: '금융권 취업 준비반',
    category: '자격증',
            subCategory: '금융 / 경영',
    time: '저녁',
    level: '고급',
    currentMembers: 4,
    maxMembers: 6,
    nickname: '김금융',
    imageUrl: IMG_MEETING,
    summary: '금융권 취업을 위한 자격증 준비와 면접 대비를 진행하는 스터디입니다.',
    rules: [
      '금융권 자격증 준비',
      '모의 면접 연습',
      '시사 문제 토론',
      '이력서/자소서 피드백'
    ],
    schedule: '화, 목 저녁 8시',
    period: ['2025-01-10', '2025-06-10']
  },
  {
    id: 15,
    groupId: 'FM_15',
    name: '9급 공무원 행정직 대비',
    category: '공무원 / 임용',
    subCategory: '9급 공무원(행정)',
    time: '아침',
    level: '중급',
    currentMembers: 6,
    maxMembers: 8,
    nickname: '공무원준비생',
    imageUrl: IMG_MEETING,
    summary: '9급 공무원 행정직 시험 대비를 위한 체계적인 학습을 진행합니다.',
    rules: [
      '과목별 문제 풀이',
      '모의고사 응시',
      '시사 문제 학습',
      '면접 대비 연습'
    ],
    schedule: '월, 수, 금 아침 7시',
    period: ['2025-01-01', '2025-08-01']
  },
  {
    id: 16,
    groupId: 'FM_16',
    name: '7급 공무원 준비반',
    category: '공무원 / 임용',
    subCategory: '7급 공무원',
    time: '저녁',
    level: '고급',
    currentMembers: 3,
    maxMembers: 5,
    nickname: '공무원마스터',
    imageUrl: IMG_MEETING,
    summary: '7급 공무원 시험 대비를 위한 고급 학습과 실전 문제 풀이를 진행합니다.',
    rules: [
      '고급 문제 풀이',
      '시사 문제 분석',
      '면접 대비 연습',
      '실전 모의고사'
    ],
    schedule: '월, 수, 금 저녁 8시',
    period: ['2025-01-15', '2025-09-15']
  },
  {
    id: 17,
    groupId: 'FM_17',
    name: '경찰공무원 준비반',
    category: '공무원 / 임용',
            subCategory: '경찰 / 소방 공무원',
    time: '아침',
    level: '중급',
    currentMembers: 4,
    maxMembers: 6,
    nickname: '경찰준비생',
    imageUrl: IMG_MEETING,
    summary: '경찰공무원 시험 대비를 위한 체계적인 학습과 체력 단련을 진행합니다.',
    rules: [
      '과목별 학습',
      '체력 단련 참여',
      '면접 대비 연습',
      '실전 모의고사'
    ],
    schedule: '화, 목, 토 아침 7시',
    period: ['2025-02-01', '2025-08-01']
  },
  {
    id: 18,
    groupId: 'FM_18',
    name: '프로그래밍 언어 마스터',
    category: 'IT',
    subCategory: '프로그래밍 언어',
    time: '저녁',
    level: '중급',
    currentMembers: 2,
    maxMembers: 4,
    nickname: '코딩마스터',
    imageUrl: IMG_MEETING,
    summary: '다양한 프로그래밍 언어를 학습하고 비교 분석하는 스터디입니다.',
    rules: [
      '언어별 프로젝트 진행',
      '코드 리뷰 참여',
      '성능 비교 분석',
      '최신 언어 트렌드 공유'
    ],
    schedule: '화, 목 저녁 9시',
    period: ['2025-02-10', '2025-06-10']
  },
  {
    id: 19,
    groupId: 'FM_19',
    name: '공모전 준비 스터디',
    category: '프로젝트 / 팀 활동',
    subCategory: '공모전',
    time: '저녁',
    level: '고급',
    currentMembers: 3,
    maxMembers: 5,
    nickname: '공모전왕',
    imageUrl: IMG_MEETING,
    summary: '다양한 공모전에 참여하여 수상 경험을 쌓는 스터디입니다.',
    rules: [
      '공모전 정보 공유',
      '팀 프로젝트 진행',
      '포트폴리오 제작',
      '수상 경험 공유'
    ],
    schedule: '월, 수, 금 저녁 8시',
    period: ['2025-01-20', '2025-12-20']
  },
  {
    id: 20,
    groupId: 'FM_20',
    name: '이력서/포트폴리오 작성 스터디',
    category: '취업 및 멘토',
    subCategory: '이력서 / 포트폴리오 작성',
    time: '저녁',
    level: '중급',
    currentMembers: 4,
    maxMembers: 6,
    nickname: '취업멘토',
    imageUrl: IMG_MEETING,
    summary: '취업을 위한 이력서와 포트폴리오 작성법을 학습하는 스터디입니다.',
    rules: [
      '이력서 작성법 학습',
      '포트폴리오 제작',
      '피드백 교환',
      '취업 정보 공유'
    ],
    schedule: '화, 목 저녁 7시',
    period: ['2025-02-01', '2025-05-01']
  }
]


// ===== 퀴즈 데이터 =====
export const MOCK_QUIZZES = [
  {
    id: 1,
    category: '알고리즘',
    question: '시간복잡도 O(n)은 선형 시간 복잡도이다.',
    type: 'OX',
    answer: 'O'
  },
  {
    id: 2,
    category: '프론트엔드',
    question: 'React에서 useState와 useEffect의 차이점은?',
    type: 'SUBJECTIVE',
    answer: 'useState는 상태 관리를, useEffect는 사이드 이펙트 처리를 담당합니다.'
  },
  {
    id: 3,
    category: '영어',
    question: '다음 중 올바른 영어 표현은?',
    type: 'MULTIPLE',
    options: ['I am study', 'I am studying', 'I am studies', 'I am studied'],
    answer: 'I am studying'
  },
  {
    id: 4,
    category: '일본어',
    question: '「おはようございます」의 의미는?',
    type: 'MULTIPLE',
    options: ['안녕하세요', '좋은 아침입니다', '안녕히 가세요', '감사합니다'],
    answer: '좋은 아침입니다'
  },
  {
    id: 5,
    category: '백엔드',
    question: 'REST API에서 GET 요청은 데이터를 수정할 수 있다.',
    type: 'OX',
    answer: 'X'
  },
  {
    id: 6,
    category: 'AI',
    question: '머신러닝에서 과적합(Overfitting)이란?',
    type: 'SUBJECTIVE',
    answer: '훈련 데이터에 너무 잘 맞춰져서 새로운 데이터에 대한 일반화 성능이 떨어지는 현상입니다.'
  },
  {
    id: 7,
            category: '디자인 / 콘텐츠',
    question: 'UI/UX 디자인에서 사용자 경험(UX)의 핵심은?',
    type: 'MULTIPLE',
    options: ['아름다운 디자인', '사용자 중심 사고', '최신 트렌드', '빠른 로딩'],
    answer: '사용자 중심 사고'
  },
  {
    id: 8,
    category: '중국어',
    question: '「你好」의 발음은?',
    type: 'MULTIPLE',
    options: ['니하오', '니하오우', '니하오', '니하오'],
    answer: '니하오'
  },
  {
    id: 9,
    category: 'CS',
    question: '스택(Stack)은 LIFO 구조이다.',
    type: 'OX',
    answer: 'O'
  },
  {
    id: 10,
    category: '스페인어',
    question: '「Hola」의 의미는?',
    type: 'MULTIPLE',
    options: ['안녕하세요', '감사합니다', '죄송합니다', '안녕히 가세요'],
    answer: '안녕하세요'
  },
  {
    id: 11,
            category: 'IT / 컴퓨터',
    question: '정보처리기사 실기에서 가장 중요한 것은?',
    type: 'MULTIPLE',
    options: ['빠른 코딩', '정확한 알고리즘', '깔끔한 코드', '모든 것'],
    answer: '모든 것'
  },
  {
    id: 12,
            category: '금융 / 경영',
    question: 'ROE(자기자본이익률)는 기업의 수익성을 나타내는 지표이다.',
    type: 'OX',
    answer: 'O'
  },
  {
    id: 13,
    category: '9급 공무원(행정)',
    question: '행정법상 행정행위의 효력 중 공정력이란?',
    type: 'SUBJECTIVE',
    answer: '행정행위가 성립한 후에는 행정청도 스스로 이를 취소하거나 변경할 수 없는 효력을 말합니다.'
  },
  {
    id: 14,
    category: '공모전',
    question: '공모전에서 가장 중요한 평가 기준은?',
    type: 'MULTIPLE',
    options: ['창의성', '실현 가능성', '완성도', '모든 것'],
    answer: '모든 것'
  },
  {
    id: 15,
    category: '이력서 / 포트폴리오 작성',
    question: '이력서 작성 시 가장 중요한 원칙은?',
    type: 'MULTIPLE',
    options: ['간결함', '구체성', '진실성', '모든 것'],
    answer: '모든 것'
  }
]

// 랭킹 기능 비활성화
// ===== 랭킹 데이터 =====
// export const MOCK_RANKINGS = {
//   user: [
//     { rank: 1, nickname: '앨리스', total_score: 1850, profileImageUrl: IMG_LOGO },
//     { rank: 2, nickname: '밥', total_score: 1720, profileImageUrl: IMG_LOGO },
//     { rank: 3, nickname: '찰리', total_score: 1650, profileImageUrl: IMG_LOGO },
//     { rank: 4, nickname: '다이애나', total_score: 1580, profileImageUrl: IMG_LOGO },
//     { rank: 5, nickname: '에드워드', total_score: 1520, profileImageUrl: IMG_LOGO },
//     { rank: 6, nickname: '사쿠라', total_score: 1480, profileImageUrl: IMG_LOGO },
//     { rank: 7, nickname: '자격증왕', total_score: 1420, profileImageUrl: IMG_LOGO },
//     { rank: 8, nickname: '리밍', total_score: 1380, profileImageUrl: IMG_LOGO },
//     { rank: 9, nickname: '카를로스', total_score: 1350, profileImageUrl: IMG_LOGO },
//     { rank: 10, nickname: '박교수', total_score: 1320, profileImageUrl: IMG_LOGO }
//   ],
//   study: [
//     { rank: 1, study_name: '알고리즘 마스터 스터디', category: 'IT', avgScore: 92.5, memberCount: 5, hashtags: ['#알고리즘', '#코딩', '#백준'] },
//     { rank: 2, study_name: 'React/Next.js 현대적 웹 개발', category: 'IT', avgScore: 89.3, memberCount: 4, hashtags: ['#React', '#Next.js', '#프론트엔드'] },
//     { rank: 3, study_name: '토익 900점 목표 스터디', category: '어학', avgScore: 87.8, memberCount: 5, hashtags: ['#토익', '#영어', '#고득점'] },
//     { rank: 4, study_name: 'Spring Boot 백엔드 마스터', category: 'IT', avgScore: 85.2, memberCount: 5, hashtags: ['#Spring', '#백엔드', '#Java'] },
//     { rank: 5, study_name: 'AI/머신러닝 연구실', category: 'IT', avgScore: 83.7, memberCount: 3, hashtags: ['#AI', '#머신러닝', '#연구'] },
//     { rank: 6, study_name: '영어 회화 클럽', category: '어학', avgScore: 82.1, memberCount: 6, hashtags: ['#영어', '#회화', '#문화교류'] },
//     { rank: 7, study_name: 'UI/UX 디자인 워크샵', category: '자격증', avgScore: 80.5, memberCount: 3, hashtags: ['#UI/UX', '#디자인', '#포트폴리오'] },
//     { rank: 8, study_name: 'JLPT N2 합격 도전', category: '어학', avgScore: 78.9, memberCount: 4, hashtags: ['#JLPT', '#일본어', '#N2'] },
//     { rank: 9, study_name: '정보처리기사 실기 대비', category: '자격증', avgScore: 77.3, memberCount: 8, hashtags: ['#정보처리기사', '#실기', '#자격증'] },
//     { rank: 10, study_name: '중국어 HSK 4급 도전', category: '어학', avgScore: 75.8, memberCount: 4, hashtags: ['#HSK', '#중국어', '#4급'] }
//   ]
// }

// ===== 유틸리티 함수들 =====

// 로그인 검증
export const validateLogin = (loginId: string, password: string) => {
  const user = MOCK_USERS.find(u => u.loginId === loginId && u.password === password)
  if (user) {
    return {
      success: true,
      message: '로그인 성공',
      token: 'mock-jwt-token-' + Date.now(), // 토큰 추가
      user: {
        profile_img: user.user.profile_img,
        nickname: user.user.nickname,
        login_id: user.user.login_id,
        email: user.user.email,
        gender: user.user.gender,
        time_id: user.user.time_id,
        interest_id: user.user.interest_id,
        studies: user.user.studies || []
      }
    }
  }
  return {
    success: false,
    message: '아이디 또는 비밀번호가 올바르지 않습니다.'
  }
}

// 사용자 프로필 조회
export const getUserProfile = (loginId: string) => {
  const user = MOCK_USERS.find(u => u.loginId === loginId)
  return user ? user.user : null
}

// 스터디 조회 함수
export const getStudies = (keyword?: string, category?: string) => {
  let filteredStudies = [...MOCK_STUDIES]

  if (keyword) {
    filteredStudies = filteredStudies.filter(study =>
      study.name.toLowerCase().includes(keyword.toLowerCase()) ||
      study.summary?.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  if (category) {
    filteredStudies = filteredStudies.filter(study =>
      study.category === category || study.subCategory === category
    )
  }

  return filteredStudies
}

// 퀴즈 조회 함수 (출석 체크용)
export const getQuiz = (category?: string) => {
  const quiz = {
    id: Math.floor(Math.random() * 1000) + 1,
    category: category || '프로그래밍',
    question: 'Vue.js는 프론트엔드 프레임워크이다.',
    answer: 'O'
  }
  return quiz
}


export const getSharedQuiz = (
  date: string,
  studyIds: number[]
): { question: string; answer: string }[] => {
  const result: { question: string; answer: string }[] = []

  for (const studyId of studyIds) {
    const shared = MOCK_SHARED_QUIZZES[studyId]
    if (!shared) continue

    // 해당 날짜의 공유 퀴즈 찾기
    const match = shared.find(entry => entry.date === date)
    if (match) {
      // 매칭된 퀴즈들 결과 배열에 추가
      result.push(...match.quiz)
    }
  }

  return result
}

// 랭킹 기능 비활성화
// 랭킹 조회 함수
// export const getRankings = (type: 'user' | 'study') => {
//   if (type === 'user') {
//     return [
//       { rank: 1, nickname: '김지현', total_score: 1250 },
//       { rank: 2, nickname: '박영희', total_score: 1180 },
//       { rank: 3, nickname: '이민수', total_score: 1100 },
//       { rank: 4, nickname: '최지원', total_score: 1050 },
//       { rank: 5, nickname: '정수진', total_score: 980 }
//     ]
//   } else {
//     return [
//       { rank: 1, study_name: '해외 취업 대비 영어 말하기 준비 스터디', total_score: 850, hashtags: ['영어', '면접', '취업'] },
//       { rank: 2, study_name: '알고리즘 스터디', total_score: 780, hashtags: ['알고리즘', '코딩'] },
//       { rank: 3, study_name: '프론트엔드 개발 스터디', total_score: 720, hashtags: ['프론트엔드', 'React', 'Vue'] },
//       { rank: 4, study_name: '백엔드 개발 스터디', total_score: 680, hashtags: ['백엔드', 'Spring', 'Node.js'] },
//       { rank: 5, study_name: '데이터 분석 스터디', total_score: 650, hashtags: ['데이터', 'Python', '분석'] }
//     ]
//   }
// }

// 스터디 상태 조회 함수 (스터디별 구분)
export const getStudyStatus = (studyId?: number | null) => {
  if (studyId) {
    // 특정 스터디의 상태 반환
    return {
      ...MOCK_STUDY_STATUS,
      commitment: `스터디 ${studyId}에 대한 다짐입니다!`,
      targetStudyTime: 90,
      actualStudyTime: 75,
      weeklyStudyTime: [2, 3, 1, 4, 2, 3, 1]
    }
  }
  // 전체 스터디 상태 반환
  return MOCK_STUDY_STATUS
}

// ===== 스터디 일정 조회 함수 =====
export const getUserStudySchedule = (loginId: string) => {
  return MOCK_STUDY_SCHEDULES[loginId as keyof typeof MOCK_STUDY_SCHEDULES] || []
}

// ===== 스터디 멤버 조회 함수 =====
export const getStudyMembers = (studyId: number) => {
  return MOCK_MEMBERS[studyId as keyof typeof MOCK_MEMBERS] || []
}

// ===== 스터디 파일 조회 함수 =====
export const getStudyFiles = (studyId: number) => {
  return MOCK_STUDY_FILES[studyId as keyof typeof MOCK_STUDY_FILES] || {
    recordings: [],
    summaries: [],
    materials: []
  }
}

// ===== 스터디 공지사항 조회 함수 =====
export const getStudyNotices = (studyId: number) => {
  return MOCK_NOTICES[studyId as keyof typeof MOCK_NOTICES] || []
}

// ===== 스터디 게시글 조회 함수 =====
export const getStudyPosts = (studyId: number) => {
  return MOCK_POSTS[studyId as keyof typeof MOCK_POSTS] || []
}

// 다짐 저장 함수 (스터디별 구분)
export const saveCommitment = (commitment: string, studyId?: number | null) => {
  if (studyId) {
    console.log(`스터디 ${studyId} 다짐 저장:`, commitment)
  } else {
    console.log('전체 스터디 다짐 저장:', commitment)
  }
  MOCK_STUDY_STATUS.commitment = commitment
  return { success: true, message: '다짐이 저장되었습니다.' }
}

// 목표 날짜 저장 함수
export const saveTargetDate = (date: Date, description: string) => {
  MOCK_STUDY_STATUS.targetDate = date.toISOString().split('T')[0]
  MOCK_STUDY_STATUS.ddayDescription = description
  console.log('Mock: Target date saved:', MOCK_STUDY_STATUS.targetDate, 'Description:', MOCK_STUDY_STATUS.ddayDescription)
  return { success: true, message: '목표 날짜가 저장되었습니다.' }
}

// 활동 로그 조회 함수
export const getActivityLog = () => {
  return MOCK_ACTIVITY_LOGS
}

// 특정 날짜 활동 로그 조회 함수
export const getActivityLogByDate = (date: string) => {
  const log = MOCK_ACTIVITY_LOGS.find(log => log.date === date)
  if (log && log.quiz_taken) {
    return {
      quiz_id: log.quiz_id,
      question: 'Vue.js는 어떤 프레임워크인가요?',
      answer: '프론트엔드 프레임워크'
    }
  }
  return null
}

// AI 퀴즈 세션 생성 함수
export const createAIQuizSession = () => {
  const sessionId = `mock_session_${Date.now()}`
  const questions = [
    {
      id: 1,
      type: 'OX',
      question: 'JavaScript는 객체지향 프로그래밍 언어이다.',
      options: ['O', 'X'],
      answer: 'O'
    },
    {
      id: 2,
      type: 'OBJECTIVE',
      question: '다음 중 JavaScript의 기본 데이터 타입이 아닌 것은?',
      options: ['string', 'number', 'boolean', 'array'],
      answer: 'array'
    },
    {
      id: 3,
      type: 'SUBJECTIVE',
      question: 'JavaScript에서 변수를 선언하는 방법을 설명하세요.',
      answer: 'var, let, const 키워드를 사용한다.'
    }
  ]

  MOCK_AI_QUIZ_SESSIONS[sessionId] = {
    session_id: sessionId,
    questions
  }

  return {
    session_id: sessionId,
    questions
  }
}

// AI 퀴즈 결과 조회 함수
export const getAIQuizResult = (sessionId: string) => {
  return MOCK_AI_QUIZ_RESULTS[sessionId] || {
    total_correct: 0,
    total_xp: 0,
    bonuses: []
  }
}

// 회원가입 함수
export const registerUser = (userData: {
  loginId: string
  password: string
  name: string
  email: string
  gender: 'M' | 'F' | 'Other'
  preferredTime: number
  studyLevel: string
  interest: string | string[]
}) => {
  // 중복 체크
  const existingUser = MOCK_USERS.find(u => u.loginId === userData.loginId || u.user.email === userData.email)
  if (existingUser) {
    return {
      success: false,
      message: '이미 존재하는 아이디 또는 이메일입니다.'
    }
  }

  // 새 사용자 생성
  const newUser = {
    loginId: userData.loginId,
    password: userData.password,
    user: {
      profile_img: IMG_LOGO,
      nickname: userData.name,
      login_id: userData.loginId,
      email: userData.email,
      gender: userData.gender,
      time_id: userData.preferredTime,
      interest_id: Array.isArray(userData.interest) ? userData.interest[0] : userData.interest,
      interests: Array.isArray(userData.interest) ? userData.interest : [userData.interest],
      studies: []
    }
  }

  // 사용자 배열에 추가
  MOCK_USERS.push(newUser)

  // 로컬 스토리지에도 저장 (페이지 새로고침 시에도 유지)
  localStorage.setItem('mockUsers', JSON.stringify(MOCK_USERS))

  return {
    success: true,
    message: '회원가입이 완료되었습니다.',
    user: {
      profile_img: newUser.user.profile_img,
      nickname: newUser.user.nickname,
      login_id: newUser.user.login_id,
      email: newUser.user.email,
      gender: newUser.user.gender,
      time_id: newUser.user.time_id,
      interest_id: newUser.user.interest_id,
      studies: newUser.user.studies || []
    }
  }
}

// 등록된 사용자 목록 조회 (개발용)
export const getRegisteredUsers = () => {
  return MOCK_USERS.map(user => ({
    loginId: user.loginId,
    nickname: user.user.nickname,
    email: user.user.email
  }))
}

// 사용자의 스터디 역할 확인
export const getUserStudyRole = (loginId: string, studyId: number): 'leader' | 'member' | null => {
  const user = MOCK_USERS.find(u => u.loginId === loginId)
  if (!user) return null

  const study = user.user.studies?.find(s => s.study_id === studyId)
  return (study?.role as 'leader' | 'member') || null
}

// 사용자 데이터 초기화 (개발용)
export const resetMockUsers = () => {
  MOCK_USERS = [
    {
      loginId: 'test',
      password: 'testpw',
      user: {
        profile_img: IMG_LOGO,
        nickname: '테스트',
        login_id: 'test',
        email: 'test@example.com',
        gender: 'M',
        time_id: 2,
        interest_id: 'IT',
        interests: ['IT', '프론트엔드'],
        studies: [
          { study_id: 1, study_name: '알고리즘 마스터 스터디', role: 'leader' },
          { study_id: 3, study_name: 'React/Next.js 현대적 웹 개발', role: 'member' }
        ]
      }
    },
    {
      loginId: 'alice',
      password: '1234',
      user: {
        profile_img: IMG_LOGO,
        nickname: '앨리스',
        login_id: 'alice',
        email: 'alice@example.com',
        gender: 'F',
        time_id: 2,
        interest_id: 'IT',
        interests: ['IT', '자격증'],
        studies: [
          { study_id: 1, study_name: '알고리즘 마스터 스터디', role: 'leader' },
          { study_id: 3, study_name: 'React/Next.js 현대적 웹 개발', role: 'member' }
        ]
      }
    },
    {
      loginId: 'bob',
      password: '1234',
      user: {
        profile_img: IMG_LOGO,
        nickname: '밥',
        login_id: 'bob',
        email: 'bob@example.com',
        gender: 'M',
        time_id: 1,
        interest_id: 'IT',
        interests: ['IT'],
        studies: [
          { study_id: 1, study_name: '알고리즘 마스터 스터디', role: 'member' },
          { study_id: 5, study_name: 'Spring Boot 백엔드 마스터', role: 'leader' }
        ]
      }
    },
    {
      loginId: 'charlie',
      password: '1234',
      user: {
        profile_img: IMG_LOGO,
        nickname: '찰리',
        login_id: 'charlie',
        email: 'charlie@example.com',
        gender: 'M',
        time_id: 3,
        interest_id: 'IT',
        interests: ['IT'],
        studies: [
          { study_id: 1, study_name: '알고리즘 마스터 스터디', role: 'member' },
          { study_id: 10, study_name: 'AI/머신러닝 연구실', role: 'leader' }
        ]
      }
    },
    {
      loginId: 'diana',
      password: '1234',
      user: {
        profile_img: IMG_LOGO,
        nickname: '다이애나',
        login_id: 'diana',
        email: 'diana@example.com',
        gender: 'F',
        time_id: 2,
        interest_id: '자격증',
        interests: ['자격증'],
        studies: [
          { study_id: 2, study_name: '해외 취업 대비 영어 말하기 준비 스터디', role: 'member' }
        ]
      }
    },
    {
      loginId: 'edward',
      password: '1234',
      user: {
        profile_img: IMG_LOGO,
        nickname: '에드워드',
        login_id: 'edward',
        email: 'edward@example.com',
        gender: 'M',
        time_id: 1,
        interest_id: '어학',
        interests: ['어학'],
        studies: [
          { study_id: 4, study_name: '토익 900점 목표 스터디', role: 'leader' }
        ]
      }
    }
  ]
  localStorage.setItem('mockUsers', JSON.stringify(MOCK_USERS))
}
export { MOCK_USERS };

// 스터디 활동 로그 타입
// export interface StudyLog {
//   date: string;
//   attended: boolean;
//   quiz?: {
//     question: string;
//     answer: string;
//   }[];
// }

// 사용자별 활동 로그 모음
// ===== 사용자별 활동 로그 모음 =====
// 사용자별 활동 로그 모음
// src/utils/mockData.ts
import type { StudyLog } from '@/types/study'

// 사용자별 활동 로그 모음
export const MOCK_STUDY_LOGS: Record<string, StudyLog[]> = {
  alice: [
    {
      date: '2025-07-30',
      attendance: 'present',
      participationMinutes: 45,
      quiz: [
        { question: 'Vue에서 상태 관리 도구는?', answer: 'Pinia' },
        { question: 'setup() 함수는 어디서 쓰이나?', answer: 'Composition API' }
      ]
    },
    {
      date: '2025-07-29',
      attendance: 'absent',
      participationMinutes: 0,
      quiz: []
    },
    {
      date: '2025-07-28',
      attendance: 'present',
      participationMinutes: 35,
      quiz: [
        { question: 'CSS에서 글자 굵게는?', answer: 'font-weight' }
      ]
    },
    {
      date: '2025-07-27',
      attendance: 'absent',
      participationMinutes: 0,
      quiz: []
    },
    {
      date: '2025-07-26',
      attendance: 'present',
      participationMinutes: 50,
      quiz: [
        { question: 'JavaScript에서 배열 메서드는?', answer: 'push' }
      ]
    }
  ],

  bob: [
    {
      date: '2025-07-30',
      attendance: 'present',
      participationMinutes: 50,
      quiz: [
        { question: 'React에서 상태 관리 Hook은?', answer: 'useState' }
      ]
    },
    {
      date: '2025-07-29',
      attendance: 'present',
      participationMinutes: 40,
      quiz: [
        { question: 'JavaScript 배열 요소 추가?', answer: 'push' }
      ]
    },
    {
      date: '2025-07-28',
      attendance: 'present',
      participationMinutes: 30,
      quiz: [
        { question: 'Spring Boot에서 의존성 주입?', answer: '@Autowired' }
      ]
    }
  ],

  charlie: [
    {
      date: '2025-07-30',
      attendance: 'present',
      participationMinutes: 55,
      quiz: [
        { question: 'HTTP 상태코드 200 의미?', answer: '요청 성공' }
      ]
    },
    {
      date: '2025-07-29',
      attendance: 'present',
      participationMinutes: 60,
      quiz: [
        { question: 'REST API란?', answer: '자원을 URI로 구분하고 HTTP로 처리' }
      ]
    },
    {
      date: '2025-07-28',
      attendance: 'present',
      participationMinutes: 35,
      quiz: [
        { question: 'CSS에서 글자 굵게는?', answer: 'font-weight' }
      ]
    }
  ],

  diana: [
    {
      date: '2025-07-30',
      attendance: 'present',
      participationMinutes: 45,
      quiz: [
        { question: 'TypeScript 타입 단언 문법?', answer: 'as' }
      ]
    },
    {
      date: '2025-07-29',
      attendance: 'present',
      participationMinutes: 30,
      quiz: [
        { question: 'UI 구성 요소 위치 속성?', answer: 'position' }
      ]
    },
    {
      date: '2025-07-28',
      attendance: 'present',
      participationMinutes: 50,
      quiz: [
        { question: 'CSS Flex 정렬 속성?', answer: 'justify-content' }
      ]
    }
  ],

  edward: [
    {
      date: '2025-07-30',
      attendance: 'present',
      participationMinutes: 60,
      quiz: [
        { question: '파이썬 리스트 요소 추가?', answer: 'append()' }
      ]
    },
    {
      date: '2025-07-29',
      attendance: 'present',
      participationMinutes: 40,
      quiz: [
        { question: 'Django 모델 정의 클래스?', answer: 'models.Model' }
      ]
    },
    {
      date: '2025-07-28',
      attendance: 'present',
      participationMinutes: 35,
      quiz: [
        { question: 'ORM이란?', answer: '객체지향으로 DB를 다루는 방식' }
      ]
    }
  ]
}



// 스터디별 + 날짜별 공통 퀴즈 모음
export const MOCK_SHARED_QUIZZES: Record<number, {
  date: string;
  quiz: { question: string; answer: string }[];
}[]> = {
  1: [ // alice
    {
      date: '2025-07-30',
      quiz: [
        { question: 'Vue에서 상태 관리 도구는?', answer: 'Pinia' },
        { question: 'setup() 함수는 어디서 쓰이나?', answer: 'Composition API' },
        { question: 'Vue 3의 새로운 특징은?', answer: 'Composition API' },
        { question: 'Vue에서 컴포넌트 간 데이터 전달 방법은?', answer: 'Props와 Emit' },
        { question: 'Vue Router의 기본 사용법은?', answer: 'router-link와 router-view' },
        { question: 'Vue에서 반응형 데이터를 만드는 방법은?', answer: 'ref() 또는 reactive()' },
        { question: 'Vue의 생명주기 훅 중 mounted는 언제 실행되나요?', answer: 'DOM이 마운트된 후' },
        { question: 'Vue에서 조건부 렌더링을 하는 방법은?', answer: 'v-if 또는 v-show' },
        { question: 'Vue에서 리스트 렌더링을 하는 방법은?', answer: 'v-for 디렉티브' },
        { question: 'Vue에서 이벤트 처리를 하는 방법은?', answer: 'v-on 또는 @' }
      ]
    },
    {
      date: '2025-07-29',
      quiz: [
        { question: '스터디에서 가장 중요한 것은?', answer: '꾸준한 참여' },
        { question: '화상회의 중 마이크 사용법은?', answer: '발언 시에만 켜기' },
        { question: '스터디 자료는 언제 준비해야 하나요?', answer: '미리미리' },
        { question: '스터디 참여 시 지켜야 할 예의는?', answer: '시간 엄수' },
        { question: '스터디 목표 달성을 위한 핵심은?', answer: '계획 수립' },
        { question: '스터디원 간 소통의 기본은?', answer: '상호 존중' },
        { question: '효과적인 학습을 위한 방법은?', answer: '적극적 참여' },
        { question: '스터디 진행 중 질문이 있을 때는?', answer: '적절한 타이밍에' },
        { question: '스터디 자료 공유의 원칙은?', answer: '정기적 업데이트' },
        { question: '스터디 성과 향상을 위한 태도는?', answer: '열린 마음' }
      ]
    },
    {
      date: '2025-07-28',
      quiz: [
        { question: 'HTML의 시맨틱 태그 예시는?', answer: '<section>' },
        { question: 'HTML5에서 새로 추가된 시맨틱 태그는?', answer: '<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>' },
        { question: 'HTML에서 폼 요소의 기본 속성은?', answer: 'action, method, name' },
        { question: 'HTML에서 이미지를 삽입하는 태그는?', answer: '<img>' },
        { question: 'HTML에서 링크를 만드는 태그는?', answer: '<a>' },
        { question: 'HTML에서 리스트를 만드는 태그는?', answer: '<ul>, <ol>, <li>' },
        { question: 'HTML에서 테이블을 만드는 태그는?', answer: '<table>, <tr>, <td>' },
        { question: 'HTML에서 주석을 다는 방법은?', answer: '<!-- -->' },
        { question: 'HTML에서 메타데이터를 정의하는 태그는?', answer: '<meta>' },
        { question: 'HTML에서 스타일을 적용하는 방법은?', answer: '<style> 태그 또는 style 속성' }
      ]
    },
    {
      date: '2025-07-27',
      quiz: [
        { question: '스터디 참여의 기본 원칙은?', answer: '정시 참석' },
        { question: '스터디 중 집중력을 높이는 방법은?', answer: '적극적 참여' },
        { question: '스터디 자료 준비 시 주의사항은?', answer: '충분한 검토' },
        { question: '스터디원 간 피드백의 원칙은?', answer: '건설적 제안' },
        { question: '스터디 목표 달성의 핵심은?', answer: '지속적 노력' },
        { question: '스터디 환경 조성의 중요성은?', answer: '집중력 향상' },
        { question: '스터디 진행 중 소통 방법은?', answer: '명확한 표현' },
        { question: '스터디 성과 측정 기준은?', answer: '목표 달성도' },
        { question: '스터디 참여자 간 협력의 핵심은?', answer: '상호 지원' },
        { question: '스터디 지속성의 비결은?', answer: '동기 부여' }
      ]
    }
  ],
  9: [ // bob
    {
      date: '2025-07-30',
      quiz: [
        { question: 'React에서 상태 관리를 위한 Hook은?', answer: 'useState' }
      ]
    },
    {
      date: '2025-07-28',
      quiz: [
        { question: '자바스크립트 배열에서 요소 추가 함수?', answer: 'push' }
      ]
    }
  ],
  10: [ // charlie
    {
      date: '2025-07-29',
      quiz: [
        { question: 'HTTP 상태코드 200 의미?', answer: '요청 성공' },
        { question: 'REST API란?', answer: '자원을 URI로 구분하고 HTTP로 처리하는 방식' }
      ]
    },
    {
      date: '2025-07-28',
      quiz: [
        { question: 'CSS에서 글자 굵게는?', answer: 'font-weight' }
      ]
    },
    {
      date: '2025-07-27',
      quiz: [
        { question: 'Promise의 3가지 상태?', answer: 'pending, fulfilled, rejected' }
      ]
    }
  ],
  3: [ // diana
    {
      date: '2025-07-30',
      quiz: [
        { question: 'TypeScript의 타입 단언 문법?', answer: 'as' }
      ]
    },
    {
      date: '2025-07-27',
      quiz: [
        { question: 'CSS Flex에서 정렬 속성?', answer: 'justify-content' }
      ]
    }
  ],
  4: [ // edward
    {
      date: '2025-07-30',
      quiz: [
        { question: '파이썬 리스트에 요소 추가?', answer: 'append()' }
      ]
    },
    {
      date: '2025-07-29',
      quiz: [
        { question: '장고에서 모델 정의 시 사용하는 클래스?', answer: 'models.Model' }
      ]
    },
    {
      date: '2025-07-27',
      quiz: [
        { question: 'Django에서 ORM은 무엇인가?', answer: '객체지향으로 DB를 다루는 방식' }
      ]
    }
  ]
}




// 스터디 매칭 알고리즘
import type { SearchParams, UserProfile } from '@/types/study'

export const findBestMatchingStudy = (searchParams: SearchParams, userProfile?: UserProfile) => {
  let filteredStudies = [...MOCK_STUDIES]

  // 기본 필터링
  if (searchParams.keyword) {
    filteredStudies = filteredStudies.filter(study =>
      study.name.toLowerCase().includes(searchParams.keyword!.toLowerCase())
    )
  }

  if (searchParams.category) {
    filteredStudies = filteredStudies.filter(study =>
      study.category === searchParams.category
    )
  }

  if (searchParams['sub-category']) {
    filteredStudies = filteredStudies.filter(study =>
      study.subCategory === searchParams['sub-category']
    )
  }

  if (searchParams.time) {
    filteredStudies = filteredStudies.filter(study =>
      study.time === searchParams.time
    )
  }

  if (searchParams.level) {
    filteredStudies = filteredStudies.filter(study =>
      study.level === searchParams.level
    )
  }

  if (searchParams.minMembers || searchParams.maxMembers) {
    filteredStudies = filteredStudies.filter(study => {
      if (searchParams.minMembers && study.maxMembers < searchParams.minMembers) return false
      if (searchParams.maxMembers && study.maxMembers > searchParams.maxMembers) return false
      return true
    })
  }

  // 매칭 점수 계산
  const studiesWithScore = filteredStudies.map(study => {
    let score = 0

    // 카테고리 매칭 (가장 중요)
    if (study.category === searchParams.category) score += 50
    if (study.subCategory === searchParams['sub-category']) score += 30

    // 시간대 매칭
    if (study.time === searchParams.time) score += 20

    // 레벨 매칭
    if (study.level === searchParams.level) score += 15

    // 멤버 수 매칭
    if (searchParams.minMembers && searchParams.maxMembers) {
      const targetMembers = (searchParams.minMembers + searchParams.maxMembers) / 2
      const diff = Math.abs(study.maxMembers - targetMembers)
      if (diff <= 1) score += 10
      else if (diff <= 3) score += 5
    }

    // 사용자 프로필과의 매칭 (있는 경우)
    if (userProfile) {
      if (study.category === userProfile.interest_id) score += 25
      if (study.time === `시간대 ${userProfile.time_id}`) score += 15
    }

    // 랜덤 요소 추가 (0-5점)
    score += Math.floor(Math.random() * 6)

    return { ...study, matchScore: score }
  })

  // 점수순으로 정렬
  studiesWithScore.sort((a, b) => b.matchScore - a.matchScore)

  return studiesWithScore
}

// 페이지 로드 시 저장된 사용자 데이터 복원
const loadMockUsersFromStorage = () => {
  const savedUsers = localStorage.getItem('mockUsers')
  if (savedUsers) {
    try {
      MOCK_USERS = JSON.parse(savedUsers)
    } catch (error) {
      console.error('저장된 사용자 데이터 로드 실패:', error)
    }
  }
}

// 페이지 로드 시 저장된 사용자 데이터 복원
loadMockUsersFromStorage()

// 개발용: 전역 함수로 노출 (브라우저 콘솔에서 사용 가능)
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).resetMockUsers = resetMockUsers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).getRegisteredUsers = getRegisteredUsers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).MOCK_USERS = MOCK_USERS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).getUserStudyRole = getUserStudyRole
}

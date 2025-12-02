import { defineStore } from 'pinia'

// 이미지 import
import cover1 from '@/assets/cover/불편한편의점.jpg'
import cover2 from '@/assets/cover/달러구트꿈백화점.jpg'
import cover3 from '@/assets/cover/미드나잇라이브러리.jpg'
import cover4 from '@/assets/cover/코스모스.jpg'
import cover5 from '@/assets/cover/해커와화가.jpg'
import cover6 from '@/assets/cover/클린코드.jpg'

// 목데이터
const mockThreads = [
  {
    id: 1,
    title: '불편한 편의점을 읽고',
    content: '정말 따뜻하고 감동적인 이야기였습니다. 편의점이라는 작은 공간에서 펼쳐지는 인간애가 인상적이었어요.',
    author: '독서왕',
    ai_image_url: '',
    created_at: new Date().toISOString(),
    likes: 15,
    like_count: 15,
    is_liked: false,
    comment_count: 2,
    book: {
      id: 1,
      title: '불편한 편의점',
      author: '김호연',
      cover: cover1,
      category: { name: '소설/시/희곡' }
    }
  },
  {
    id: 2,
    title: '달러구트 꿈 백화점 후기',
    content: '상상력이 풍부하고 독특한 설정이 매력적이었습니다. 꿈을 판매한다는 아이디어가 정말 신선했어요.',
    author: '책벌레',
    ai_image_url: '',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    likes: 8,
    like_count: 8,
    is_liked: false,
    comment_count: 1,
    book: {
      id: 2,
      title: '달러구트 꿈 백화점',
      author: '이미예',
      cover: cover2,
      category: { name: '소설/시/희곡' }
    }
  },
  {
    id: 3,
    title: '미드나잇 라이브러리 추천합니다',
    content: '인생의 다양한 가능성을 보여주는 작품입니다. 후회와 선택에 대해 깊이 생각해볼 수 있었어요.',
    author: '독서인',
    ai_image_url: '',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    likes: 12,
    like_count: 12,
    is_liked: false,
    comment_count: 2,
    book: {
      id: 3,
      title: '미드나잇 라이브러리',
      author: '매트 헤이그',
      cover: cover3,
      category: { name: '소설/시/희곡' }
    }
  },
  {
    id: 4,
    title: '코스모스 읽고 우주에 대해 생각해봤어요',
    content: '우주의 광대함과 인간의 작은 존재에 대해 깊이 생각해볼 수 있었습니다. 과학과 철학이 만나는 작품이에요.',
    author: '과학좋아',
    ai_image_url: '',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    likes: 20,
    like_count: 20,
    is_liked: false,
    comment_count: 1,
    book: {
      id: 4,
      title: '코스모스',
      author: '칼 세이건',
      cover: cover4,
      category: { name: '인문학' }
    }
  },
  {
    id: 5,
    title: '클린 코드는 필독서입니다',
    content: '프로그래머라면 반드시 읽어야 할 책입니다. 코드의 품질이 얼마나 중요한지 깨달을 수 있었어요.',
    author: '개발자',
    ai_image_url: '',
    created_at: new Date(Date.now() - 345600000).toISOString(),
    likes: 25,
    like_count: 25,
    is_liked: false,
    comment_count: 1,
    book: {
      id: 6,
      title: '클린 코드',
      author: '로버트 C. 마틴',
      cover: cover6,
      category: { name: '컴퓨터/모바일' }
    }
  }
]

export const useThreadStore = defineStore('thread', {
  state: () => ({
    threads: [],
    selectedThread: null,
  }),
  actions: {
    async fetchThreads(params = {}) {
      // 백엔드 없이 목데이터만 사용
      let filteredThreads = [...mockThreads]
      
      // book 필터링
      if (params.book) {
        const bookId = parseInt(params.book)
        filteredThreads = filteredThreads.filter(thread => thread.book?.id === bookId)
      }
      
      // user 필터링 (userId로 필터링)
      if (params.user) {
        const userId = parseInt(params.user)
        // userId에 따라 다른 쓰레드 목록 반환 (목데이터)
        // testuser(id: 1)의 쓰레드만 반환
        if (userId === 1) {
          filteredThreads = [mockThreads[0], mockThreads[2], mockThreads[4]] // testuser의 쓰레드
        } else {
          filteredThreads = []
        }
      }
      
      this.threads = filteredThreads
    },

    async fetchThreadDetail(id) {
      // 백엔드 없이 목데이터만 사용
      const threadId = parseInt(id)
      const thread = mockThreads.find(t => t.id === threadId)
      if (thread) {
        this.selectedThread = { ...thread }
      } else {
        // 기본값으로 첫 번째 쓰레드 사용
        this.selectedThread = { ...mockThreads[0] }
      }
    },

    async submitThread(payload) {
      // 백엔드 없이 목데이터에 추가 (실제로는 저장되지 않음)
      const newThread = {
        id: mockThreads.length + 1,
        ...payload,
        author: '현재 사용자',
        created_at: new Date().toISOString(),
        likes: 0,
        ai_image_url: payload.ai_image_url || ''
      }
      mockThreads.unshift(newThread)
      this.threads.unshift(newThread)
      return { data: newThread }
    },
  },
})

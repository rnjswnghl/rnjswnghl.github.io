import { defineStore } from 'pinia'
import { fetchThreads, fetchThreadDetail, createThread, fetchBookDetail } from '@/utils/api'

export const useThreadStore = defineStore('thread', {
  state: () => ({
    threads: [],
    selectedThread: null,
  }),
  actions: {
    async fetchThreads(params = {}) {
      console.log('[store] fetchThreads 호출됨 - params:', params)

      try {
        const response = await fetchThreads(params)
        console.log('[store] fetchThreads 응답 data:', response.data)

        this.threads = response.data || []
      } catch (error) {
        console.error('[store] fetchThreads 에러:', error)
      }
    },

    async fetchThreadDetail(id) {
      const response = await fetchThreadDetail(id)
      const threadData = response.data

      if (typeof threadData.book === 'number') {
        try {
          const bookResponse = await fetchBookDetail(threadData.book)
          threadData.book = bookResponse.data
        } catch (error) {
          console.error('책 상세 정보를 불러오지 못했습니다.', error)
          threadData.book = null
        }
      }

      this.selectedThread = threadData
    },

    async submitThread(payload) {
      if (!payload.ai_image_url) {
        payload.ai_image_url = 'https://via.placeholder.com/150'
      }
      return await createThread(payload)
    },
  },
})

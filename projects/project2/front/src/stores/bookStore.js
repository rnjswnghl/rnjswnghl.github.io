import { defineStore } from 'pinia'
import { getBooks, getBookDetail } from '@/utils/api'

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [],
    selectedBook: null,
  }),
  actions: {
    async fetchBooks() {
      this.books = await getBooks()
    },
    async fetchBookDetail(id) {
      this.selectedBook = await getBookDetail(id)
    },
  },
})
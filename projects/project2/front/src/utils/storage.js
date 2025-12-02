// iframe에서 안전하게 localStorage 접근하는 유틸리티

export const safeStorage = {
  getItem(key) {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn(`localStorage.getItem('${key}') 접근 불가 (iframe 제한):`, error)
      return null
    }
  },

  setItem(key, value) {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.warn(`localStorage.setItem('${key}') 저장 불가 (iframe 제한):`, error)
      return false
    }
  },

  removeItem(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn(`localStorage.removeItem('${key}') 삭제 불가 (iframe 제한):`, error)
      return false
    }
  },

  clear() {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.warn('localStorage.clear() 불가 (iframe 제한):', error)
      return false
    }
  }
}


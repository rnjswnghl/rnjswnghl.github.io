<template>
  <div class="guestbook-container">
    <h2>방문록</h2>
    
    <!-- 이모지 선택 영역 -->
    <div class="emoji-selector">
      <div v-for="emoji in emojis" :key="emoji" class="emoji-item" @click="selectEmoji(emoji)">
        {{ emoji }}
      </div>
    </div>

    <!-- 방문록 목록 -->
    <div class="guestbook-list">
      <div v-for="entry in guestbookEntries" :key="entry.id" class="guestbook-entry">
        <div class="entry-content">
          <span class="emoji">{{ entry.emoji }}</span>
          <div class="entry-info">
            <span class="username">{{ entry.author }}</span>
            <span class="timestamp">{{ formatDate(entry.created_at) }}</span>
          </div>
          <button 
            v-if="entry.author === currentUser || entry.owner === currentUser" 
            @click="confirmDelete(entry.id)" 
            class="delete-btn"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

export default {
  name: 'GuestBook',
  setup() {
    const userStore = useUserStore()
    const currentUser = ref(userStore.username)
    const guestbookEntries = ref([])
    const emojis = ['😊', '👍', '❤️', '🎉', '🌟', '📚', '💡', '🎨']

    const fetchGuestbookEntries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/guestbook/1/')
        guestbookEntries.value = response.data
      } catch (error) {
        console.error('방문록을 불러오는데 실패했습니다:', error)
      }
    }

    const selectEmoji = async (emoji) => {
      if (!currentUser.value) {
        alert('로그인이 필요합니다.')
        return
      }

      try {
        await axios.post('http://localhost:8000/api/guestbook/1/', {
          emoji: emoji,
          author: currentUser.value,
          owner: currentUser.value
        })
        await fetchGuestbookEntries()
      } catch (error) {
        console.error('방문록 작성에 실패했습니다:', error)
      }
    }

    const confirmDelete = (entryId) => {
      if (confirm('정말로 이 방문록을 삭제하시겠습니까?')) {
        deleteEntry(entryId)
      }
    }

    const deleteEntry = async (entryId) => {
      try {
        await axios.delete(`http://localhost:8000/api/guestbook/entry/${entryId}/`, {
          headers: {
            'Authorization': `Bearer ${safeStorage.getItem('access_token')}`
          }
        })
        await fetchGuestbookEntries()
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 403:
              alert('삭제 권한이 없습니다.')
              break
            case 404:
              alert('삭제할 방문록을 찾을 수 없습니다.')
              break
            default:
              alert('방문록 삭제 중 오류가 발생했습니다.')
          }
        } else {
          alert('방문록 삭제 중 오류가 발생했습니다.')
        }
        console.error('방문록 삭제에 실패했습니다:', error)
      }
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    onMounted(() => {
      fetchGuestbookEntries()
    })

    return {
      currentUser,
      guestbookEntries,
      emojis,
      selectEmoji,
      confirmDelete,
      formatDate
    }
  }
}
</script>

<style scoped>
.guestbook-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.emoji-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.emoji-item {
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.emoji-item:hover {
  transform: scale(1.2);
}

.guestbook-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.guestbook-entry {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.entry-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.emoji {
  font-size: 2rem;
}

.entry-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  color: #333;
}

.timestamp {
  font-size: 0.9rem;
  color: #666;
}

.delete-btn {
  padding: 5px 10px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #cc0000;
}
</style> 
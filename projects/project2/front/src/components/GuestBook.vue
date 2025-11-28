<template>
    <div class="guestbook-container">
        <h4>방문록 (이모지 남기기)</h4>
        <div class="emoji-selector">
            <div class="emoji-tabs">
                <button 
                    v-for="(category, index) in categories" 
                    :key="index"
                    :class="['tab-btn', { active: activeCategory === category.id }]"
                    @click="activeCategory = category.id"
                >
                    {{ category.icon }} {{ category.name }}
                </button>
            </div>
            <div class="emoji-content">
                <transition name="fade" mode="out-in">
                    <div :key="activeCategory" class="emoji-grid">
                        <span 
                            v-for="emoji in getEmojisByCategory(activeCategory)" 
                            :key="emoji" 
                            class="emoji-item"
                            @click="submitEmoji(emoji)"
                        >
                            {{ emoji }}
                        </span>
                    </div>
                </transition>
            </div>
        </div>
        <div class="guestbook-list">
            <div v-for="entry in entries" :key="entry.id" class="guestbook-entry">
                <div class="entry-content">
                    <span class="emoji">{{ entry.emoji }}</span>
                    <div class="entry-info">
                        <span class="username">{{ entry.author_username }}</span>
                        <span class="timestamp">{{ formatDate(entry.created_at) }}</span>
                    </div>
                    <button 
                        v-if="entry.author_username === currentUser" 
                        @click="deleteEntry(entry.id)" 
                        class="delete-btn"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { fetchGuestbook, postGuestbook } from '@/utils/api'

const props = defineProps({
    userId: {
        type: Number,
        required: true,
    },
})

const categories = [
    { id: 'happy', name: '기쁨', icon: '😊' },
    { id: 'love', name: '사랑', icon: '❤️' },
    { id: 'fun', name: '재미', icon: '😄' },
    { id: 'nature', name: '자연', icon: '🌸' }
]

const emojiMap = {
    happy: ['😀', '😊', '😎', '🤩', '🙌', '👏', '👍', '💪'],
    love: ['😍', '🥰', '💌', '💝', '💖', '💕', '💓', '💗'],
    fun: ['😂', '🤣', '😄', '😆', '🤗', '🤔', '🎉', '🎵'],
    nature: ['✨', '🌸', '🌼', '🌈', '🍀', '🐰', '🐱', '🐶']
}

const activeCategory = ref('happy')
const entries = ref([])
const currentUser = ref('')

function getCookie(name) {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            cookie = cookie.trim()
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}

const csrftoken = getCookie('csrftoken')

const getToken = () => {
    return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
}

const loadEntries = async () => {
    try {
        const res = await fetchGuestbook(props.userId)
        entries.value = res.data
    } catch (err) {
        console.error('방명록 불러오기 실패:', err.response?.data || err.message)
    }
}

const submitEmoji = async (emoji) => {
    try {
        await postGuestbook(props.userId, emoji)
        await loadEntries()
    } catch (err) {
        console.error('이모지 방명록 저장 실패:', err.response?.data || err.message)
        alert('이모지 방명록 작성에 실패했습니다.')
    }
}

const deleteEntry = async (entryId) => {
    try {
        const token = getToken()
        await axios.delete(`/api/guestbook/entry/${entryId}/`, {
            headers: {
                'X-CSRFToken': csrftoken,
                'Authorization': `Bearer ${token}`,
            }
        })
        await loadEntries()
    } catch (err) {
        console.error('방명록 삭제 실패:', err.response?.data || err.message)
        alert('방명록 삭제에 실패했습니다.')
    }
}

const formatDate = (datetimeStr) => {
    const date = new Date(datetimeStr)
    return date.toLocaleString()
}

const getEmojisByCategory = (category) => {
    return emojiMap[category] || []
}

onMounted(async () => {
    await loadEntries()
    try {
        const { data } = await axios.get('/api/accounts/current/', {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        currentUser.value = data.username
    } catch (error) {
        console.error('현재 사용자 정보 불러오기 실패:', error)
    }
})
</script>

<style scoped>
.guestbook-container {
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 0.1);
    max-width: 480px;
    margin: 0 auto;
}

h4 {
    margin-bottom: 1rem;
    font-weight: 600;
    color: #333;
    text-align: center;
}

.emoji-selector {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    overflow: hidden;
}

.emoji-tabs {
    display: flex;
    background-color: #f8f9fa;
    border-bottom: 1px solid #eee;
}

.tab-btn {
    flex: 1;
    padding: 12px;
    border: none;
    background: none;
    cursor: pointer;
    font-weight: 500;
    color: #666;
    transition: all 0.3s ease;
    position: relative;
}

.tab-btn:hover {
    color: #333;
    background-color: #f0f0f0;
}

.tab-btn.active {
    color: #4da3ff;
    background-color: white;
}

.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #4da3ff;
}

.emoji-content {
    padding: 15px;
    min-height: 120px;
}

.emoji-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

.emoji-item {
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    text-align: center;
    padding: 8px;
    border-radius: 8px;
    background-color: #f8f9fa;
}

.emoji-item:hover {
    transform: scale(1.2);
    background-color: #e9ecef;
}

/* 애니메이션 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.guestbook-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 10px;
}

/* 스크롤바 스타일링 */
.guestbook-list::-webkit-scrollbar {
    width: 8px;
}

.guestbook-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.guestbook-list::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

.guestbook-list::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.guestbook-entry {
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.entry-content {
    display: flex;
    align-items: flex-start;
    gap: 15px;
}

.emoji {
    font-size: 2.5rem;
    line-height: 1;
}

.entry-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
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

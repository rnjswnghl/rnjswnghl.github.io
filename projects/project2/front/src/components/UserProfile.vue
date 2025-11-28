<template>
    <div class="profile-container">
        <div class="profile-header">
            <div class="profile-photo">
                <img :src="user.photo_url || '/default-profile.png'" alt="프로필 사진" class="profile-image">
                <div class="photo-upload">
                    <label for="photo-upload" class="upload-btn">
                        <i class="fas fa-camera"></i>
                    </label>
                    <input 
                        type="file" 
                        id="photo-upload" 
                        accept="image/*" 
                        @change="handlePhotoUpload" 
                        style="display: none;"
                    >
                </div>
            </div>
            <div class="profile-info">
                <h2>{{ user.username }}</h2>
                <p class="user-stats">
                    <span>읽은 책 {{ user.reading_amount }}권</span>
                    <span class="divider">|</span>
                    <span>팔로워 {{ user.followers?.length || 0 }}명</span>
                    <span class="divider">|</span>
                    <span>팔로잉 {{ user.followings?.length || 0 }}명</span>
                </p>
            </div>
        </div>

        <div class="profile-content">
            <div class="profile-tabs">
                <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    :class="['tab-btn', { active: activeTab === tab.id }]"
                    @click="activeTab = tab.id"
                >
                    {{ tab.name }}
                </button>
            </div>

            <div class="tab-content">
                <!-- 개인정보 수정 -->
                <div v-if="activeTab === 'edit'" class="edit-profile">
                    <form @submit.prevent="updateProfile" class="profile-form">
                        <div class="form-group">
                            <label>이름</label>
                            <input 
                                type="text" 
                                v-model="editForm.first_name" 
                                placeholder="이름을 입력하세요"
                            >
                        </div>
                        <div class="form-group">
                            <label>성</label>
                            <input 
                                type="text" 
                                v-model="editForm.last_name" 
                                placeholder="성을 입력하세요"
                            >
                        </div>
                        <div class="form-group">
                            <label>성별</label>
                            <div class="gender-select">
                                <label class="gender-option">
                                    <input 
                                        type="radio" 
                                        v-model="editForm.gender" 
                                        value="M"
                                    >
                                    <span>남자</span>
                                </label>
                                <label class="gender-option">
                                    <input 
                                        type="radio" 
                                        v-model="editForm.gender" 
                                        value="F"
                                    >
                                    <span>여자</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>관심 카테고리</label>
                            <div class="category-select">
                                <div 
                                    v-for="category in categories" 
                                    :key="category.id"
                                    :class="['category-item', { selected: selectedCategories.includes(category.id) } ]"
                                    @click="toggleCategory(category.id)"
                                >
                                    {{ category.name }}
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="save-btn">저장하기</button>
                        </div>
                    </form>
                </div>

                <!-- 방문록 -->
                <div v-else-if="activeTab === 'guestbook'" class="guestbook-section">
                    <GuestBook :userId="user.id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '@/utils/api'
import GuestBook from '@/components/GuestBook.vue'

const user = ref({
  id: null,
  username: '',
  email: '',
  photo_url: '',
  first_name: '',
  last_name: '',
  gender: 'M',
  reading_amount: 0,
  followers: [],
  followings: [],
  favorite_categories: []
})

const editForm = ref({
  first_name: '',
  last_name: '',
  gender: 'M',
  favorite_category_ids: [],
  photo: null
})

const activeTab = ref('edit')
const categories = ref([])
const selectedCategories = ref([])
const tabs = [
  { id: 'edit', name: '개인정보 수정' },
  { id: 'guestbook', name: '방문록' }
]

const fetchUserProfile = async () => {
  try {
    const response = await api.get('accounts/profile/')
    user.value = response.data
    editForm.value = {
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      gender: user.value.gender,
      favorite_category_ids: user.value.favorite_categories.map(c => c.id),
      photo: null
    }
    selectedCategories.value = user.value.favorite_categories.map(c => c.id)
  } catch (error) {
    console.error('프로필 로딩 실패:', error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await api.get('books/categories/')
    categories.value = response.data
  } catch (error) {
    console.error('카테고리 로딩 실패:', error)
  }
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    editForm.value.photo = file
  }
}

const toggleCategory = (categoryId) => {
  const index = selectedCategories.value.indexOf(categoryId)
  if (index === -1) {
    selectedCategories.value.push(categoryId)
  } else {
    selectedCategories.value.splice(index, 1)
  }
  editForm.value.favorite_category_ids = [...selectedCategories.value]
}

const updateProfile = async () => {
  try {
    const formData = new FormData();
    formData.append('first_name', editForm.value.first_name);
    formData.append('last_name', editForm.value.last_name);
    formData.append('gender', editForm.value.gender);
    if (editForm.value.photo) {
      formData.append('photo', editForm.value.photo);
    }
    if (editForm.value.favorite_category_ids && editForm.value.favorite_category_ids.length > 0) {
      editForm.value.favorite_category_ids.forEach(categoryId => {
        formData.append('favorite_category_ids', categoryId);
      });
    }
    const response = await api.patch('accounts/profile/', formData);
    user.value = response.data;
    alert('프로필이 성공적으로 업데이트되었습니다.');
  } catch (error) {
    console.error('프로필 업데이트 실패:', error);
    if (error.response && error.response.data) {
      alert('프로필 수정에 실패했습니다: ' + JSON.stringify(error.response.data));
    } else {
      alert('프로필 수정에 실패했습니다.');
    }
  }
};

onMounted(() => {
  fetchUserProfile()
  fetchCategories()
})
</script>

<style scoped>
/* ... (동일하게 스타일 복사) ... */
</style> 
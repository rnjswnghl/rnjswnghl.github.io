<template>
  <form @submit.prevent="submitProfileEdit" class="signup-form">

    <div class="name">이름(First name)</div>
    <input v-model.trim="form.first_name" placeholder="이름(First name)" required />

    <div class="name">성(Last name)</div>
    <input v-model.trim="form.last_name" placeholder="성(Last name)" required />

    <div class="name">이메일</div>
    <input type="email" v-model.trim="form.email" placeholder="이메일" required />

    <GenderSelector v-model="form.gender" />

    <div class="name">선호하는 카테고리</div>
    <div class="category-selector">
      <div v-for="category in categories" :key="category.id" class="category-item">
        <input
          type="checkbox"
          :id="'category-' + category.id"
          :value="category.id"
          v-model="form.favorite_category_ids"
        />
        <label :for="'category-' + category.id">{{ category.name }}</label>
      </div>
    </div>

    <div class="name">프로필 사진</div>
    <input type="file" @change="onFileChange" accept="image/*" />

    <button type="submit" :disabled="loading">저장하기</button>
    <button type="button" class="btn-danger" @click="confirmDelete" :disabled="loading">
      회원 탈퇴
    </button>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import GenderSelector from './GenderSelector.vue';
import api from '@/utils/api';

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['updateProfile', 'accountDeleted']);

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  gender: 'M',
  photo: null,
  favorite_category_ids: [],
});

const loading = ref(false);
const categories = ref([]);

const fetchCategories = async () => {
  try {
    const { data } = await api.get('books/categories/');
    categories.value = data;
  } catch (error) {
    console.error('카테고리 목록을 불러오는데 실패했습니다:', error);
  }
};

watch(
  () => props.profile,
  (newProfile) => {
    if (newProfile) {
      form.value.first_name = newProfile.first_name || '';
      form.value.last_name = newProfile.last_name || '';
      form.value.email = newProfile.email || '';
      form.value.gender = newProfile.gender || 'M';
      form.value.favorite_category_ids = newProfile.favorite_categories?.map(cat => cat.id) || [];
    }
  },
  { immediate: true }
);

function onFileChange(event) {
  form.value.photo = event.target.files[0];
}

async function submitProfileEdit() {
  if (loading.value) return;
  loading.value = true;

  const formData = new FormData();
  formData.append('first_name', form.value.first_name);
  formData.append('last_name', form.value.last_name);
  formData.append('gender', form.value.gender);

  if (form.value.photo) {
    formData.append('photo', form.value.photo);
  }

  if (form.value.favorite_category_ids && form.value.favorite_category_ids.length > 0) {
    formData.append('favorite_category_ids', JSON.stringify(form.value.favorite_category_ids));
  } else {
    formData.append('favorite_category_ids', JSON.stringify([]));
  }

  try {
    await api.patch('accounts/profile/', formData);
    alert('프로필이 성공적으로 수정되었습니다.');
    emit('updateProfile');
  } catch (error) {
    console.error('프로필 수정 실패:', error);
    if (error.response && error.response.data) {
      alert('프로필 수정에 실패했습니다: ' + JSON.stringify(error.response.data));
    } else {
      alert('프로필 수정에 실패했습니다.');
    }
  } finally {
    loading.value = false;
  }
}

function confirmDelete() {
  if (loading.value) return;
  if (confirm('정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
    deleteAccount();
  }
}

async function deleteAccount() {
  loading.value = true;
  try {
    await api.delete('accounts/delete/');
    alert('회원 탈퇴가 완료되었습니다.');
    emit('accountDeleted');
  } catch (error) {
    console.error('회원 탈퇴 실패:', error);
    alert('회원 탈퇴에 실패했습니다.');
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchCategories();
});
</script>


<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 360px;
  padding: 2.2rem 2.4rem;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 14px rgb(0 0 0 / 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.name {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 0.4rem;
  color: #444;
}

input[type='text'],
input[type='email'],
input[type='tel'],
input[type='file'] {
  height: 38px;
  padding: 0 0.8rem;
  border: 1.5px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  color: #222;
  transition: border-color 0.3s ease;
  outline-offset: 2px;
}

input:focus {
  border-color: #d4a373;
  outline: none;
}

input[type='file'] {
  padding: 6px 0;
  font-size: 14px;
  cursor: pointer;
}

.category-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 1rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.category-item label {
  font-size: 14px;
  color: #444;
  cursor: pointer;
}

button[type='submit'],
button.btn-danger {
  height: 46px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
}

button[type='submit'] {
  background-color: #d4a373;
  color: #fff;
  border: none;
  box-shadow: 0 3px 8px rgb(212 163 115 / 0.6);
}

button[type='submit']:hover {
  background-color: #b17a4a;
}

button.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

button.btn-danger:hover {
  background-color: #b02a37;
}

@media (max-width: 400px) {
  .signup-form {
    width: 90vw;
    padding: 1.6rem 1.8rem;
  }
}
</style>

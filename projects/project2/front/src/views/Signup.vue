<template>
  <div class="signup-wrapper">
    <form @submit.prevent="submitSignup" class="signup-form">
      <div class="name">아이디</div>
      <input v-model="form.username" placeholder="아이디" required />

      <div class="name">이메일 아이디</div>
      <div class="email-group">
        <input v-model="form.emailId" placeholder="이메일 아이디" required />
        <select v-model="form.emailDomain">
          <option value="gmail.com">gmail.com</option>
          <option value="naver.com">naver.com</option>
          <option value="daum.net">daum.net</option>
          <option value="custom">직접 입력</option>
        </select>
        <input
          v-if="form.emailDomain === 'custom'"
          v-model="form.customEmailDomain"
          placeholder="직접 입력"
          class="email-custom-input"
        />
      </div>

      <div class="name">비밀번호</div>
      <input type="password" v-model="form.password1" placeholder="비밀번호" required />
      <div class="name">비밀번호 확인</div>
      <input type="password" v-model="form.password2" placeholder="비밀번호 확인" required />

      <div class="name">이름(First name)</div>
      <input v-model="form.first_name" placeholder="이름(First name)" required />
      <div class="name">성(Last name)</div>
      <input v-model="form.last_name" placeholder="성(Last name)" required />

      <div class="gender-group">
        <div class="name">성별</div>
        <label><input type="radio" value="M" v-model="form.gender" /> 남자</label>
        <label><input type="radio" value="F" v-model="form.gender" /> 여자</label>
      </div>

      <div class="name">주간 독서량</div>
      <input type="number" v-model.number="form.reading_amount" placeholder="주간 독서량" min="0" />

      <div class="name">좋아하는 카테고리</div>
      <div class="category-list">
        <label v-for="cat in categories" :key="cat.id">
          <input type="checkbox" :value="cat.id" v-model="form.favorite_category_ids" />
          {{ cat.name }}
        </label>
      </div>

      <div class="name">프로필 사진</div>
      <input type="file" @change="onFileChange" accept="image/*" />

      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { signupUser, fetchCategories } from '@/utils/api';

const router = useRouter();

const form = ref({
  username: '',
  emailId: '',
  emailDomain: 'gmail.com',
  customEmailDomain: '',
  password1: '',
  password2: '',
  first_name: '',
  last_name: '',
  gender: 'M',
  reading_amount: 0,
  favorite_category_ids: [],
  photo: null,
});

const categories = ref([]);

onMounted(async () => {
  try {
    const res = await fetchCategories();
    categories.value = res.data;
  } catch (err) {
    console.error('카테고리 로딩 실패:', err);
    alert('카테고리를 불러오는 데 실패했습니다.');
  }
});

function onFileChange(event) {
  form.value.photo = event.target.files[0];
}

async function submitSignup() {
  if (form.value.password1 !== form.value.password2) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  const requiredFields = ['username', 'emailId', 'password1', 'password2', 'first_name', 'last_name'];
  for (const field of requiredFields) {
    if (!form.value[field]) {
      alert(`필수 항목이 비어 있습니다: ${field}`);
      return;
    }
  }

  const formData = new FormData();
  formData.append('username', form.value.username);

  const emailDomain =
    form.value.emailDomain === 'custom' ? form.value.customEmailDomain : form.value.emailDomain;
  const fullEmail = `${form.value.emailId}@${emailDomain}`;
  formData.append('email', fullEmail);
  formData.append('password', form.value.password1);
  formData.append('first_name', form.value.first_name);
  formData.append('last_name', form.value.last_name);
  formData.append('gender', form.value.gender);
  formData.append('reading_amount', form.value.reading_amount);

  form.value.favorite_category_ids.forEach((id) => {
    formData.append('favorite_category_ids', id);
  });

  if (form.value.photo) {
    formData.append('photo', form.value.photo);
  }

  try {
    await signupUser(formData);
    alert('회원가입 성공!');
    router.push('/login');
  } catch (error) {
    console.error('❌ 회원가입 실패', error);
    if (error.response?.data) {
      console.error('서버 응답:', error.response.data);
    }
    alert('회원가입 실패: ' + JSON.stringify(error.response?.data || error.message));
  }
}
</script>

<style scoped>
.signup-wrapper {
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  padding-top: 4rem;
  background-color: #f9f9f9;
  box-sizing: border-box;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 360px;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.signup-form input,
.signup-form select {
  height: 40px;
  font-size: 16px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
}

.email-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.email-group select {
  width: 25%;
  min-width: 150px;
}

.email-custom-input {
  width: 500px;
  height: 40px;
  font-size: 16px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
}

.gender-group {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 16px;
  margin-top: 4px;
  margin-bottom: 8px;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.signup-form button {
  height: 44px;
  font-size: 18px;
  background-color: #d4a373;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-form button:hover {
  background-color: #b17a4a;
}

.name {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 0;
}

.signup-form input {
  margin-top: 0;
  margin-bottom: 5px;
}
</style>

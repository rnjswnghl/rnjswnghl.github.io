<template>
    <form @submit.prevent="submitSignup" class="signup-form">
      <div class="name">아이디</div>
      <input v-model="form.username" placeholder="아이디" required />
  
      <div class="name">이메일 아이디</div>
      <EmailInputGroup
        v-model:emailId="form.emailId"
        v-model:emailDomain="form.emailDomain"
        v-model:customEmailDomain="form.customEmailDomain"
      />
  
      <div class="name">비밀번호</div>
      <input type="password" v-model="form.password1" placeholder="비밀번호" required />
      <div class="name">비밀번호 확인</div>
      <input type="password" v-model="form.password2" placeholder="비밀번호 확인" required />
  
      <div class="name">이름(First name)</div>
      <input v-model="form.first_name" placeholder="이름(First name)" required />
      <div class="name">성(Last name)</div>
      <input v-model="form.last_name" placeholder="성(Last name)" required />
  
      <GenderSelector v-model="form.gender" />
  
      <div class="name">주간 독서량</div>
      <input type="number" v-model.number="form.reading_amount" placeholder="주간 독서량" min="0" />
  
      <CategorySelector v-model="form.favorite_category_ids" />
  
      <div class="name">프로필 사진</div>
      <input type="file" @change="onFileChange" accept="image/*" />
  
      <button type="submit">회원가입</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { signupUser } from '@/utils/api';
  import EmailInputGroup from './EmailInputGroup.vue';
  import GenderSelector from './GenderSelector.vue';
  import CategorySelector from './CategorySelector.vue';
  
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
  
  function onFileChange(event) {
    form.value.photo = event.target.files[0];
  }
  
  async function submitSignup() {
    if (form.value.password1 !== form.value.password2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  
    const requiredFields = [
      'username',
      'emailId',
      'password1',
      'password2',
      'first_name',
      'last_name',
      'photo',
    ];
    for (const field of requiredFields) {
      if (!form.value[field]) {
        alert(`필수 항목이 비어 있습니다: ${field}`);
        return;
      }
    }
  
    const emailDomain =
      form.value.emailDomain === 'custom' ? form.value.customEmailDomain : form.value.emailDomain;
    if (!emailDomain) {
      alert('이메일 도메인을 입력해주세요.');
      return;
    }
    const fullEmail = `${form.value.emailId}@${emailDomain}`;
  
    const formData = new FormData();
    formData.append('username', form.value.username);
    formData.append('email', fullEmail);
    formData.append('password', form.value.password1);
    formData.append('first_name', form.value.first_name);
    formData.append('last_name', form.value.last_name);
    formData.append('gender', form.value.gender);
    formData.append('reading_amount', form.value.reading_amount.toString());
  
    formData.append('favorite_category_ids', JSON.stringify(form.value.favorite_category_ids));
    formData.append('photo', form.value.photo);
  
    try {
      await signupUser(formData);
      alert('회원가입 성공!');
      router.push('/login');
    } catch (error) {
      console.error('회원가입 실패:', error.response?.data || error.message);
      alert('회원가입 실패: ' + JSON.stringify(error.response?.data || error.message));
    }
  }
  </script>
  
  <style scoped>
  /* 기존 스타일 유지 */
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
  input[type='password'],
  input[type='number'],
  input[type='file'],
  select {
    height: 38px;
    padding: 0 0.8rem;
    border: 1.5px solid #ccc;
    border-radius: 6px;
    font-size: 15px;
    color: #222;
    transition: border-color 0.3s ease;
    outline-offset: 2px;
  }
  
  input[type='text']:focus,
  input[type='password']:focus,
  input[type='number']:focus,
  input[type='file']:focus,
  select:focus {
    border-color: #d4a373;
    outline: none;
  }
  
  input[type='file'] {
    padding: 6px 0;
    font-size: 14px;
    cursor: pointer;
  }
  
  button[type='submit'] {
    margin-top: 1.6rem;
    height: 46px;
    font-size: 18px;
    font-weight: 700;
    background-color: #d4a373;
    border: none;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 3px 8px rgb(212 163 115 / 0.6);
    transition: background-color 0.25s ease;
  }
  
  button[type='submit']:hover {
    background-color: #b17a4a;
  }
  
  @media (max-width: 400px) {
    .signup-form {
      width: 90vw;
      padding: 1.6rem 1.8rem;
    }
  }
  </style>
  
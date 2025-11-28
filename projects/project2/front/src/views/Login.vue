<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
  
      <!-- ✅ 회원가입 버튼 추가 -->
      <p>계정이 없으신가요?
        <router-link to="/signup" class="signup-link">회원가입</router-link>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  
  const username = ref('')
  const password = ref('')
  const router = useRouter()
  const userStore = useUserStore()
  
const handleLogin = async () => {
  console.log('handleLogin 호출됨');
  try {
    const success = await userStore.login({ username: username.value, password: password.value });
    console.log('login 결과:', success);
    if (success) {
      router.push('/');
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        alert('존재하지 않는 계정입니다.');
      } else {
        alert('로그인에 실패했습니다.');
      }
    } else {
      alert('로그인에 실패했습니다.');
    }
  }
};

  </script>
  
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 3rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
  }
  
  input {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
  
  button {
    width: 100%;
    padding: 0.5rem;
    background-color: #d4a373;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  
  .signup-link {
    color: #d4a373;
    font-weight: 500;
    text-decoration: underline;
  }
  </style>
  
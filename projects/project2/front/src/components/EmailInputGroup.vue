<template>
    <div class="email-group">
      <input v-model="emailIdLocal" placeholder="이메일 아이디" required />
      <select v-model="emailDomainLocal">
        <option value="gmail.com">gmail.com</option>
        <option value="naver.com">naver.com</option>
        <option value="daum.net">daum.net</option>
        <option value="custom">직접 입력</option>
      </select>
      <input
        v-if="emailDomainLocal === 'custom'"
        v-model="customEmailDomainLocal"
        placeholder="직접 입력"
        class="email-custom-input"
        required
      />
    </div>
  </template>
  
  <script setup>
  import { watch, toRefs } from 'vue';
  
  const props = defineProps({
    emailId: String,
    emailDomain: String,
    customEmailDomain: String,
  });
  
  const emits = defineEmits(['update:emailId', 'update:emailDomain', 'update:customEmailDomain']);
  
  const emailIdLocal = ref(props.emailId || '');
  const emailDomainLocal = ref(props.emailDomain || 'gmail.com');
  const customEmailDomainLocal = ref(props.customEmailDomain || '');
  
  watch(emailIdLocal, (val) => emits('update:emailId', val));
  watch(emailDomainLocal, (val) => emits('update:emailDomain', val));
  watch(customEmailDomainLocal, (val) => emits('update:customEmailDomain', val));
  
  // props 변경시 로컬 값 동기화
  watch(
    () => props.emailId,
    (val) => {
      if (val !== emailIdLocal.value) emailIdLocal.value = val;
    }
  );
  watch(
    () => props.emailDomain,
    (val) => {
      if (val !== emailDomainLocal.value) emailDomainLocal.value = val;
    }
  );
  watch(
    () => props.customEmailDomain,
    (val) => {
      if (val !== customEmailDomainLocal.value) customEmailDomainLocal.value = val;
    }
  );
  </script>
  
  <style scoped>
  .email-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  select {
    width: 25%;
    min-width: 120px;
    height: 38px;
    border-radius: 6px;
    border: 1.5px solid #ccc;
    font-size: 15px;
  }
  
  .email-custom-input {
    width: 150px;
    height: 38px;
    border-radius: 6px;
    border: 1.5px solid #ccc;
    font-size: 15px;
    padding: 0 0.8rem;
  }
  </style>
  
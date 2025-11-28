<template>
    <div class="gender-group">
      <div class="name">성별</div>
      <label>
        <input
          type="radio"
          value="M"
          :checked="localValue === 'M'"
          @change="updateValue('M')"
        /> 남자
      </label>
      <label>
        <input
          type="radio"
          value="F"
          :checked="localValue === 'F'"
          @change="updateValue('F')"
        /> 여자
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: 'M',
    },
  });
  const emit = defineEmits(['update:modelValue']);
  
  const localValue = ref(props.modelValue);
  
  // props.modelValue 변경 시 localValue 동기화
  watch(() => props.modelValue, (newVal) => {
    localValue.value = newVal;
  });
  
  function updateValue(val) {
    localValue.value = val;
    emit('update:modelValue', val);
  }
  </script>
  
  <style scoped>
  .gender-group {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-weight: 600;
  }
  label {
    cursor: pointer;
    user-select: none;
    font-weight: normal;
    font-size: 15px;
  }
  input[type='radio'] {
    margin-right: 0.3rem;
    cursor: pointer;
  }
  </style>
  
<template>
    <div class="category-selector">
      <div class="name">관심 카테고리</div>
      <div class="checkbox-group">
        <label v-for="category in categories" :key="category.id" class="checkbox-label">
          <input
            type="checkbox"
            :value="category.id"
            :checked="modelValue.includes(category.id)"
            @change="onCheck($event, category.id)"
          />
          {{ category.name }}
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { fetchCategories } from '@/utils/api';
  
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const categories = ref([]);
  
  onMounted(async () => {
    try {
      categories.value = await fetchCategories();
    } catch (error) {
      console.error('카테고리 불러오기 실패', error);
    }
  });
  
  function onCheck(event, categoryId) {
    let newValue = [...props.modelValue];
    if (event.target.checked) {
      if (!newValue.includes(categoryId)) newValue.push(categoryId);
    } else {
      newValue = newValue.filter((id) => id !== categoryId);
    }
    emit('update:modelValue', newValue);
  }
  </script>
  
  <style scoped>
  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
  }
  
  .checkbox-label {
    user-select: none;
    cursor: pointer;
    font-size: 14px;
  }
  </style>
  
<template>
  <div class="category-filter">
    <label class="form-label">관심 분야</label>

    <!-- 대분류 버튼 -->
    <div class="main-categories mb-2">
      <Button v-for="main in Object.keys(categoryMap)" :key="main" type="button" class="category-btn"
        :class="{ selected: selectedMain === main }" @click="selectMain(main)">
        #{{ main }}
      </Button>
    </div>

    <!-- 중분류 버튼 -->
    <div v-if="subCategories.length" class="sub-categories">
      <Button v-for="sub in subCategories" :key="sub" :value="sub" type="button" class="subcategory-btn"
        :class="{ selected: selectedSub === sub }" @click="selectSub(sub)">
        #{{ sub }}
      </Button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, defineProps, defineEmits } from 'vue'
import Button from '@/components/common/Button.vue'
import { categoryMap } from '@/constants/categoryMap'
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ category: '', subCategory: '' })
  }
})

const selectedMain = ref('')
const selectedSub = ref('')

const subCategories = computed(() => categoryMap[selectedMain.value] || [])

onMounted(() => {
  selectedMain.value = props.modelValue.category
  selectedSub.value = props.modelValue.subCategory
  emitSelected()
})

watch(() => props.modelValue, (val) => {
  selectedMain.value = val.category
  selectedSub.value = val.subCategory
})

function selectMain(main) {
  if (selectedMain.value === main) return
  selectedMain.value = main
  selectedSub.value = ''
  emitSelected()
}

function selectSub(sub) {
  selectedSub.value = selectedSub.value === sub ? '' : sub
  emitSelected()
}

function emitSelected() {
  emit('update:modelValue', {
    category: selectedMain.value,
    subCategory: selectedSub.value
  })
}
</script>

<style scoped>
.category-btn,
.subcategory-btn {
  margin: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  background-color: #f2f2f2;
  color: #333;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn.selected,
.subcategory-btn.selected {
  background-color: #5e48f3 !important;
  color: white !important;
}
</style>

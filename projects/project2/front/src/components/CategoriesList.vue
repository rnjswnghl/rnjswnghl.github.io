<template>
  <div class="categories-list">
    <h5 class="mb-3">카테고리</h5>
    <ul class="list-group">
      <li @click="updateCategory('')" class="list-group-item list-group-item-action"
        :class="{ active: category === '' }" style="cursor: pointer;">
        전체
      </li>
      <li v-for="cat in categories" :key="cat.id" @click="updateCategory(cat.id)"
        class="list-group-item list-group-item-action" :class="{ active: category === cat.id }"
        style="cursor: pointer;">
        {{ cat.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CategoriesList',
  props: {
    category: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:category'],
  data() {
    return {
      categories: [],
    }
  },
  mounted() {
    axios.get('http://localhost:8000/api/books/categories/')
      .then(res => {
        this.categories = res.data
      })
      .catch(err => {
        console.error('카테고리 로드 실패', err)
      })
  },
  methods: {
    updateCategory(id) {
      this.$emit('update:category', id === '' ? '' : String(id))
    },
  }
}
</script>

<style scoped>
.categories-list ul {
  padding: 0;
  list-style: none;
}

.categories-list li {
  padding: 8px;
  cursor: pointer;
}

.categories-list li.active {
  background-color: #007bff;
  color: white;
}
</style>

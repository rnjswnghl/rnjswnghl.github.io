<template>
  <div v-if="visible" class="xp-modal-overlay">
    <div class="xp-modal">
      <h2>🎉 퀴즈 종료!</h2>
      <p><strong>{{ xp }}</strong> XP가 적립되었습니다!</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  xp: {
    type: Number,
    default: 150
  }
})
</script>

<style scoped>
.xp-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.xp-modal {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
  font-size: 1.2rem;
  color: #333;
}
</style>

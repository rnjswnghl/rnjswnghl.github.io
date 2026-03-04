<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">{{ title }}</h2>
      <div class="auth-slot">
        <slot />
      </div>
      <div class="auth-links">
        <slot name="links" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.auth-container {
  min-height: min(100vh, 560px);
  min-height: min(100dvh, 560px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 1rem 0.75rem;
  box-sizing: border-box;
}
@media (min-width: 576px) {
  .auth-container { padding: 1.25rem 1rem; }
}

.auth-card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 1.25rem 1rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}
@media (min-width: 576px) {
  .auth-card { padding: 1.5rem 1.25rem; max-width: 440px; }
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #343a40;
  text-align: center;
  margin: 0 0 1rem 0;
}

.auth-slot {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.auth-links {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
}

.auth-links a {
  font-size: 0.875rem;
  color: #6c757d;
  text-decoration: none;
  transition: color 0.3s ease;
}

.auth-links a:hover {
  color: #d79c94;
  text-decoration: underline;
}
</style>

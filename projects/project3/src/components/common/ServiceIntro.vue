<template>
  <section class="intro-section">
    <div class="container">
      <div class="intro-content">
        <h2>FocusMate는 무엇인가요?</h2>
        <p class="intro-description">
          관심사와 목표가 비슷한 스터디를 찾아주는 스마트한 학습 플랫폼입니다.<br>
          혼자 공부하기 어려운 분들을 위해 함께 성장할 수 있는 동료를 매칭해드려요.
        </p>
        <ServiceFeatures />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ServiceFeatures from './ServiceFeatures.vue'
</script>

<style scoped>
.intro-section {
  padding: var(--spacing-2xl) 0;
  background: var(--color-background);
  margin-top: 2rem;
}

.intro-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.intro-content h2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.intro-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
  line-height: 1.8;
  font-weight: var(--font-weight-medium);
  text-align: center;
}

@media (max-width: 768px) {
  .intro-content h2 {
    font-size: var(--font-size-2xl);
  }

  .intro-description {
    font-size: var(--font-size-base);
  }
}
</style>

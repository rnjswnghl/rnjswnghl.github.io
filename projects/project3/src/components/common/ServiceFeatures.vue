<template>
  <div class="features">
    <div class="feature-row">
      <div class="feature">
        <span class="feature-icon">🕵️‍♀️</span>
        <span class="feature-title">스마트 매칭</span>
        <span class="feature-desc">파트너 탐색 부담↓<br>취향 맞춤 매칭</span>
      </div>
      <div class="feature">
        <span class="feature-icon">🧑‍💻</span>
        <span class="feature-title">실시간 화상 스터디</span>
        <span class="feature-desc">시간·장소 제약 없이<br>온라인 스터디룸 참여</span>
      </div>
    </div>
    <div class="feature-row">
      <div class="feature">
        <span class="feature-icon">📈</span>
        <span class="feature-title">체계적인 진도 관리</span>
        <span class="feature-desc">학습 현황과 목표 달성도를<br>한눈에 확인하고 관리</span>
      </div>
      <div class="feature">
        <span class="feature-icon">🌟</span>
        <span class="feature-title">개인 맞춤 목표 설정</span>
        <span class="feature-desc">나만의 다짐과 D-day로<br>동기부여를 유지</span>
      </div>
      <div class="feature">
        <span class="feature-icon">🤖</span>
        <span class="feature-title">AI 복습 문제 생성</span>
        <span class="feature-desc">스터디 파일을 분석해서<br>맞춤형 복습 문제 제공</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.features {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.feature-row {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
}

.feature-row:first-child {
  justify-content: center;
}

.feature-row:last-child {
  justify-content: center;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--color-background);
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
  width: 280px;
  height: 200px;
  justify-content: center;
}

.feature:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-sm);
}

.feature-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
}

.feature-desc {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .feature-row {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .feature {
    padding: var(--spacing-lg);
    width: 100%;
    max-width: 320px;
    height: auto;
    min-height: 180px;
  }

  .feature-icon {
    font-size: var(--font-size-3xl);
  }

  .feature-title {
    font-size: var(--font-size-base);
  }
}
</style>

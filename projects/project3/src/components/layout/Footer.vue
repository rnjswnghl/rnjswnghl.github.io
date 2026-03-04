<template>
  <footer class="footer">
    <div class="footer__content">
      <!-- 메인 섹션 -->
      <div class="footer__main">
        <!-- 로고 및 소개 -->
        <div class="footer__brand">
          <div class="footer__logo">
            <img :src="logoImage" alt="FocusMate Logo" class="logo-img" />
            <span class="logo-text">FocusMate</span>
          </div>
          <p class="footer__slogan">어디서든 이어지는 몰입의 흐름</p>
        </div>

        <!-- 서비스 정보 -->
        <div class="footer__services">
          <h3 class="footer__title">서비스</h3>
          <ul class="footer__list">
            <li><a href="#" class="footer__link">스터디 검색</a></li>
            <li><a href="#" class="footer__link">화상회의</a></li>
            <li><a href="#" class="footer__link">퀴즈 생성</a></li>
          </ul>
        </div>

        <!-- 지원 -->
        <div class="footer__support">
          <h3 class="footer__title">지원</h3>
          <ul class="footer__list">
            <li><a href="#" class="footer__link">문의하기</a></li>
          </ul>
        </div>

        <!-- 회사 정보 -->
        <div class="footer__company">
          <h3 class="footer__title">회사</h3>
          <ul class="footer__list">
            <li><a href="#" class="footer__link">소개</a></li>
          </ul>
        </div>

        <!-- 연락처 -->
        <div class="footer__contact">
          <h3 class="footer__title">연락처</h3>
          <div class="contact__info">
            <p class="contact__item">
              <span class="contact__icon">📧</span>
              contact@focusmate.com
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 섹션 -->
    <div class="footer__bottom">
              <div class="footer__bottom-content">
          <p class="copyright">© 2025 FocusMate. All rights reserved.</p>
        </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 이미지 경로
const logoImage = `${import.meta.env.BASE_URL}images/FMlogo.png`
</script>

<style scoped>
.footer {
  background-color: var(--color-background);
  border-top: 1px solid #e3e7ed;
  padding: 3rem 1rem 1.5rem;
  color: #4a4a4a;
  font-size: 0.95rem;
}

.footer__content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer__main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-img {
  height: 32px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1d2b42;
}

.footer__slogan {
  font-size: 1rem;
  color: #6c757d;
  font-weight: 500;
}



.footer__title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1d2b42;
  margin-bottom: 1rem;
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__list li {
  margin-bottom: 0.5rem;
}

.footer__link {
  color: #6c757d;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer__link:hover {
  color: #d79c94;
}

.contact__info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.contact__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #6c757d;
}

.contact__icon {
  font-size: 1rem;
}

.social__links {
  display: flex;
  gap: 1rem;
}

.social__link {
  display: inline-block;
  font-size: 1.5rem;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.social__link:hover {
  transform: scale(1.1);
}

.footer__bottom {
  border-top: 1px solid #e3e7ed;
  padding-top: 1.5rem;
}

.footer__bottom-content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.copyright {
  font-size: 0.85rem;
  color: #a0a0a0;
}

.footer__links {
  display: flex;
  gap: 1.5rem;
}

.footer__bottom-link {
  color: #a0a0a0;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.footer__bottom-link:hover {
  color: #d79c94;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .footer__main {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer__bottom-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer__links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 2rem 1rem 1rem;
  }

  .footer__main {
    gap: 1rem;
  }


}
</style>

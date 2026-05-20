# 포트폴리오 시각 검토 메모

## 첫 화면

히어로는 베이지 톤, 세리프 대형 타이포그래피, 여행 콘셉트 배경을 활용해 차별화된 첫인상을 준다. `A DEVELOPER'S JOURNEY`라는 콘셉트는 기억에 남지만, 후보자의 이름, 목표 직무(프론트엔드), 핵심 강점, 즉시 확인 가능한 CTA가 첫 화면에서 부족하다. 한글 소개 문장은 배경 대비가 약해 가독성이 다소 낮고, 너무 추상적이다.

## 프로젝트 섹션

프로젝트 카드는 보딩패스 콘셉트가 명확하고 완성도가 높다. 카드 레이아웃은 시각적으로 매력적이나, 프로젝트 설명이 기능 요약 중심이며 본인 역할, 문제 해결 방식, 성과, 프론트엔드 기여도가 드러나지 않는다. 면접관 입장에서는 GitHub 또는 데모를 열기 전 사이트 내에서 평가 가능한 근거가 부족하다.

## 즉시 보완 필요 항목

연락처에 `your.email@example.com`, `linkedin.com/in/yourname` placeholder가 노출된다. 채용 관점에서 가장 큰 신뢰도 저하 요소다. 또한 연락 폼은 실제 전송이 아니라 토스트만 표시하는 구조로 보인다.

## 프로필 섹션

`My Developer Profile` 섹션은 여행 여권 콘셉트와 연결되지만, 실제 화면에서 배경 이미지와 텍스트 대비가 약해 좌측 카드의 정보가 잘 보이지 않는다. 직무가 `Full Stack Engineer`로 표시되어 사용자가 요청한 프론트엔드 개발자 포트폴리오와 포지셔닝이 어긋난다. 기술 스택은 아이콘/스탬프 형태로 보기 좋지만, 숙련도·사용 경험·대표 프로젝트 연결이 없어 면접관이 역량 수준을 판단하기 어렵다.

## 연락 및 푸터 섹션

브라우저에서 하단부를 확인한 결과, 푸터는 브랜드 콘셉트를 유지하지만 LinkedIn 링크가 placeholder로 남아 있다. 연락 섹션의 placeholder 이메일과 LinkedIn, 실제 전송이 되지 않는 폼은 채용·협업 유입 관점에서 즉시 수정해야 한다. 하단부 스크롤 시 여백이 크게 느껴지는 구간이 있어 섹션 간 간격 조정도 검토할 필요가 있다.

## 소스 및 링크 점검

소스 기준으로 연락처 placeholder가 실제 배포에 그대로 노출되어 있으며, `Full Stack Engineer` 표기가 있어 프론트엔드 직무 포지셔닝과 충돌한다. `maximum-scale=1` 메타 태그는 모바일 사용자의 확대를 막을 수 있어 접근성 측면에서 부정적이다. 프로젝트 데모 링크를 HTTP 상태로 확인한 결과, project1과 project5는 200으로 열리지만 project2(`/projects/project2/front/dist/index.html`), project3(`/projects/project3/dist/index.html`), project4(`/projects/project4/dist/`)는 배포 기준 404이다. 프로젝트2·3·4 폴더에는 각각 `projects/project2/front/index.html`, `projects/project3/index.html`, `projects/project4/index.html`이 존재해 데모 경로 보정 또는 빌드 산출물 배포가 필요하다.

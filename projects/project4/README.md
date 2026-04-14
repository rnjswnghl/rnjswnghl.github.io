# On-Wear (Frontend Demo)

- **Team**: BusanTong  
- **Period**: 2025.08.25 ~ 2025.09.29  
- **GitHub**: [https://github.com/On-Wear-SSAFY-13](https://github.com/On-Wear-SSAFY-13)

## Run (Dev)

```bash
npm install
npm run dev
```

## Build (for Portfolio Hosting)

이 프로젝트는 포트폴리오 사이트에서 `/projects/project4/dist/` 경로로 정적 서빙되는 것을 기준으로 설정되어 있습니다.

```bash
npm run build
```

빌드 결과물은 `dist/`에 생성됩니다.

## API 연동 여부

이 포트폴리오용 `project4`는 **백엔드/DB에 연결하지 않는 프론트 데모**입니다.  
네트워크 호출은 모두 `src/common/core/createDemoAxios.ts`의 목업 어댑터로 처리됩니다.
# Movie Channel Finder

선호하는 **장르 / 목소리 톤 / 스포일러 선호도 / 언어권**을 입력하면
맞춤형 영화 리뷰 유튜브 채널을 추천해주는 웹앱입니다.

## 주요 기능
- 장르/톤/스포일러 기반 추천
- 상단 한국어/English UI 전환
- Gemini API로 채널 매칭 + 추천 이유 생성
- 한국/영어권 채널 데이터셋 통합
- 카드형 UI + 유튜브 링크

## 실행 방법
```bash
npm install
npm run dev
```

## 환경변수
```
VITE_GEMINI_API_KEY=your_key
```

Cloudflare Pages 배포 시 `GEMINI_API_KEY` 환경변수로 설정하세요.

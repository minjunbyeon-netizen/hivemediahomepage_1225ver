# 📁 프로젝트 폴더 구조 가이드

## 폴더 구조
```
frontend-w-clone/
│
├── 📄 .gitignore           # Git 무시 파일 설정
├── 📄 README.md            # 프로젝트 설명서
├── 📄 index.html           # 메인 페이지
├── 📄 about.html           # 회사 소개 페이지
├── 📄 services.html        # 서비스 페이지
├── 📄 portfolio.html       # 포트폴리오 페이지
├── 📄 contact.html         # 문의 페이지
│
├── 📁 config/              # ⚙️ 설정 파일
│   └── content.json        # 페이지 콘텐츠 (텍스트, 메뉴 등)
│
├── 📁 public/              # 🖼️ 정적 에셋 (Static Assets)
│   └── images/             # 이미지 파일 (.webp, .png, .jpg)
│
├── 📁 src/                 # 💻 소스 코드
│   ├── css/
│   │   ├── app.css         # 메인 스타일
│   │   └── pages.css       # 서브페이지 스타일
│   └── js/
│       ├── app.js          # 메인 로직 (애니메이션, 인터랙션)
│       ├── content-loader.js # JSON 콘텐츠 로더
│       └── pages.js        # 서브페이지 기능
│
└── 📁 docs/                # 📖 문서
    └── STRUCTURE.md        # 이 파일 (폴더 구조 설명)
```

---

## 폴더별 역할

### `config/` - 설정 파일
- **content.json**: 모든 페이지 콘텐츠 (텍스트, 링크, 메타데이터)
- 콘텐츠 수정 시 이 파일만 편집

### `public/` - 정적 에셋
- **images/**: 프로젝트 썸네일, 아이콘, 배경 이미지

### `src/` - 소스 코드
- **css/app.css**: index.html용 메인 스타일
- **css/pages.css**: 서브페이지 공통 스타일
- **js/app.js**: 커서, 프리로더, 스크롤 애니메이션
- **js/content-loader.js**: JSON에서 DOM으로 콘텐츠 주입
- **js/pages.js**: 서브페이지 전용 기능

---

## 콘텐츠 수정 방법

### 텍스트 변경
`config/content.json` 파일에서 해당 값 수정

### 이미지 변경
1. `public/images/`에 새 이미지 파일 추가
2. HTML에서 경로 수정

---

## 파일 네이밍 컨벤션

| 종류 | 규칙 | 예시 |
|------|------|------|
| HTML | 소문자, 하이픈 | `about.html` |
| CSS/JS | 소문자, 하이픈 | `pages.css` |
| 이미지 | 소문자, 하이픈 | `project-1.webp` |

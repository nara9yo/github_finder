# 자바스크립트를 이용해서 Git finder 앱 만들기

## 요구사항

- 자바스크립트 OOP를 이용해서 구현합니다.
- 비동기 통신을 이용합니다.
- 위에 기능 외에 잔디밭 기능, Spinner 기능 등 원하는 기능을 추가해봅니다.
  ![Image](https://github.com/user-attachments/assets/faf49069-4a58-439b-a068-f2b29b05a0dd)

---

## 프로젝트 폴더 구조

```
github_finder/
├── index.html                  # 메인 HTML 파일
├── README.md                   # 프로젝트 설명 파일
├── .gitignore                  # Git 관리 제외 파일 설정
├── api/
│   └── github.js               # GitHub API 통신 담당
├── components/
│   └── ui.js                   # UI 렌더링, DOM 조작, 알림/스피너/프로필/저장소/잔디밭 표시
├── app.js                      # 앱 초기화, 이벤트 바인딩, 전체 로직 제어
├── assets/
│   └── favicon.ico             # 파비콘 이미지
├── styles/
│   └── styles.css              # 전체 스타일(CSS)
```

- **api/**  
  외부 API 통신(데이터 fetch 등) 관련 파일을 둡니다.

- **components/**  
  UI 렌더링, DOM 조작 등 화면 관련 모듈을 둡니다.

- **styles/**  
  CSS 등 스타일 파일을 관리합니다.

- **assets/**  
  이미지, 파비콘 등 정적 파일을 둡니다.

- **app.js**  
  앱의 진입점. 전체 로직 제어 및 이벤트 바인딩을 담당합니다.

- **index.html**  
  앱의 메인 구조와 스크립트/스타일 로딩을 담당합니다.

---

## 주요 기능

- GitHub 사용자명 입력 시 실시간으로 프로필, 저장소, 잔디밭(컨트리뷰션 그래프) 표시
- 잘못된 입력/없는 사용자에 대한 알림 표시
- 로딩 중 스피너 표시
- 반응형 UI 및 다양한 화면 크기에 대응
- 코드 스플리팅을 통한 성능 최적화
- GitHub API를 이용한 데이터 실시간 업데이트
- OOP를 통한 깔끔한 코드 구조 및 유지보수 용이
- 사용자 경험을 고려한 직관적인 UI/UX 디자인

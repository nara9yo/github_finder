# 자바스크립트를 이용해서 Git finder 앱 만들기

## 요구사항

- 자바스크립트 OOP를 이용해서 구현합니다.
- 비동기 통신을 이용합니다.
- 위에 기능 외에 잔디밭 기능, Spinner 기능 등 원하는 기능을 추가해봅니다.
  ![Image](https://github.com/user-attachments/assets/06b5d072-2ff0-4eb1-8d45-53c5e996c228)

---

## 프로젝트 구조 및 파일 설명

```
.
├── index.html                        # 메인 HTML 파일
├── README.md                         # 프로젝트 설명 파일
├── .gitignore                        # Git 관리 제외 파일 설정
├── api/
│   └── github.js                     # GitHub API 통신 담당
├── components/
│   └── ui.js                         # UI 렌더링, DOM 조작, 알림/스피너/프로필/저장소/잔디밭 표시
├── common/
│   └── app.js                        # 앱 초기화, 이벤트 바인딩, 전체 로직 제어
├── assets/
│   └── favicon.ico                   # 파비콘 이미지
├── styles/
│   └── styles.css                    # 전체 스타일(CSS)
```

### 주요 파일 및 폴더 설명

- **index.html**  
  앱의 메인 구조, 입력창, 결과 표시 영역, 스크립트 및 스타일 로딩을 담당합니다.

- **api/github.js**  
  GitHub REST API와 통신하여 사용자 정보, 저장소 정보를 비동기로 가져옵니다.

- **components/ui.js**  
  사용자 프로필, 저장소 목록, 잔디밭(컨트리뷰션 그래프), 스피너, 알림 메시지 등 UI 요소를 동적으로 생성 및 표시합니다.

- **common/app.js**  
  앱의 진입점.  
  이벤트 바인딩 및 전체 로직 제어, 각 컴포넌트와 API를 연결합니다.

- **styles/styles.css**  
  전체 레이아웃, 카드, 버튼, 뱃지, 스피너, 반응형 그리드 등 앱의 스타일을 담당합니다.

- **assets/favicon.ico**  
  브라우저 탭에 표시되는 파비콘 이미지입니다.

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

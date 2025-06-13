// GitHub, UI 클래스 인스턴스 생성
const github = new GitHub();
const ui = new UI();

// 검색창(input) 엘리먼트 가져오기
const searchUser = document.getElementById("searchUser");

// 검색창에 키보드 입력이 일어날 때마다 이벤트 리스너 실행
searchUser.addEventListener("keyup", (e) => {
  const userText = e.target.value.trim();

  // GitHub 유저명: 영문, 숫자, 하이픈(-)만 허용, 1~39자
  const valid = /^[a-zA-Z0-9-]{1,39}$/.test(userText);

  if (userText !== "" && valid) {
    // 로딩 스피너 보이기
    ui.showSpinner();

    // GitHub API로 사용자 정보 검색
    github.getUser(userText).then((data) => {
      // 스피너 숨기기
      ui.hideSpinner();

      if (data.profile === null) {
        // 사용자를 찾지 못했을 때 알림 표시
        ui.showAlert("User not found", "alert alert-danger");
        ui.clearProfile(); // 기존 프로필 정보 지우기
      } else {
        // 사용자를 찾았을 때 프로필과 저장소 정보 표시
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
        ui.showContributionGraph(userText); // 잔디밭 표시
      }
    });
  } else if (userText !== "" && !valid) {
    // 유효하지 않은 입력일 때 알림 표시
    ui.showAlert(
      "Invalid username. Only letters, numbers, and hyphens are allowed.",
      "alert alert-danger"
    );
    ui.clearProfile();
  } else {
    // 입력창이 비어있으면 프로필 정보 지우기
    ui.clearProfile();
  }
});

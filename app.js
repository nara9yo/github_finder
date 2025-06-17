// ===============================
// [앱 진입점]
// - 이벤트 바인딩 및 전체 로직 제어
// ===============================
import { GitHub } from "./api/github.js";
import { UI } from "./components/ui.js";

(function () {
  // ===============================
  // [인스턴스 생성]
  // ===============================
  const github = new GitHub();
  const ui = new UI();

  // ===============================
  // [검색창 이벤트 바인딩]
  // ===============================
  const searchUser = document.getElementById("searchUser");

  searchUser.addEventListener("keyup", async (e) => {
    try {
      const userText = e.target.value.trim();
      // [유효성 검사: 영문, 숫자, 하이픈(-)만 허용, 1~39자]
      const valid = /^[a-zA-Z0-9-]{1,39}$/.test(userText);

      if (userText !== "" && valid) {
        // --- 로딩 스피너 보이기 ---
        ui.showSpinner();
        // --- GitHub API로 사용자 정보 검색 ---
        const data = await github.getUser(userText);

        if (data.profile) {
          // --- 프로필, 저장소, 잔디밭 표시 ---
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
          ui.showContributionGraph(userText);
        } else {
          // --- 사용자 없음 알림 ---
          ui.showAlert("User not found", "alert alert-danger");
          ui.clearProfile();
        }
        // --- 스피너 숨기기 ---
        ui.hideSpinner();
      } else if (userText !== "" && !valid) {
        // --- 유효하지 않은 입력 알림 ---
        ui.showAlert(
          "Invalid username. Only letters, numbers, and hyphens are allowed.",
          "alert alert-danger"
        );
        ui.clearProfile();
      } else {
        // --- 입력창이 비어있으면 초기화 ---
        ui.clearProfile();
      }
    } catch (err) {
      // --- 예기치 않은 에러 처리 ---
      ui.showAlert("An unexpected error occurred.", "alert alert-danger");
      ui.hideSpinner();
      console.error(err);
    }
  });
})();

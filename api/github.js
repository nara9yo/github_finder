// ===============================
// [GitHub API 통신 클래스]
// - 사용자 정보 및 저장소 정보 비동기 fetch
// ===============================
export class GitHub {
  constructor() {
    // [API 인증 및 기본 옵션]
    this.client_id = "YOUR_CLIENT_ID"; // GitHub API Client ID
    this.client_secret = "YOUR_CLIENT_SECRET"; // GitHub API Client Secret
    this.repos_count = 5; // 가져올 저장소 개수
    this.repos_sort = "created: asc"; // 저장소 정렬 기준
  }

  // [유저 정보 및 저장소 정보 동시 요청]
  async getUser(user) {
    try {
      // 프로필과 저장소 정보를 동시에 요청
      const [profileRes, reposRes] = await Promise.all([
        fetch(
          `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
        ),
        fetch(
          `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
        ),
      ]);
      // 사용자 정보가 없으면 빈 객체 반환
      if (!profileRes.ok) return {};
      const profile = await profileRes.json();
      const repos = await reposRes.json();
      return { profile, repos };
    } catch (err) {
      // 네트워크 또는 기타 에러 발생 시 콘솔에 로그
      console.error("GitHub API fetch error:", err);
      return {};
    }
  }
}

// ===============================
// [GitHub API 통신 클래스]
// - 사용자 정보 및 저장소 정보 비동기 fetch
// ===============================
export class GitHub {
  constructor() {
    // [API 인증 및 기본 옵션]
    this.client_id = ""; // GitHub API Client ID
    this.client_secret = ""; // GitHub API Client Secret
    this.repos_count = 5;
    this.repos_sort = "created: asc";
  }

  // [유저 정보 및 저장소 정보 동시 요청]
  async getUser(user) {
    try {
      // 인증 파라미터가 있을 때만 쿼리스트링에 추가
      let authParams = "";
      if (this.client_id && this.client_secret) {
        authParams = `?client_id=${this.client_id}&client_secret=${this.client_secret}`;
      }

      // 프로필 URL
      const profileUrl = `https://api.github.com/users/${user}${authParams}`;
      // 저장소 URL (authParams가 있으면 &로, 없으면 ?로 시작)
      const reposUrl =
        `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}` +
        (authParams
          ? `&client_id=${this.client_id}&client_secret=${this.client_secret}`
          : "");

      const [profileRes, reposRes] = await Promise.all([
        fetch(profileUrl),
        fetch(reposUrl),
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

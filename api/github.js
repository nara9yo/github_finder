class GitHub {
  constructor() {
    // GitHub API 토큰 (scope: public_repo)
    //this.token = "";
    // 실제 토큰을 넣으면 github에 push가 불가능 (민감정보 commit 방지)
  }

  // 사용자 정보와 저장소 정보를 한 번에 가져오는 메소드
  async getUser(user) {
    const headers = {};
    // 토큰이 있으면 Authorization 헤더 추가
    if (this.token) {
      headers["Authorization"] = `token ${this.token}`;
    }

    try {
      // 사용자 정보 요청
      const profileResponse = await fetch(
        `https://api.github.com/users/${user}`,
        { headers }
      );

      // 404면 바로 반환 (저장소 요청 X)
      if (profileResponse.status === 404) {
        return {
          profile: null,
          repos: [],
        };
      }

      // 기타 에러 처리
      if (!profileResponse.ok) {
        return {
          profile: null,
          repos: [],
        };
      }

      // 사용자 정보 JSON 파싱
      const profile = await profileResponse.json();

      // 저장소 정보 요청 (최신 5개)
      const repoResponse = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc`,
        { headers }
      );

      // 저장소 요청도 실패할 수 있으니 예외처리
      let repos = [];
      if (repoResponse.ok) {
        repos = await repoResponse.json();
      }

      // 사용자 정보와 저장소 정보 반환
      return {
        profile,
        repos,
      };
    } catch (error) {
      // 네트워크 등 예외 발생 시
      return {
        profile: null,
        repos: [],
      };
    }
  }
}

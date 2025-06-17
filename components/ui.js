// ===============================
// [UI 클래스]
// - 프로필, 저장소, 잔디밭, 스피너, 알림 등 UI 렌더링 담당
// ===============================
export class UI {
  constructor() {
    // [DOM 요소 캐싱]
    this.profile = document.getElementById("profile");
    this.repos = document.getElementById("repos");
    this.contribution = document.getElementById("contribution");
    this.spinner = document.querySelector(".spinner");
  }

  // ===============================
  // [프로필 표시]
  // ===============================
  showProfile(user) {
    this.profile.innerHTML = "";

    // --- 카드 생성 ---
    const card = document.createElement("div");
    card.className = "card mb-3";

    const row = document.createElement("div");
    row.className = "row";

    // --- 왼쪽: 이미지, 버튼 ---
    const col3 = document.createElement("div");
    col3.className = "col-3";

    const img = document.createElement("img");
    img.src = user.avatar_url;
    img.className = "mb-2";

    const profileBtn = document.createElement("a");
    profileBtn.href = user.html_url;
    profileBtn.target = "_blank";
    profileBtn.className = "btn btn-primary w-100 mb-2";
    profileBtn.textContent = "View Profile";

    col3.appendChild(img);
    col3.appendChild(profileBtn);

    // --- 오른쪽: 정보, 뱃지, 리스트 ---
    const col9 = document.createElement("div");
    col9.className = "col-9";

    // 뱃지들
    const badges = [
      {
        class: "badge badge-primary",
        text: `Public Repos: ${user.public_repos}`,
      },
      {
        class: "badge badge-secondary",
        text: `Public Gists: ${user.public_gists}`,
      },
      { class: "badge badge-success", text: `Followers: ${user.followers}` },
      { class: "badge badge-info", text: `Following: ${user.following}` },
    ];
    badges.forEach((badgeInfo) => {
      const span = document.createElement("span");
      span.className = badgeInfo.class;
      span.textContent = badgeInfo.text;
      col9.appendChild(span);
    });

    // 줄바꿈
    col9.appendChild(document.createElement("br"));
    col9.appendChild(document.createElement("br"));

    // 리스트 그룹
    const ul = document.createElement("ul");
    ul.className = "list-group";

    // 회사 정보
    const liCompany = document.createElement("li");
    liCompany.className = "list-group-item";
    liCompany.textContent = `Company: ${user.company || "N/A"}`;

    // 블로그 정보
    const liBlog = document.createElement("li");
    liBlog.className = "list-group-item";
    liBlog.innerHTML = `Website/Blog: <a href="${user.blog}" target="_blank">${
      user.blog || "N/A"
    }</a>`;

    // 위치 정보
    const liLocation = document.createElement("li");
    liLocation.className = "list-group-item";
    liLocation.textContent = `Location: ${user.location || "N/A"}`;

    // 가입일 정보
    const liMember = document.createElement("li");
    liMember.className = "list-group-item";
    liMember.textContent = `Member Since: ${new Date(
      user.created_at
    ).toLocaleString()}`;

    // 리스트 그룹에 항목 추가
    ul.appendChild(liCompany);
    ul.appendChild(liBlog);
    ul.appendChild(liLocation);
    ul.appendChild(liMember);

    col9.appendChild(ul);

    // row에 왼쪽/오른쪽 컬럼 추가
    row.appendChild(col3);
    row.appendChild(col9);
    card.appendChild(row);

    // 프로필 영역에 카드 추가
    this.profile.appendChild(card);
  }

  // ===============================
  // [저장소 표시]
  // ===============================
  showRepos(repos) {
    this.repos.innerHTML = "";

    repos.forEach((repo) => {
      // --- 저장소 카드 생성 ---
      const card = document.createElement("div");
      card.className = "card mb-2";

      const row = document.createElement("div");
      row.className = "row";

      // 왼쪽: 저장소 이름
      const col6Left = document.createElement("div");
      col6Left.className = "col-6";
      const repoLink = document.createElement("a");
      repoLink.href = repo.html_url;
      repoLink.target = "_blank";
      repoLink.textContent = repo.name;
      col6Left.appendChild(repoLink);

      // 오른쪽: 저장소 통계
      const col6Right = document.createElement("div");
      col6Right.className = "col-6 repo-stats";

      const badgeStars = document.createElement("span");
      badgeStars.className = "badge badge-primary";
      badgeStars.textContent = `Stars: ${repo.stargazers_count}`;

      const badgeWatchers = document.createElement("span");
      badgeWatchers.className = "badge badge-secondary";
      badgeWatchers.textContent = `Watchers: ${repo.watchers_count}`;

      const badgeForks = document.createElement("span");
      badgeForks.className = "badge badge-success";
      badgeForks.textContent = `Forks: ${repo.forks_count}`;

      col6Right.appendChild(badgeStars);
      col6Right.appendChild(badgeWatchers);
      col6Right.appendChild(badgeForks);

      // row에 컬럼 추가
      row.appendChild(col6Left);
      row.appendChild(col6Right);
      card.appendChild(row);

      // 저장소 영역에 카드 추가
      this.repos.appendChild(card);
    });
  }

  // ===============================
  // [잔디밭(컨트리뷰션 그래프) 표시]
  // ===============================
  showContributionGraph(username) {
    this.contribution.innerHTML = "";

    // heading 요소 생성
    const heading = document.createElement("h3");
    heading.className = "contribution__heading";
    heading.textContent = "Contribution Graph";

    // 카드(컨테이너)
    const card = document.createElement("div");
    card.className = "contribution__card";

    // 잔디밭 이미지
    const img = document.createElement("img");
    img.src = `https://ghchart.rshah.org/${username}`;
    img.alt = "Contribution Graph";
    img.className = "contribution__graph";

    card.appendChild(img);

    // 컨테이너에 추가
    this.contribution.appendChild(heading);
    this.contribution.appendChild(card);
  }

  // ===============================
  // [스피너 표시/숨기기]
  // ===============================
  showSpinner() {
    if (this.spinner) this.spinner.style.display = "block";
  }

  hideSpinner() {
    if (this.spinner) this.spinner.style.display = "none";
  }

  // ===============================
  // [초기화 메소드]
  // ===============================
  clearProfile() {
    this.profile.innerHTML = "";
    this.repos.innerHTML = "";
    this.contribution.innerHTML = "";
  }

  // ===============================
  // [알림 표시/제거]
  // ===============================
  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const card = document.querySelector(".card");
    // card가 container의 자식일 때만 insertBefore 사용
    if (card && card.parentNode === container) {
      container.insertBefore(div, card);
    } else {
      container.prepend(div);
    }

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }
}

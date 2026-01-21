const asideData = [
  {
    type: "mainside",
    items: [
      { className: "home", icon: "home.png", text: "홈" },
      { className: "shorts", icon: "shorts.png", text: "쇼츠" }
    ]
  },
  {
    type: "discribe",
    title: "구독",
    profiles: [
      { name: "유정", img: "profile.jpg" },
      { name: "유정", img: "profile.jpg" },
      { name: "유정", img: "profile.jpg" }
    ]
  },
  {
    type: "mypage",
    title: "내 페이지",
    items: [
      { icon: "record.png", text: "기록" },
      { icon: "playlist.png", text: "재생목록" },
      { icon: "clock.png", text: "나중에 볼 동영상" },
      { icon: "like.png", text: "좋아요 표시한 동영상" },
      { icon: "video.png", text: "내 동영상" },
      { icon: "download.png", text: "오프라인 저장 동영상" }
    ]
  },
  {
    type: "features",
    title: "탐색",
    items: [
      { icon: "shopping.png", text: "쇼핑" },
      { icon: "music.png", text: "음악" },
      { icon: "movie.png", text: "영화" },
      { icon: "live.png", text: "라이브" },
      { icon: "game.png", text: "게임" },
      { icon: "sports.png", text: "스포츠" },
      { icon: "study.png", text: "학습 프로그램" },
      { icon: "podcast.png", text: "팟캐스트" }
    ]
  },
  {
    type: "youtubePlus",
    title: "YouTube 더보기",
    items: [
      {
        icon: "youtube.png",
        text: "YouTube Premium",
        url: "https://www.youtube.com/premium"
      },
      {
        icon: "youtube-studio.png",
        text: "YouTube 스튜디오"
      },
      {
        icon: "youtube-music.png",
        text: "YouTube Music",
        url: "https://www.youtube.com/musicpremium?ybp=ShUIBhIRdW5saW1pdGVkLUItbXVzaWPgAQE%253D"
      },
      {
        icon: "youtube-kids.png",
        text: "YouTube Kids",
        url: "https://www.youtubekids.com/?source=youtube_web"
      }
    ]
  },
  {
    type: "set",
    items: [
      { icon: "setting.png", text: "설정" },
      { icon: "report.png", text: "신고 기록" },
      { icon: "customer.png", text: "고객센터" },
      { icon: "feedback.png", text: "의견 보내기" }
    ]
  },
]

const asideFooterData = {
  links1: [
    "정보", "보도자료", "저작권", "문의하기",
    "크리에이터", "광고", "개발자"
  ],
  links2: [
    "약관", "개인정보처리방침", "정책 및 안전",
    "YouTube 작동의 원리", "새로운 기능 테스트하기"
  ],
  company: `
    © 2026 Google LLC, Sundar Pichai,<br/>
    1600 Amphitheatre Parkway, Mountain View CA 94043, USA<br/>
    0807-882-594 (무료)<br/>
    yt-support-solutions-kr@google.com<br/>
    호스팅: Google LLC, 사업자정보, 불법촬영물 신고
  `,
  notice: `
    크리에이터들이 유튜브 상에 게시, 태그 또는 추천한 상품들은
    판매자들의 약관에 따라 판매됩니다.<br/>
    유튜브는 이러한 제품들을 판매하지 않으며,
    그에 대한 책임을 지지 않습니다.
  `
}


const aside = document.getElementById("aside")
const asideMenu = document.getElementById("aside-menu")


let isFeaturesExpanded = false

function toggleFeatures() {
  isFeaturesExpanded = !isFeaturesExpanded
  renderAside()
}

function renderAside() {
  aside.innerHTML = asideData.map(section => {
    if (section.type === "mainside") {
      return `
        <div class="mainside">
          ${section.items.map(item => `
            <div class="${item.className}">
              <img height="33" src="assets/icons/mainside/${item.icon}" />
              <div class="${item.className}-text">${item.text}</div>
            </div>
          `).join("")}
        </div>
      `
    }

    if (section.type === "discribe") {
      return `
        <div class="discribe">
          <div class="discribe-title">
            <div class="discribe-text">${section.title}</div>
            <img height="18" src="assets/icons/header/next.png" />
          </div>

          ${section.profiles.map(profile => `
            <div class="discribe-profile">
              <img src="assets/icons/discribe/${profile.img}" />
              <div class="person-text">${profile.name}</div>
            </div>
          `).join("")}
        </div>
      `
    }

    if (section.type === "mypage") {
      return `
        <div class="mypage">
          <div class="mypage-icons">
            <div class="discribe-text">${section.title}</div>
            <img height="18" src="assets/icons/header/next.png" />
          </div>

          ${section.items.map(item => `
            <div class="mypage-icons">
              <img height="35" src="assets/icons/mypage/${item.icon}" />
              <div class="person-text">${item.text}</div>
            </div>
          `).join("")}
        </div>
      `
    }

    if (section.type === "features") {
      const visibleItems = isFeaturesExpanded
        ? section.items
        : section.items.slice(0, 3)

      return `
        <div class="mypage">
          <div class="mypage-icons">
            <div class="aside-bold">${section.title}</div>
          </div>

          ${visibleItems.map(item => `
            <div class="mypage-icons">
              <img height="30" src="assets/icons/features/${item.icon}" />
              <div class="person-text">${item.text}</div>
            </div>
          `).join("")}

          <div class="mypage-icons more-btn" onclick="toggleFeatures()">
            <img
              height="20"
              src="assets/icons/features/${isFeaturesExpanded ? "up.png" : "down.png"}"
            />
            <div class="person-text">
              ${isFeaturesExpanded ? "간략히 보기" : "더보기"}
            </div>
          </div>
        </div>
      `
    }

    if (section.type === "youtubePlus") {
      return `
        <div class="mypage">
          <div class="mypage-icons">
            <div class="aside-bold">${section.title}</div>
          </div>

          ${section.items.map(item => `
            <div
              class="mypage-icons"
              ${item.url ? `onclick="window.open('${item.url}', '_blank')"` : ""}
            >
              <img height="30" src="assets/icons/youtubePlus/${item.icon}" />
              <div class="person-text">${item.text}</div>
            </div>
          `).join("")}
        </div>
      `
    }

    if (section.type === "set") {
      return `
        <div class="mypage">
          ${section.items.map(item => `
            <div class="mypage-icons">
              <img height="30" src="assets/icons/set/${item.icon}" />
              <div class="person-text">${item.text}</div>
            </div>
          `).join("")}
        </div>
      `
    }
  }).join("")
}

function getAsideFooterHTML() {
  return `
    <div class="aside-footer">
      <div class="footer-links links-compact">
        ${asideFooterData.links1.map(t =>
          `<span class="footer-link">${t}</span>`
        ).join("")}
      </div>

      <div class="footer-links links-column">
        ${asideFooterData.links2.map(t =>
          `<span class="footer-link">${t}</span>`
        ).join("")}
      </div>

      <div class="footer-company">
        ${asideFooterData.company}
      </div>

      <div class="footer-notice">
        ${asideFooterData.notice}
      </div>
    </div>
  `
}

renderAside()

aside.insertAdjacentHTML(
  "beforeend",
  getAsideFooterHTML()
) 
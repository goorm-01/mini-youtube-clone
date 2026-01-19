function toggleInfoDropdown() {
  const dropdown = document.getElementById("infoDropdownMenu");
  dropdown.classList.toggle("show");
}

// 댓글 정렬 드롭다운 토글
function toggleSortDropdown(event) {
  const dropdown = document.getElementById("sortDropdownMenu");
  dropdown.classList.toggle("show");

  // Ripple 효과 생성
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  // 클릭 위치 계산
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";

  button.appendChild(ripple);

  // 애니메이션 후 ripple 요소 제거
  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
}

// 추천 영상 더보기 드롭다운 토글
function toggleRecommendedDropdown(button) {
  // 다른 열린 드롭다운 닫기
  document.querySelectorAll(".recommended-dropdown-menu.show").forEach((menu) => {
    if (menu !== button.nextElementSibling) {
      menu.classList.remove("show");
    }
  });

  document.querySelectorAll(".shorts-dropdown-menu.show").forEach((menu) => {
    if (menu !== button.nextElementSibling) {
      menu.classList.remove("show");
    }
  });

  const dropdown = button.nextElementSibling;
  dropdown.classList.toggle("show");
}

// 댓글 더보기 드롭다운 토글
function toggleCommentDropdown(button) {
  // 다른 열린 드롭다운 닫기
  document.querySelectorAll(".comment-dropdown-menu.show").forEach((menu) => {
    if (menu !== button.nextElementSibling) {
      menu.classList.remove("show");
    }
  });

  const dropdown = button.nextElementSibling;
  dropdown.classList.toggle("show");
}

// 드롭다운 외부 클릭 시 닫기
document.addEventListener("click", function (e) {
  // 정렬 드롭다운
  const sortDropdown = document.getElementById("sortDropdownMenu");
  const sortBtn = document.querySelector(".sort-btn");

  if (
    sortDropdown &&
    sortBtn &&
    !sortBtn.contains(e.target) &&
    !sortDropdown.contains(e.target)
  ) {
    sortDropdown.classList.remove("show");
  }

  // 댓글 더보기 드롭다운
  if (!e.target.closest(".comment-more-dropdown")) {
    document.querySelectorAll(".comment-dropdown-menu.show").forEach((menu) => {
      menu.classList.remove("show");
    });
  }

  // 영상 정보 더보기 드롭다운
  if (!e.target.closest(".info-more-dropdown")) {
    const infoDropdown = document.getElementById("infoDropdownMenu");
    if (infoDropdown) {
      infoDropdown.classList.remove("show");
    }
  }

  // 추천 영상 더보기 드롭다운
  if (!e.target.closest(".recommended-more-dropdown")) {
    document.querySelectorAll(".recommended-dropdown-menu.show").forEach((menu) => {
      menu.classList.remove("show");
    });
  }
});

// 정렬 옵션 선택 처리
document.addEventListener("DOMContentLoaded", function () {
  const sortOptions = document.querySelectorAll(".sort-option");

  sortOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // 기존 active 제거
      sortOptions.forEach((opt) => opt.classList.remove("active"));
      // 선택된 옵션에 active 추가
      this.classList.add("active");
      // 드롭다운 닫기
      document.getElementById("sortDropdownMenu").classList.remove("show");

      // 선택된 정렬 기준 (필요시 추가 로직 구현)
      const sortType = this.dataset.sort;
      console.log("정렬 기준:", sortType);
    });
  });
});

// 영상 설명 더보기/접기 기능
function toggleDescription() {
  const description = document.getElementById("description");
  const descriptionContainer = document.querySelector(".description-container");
  const showMoreBtn = document.getElementById("showMoreBtn");

  if (description.classList.contains("expanded")) {
    description.classList.remove("expanded");
    descriptionContainer.classList.remove("expanded");
    showMoreBtn.textContent = "더보기";
  } else {
    description.classList.add("expanded");
    descriptionContainer.classList.add("expanded");
    showMoreBtn.textContent = "간략히";
  }
}

// 구독 버튼 토글
document.addEventListener("DOMContentLoaded", function () {
  const subscribeBtn = document.querySelector(".subscribe-btn");

  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", function () {
      if (this.classList.contains("subscribed")) {
        this.classList.remove("subscribed");
        this.textContent = "구독";
        this.style.backgroundColor = "#fff";
        this.style.color = "#0f0f0f";
      } else {
        this.classList.add("subscribed");
        this.textContent = "구독중";
        this.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        this.style.color = "#fff";
      }
    });
  }

  const scrollContainer = document.querySelector(".buttons-scroll");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // 래퍼 요소 선택
  const prevWrapper = document.getElementById("prev-wrapper");
  const nextWrapper = document.getElementById("next-wrapper");

  const SCROLL_AMOUNT = 600;

  nextBtn.addEventListener("click", () => {
    scrollContainer.scrollLeft += SCROLL_AMOUNT;
  });

  prevBtn.addEventListener("click", () => {
    scrollContainer.scrollLeft -= SCROLL_AMOUNT;
  });

  const handleArrowVisibility = () => {
    const scrollLeft = scrollContainer.scrollLeft;
    const maxScrollLeft =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;

    // 왼쪽 끝
    if (scrollLeft > 10) {
      prevWrapper.style.display = "flex";
    } else {
      prevWrapper.style.display = "none";
    }

    // 오른쪽 끝
    if (scrollLeft >= maxScrollLeft - 1) {
      nextWrapper.style.display = "none";
    } else {
      nextWrapper.style.display = "flex";
    }
  };

  scrollContainer.addEventListener("scroll", handleArrowVisibility);
  window.addEventListener("resize", handleArrowVisibility);

  // 필터 버튼 클릭 로직 (기존 유지)
  const filterButtons = document.querySelectorAll(".recommended-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // 초기 상태 체크
  handleArrowVisibility();
});

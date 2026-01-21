(function () {
  // 네비게이션 바에서 사용자가 클릭한 요소를 active로 변경한다.
  const navBar = document.querySelector(".channel-navigation-bar");

  navBar.addEventListener("click", (e) => {
    // 클릭한 요소 찾기
    const clickedBtn = e.target.closest(".nav-item");
    if (!clickedBtn) return;

    // 기존 active 제거
    const activeBtn = document.querySelector(".active");
    if (activeBtn) {
      activeBtn.classList.remove("active");
    }

    // 클릭한 요소에 active 추가
    clickedBtn.classList.add("active");
  });
})();

(function () {
  // 구독 버튼을 누르면 '아이콘 + 구독중 + 아래화살표'가 나오게 변경
  const subscribeBtn = document.querySelector(".subscribe-button");
  const text = subscribeBtn.querySelector(".subscribe-text");

  // 사용자의 초기상태를 localStorage에서 불러와 화면에 적용
  const isSubscribed = localStorage.getItem("isSubscribed");
  if (isSubscribed === "subscribed") {
    localStorage.setItem("isSubscribed", "subscribed");
    subscribeBtn.classList.add("subscribed");
    text.textContent = "구독중";
  } else {
    localStorage.setItem("isSubscribed", "notSubscribed");
    subscribeBtn.classList.remove("subscribed");
    text.textContent = "구독";
  }

  // 버튼을 클릭 시 현재 상태에 따라 구독 버튼의 상태 변경
  const subscribeBtnToggle = () => {
    const isSubscribed = localStorage.getItem("isSubscribed");
    if (isSubscribed === "subscribed") {
      subscribeBtn.classList.remove("subscribed");
      localStorage.setItem("isSubscribed", "notSubscribed");
      text.textContent = "구독";
    } else {
      subscribeBtn.classList.add("subscribed");
      localStorage.setItem("isSubscribed", "subscribed");
      text.textContent = "구독중";
    }
  };

  subscribeBtn.addEventListener("click", subscribeBtnToggle);
})();

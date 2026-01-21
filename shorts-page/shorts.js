// HTML 로드가 된 뒤 실행 
document.addEventListener("DOMContentLoaded", () => {
    // 다음 버튼 가져오기
    const nextBtn = document.querySelector(".next-arrow"); 

    // 섹션 가져오기 (배열의 형태)
    const sections = Array.from(document.querySelectorAll(".main-section"));

    // 현재 섹션
    let currentIndex = 0;

    // 현재 보고 있는 요소를 캐치
    const observer = new IntersectionObserver(
        (e) => { // 섹션에 대해 가져옴
            const visible = e.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; // 화면에 보이는 섹션 중 가장 많이 보이는 섹션을 가져옴

            const idx = sections.indexOf(visible.target); // 현재 섹션에 대해 업데이트
            if (idx !== -1) {
                currentIndex = idx;
            }

        }, {
            threshold : [0.6],
        }
    )

    sections.forEach((section) => {
        observer.observe(section); // 모든 섹션에 대해 observer를 실행
    });

    nextBtn.addEventListener("click", () => { // 다음 버튼을 눌렀을 때
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1); // 다음 인덱스를 업데이트 (존해하는 인덱스보다 넘치지 않게)
        if (nextIndex === currentIndex) return; // 마지막 쇼츠면 넘어감

        sections[nextIndex].scrollIntoView({ // 스크롤 동작
            behavior: "smooth",
            block : "start",
        });
    });
});
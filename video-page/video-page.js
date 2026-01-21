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
    document
        .querySelectorAll(".recommended-dropdown-menu.show")
        .forEach((menu) => {
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
document.addEventListener("click", function(e) {
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
        document
            .querySelectorAll(".recommended-dropdown-menu.show")
            .forEach((menu) => {
                menu.classList.remove("show");
            });
    }
});

// 정렬 옵션 선택 처리
document.addEventListener("DOMContentLoaded", function() {
    const sortOptions = document.querySelectorAll(".sort-option");

    sortOptions.forEach((option) => {
        option.addEventListener("click", function() {
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

    // 댓글 입력 기능
    const commentInput = document.querySelector(".comment-input");
    const commentCancelBtn = document.querySelector(".comment-cancel-btn");
    const commentSubmitBtn = document.querySelector(".comment-submit-btn");

    if (commentInput) {
        // 입력 시 등록 버튼 활성화
        commentInput.addEventListener("input", function() {
            if (this.value.trim().length > 0) {
                commentSubmitBtn.classList.add("active");
            } else {
                commentSubmitBtn.classList.remove("active");
            }
        });
    }

    if (commentCancelBtn) {
        // 취소 버튼 클릭 시
        commentCancelBtn.addEventListener("click", function() {
            commentInput.value = "";
            commentInput.blur();
            commentSubmitBtn.classList.remove("active");
        });
    }
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
document.addEventListener("DOMContentLoaded", function() {
    const subscribeBtn = document.querySelector(".subscribe-btn");
    const subscribedBtn = document.querySelector(".subscribed-btn");
    const notificationBtn = document.querySelector(".notification-btn");
    const subscribeDropdownOptions = document.querySelectorAll(".subscribe-dropdown-option");
    const unsubscribeOption = document.querySelector(".unsubscribe-option");

    // 구독 버튼 클릭 - 구독 상태로 변경
    if (subscribeBtn) {
        subscribeBtn.addEventListener("click", function() {
            this.style.display = "none";
            subscribedBtn.style.display = "inline-block";
            // 기본적으로 '모두' 알림 활성화
            subscribeDropdownOptions.forEach((opt) => opt.classList.remove("active"));
            document.querySelector('[data-notification="all"]').classList.add("active");
            document.querySelector(`.bell-icon.custom`).style.display = "none";
            document.querySelector(`.bell-icon.none`).style.display = "none";
            document.querySelector(`.bell-icon.all`).style.display = "block";
        });
    }

    // 알림 버튼 클릭 - 드롭다운 토글
    if (notificationBtn) {
        notificationBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            subscribedBtn.classList.toggle("open");
        });
    }

    // 알림 옵션 선택
    subscribeDropdownOptions.forEach((option) => {
        if (!option.classList.contains("unsubscribe-option")) {
            option.addEventListener("click", function() {
                subscribeDropdownOptions.forEach((opt) => opt.classList.remove("active"));
                this.classList.add("active");

                document.querySelectorAll(".bell-icon").forEach((icon) => {
                    icon.style.display = "none";
                });

                document.querySelector(`.bell-icon.${this.dataset.notification}`).style.display = "block";

                subscribedBtn.classList.remove("open");
            });
        }
    });

    // 구독 취소 클릭
    if (unsubscribeOption) {
        unsubscribeOption.addEventListener("click", function() {
            subscribedBtn.style.display = "none";
            subscribeBtn.style.display = "inline-block";
            subscribedBtn.classList.remove("open");
        });
    }

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener("click", function(e) {
        if (subscribedBtn && !subscribedBtn.contains(e.target)) {
            subscribedBtn.classList.remove("open");
        }
    });

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
        btn.addEventListener("click", function() {
            filterButtons.forEach((b) => b.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // 초기 상태 체크
    handleArrowVisibility();
});

class VideoPlayer {
    constructor() {
        // DOM 요소 선택
        this.player = document.getElementById("videoPlayer");
        this.video = document.getElementById("video");
        this.playPauseBtn = document.getElementById("playPauseBtn");
        this.bigPlayBtn = document.getElementById("bigPlayBtn");
        this.muteBtn = document.getElementById("muteBtn");
        this.volumeSlider = document.getElementById("volumeSlider");
        this.currentTimeEl = document.getElementById("currentTime");
        this.durationEl = document.getElementById("duration");
        this.progressContainer = document.getElementById("progressContainer");
        this.playedBar = document.getElementById("playedBar");
        this.bufferedBar = document.getElementById("bufferedBar");
        this.scrubber = document.getElementById("scrubber");
        this.timePreview = document.getElementById("timePreview");
        this.fullscreenBtn = document.getElementById("fullscreenBtn");
        this.settingsBtn = document.getElementById("settingsBtn");
        this.settingsMenu = document.getElementById("settingsMenu");
        this.bufferingIndicator = document.getElementById("bufferingIndicator");
        this.videoControls = document.getElementById("videoControls");
        this.autoplayBtn = document.getElementById("autoplayBtn");
        this.theaterBtn = document.getElementById("theaterBtn");

        // 상태 변수
        this.isPlaying = false;
        this.isMuted = false;
        this.isFullscreen = false;
        this.isTheater = false;
        this.isAuto = true;
        this.hideControlsTimeout = null;
        this.hideCenterButtonTimeout = null;
        this.previousVolume = 1;

        // 초기화
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupKeyboardShortcuts();
    }

    bindEvents() {
        // 재생/일시정지
        this.playPauseBtn.addEventListener("click", () => this.togglePlay());
        this.bigPlayBtn.addEventListener("click", () => this.togglePlay());
        this.video.addEventListener("click", () => this.togglePlay());

        // 비디오 이벤트
        this.video.addEventListener("play", () => this.onPlay());
        this.video.addEventListener("pause", () => this.onPause());
        this.video.addEventListener("ended", () => this.onEnded());

        this.video.addEventListener("loadedmetadata", () =>
            this.onLoadedMetadata()
        );
        this.video.addEventListener("timeupdate", () => this.onTimeUpdate());
        this.video.addEventListener("progress", () => this.onProgress());

        // 음소거 클릭
        this.muteBtn.addEventListener("click", () => this.toggleMute());

        // 영화관 모드 클릭
        this.theaterBtn.addEventListener("click", () => this.toggleTheater());

        // 볼륨 슬라이더 조절
        this.volumeSlider.addEventListener("input", (e) => {
            this.video.volume = e.target.value;
            this.updateVolumeIcon();
        });

        // 진행바 클릭/드래그
        this.progressContainer.addEventListener("click", (e) => this.seek(e));
        this.progressContainer.addEventListener("mousemove", (e) =>
            this.showTimePreview(e)
        );
        this.progressContainer.addEventListener("mousedown", (e) =>
            this.startDragging(e)
        );

        // 자동 재생 클릭
        this.autoplayBtn.addEventListener("click", () => this.toggleAutoPlayIcon());

        this.fullscreenBtn.addEventListener("click", () => this.toggleFullscreen());
        document.addEventListener("fullscreenchange", () =>
            this.onFullscreenChange()
        );

        this.player.addEventListener("mousemove", () => this.showControls());
        this.player.addEventListener("mouseleave", () => this.hideControls());

        this.video.addEventListener("waiting", () => this.showBuffering());
        this.video.addEventListener("playing", () => this.hideBuffering());
        this.video.addEventListener("canplay", () => this.hideBuffering());

        this.settingsBtn.addEventListener("click", () => this.toggleSettings());

        // 설정 메뉴 이벤트
        document.querySelectorAll(".settings-item").forEach((item) => {
            item.addEventListener("click", (e) =>
                this.openSettingsPanel(e.currentTarget.dataset.panel)
            );
        });

        document.querySelectorAll(".settings-back").forEach((btn) => {
            btn.addEventListener("click", (e) =>
                this.openSettingsPanel(e.currentTarget.dataset.panel)
            );
        });

        document.querySelectorAll(".speed-option").forEach((btn) => {
            btn.addEventListener("click", (e) =>
                this.setPlaybackSpeed(e.currentTarget.dataset.speed)
            );
        });

        document.querySelectorAll(".quality-option").forEach((btn) => {
            btn.addEventListener("click", (e) =>
                this.setQuality(e.currentTarget.dataset.quality)
            );
        });

        document.querySelectorAll(".timer-option").forEach((btn) => {
            btn.addEventListener("click", (e) =>
                this.setTimer(e.currentTarget.dataset.timer)
            );
        });

        document.querySelectorAll(".caption-option").forEach((btn) => {
            btn.addEventListener("click", (e) =>
                this.setCaption(e.currentTarget.dataset.caption)
            );
        });

        let clickCount = 0;
        let clickTimer = null;

        this.video.addEventListener("click", (e) => {
            clickCount++;

            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    // 싱글 클릭 - 재생/일시정지
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;

                // 중앙 더블클릭 - 전체화면
                this.toggleFullscreen();
            }
        });
    }

    showCenterButton(isPaused) {
        // 이전 타이머 제거
        clearTimeout(this.hideCenterButtonTimeout);

        // paused 클래스 토글
        if (isPaused) {
            this.bigPlayBtn.classList.add("paused");
        } else {
            this.bigPlayBtn.classList.remove("paused");
        }

        // show 클래스 제거 후 다시 추가 (애니메이션 재시작)
        this.bigPlayBtn.classList.remove("show");

        // 약간의 지연 후 show 클래스 추가
        setTimeout(() => {
            this.bigPlayBtn.classList.add("show");
        }, 10);

        // 0.8초 후 show 클래스 제거
        this.hideCenterButtonTimeout = setTimeout(() => {
            this.bigPlayBtn.classList.remove("show");
        }, 800);
    }

    togglePlay() {
        if (this.video.paused) {
            this.video.play();
            this.showCenterButton(false);
        } else {
            this.video.pause();
            this.showCenterButton(true);
        }
    }

    onPlay() {
        this.isPlaying = true;
        this.player.classList.add("playing");
        this.updatePlayPauseIcon();
    }

    onPause() {
        this.isPlaying = false;
        this.player.classList.remove("playing");
        this.updatePlayPauseIcon();
    }

    onEnded() {
        this.isPlaying = false;
        this.player.classList.remove("playing");
        this.updatePlayPauseIcon();
    }

    updatePlayPauseIcon() {
        const playIcon = this.playPauseBtn.querySelector(".play-icon");
        const pauseIcon = this.playPauseBtn.querySelector(".pause-icon");
        const tooltipText = this.playPauseBtn.querySelector(".tooltip");

        if (this.isPlaying) {
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";
            tooltipText.textContent = "일시정지 (k)";
        } else {
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
            tooltipText.textContent = "재생 (k)";
        }
    }

    toggleAutoPlayIcon() {
        const autoplayIcon = this.autoplayBtn.querySelector(".autoplay-icon");
        const autopauseIcon = this.autoplayBtn.querySelector(".autopause-icon");
        const tooltipText = this.autoplayBtn.querySelector(".tooltip");

        if (this.isAuto) {
            this.isAuto = false;
            autoplayIcon.style.display = "none";
            autopauseIcon.style.display = "block";
            tooltipText.textContent = "자동재생 사용 설정";
        } else {
            this.isAuto = true;
            autoplayIcon.style.display = "block";
            autopauseIcon.style.display = "none";
            tooltipText.textContent = "자동재생 사용 중지";
        }
    }

    onLoadedMetadata() {
        this.durationEl.textContent = this.formatTime(this.video.duration);
    }

    onTimeUpdate() {
        const current = this.video.currentTime;
        const duration = this.video.duration;
        const percent = (current / duration) * 100;

        this.playedBar.style.width = percent + "%";
        this.scrubber.style.left = percent + "%";
        this.currentTimeEl.textContent = this.formatTime(current);
    }

    onProgress() {
        if (this.video.buffered.length > 0) {
            const bufferedEnd = this.video.buffered.end(
                this.video.buffered.length - 1
            );
            const duration = this.video.duration;
            const percent = (bufferedEnd / duration) * 100;
            this.bufferedBar.style.width = percent + "%";
        }
    }

    seek(e) {
        const rect = this.progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        this.video.currentTime = pos * this.video.duration;
    }

    showTimePreview(e) {
        const rect = this.progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const time = pos * this.video.duration;

        this.timePreview.textContent = this.formatTime(time);
        this.timePreview.style.left = pos * 100 + "%";
    }

    startDragging(e) {
        const onMouseMove = (e) => this.seek(e);
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        this.seek(e);
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";

        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        if (h > 0) {
            return `${h}:${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
        }
        return `${m}:${s.toString().padStart(2, "0")}`;
    }

    toggleFullscreen() {
        const tooltipText = this.fullscreenBtn.querySelector(".tooltip");

        if (!document.fullscreenElement) {
            this.player.requestFullscreen().catch((err) => {
                console.log("전체화면 오류:", err);
            });
            tooltipText.textContent = "전체 화면 종료 (F)";
            this.fullscreenBtn.classList.add("active");
        } else {
            document.exitFullscreen();
            tooltipText.textContent = "전체 화면 (F)";
            this.fullscreenBtn.classList.remove("actove");
        }
    }

    onFullscreenChange() {
        this.isFullscreen = !!document.fullscreenElement;
        this.player.classList.toggle("fullscreen", this.isFullscreen);

        const enterIcon = this.fullscreenBtn.querySelector(".fullscreen-enter");
        const exitIcon = this.fullscreenBtn.querySelector(".fullscreen-exit");

        if (this.isFullscreen) {
            enterIcon.style.display = "none";
            exitIcon.style.display = "block";
            this.fullscreenBtn.title = "전체화면 종료 (f)";
        } else {
            enterIcon.style.display = "block";
            exitIcon.style.display = "none";
            this.fullscreenBtn.title = "전체화면 (f)";
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener("keydown", (e) => {
            // 입력 필드에서는 무시
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
                return;

            switch (e.key.toLowerCase()) {
                case " ":
                case "k":
                    e.preventDefault();
                    this.togglePlay();
                    break;

                case "f":
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;

                case "m":
                    e.preventDefault();
                    this.toggleMute();
                    break;

                case "arrowleft":
                    e.preventDefault();
                    this.video.currentTime -= 5;
                    break;

                case "arrowright":
                    e.preventDefault();
                    this.video.currentTime += 5;
                    break;

                case "arrowup":
                    e.preventDefault();
                    this.video.volume = Math.min(1, this.video.volume + 0.1);
                    this.volumeSlider.value = this.video.volume;
                    this.updateVolumeIcon();
                    break;

                case "arrowdown":
                    e.preventDefault();
                    this.video.volume = Math.max(0, this.video.volume - 0.1);
                    this.volumeSlider.value = this.video.volume;
                    this.updateVolumeIcon();
                    break;

                case "j":
                    e.preventDefault();
                    this.video.currentTime -= 10;
                    break;

                case "l":
                    e.preventDefault();
                    this.video.currentTime += 10;
                    break;

                case "t":
                    e.preventDefault();
                    this.toggleTheater();
                    break;

                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    e.preventDefault();
                    const percent = parseInt(e.key) / 10;
                    this.video.currentTime = this.video.duration * percent;
                    break;
            }
        });
    }

    showControls() {
        this.player.classList.remove("hide-controls");
        clearTimeout(this.hideControlsTimeout);

        if (this.isPlaying) {
            this.hideControlsTimeout = setTimeout(() => {
                this.hideControls();
            }, 3000);
        }
    }

    hideControls() {
        if (this.isPlaying && !this.settingsMenu.classList.contains("show")) {
            this.player.classList.add("hide-controls");
        }
    }

    showBuffering() {
        this.bufferingIndicator.classList.add("show");
    }

    hideBuffering() {
        this.bufferingIndicator.classList.remove("show");
    }

    toggleSettings() {
        this.settingsMenu.classList.toggle("show");
    }

    openSettingsPanel(panelName) {
        document.querySelectorAll(".settings-panel").forEach((panel) => {
            panel.style.display = "none";
        });

        if (panelName === "main") {
            document.getElementById("mainSettingsPanel").style.display = "block";
        } else if (panelName === "speed") {
            document.getElementById("speedPanel").style.display = "block";
        } else if (panelName === "quality") {
            document.getElementById("qualityPanel").style.display = "block";
        } else if (panelName === "timer") {
            document.getElementById("timerPanel").style.display = "block";
        } else if (panelName === "caption") {
            document.getElementById("captionPanel").style.display = "block";
        }
    }

    setPlaybackSpeed(speed) {
        // 활성 상태 업데이트
        document.querySelectorAll(".speed-option").forEach((btn) => {
            btn.classList.remove("active");
            if (btn.dataset.speed === speed) {
                btn.classList.add("active");
            }
        });

        // 현재 속도 표시 업데이트
        const speedText = speed === "1" ? "보통" : speed;
        document.getElementById("currentSpeed").textContent = speedText;

        // 메인 패널로 돌아가기
        this.openSettingsPanel("main");
    }

    setQuality(quality) {
        // 활성 상태 업데이트
        document.querySelectorAll(".quality-option").forEach((btn) => {
            btn.classList.remove("active");
            if (btn.dataset.quality === quality) {
                btn.classList.add("active");
            }
        });

        // 현재 화질 표시 업데이트
        const qualityText = quality === "auto" ? "자동" : quality;
        document.getElementById("currentQuality").textContent = qualityText;

        // 메인 패널로 돌아가기
        this.openSettingsPanel("main");
    }

    setTimer(timer) {
        // 활성 상태 업데이트
        document.querySelectorAll(".timer-option").forEach((btn) => {
            btn.classList.remove("active");
            if (btn.dataset.timer === timer) {
                btn.classList.add("active");
            }
        });

        // 현재 취침 타이머 표시 업데이트
        const timerText = timer === "none" ? "사용 안함" : timer;
        document.getElementById("currentTimer").textContent = timerText;

        // 메인 패널로 돌아가기
        this.openSettingsPanel("main");
    }

    setCaption(caption) {
        // 활성 상태 업데이트
        document.querySelectorAll(".caption-option").forEach((btn) => {
            btn.classList.remove("active");
            if (btn.dataset.caption === caption) {
                btn.classList.add("active");
            }
        });

        // 현재 자막 표시 업데이트
        const captionText = caption === "none" ? "사용 안함" : caption;
        document.getElementById("currentCaption").textContent = captionText;

        // 메인 패널로 돌아가기
        this.openSettingsPanel("main");
    }

    toggleMute() {
        const tooltipText = this.muteBtn.querySelector(".tooltip");

        if (this.video.muted) {
            this.video.muted = false;
            this.video.volume = this.previousVolume || 1;
            this.volumeSlider.value = this.video.volume;
            tooltipText.textContent = "음소거 (M)";
        } else {
            this.previousVolume = this.video.volume;
            this.video.muted = true;
            this.volumeSlider.value = 0;
            tooltipText.textContent = "음소거 해제 (M)";
        }
        this.updateVolumeIcon();
    }

    toggleTheater() {
        const tooltipText = this.theaterBtn.querySelector(".tooltip");
        const theaterBtn = document.getElementById("theaterBtn");

        if (this.isTheater) {
            this.isTheater = false;
            document.querySelector(".watch-container").classList.remove("expanded");
            theaterBtn.classList.remove("active");
            tooltipText.textContent = "영화관 모드 (T)";
        } else {
            this.isTheater = true;
            document.querySelector(".watch-container").classList.add("expanded");
            theaterBtn.classList.add("active");
            tooltipText.textContent = "기본 보기 (T)";
        }
    }

    updateVolumeIcon() {
        const volumeHigh = this.muteBtn.querySelector(".volume-high");
        const volumeLow = this.muteBtn.querySelector(".volume-low");
        const volumeMuted = this.muteBtn.querySelector(".volume-muted");

        // 모든 아이콘 숨기기
        volumeHigh.style.display = "none";
        volumeLow.style.display = "none";
        volumeMuted.style.display = "none";

        // 상태에 따라 아이콘 표시
        if (this.video.muted || this.video.volume === 0) {
            volumeMuted.style.display = "block";
        } else if (this.video.volume < 0.5) {
            volumeLow.style.display = "block";
        } else {
            volumeHigh.style.display = "block";
        }
    }
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
    new VideoPlayer();

    // 자막 버튼 토글
    const captionBtn = document.getElementById("captionBtn");

    if (captionBtn) {
        captionBtn.addEventListener("click", () => {
            captionBtn.classList.toggle("active");
        });

        // 키보드 단축키 'c'로 자막 토글
        document.addEventListener("keydown", (e) => {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
                return;

            if (e.key.toLowerCase() === "c") {
                e.preventDefault();
                captionBtn.click();
            }
        });
    }
});
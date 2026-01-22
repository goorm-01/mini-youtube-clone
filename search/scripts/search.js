const params = new URLSearchParams(location.search);
const q = (params.get("q") || "").trim().toLowerCase();

const titleEl = document.getElementById("searchTitle");
const resultsEl = document.getElementById("results");

function escapeHtml(value) {
  const str = String(value ?? "");
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[m]));
}

function getYouTubeId(url) {
  try {
    const u = new URL(url);

    // youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id || null;
    }

    // youtube.com/watch?v=VIDEO_ID
    if (u.hostname.includes("youtube.com")) {
      // /watch?v=
      const v = u.searchParams.get("v");
      if (v) return v;

      // /shorts/VIDEO_ID, /embed/VIDEO_ID
      const parts = u.pathname.split("/").filter(Boolean);
      const idxShorts = parts.indexOf("shorts");
      if (idxShorts >= 0 && parts[idxShorts + 1]) return parts[idxShorts + 1];

      const idxEmbed = parts.indexOf("embed");
      if (idxEmbed >= 0 && parts[idxEmbed + 1]) return parts[idxEmbed + 1];
    }

    return null;
  } catch {
    return null;
  }
}

function buildThumb(videoId, quality = "maxresdefault") {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}

// 1) window.VIDEOS에 thumb가 없거나, url만 있는 경우 자동으로 thumb 생성
const normalizedVideos = (window.VIDEOS || []).map((v) => {
  const url = v.url || "";
  const id = getYouTubeId(url);

  // 기존 thumb가 있으면 유지, 없으면 생성
  const thumb = v.thumb || (id ? buildThumb(id, "maxresdefault") : "");

  return { ...v, thumb, _videoId: id };
});

function render(list) {
  if (!q) {
    titleEl.innerText = "검색어가 없습니다.";
    resultsEl.innerHTML = "";
    return;
  }

  titleEl.innerText = `"${q}" 검색 결과`;

  if (list.length === 0) {
    resultsEl.innerHTML = `<div style="color:rgb(96,96,96);">검색 결과가 없습니다.</div>`;
    return;
  }

  resultsEl.innerHTML = list.map(v => {
    const safeTitle = escapeHtml(v.title);
    const safeChannel = escapeHtml(v.channel);
    const safeViews = escapeHtml(v.views);
    const safeUploaded = escapeHtml(v.uploaded);
    const safeDesc = escapeHtml(v.description || "");
    const safeUrl = escapeHtml(v.url || "#");

    const thumbSrc = v.thumb || "";
    const channelImgSrc = v.channelImg || "";

    return `
      <article class="result-item">
        <a class="result-thumb-wrap" href="${safeUrl}" target="_blank" rel="noopener noreferrer">
          <img
            class="result-thumb"
            src="${thumbSrc}"
            alt="${safeTitle}"
            onerror="this.onerror=null; this.src=this.src.replace('maxresdefault','hqdefault');"
          >
          <div class="result-time">${escapeHtml(v.duration)}</div>
        </a>

        <div>
          <div class="result-title">${safeTitle}</div>

          <div class="result-meta">
            <img class="result-channel-img" src="${channelImgSrc}" alt="${safeChannel}">
            <div>${safeChannel}</div>
            <div>·</div>
            <div>${safeViews}</div>
            <div>·</div>
            <div>${safeUploaded}</div>
          </div>

          <div class="result-desc">${safeDesc}</div>
        </div>
      </article>
    `;
  }).join("");
}

// 2) 생성된 normalizedVideos 대상으로 검색
const filtered = normalizedVideos.filter(v =>
  String(v.title || "").toLowerCase().includes(q) ||
  String(v.channel || "").toLowerCase().includes(q)
);

render(filtered);

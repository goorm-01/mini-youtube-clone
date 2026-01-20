const params = new URLSearchParams(location.search);
const q = (params.get("q") || "").trim().toLowerCase();

const titleEl = document.getElementById("searchTitle");
const resultsEl = document.getElementById("results");

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[m]));
}

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

  resultsEl.innerHTML = list.map(v => `
    <article class="result-item">
      <a class="result-thumb-wrap" href="${v.url}" target="_blank" rel="noopener noreferrer">
        <img class="result-thumb" src="${v.thumb}" alt="${escapeHtml(v.title)}">
        <div class="result-time">${v.duration}</div>
      </a>

      <div>
        <div class="result-title">${escapeHtml(v.title)}</div>

        <div class="result-meta">
          <img class="result-channel-img" src="${v.channelImg}" alt="${escapeHtml(v.channel)}">
          <div>${escapeHtml(v.channel)}</div>
          <div>·</div>
          <div>${escapeHtml(v.views)}</div>
          <div>·</div>
          <div>${escapeHtml(v.uploaded)}</div>
        </div>

        <div class="result-desc">${escapeHtml(v.description || "")}</div>
      </div>
    </article>
  `).join("");
}

const filtered = (window.VIDEOS || []).filter(v =>
  (v.title || "").toLowerCase().includes(q) ||
  (v.channel || "").toLowerCase().includes(q)
);

render(filtered);

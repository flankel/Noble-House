let DATA = null;

/* =========================
   初期化
========================= */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadData();
    renderAll();

    initScrollFade();
    initParallax();
    init360Viewer();

  } catch (e) {
    console.error("初期化エラー:", e);
  }
});

/* =========================
   JSON読み込み
========================= */
async function loadData() {
  const res = await fetch("data/hideaway.json");

  if (!res.ok) {
    throw new Error("JSON読み込み失敗");
  }

  DATA = await res.json();
}

/* =========================
   描画
========================= */
function renderAll() {
  if (!DATA) return;

  // テキスト
  document.getElementById("title").textContent = DATA.title || "";
  document.getElementById("subtitle").textContent = DATA.subtitle || "";
  document.getElementById("concept-title").textContent = DATA.conceptTitle || "";
  document.getElementById("concept-text").textContent = DATA.conceptText || "";

  // HERO画像
  const heroImg = document.getElementById("hero-img");
  heroImg.src = DATA.hero;

  // ギャラリー
  renderGallery("all");
}

/* =========================
   360ビュー
========================= */
function init360Viewer() {
  if (!DATA.panorama) return;

  pannellum.viewer("panorama", {
    type: "equirectangular",
    panorama: DATA.panorama,
    autoLoad: true,
    showZoomCtrl: true
  });
}

/* =========================
   ギャラリー描画
========================= */
function renderGallery(type) {
  if (!DATA || !DATA.images) return;

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  DATA.images
    .filter(img => type === "all" || img.category === type)
    .forEach(img => {

      const item = document.createElement("div");
      item.className = "item fade";

      const image = document.createElement("img");
      image.src = img.src;
      image.loading = "lazy";

      const label = document.createElement("span");
      label.textContent = img.label;

      item.appendChild(image);
      item.appendChild(label);

      item.onclick = () => openModal(img.src);

      grid.appendChild(item);
    });

  initScrollFade();
}

/* =========================
   フィルター
========================= */
function filterGallery(e, type) {
  document
    .querySelectorAll(".category button")
    .forEach(btn => btn.classList.remove("active"));

  e.target.classList.add("active");

  renderGallery(type);
}

/* =========================
   モーダル
========================= */
function openModal(src) {
  const modal = document.getElementById("modal");

  modal.style.display = "flex";
  document.getElementById("modal-img").src = src;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* =========================
   フェードイン
========================= */
function initScrollFade() {
  const elements = document.querySelectorAll(".fade");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  elements.forEach(el => observer.observe(el));
}

/* =========================
   パララックス
========================= */
function initParallax() {
  window.addEventListener("scroll", () => {
    const img = document.querySelector(".hero img");
    if (!img) return;

    const scroll = window.scrollY;
    img.style.transform = `translateY(${scroll * 0.3}px)`;
  });
}

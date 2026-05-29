let DATA = null;

/* =========================
   初期化
========================= */
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  renderAll();
  initScrollFade();
  initParallax();
});

/* =========================
   JSON読み込み
========================= */
async function loadData() {
  const res = await fetch("data/hideaway.json");
  DATA = await res.json();
}

/* =========================
   描画
========================= */
function renderAll() {

  document.getElementById("title").textContent = DATA.title;
  document.getElementById("subtitle").textContent = DATA.subtitle;
  document.getElementById("concept-title").textContent = DATA.conceptTitle;
  document.getElementById("concept-text").textContent = DATA.conceptText;

  document.getElementById("hero-img").src = DATA.hero;

  renderGallery("all");
}

/* =========================
   ギャラリー
========================= */
function renderGallery(type) {

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  DATA.images
    .filter(img => type === "all" || img.category === type)
    .forEach(img => {

      const div = document.createElement("div");
      div.className = "item fade";

      div.innerHTML = `
        <img src="${img.src}" loading="lazy">
        <span>${img.label}</span>
      `;

      div.onclick = () => openModal(img.src);

      grid.appendChild(div);
    });
}

/* =========================
   フィルター
========================= */
function filterGallery(type) {
  document.querySelectorAll(".category button")
    .forEach(btn => btn.classList.remove("active"));

  event.target.classList.add("active");
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

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  document.querySelectorAll(".fade").forEach(el => observer.observe(el));
}

/* =========================
   パララックス
========================= */
function initParallax() {

  window.addEventListener("scroll", () => {
    const img = document.querySelector(".hero img");
    const scroll = window.scrollY;
    img.style.transform = `translateY(${scroll * 0.3}px)`;
  });
}

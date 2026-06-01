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

  const heroImg = document.getElementById("hero-img");
  heroImg.src = DATA.hero;

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

      const image = document.createElement("img");
      image.src = img.src;
      image.loading = "lazy";

      const label = document.createElement("span");
      label.textContent = img.label;

      div.appendChild(image);
      div.appendChild(label);

      div.onclick = () => openModal(img.src);

      grid.appendChild(div);
    });

  initScrollFade(); // 再適用
}

/* =========================
   フィルター
========================= */
function filterGallery(e, type) {

  document.querySelectorAll(".category button")
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

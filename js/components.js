export function renderWorks(works) {
  const grid = document.getElementById("works-grid");

  works.forEach((w, i) => {
    const card = document.createElement("div");

    card.className = "card fade-up";
    card.style.transitionDelay = `${i * 0.1}s`;

    card.innerHTML = `
      <div class="img-wrap">
        <img src="${w.image}" loading="lazy">
      </div>
      <div class="p-6">
        <p class="meta">${w.location}</p>
        <h4>${w.title}</h4>
      </div>
    `;

    grid.appendChild(card);
  });
}

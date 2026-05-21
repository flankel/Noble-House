
// Scroll animation
document.addEventListener("DOMContentLoaded", () => {

  const elements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  elements.forEach(el => observer.observe(el));

  loadContent();
});


// Load JSON
async function loadContent() {
  const res = await fetch("data/content.json");
  const data = await res.json();

  // HERO
  document.getElementById("hero-img").src = data.hero.image;
  document.getElementById("hero-sub").textContent = data.hero.sub;
  document.getElementById("hero-title").innerHTML = data.hero.title;

  // CONCEPT
  document.getElementById("concept-title").innerHTML = data.concept.title;
  document.getElementById("concept-img").src = data.concept.image;

  const conceptText = document.getElementById("concept-text");
  data.concept.text.forEach(p => {
    const el = document.createElement("p");
    el.textContent = p;
    conceptText.appendChild(el);
  });

  // WORKS
  const grid = document.getElementById("works-grid");

  data.works.forEach(w => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="overflow-hidden h-64">
        <img src="${w.image}" class="w-full h-full object-cover">
      </div>
      <div class="p-6">
        <p class="text-xs text-gray-500">${w.location}</p>
        <h4>${w.title}</h4>
      </div>
    `;

    grid.appendChild(card);
  });

  // CONTACT
  document.getElementById("contact-title").textContent = data.contact.title;
  document.getElementById("contact-text").innerHTML = data.contact.text;
}

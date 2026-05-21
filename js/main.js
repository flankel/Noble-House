import { initAnimations } from './animations.js';
import { renderWorks } from './components.js';

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchData();

  hydrateContent(data);
  renderWorks(data.works);

  initAnimations();
});

async function fetchData() {
  const res = await fetch("data/content.json");
  return await res.json();
}

function hydrateContent(data) {

  // HERO
  document.getElementById("hero-img").src = data.hero.image;
  document.getElementById("hero-sub").textContent = data.hero.sub;
  document.getElementById("hero-title").innerHTML = data.hero.title;

  // CONCEPT
  document.getElementById("concept-title").innerHTML = data.concept.title;
  document.getElementById("concept-img").src = data.concept.image;

  const conceptText = document.getElementById("concept-text");
  conceptText.innerHTML = "";
  data.concept.text.forEach(p => {
    conceptText.innerHTML += `<p>${p}</p>`;
  });

  // CONTACT
  document.getElementById("contact-img").src = data.contact.image;
  document.getElementById("contact-title").textContent = data.contact.title;
  document.getElementById("contact-text").innerHTML = data.contact.text;
}

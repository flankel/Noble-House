export function initAnimations() {
  revealOnScroll();
  smoothScroll();
  parallaxHero();
}

function revealOnScroll() {
  const els = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}

function smoothScroll() {
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();

      document.querySelector(anchor.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

function parallaxHero() {
  const hero = document.querySelector(".hero-img");

  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.2;
    hero.style.transform = `scale(1.1) translateY(${offset}px)`;
  });
}

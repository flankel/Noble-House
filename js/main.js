async function loadContent() {
    const res = await fetch("/data/content.json");
    const data = await res.json();

    document.title = data.title;

    // Header
    document.getElementById("brand").textContent = data.header.brand;
    document.getElementById("tagline").textContent = data.header.tagline;
    document.getElementById("nav-concept").textContent = data.nav.concept;
    document.getElementById("nav-works").textContent = data.nav.works;
    document.getElementById("nav-contact").textContent = data.nav.contact;

    // Hero
    document.getElementById("hero-img").src = data.hero.img;
    document.getElementById("hero-sub").textContent = data.hero.sub;
    document.getElementById("hero-title").innerHTML = data.hero.title;

    // Concept
    document.getElementById("concept-label").textContent = data.concept.label;
    document.getElementById("concept-title").innerHTML = data.concept.title;
    document.getElementById("concept-img").src = data.concept.img;
    document.getElementById("concept-text1").textContent = data.concept.text1;
    document.getElementById("concept-text2").textContent = data.concept.text2;
    document.getElementById("concept-sign").textContent = data.concept.sign;

    // Works
    document.getElementById("works-label").textContent = data.works.label;
    document.getElementById("works-title").textContent = data.works.title;
    document.getElementById("works-link").textContent = data.works.link;

    const container = document.getElementById("works-container");

    data.works.items.forEach(item => {
        const el = document.createElement("article");
        el.className = "bg-white group cursor-pointer shadow-sm hover:shadow-lg transition duration-300";

        el.innerHTML = `
        <div class="overflow-hidden h-64">
            <img src="${item.img}" class="w-full h-full object-cover transform group-hover:scale-105 transition duration-500">
        </div>
        <div class="p-6">
            <p class="text-xs font-eng text-gray-500 mb-2 tracking-widest">${item.location}</p>
            <h4 class="text-lg font-medium">${item.title}</h4>
        </div>
        `;

        container.appendChild(el);
    });

    // Contact
    document.getElementById("contact-title").textContent = data.contact.title;
    document.getElementById("contact-text").innerHTML = data.contact.text;
    document.getElementById("btn-contact").textContent = data.contact.btn1;
    document.getElementById("btn-doc").textContent = data.contact.btn2;

    // Footer
    document.getElementById("footer-brand").textContent = data.footer.brand;
    document.getElementById("footer-address").textContent = data.footer.address;
}

loadContent();

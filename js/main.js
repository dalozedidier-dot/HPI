const header = document.querySelector("header.site");
const burger = document.querySelector(".burger");
if (burger && header) {
  const navigation = header.querySelector(".nav-links");
  if (navigation) {
    navigation.id = "main-navigation";
    burger.setAttribute("aria-controls", navigation.id);
  }
  const setMenu = (open) => {
    header.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  };
  setMenu(false);
  burger.addEventListener("click", () => setMenu(!header.classList.contains("open")));
  header.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("open")) {
      setMenu(false);
      burger.focus();
    }
  });
  navigation?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });
  window.matchMedia("(min-width: 1261px)").addEventListener("change", () => setMenu(false));
}

// Content stays visible without JavaScript or IntersectionObserver support.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let revealObserver;
const revealTargets = document.querySelectorAll(
  ".section-head, .audience, .card, .stats, .mindset > div:first-child, .mind-item, .step, .panel, .cta-band, .prose"
);
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealTargets.forEach((element) => {
    // Only animate content initially below the fold, preventing a startup flash.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    const siblings = [...element.parentElement.children];
    element.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(element) % 4, 3) * 70}ms`);
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
  document.addEventListener("focusin", (event) => {
    const target = event.target.closest(".reveal");
    if (target) {
      target.classList.add("is-visible");
      revealObserver.unobserve(target);
    }
  });
}
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) {
    revealObserver?.disconnect();
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }
});

const form = document.querySelector("form.contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = "none";
    const ok = document.querySelector(".form-success");
    if (ok) ok.style.display = "block";
  });
}

// Animate automatically while visible, respecting reduced motion.
const brain = document.querySelector('.hero-art');
if (brain) {
  const updateBrainMotion = () => {
    brain.classList.toggle('brain-running', !reducedMotion.matches);
  };
  updateBrainMotion();
  reducedMotion.addEventListener('change', updateBrainMotion);
  let brainInView = true;
  const updateBrainVisibility = () => {
    brain.classList.toggle('brain-offscreen', document.hidden || !brainInView);
  };
  if ('IntersectionObserver' in window) {
    const brainObserver = new IntersectionObserver(([entry]) => {
      brainInView = entry.isIntersecting;
      updateBrainVisibility();
    });
    brainObserver.observe(brain);
  }
  document.addEventListener('visibilitychange', updateBrainVisibility);
  updateBrainVisibility();
}

// Ensure the "Témoignages" entry is present in the Bilan dropdown on every page.
document.querySelectorAll('.nav-group > .nav-top[href="bilan.html"]').forEach((bilanTop) => {
  const group = bilanTop.parentElement;
  const dropdown = group?.querySelector(".dropdown");
  if (!dropdown) return;

  let link = dropdown.querySelector('a[href="temoignages.html"]');
  if (!link) {
    link = document.createElement("a");
    link.href = "temoignages.html";
    link.textContent = "Témoignages";
    dropdown.appendChild(link);
  }

  if (window.location.pathname.endsWith("/temoignages.html") || window.location.pathname.endsWith("temoignages.html")) {
    link.classList.add("active-sub");
    group.classList.add("nav-current");
  }
});

// Ensure the podcast footer contains the YouTube entry shown on the original site.
document.querySelectorAll(".podcast-icons").forEach((row) => {
  if (row.querySelector('[aria-label="YouTube Podcasts"]')) return;
  const link = document.createElement("a");
  link.className = "icon";
  link.href = "https://www.youtube.com/@fabricemicheau";
  link.target = "_blank";
  link.rel = "noopener";
  link.setAttribute("aria-label", "YouTube Podcasts");
  row.prepend(link);
});

// Footer social networks: replace placeholder letters with real brand icons.
const footerBrandIcons = {
  Facebook: {
    viewBox: "0 0 320 512",
    path: "M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
  },
  YouTube: {
    viewBox: "0 0 576 512",
    path: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
  },
  LinkedIn: {
    viewBox: "0 0 448 512",
    path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
  },
  Instagram: {
    viewBox: "0 0 448 512",
    path: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
  },
  TikTok: {
    viewBox: "0 0 448 512",
    path: "M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
  }
};

document.querySelectorAll(".social-icons .icon[aria-label]").forEach((link) => {
  const brand = footerBrandIcons[link.getAttribute("aria-label")];
  if (!brand) return;
  link.innerHTML = `<svg class="brand-icon" viewBox="${brand.viewBox}" aria-hidden="true" focusable="false"><path d="${brand.path}"></path></svg>`;
});

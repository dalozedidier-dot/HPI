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
    document.documentElement.classList.toggle("menu-open", open);
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

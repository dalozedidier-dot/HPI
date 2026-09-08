const header = document.querySelector("header.site");
const burger = document.querySelector(".burger");
if (burger && header) {
  burger.addEventListener("click", () => header.classList.toggle("open"));
}

const form = document.querySelector("form.contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = "none";
    const ok = document.querySelector(".form-success");
    if (ok) ok.style.display = "block";
  });
}

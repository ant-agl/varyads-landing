// mobile menu
const nav = document.querySelector(".nav");
const navBtn = document.querySelector(".nav__mobile-btn");
const navMobile = document.querySelector(".nav_mobile");
const navLinks = document.querySelectorAll(".nav__link");
navBtn.addEventListener("click", function () {
  if (!navMobile.classList.contains("active")) {
    navBtn.classList.add("active");
    navMobile.classList.add("active");
    document.querySelector("body").style.overflow = "hidden";
  } else {
    navBtn.classList.remove("active");
    navMobile.classList.remove("active");
  }
});
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navBtn.classList.remove("active");
    navMobile.classList.remove("active");
  });
});

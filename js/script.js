// switch
const slides = document.querySelectorAll(".main__slide");
const switches = document.querySelectorAll(".switch");
const mainBlocks = document.querySelectorAll(".main");
const switchAnimation = 400;
// switches.forEach((s) => {
mainBlocks.forEach((mainBlock) => {
  const s = mainBlock.querySelector(".switch");
  const switchItems = s.querySelectorAll(".switch__item");
  const switchSelect = s.querySelector(".switch__select");

  switchItems.forEach((sItem) => {
    sItem.addEventListener("click", function () {
      s.querySelector(".switch__item.active").classList.remove("active");
      sItem.classList.add("active");
      calcSwitchSelect(switchSelect, sItem);

      // change img
      const target = sItem.getAttribute("data-target");
      mainBlock.querySelector(".main__slide.active").classList.remove("active");
      document.getElementById(target).classList.add("active");

      switchSelect.classList.add("animate");
      setTimeout(() => {
        switchSelect.classList.remove("animate");
      }, switchAnimation);
    });
  });

  let switchActive = s.querySelector(".switch__item.active");
  calcSwitchSelect(switchSelect, switchActive);
});

function calcSwitchSelect(switchSelect, switchActive) {
  switchSelect.style.width = switchActive.clientWidth + "px";
  switchSelect.style.height = switchActive.clientHeight + "px";
  switchSelect.style.top = switchActive.offsetTop + "px";
  switchSelect.style.left = switchActive.offsetLeft + "px";
}

document.addEventListener("scroll", function (e) {
  const startBlack = document.querySelector(".main_black");
  const endBlack = document.querySelectorAll(".main_black")[1];
  const nav = document.querySelector(".nav");

  const navH = nav.clientHeight;
  let start = startBlack.offsetTop - navH / 2;
  let end = endBlack.offsetTop + endBlack.clientHeight - navH / 2;
  let scroll = window.scrollY;

  if (scroll >= start && scroll <= end) nav.classList.add("nav_dark");
  else nav.classList.remove("nav_dark");
});

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (e) {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = link.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
    // else {
    //   entry.target.classList.remove("animate");
    // }
  });
});
document.querySelectorAll(".wow").forEach((wow) => {
  observer.observe(wow);
});

// mobile menu
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
    document.querySelector("body").style.overflow = "auto";
  }
});
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navBtn.classList.remove("active");
    navMobile.classList.remove("active");
    document.querySelector("body").style.overflow = "auto";
  });
});

// privacy
const privacy = document.querySelector(".privacy");
const privacyOne = document.querySelector(".privacy-one");
const privacyAll = document.querySelector(".privacy-all");
privacyOne.addEventListener("click", hidePrivacy);
privacyAll.addEventListener("click", hidePrivacy);

if (!localStorage.privacyHide) {
  privacy.classList.remove("hide");
}

function hidePrivacy() {
  localStorage.privacyHide = true;
  privacy.classList.add("hide");
}

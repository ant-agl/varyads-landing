// scroll
const videoSlides = ["video"];

// switch
const colorsCircle = [
  ["blue", "yellow"],
  ["purpure", "green"],
  ["blue", "purpure"],
];
const colors = ["blue", "yellow", "green", "purpure"];

const slides = document.querySelectorAll(".main__slide");
const switches = document.querySelectorAll(".switch");
const mainBlocks = document.querySelectorAll(".main");
const switchAnimation = 400;

mainBlocks.forEach((mainBlock) => {
  const s = mainBlock.querySelector(".switch");
  const switchItems = s.querySelectorAll(".switch__item");
  const switchSelect = s.querySelector(".switch__select");

  switchItems.forEach((sItem) => {
    sItem.addEventListener("click", function () {
      let sItemActive = s.querySelector(".switch__item.active");
      if (sItemActive) sItemActive.classList.remove("active");
      sItem.classList.add("active");
      calcSwitchSelect(switchSelect, sItem);

      // change img
      const target = sItem.getAttribute("data-target");

      mainBlock
        .querySelectorAll(`.main__slide-text.active, .main__slide.active`)
        .forEach((item) => {
          item.classList.remove("active");
        });
      mainBlock.querySelectorAll(`[data-id="${target}"]`).forEach((item) => {
        item.classList.add("active");
      });

      if (videoSlides.indexOf(target) !== -1) {
        let video = mainBlock.querySelector(`video[data-id="${target}"]`);
        if (!video) return;
        video.currentTime = 0;
        video.play();
      }

      // calcHeightAndTopMainImages();

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
  if (!switchActive) {
    switchSelect.style.opacity = 0;
    return;
  }
  switchSelect.style.opacity = 1;
  switchSelect.style.width = switchActive.clientWidth + "px";
  switchSelect.style.height = switchActive.clientHeight + "px";
  switchSelect.style.top = switchActive.offsetTop + "px";
  switchSelect.style.left = switchActive.offsetLeft + "px";
}

function calcAllSwitchSelect() {
  const s = document.querySelector(".main.animate .switch");
  if (!s) return;
  const sSelect = s.querySelector(".switch__select");
  const sActive = s.querySelector(".switch__item.active");
  calcSwitchSelect(sSelect, sActive);
}

document.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  // hide switch
  if (scrollY <= 5) {
    switches[0].classList.add("hidden");
  } else {
    switches[0].classList.remove("hidden");
  }

  const adStudio = document.querySelector("#studio");
  const personalisation = document.querySelector("#personalisation");
  const optimisation = document.querySelector("#optimisation");
  const solutions = document.querySelector("#solutions");
  const contacts = document.querySelector("#contacts");
  const images = document.querySelectorAll(".main__images");
  const mainBlocks = document.querySelectorAll(".main");
  // position circles
  if (
    scrollY >=
    optimisation.offsetTop + optimisation.clientHeight - window.innerHeight
  ) {
    optimisation.querySelectorAll(".circle").forEach((circle) => {
      circle.style.position = "absolute";
    });
  } else {
    optimisation.querySelectorAll(".circle").forEach((circle) => {
      circle.style.position = "fixed";
    });
  }

  // color circles
  if (scrollY < personalisation.offsetTop - window.innerHeight / 2)
    changeColorCircles(0);
  else if (scrollY < optimisation.offsetTop - window.innerHeight / 2)
    changeColorCircles(1);
  else changeColorCircles(2);

  // active link
  if (scrollY < personalisation.offsetTop) changeActiveMenu(0);
  else if (scrollY < optimisation.offsetTop) changeActiveMenu(1);
  else if (scrollY < solutions.offsetTop) changeActiveMenu(2);
  else if (scrollY < contacts.offsetTop) changeActiveMenu(3);
  else changeActiveMenu(4);

  // active slide
  let indexRemove = 0;
  if (scrollY <= 5) {
    indexRemove = 0;
  } else if (scrollY < personalisation.offsetTop) {
    indexRemove = 1;
  } else if (scrollY < optimisation.offsetTop) {
    indexRemove = 2;
  } else {
    indexRemove = 3;
  }

  for (let i = 0; i < 3; i++) {
    if (i >= indexRemove) {
      images[i].classList.remove("active");
      mainBlocks[i].classList.remove("slide-active");
      mainBlocks[i]
        .querySelectorAll(".main__slide-text")
        .forEach((slide) => slide.classList.remove("active"));
    } else {
      images[i].classList.add("active");
      mainBlocks[i].classList.add("slide-active");

      const activeSwitch = mainBlocks[i].querySelector(".switch__item.active");
      const target = activeSwitch.getAttribute("data-target");

      mainBlocks[i]
        .querySelector(`.main__slide-text[data-id="${target}"]`)
        .classList.add("active");
    }
  }

  // color navbar
  const nav = document.querySelector(".nav");
  if (scrollY < solutions.offsetTop) nav.classList.add("nav_dark");
  else nav.classList.remove("nav_dark");
});

function changeColorCircles(index) {
  document.querySelectorAll(".circle").forEach((circle) => {
    colors.forEach((color) => {
      circle.classList.remove("circle_" + color);
    });
  });
  document
    .querySelectorAll(".circle")[0]
    .classList.add("circle_" + colorsCircle[index][0]);
  document
    .querySelectorAll(".circle")[1]
    .classList.add("circle_" + colorsCircle[index][1]);
}
function changeActiveMenu(index) {
  const links = document.querySelectorAll(".nav .nav__link");
  links.forEach((link) => link.classList.remove("active"));
  links[index].classList.add("active");
}

// link
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const id = link.getAttribute("href");
    window.scrollTo({
      top: document.querySelector(id).offsetTop,
      behavior: "smooth",
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
});
document.querySelectorAll(".wow").forEach((wow) => {
  observer.observe(wow);
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

// main images
function calcHeightAndTopMainImages() {
  const images = document.querySelectorAll(".main__images");
  images.forEach((image) => {
    image.style.height = image.clientWidth * 0.66 + "px";
  });

  const mainBlocks = document.querySelectorAll(".main");
  mainBlocks.forEach((block) => {
    const text = block.querySelector(".main__text");
    const slides = block.querySelectorAll(".main__slide-text");
    slides.forEach((slide) => {
      slide.style.height = text.clientHeight + "px";
    });
  });
}
document.addEventListener("DOMContentLoaded", calcHeightAndTopMainImages);
window.addEventListener("resize", calcHeightAndTopMainImages);

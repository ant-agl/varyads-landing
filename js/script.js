// scroll
const fullPage = document.querySelector("#fullpage");
const content = document.querySelector(".content");
let curIndex = 0;
const minIndex = 0;
const maxIndex = 14;
const lastMainBlock = document.querySelectorAll(".main")[2];
let maxIndexScroll = lastMainBlock.offsetTop + lastMainBlock.clientHeight;

let isPhone = false;
let scrollDirection = "";
let scroll = 0;
let ts = 0;
let timeTS = 0;
let timeScroll = 0;
const videoSlides = ["video"];
window.scrollTo(0, 0);

function changeSlide(e) {
  isPhone = false;
  if (e.deltaY === undefined) {
    e.deltaY = ts - e.changedTouches[0].clientY;
    timeScroll = (new Date().getTime() - timeTS) / 60;
    ts = e.changedTouches[0].clientY;
    timeTS = new Date().getTime();

    isPhone = true;
  }
  if (e.deltaY > 0) {
    // down
    scrollDirection = "down";
    curIndex++;
    if (maxIndexScroll <= scroll || curIndex > maxIndex) {
      curIndex = maxIndex + 1;
    }
  } else {
    // top
    scrollDirection = "top";
    curIndex = Math.max(minIndex, curIndex - 1);
    if (maxIndexScroll < scroll) {
      curIndex = maxIndex + 1;
    } else if (maxIndexScroll >= scroll && curIndex >= maxIndex) {
      curIndex = maxIndex - 1;
    }
  }

  window.scrollTo(0, 0);
  const item = document.querySelector(`[data-index-slide="${curIndex}"]`);
  if (item) {
    // tab change
    fullPage.classList.remove("transition");

    let isSlide = false;
    if (item.classList.contains("main")) {
      item.classList.remove("slide-active");
      let slideActive = item.querySelector(".main__slide-text.active");
      if (slideActive) slideActive.classList.remove("active");

      let switchActive = item.querySelector(".switch__item.active");
      if (switchActive) {
        switchActive.classList.remove("active");
        calcSwitchSelect(item.querySelector(".switch__select"), false);
      }
    } else {
      isSlide = true;
      item.click();
      const target = item.getAttribute("data-target");
      if (videoSlides.indexOf(target) !== -1) {
        let video = document.querySelector(`video[data-id="${target}"]`);
        if (!video) return;
        video.currentTime = 0;
        video.play();
      }
    }

    const curBlock = item.closest(".main") || item;
    if (curBlock.classList.contains("main") && isSlide) {
      curBlock.classList.add("slide-active");
    }
    scroll = curBlock.offsetTop;

    const oldBlock = document.querySelector(".main.animate") || content;
    if (!curBlock.classList.contains("animate")) {
      oldBlock.classList.remove("animate");
      oldBlock.classList.remove("down");
      oldBlock.classList.remove("top");
      curBlock.classList.add(scrollDirection);
      setTimeout(() => {
        curBlock.classList.add("animate");
      });
    }

    if (curIndex >= maxIndex - 1) fullPage.classList.add("transition");

    fullPage.style.transform = `translateY(${-scroll}px)`;
    content.style.transform = `translateY(${-scroll}px)`;

    if (isPhone) setTimeout(addEvent, 400);
    else setTimeout(addEvent, 1200);
  } else {
    // scroll
    scroll = content.offsetTop + content.scrollTop;

    addEvent();
  }

  changeBgNav();
}
addEvent();

function addEvent() {
  const events = ["wheel", "touchmove"];
  events.forEach((event) => {
    document.addEventListener(event, changeSlide, {
      once: true,
    });
  });
}
document.addEventListener("touchstart", function (e) {
  ts = e.changedTouches[0].clientY;
  timeTS = new Date().getTime();
});

// switch
const colorsCircle = [
  ["blue", "yellow"],
  ["green", "blue"],
  ["yellow", "purpure"],
  ["purpure", "green"],
  ["yellow", "blue"],
  ["blue", "green"],
  ["purpure", "yellow"],
  ["blue", "purpure"],
  ["yellow", "green"],
  ["green", "purpure"],
  ["blue", "yellow"],
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
      const index = sItem.getAttribute("data-index-slide");
      curIndex = index;
      mainBlock
        .querySelectorAll(`.main__slide-text.active, .main__slide.active`)
        .forEach((item) => {
          item.classList.remove("active");
        });
      mainBlock.querySelectorAll(`[data-id="${target}"]`).forEach((item) => {
        item.classList.add("active");
      });

      mainBlock.querySelectorAll(".circle").forEach((circle, i) => {
        colors.forEach((color) => {
          circle.classList.remove("circle_" + color);
        });

        circle.classList.add("circle_" + colorsCircle[curIndex][i]);
      });
      mainBlock.classList.add("slide-active");

      if (videoSlides.indexOf(target) !== -1) {
        let video = mainBlock.querySelector(`video[data-id="${target}"]`);
        if (!video) return;
        video.currentTime = 0;
        video.play();
      }

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

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = link.getAttribute("href");

    const hNav = document.querySelector(".nav").clientHeight;
    let scrollContent = document.querySelector(id).offsetTop - hNav;
    scroll = maxIndexScroll + scrollContent;

    fullPage.classList.add("transition");
    fullPage.style.transform = `translateY(-${maxIndexScroll}px)`;
    content.style.transform = `translateY(-${maxIndexScroll}px)`;
    content.scrollTo({
      top: scrollContent,
      behavior: "smooth",
    });
    curIndex = maxIndex + 1;

    changeBgNav();
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

function changeBgNav() {
  const startBlack = document.querySelector(".main_black");
  const endBlack = document.querySelectorAll(".main_black")[1];

  const navH = nav.clientHeight;
  let start = startBlack.offsetTop - navH / 2;
  let end = endBlack.offsetTop + endBlack.clientHeight - navH / 2;

  if (scroll >= start && scroll <= end) nav.classList.add("nav_dark");
  else nav.classList.remove("nav_dark");
}

// adaptive height
function resizeHeight() {
  document.body.style.height = document.documentElement.clientHeight + "px";
  document.querySelectorAll(".main").forEach((block) => {
    block.style.height = document.documentElement.clientHeight + "px";
  });
  maxIndexScroll = lastMainBlock.offsetTop + lastMainBlock.clientHeight;

  if (curIndex < maxIndex) {
    // tabs
    const curBlock = document.querySelector(".main.animate");
    scroll = curBlock.offsetTop;
    fullPage.style.transform = `translateY(-${scroll}px)`;
    content.style.transform = `translateY(-${scroll}px)`;
  } else {
    // content
    scroll = content.offsetTop + content.scrollTop;
    fullPage.style.transform = `translateY(-${content.offsetTop}px)`;
    content.style.transform = `translateY(-${content.offsetTop}px)`;
    content.scrollTop = content.scrollTop;
  }
}
resizeHeight();
window.addEventListener("resize", resizeHeight);

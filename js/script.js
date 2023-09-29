// scroll
const fullPage = document.querySelector("#fullpage");
let curIndex = 0;
const minIndex = 0;
const maxIndex = 10;
const lastMainBlock = document.querySelectorAll(".main")[2];
const maxIndexScroll = lastMainBlock.offsetTop;
const mainSection = document.querySelector(".sections-block");

let isPhone = false;
let scrollDirection = "";
let scroll = 0;
let ts = 0;
let timeTS = 0;
let timeScroll = 0;
let interval, timer;
let speed = [
  {
    time: 0,
    v: 0,
  },
  {
    time: 0,
    v: 0,
  },
];
let a = 0;
window.scrollTo(0, 0);

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

function changeSlide(e) {
  // console.log(e);
  console.group();
  isPhone = false;
  if (e.deltaY === undefined) {
    e.deltaY = ts - e.changedTouches[0].clientY;
    timeScroll = (new Date().getTime() - timeTS) / 60;
    console.log("e.deltaY", e.deltaY);
    console.log("timeScroll", timeScroll);
    ts = e.changedTouches[0].clientY;
    timeTS = new Date().getTime();

    speed[0].time = speed[1].time;
    speed[0].v = speed[1].v;
    speed[1].time = timeTS / 60;
    speed[1].v = e.deltaY / timeScroll;

    console.table(speed);
    a = (speed[1].v - speed[0].v) / (speed[1].time - speed[0].time);
    console.log("a", a);

    isPhone = true;
  }
  if (e.deltaY > 0) {
    // down
    scrollDirection = "down";
    curIndex++;
    if (maxIndexScroll < scroll || curIndex > maxIndex) {
      curIndex = maxIndex + 1;
    }
  } else {
    // top
    scrollDirection = "top";
    curIndex = Math.max(minIndex, curIndex - 1);
    if (maxIndexScroll < scroll) {
      curIndex = maxIndex + 1;
    } else if (maxIndexScroll <= scroll && curIndex >= maxIndexScroll) {
      curIndex = maxIndexScroll;
    }
  }

  const item = document.querySelector(`[data-index-slide="${curIndex}"]`);
  fullPage.classList.remove("transition");
  if (item) {
    item.click();
    const curBlock = item.closest(".main");
    scroll = curBlock.offsetTop;

    const oldBlock = document.querySelector(".main.animate");
    if (!oldBlock.isEqualNode(curBlock)) {
      oldBlock.classList.remove("animate");
      oldBlock.classList.remove("down");
      oldBlock.classList.remove("top");
      curBlock.classList.add(scrollDirection);
      setTimeout(() => {
        curBlock.classList.add("animate");
      });
    }

    fullPage.style.transform = `translateY(${-scroll}px)`;
    window.scrollTo(0, 0);

    if (isPhone) setTimeout(addEvent, 400);
    else setTimeout(addEvent, 1200);
  } else {
    window.scrollTo(0, 0);
    const maxScroll =
      Math.max(
        fullPage.scrollHeight,
        document.documentElement.scrollHeight,
        fullPage.offsetHeight,
        document.documentElement.offsetHeight,
        fullPage.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight;

    if (isPhone) {
      // scroll += Math.pow(e.deltaY / timeScroll, 2);
      // scroll += e.deltaY * -Math.log(timeScroll) * 1.2;
      // clearInterval(interval);
      // let a = e.deltaY;
      // interval = setInterval(() => {
      //   console.log(a, scroll, timeScroll);
      //   scroll = getS(a, scroll, timeScroll);
      //   scroll = Math.min(maxScroll, scroll);
      //   console.log("scroll", scroll);
      //   fullPage.style.transform = `translateY(-${scroll}px)`;
      //   a -= 1;
      //   console.log(a);
      //   if (a < 0.1) clearInterval(interval);
      // }, 1000);

      // clearInterval(timer);
      // fullPage.classList.remove("transition");
      scroll += e.deltaY;
      scroll = Math.min(maxScroll, scroll);
      fullPage.style.transform = `translateY(-${scroll}px)`;
      // timer = setTimeout(() => {
      //   // scroll += (e.deltaY < 0 ? -1 : 1) * Math.pow(Math.abs(e.deltaY), 0.5);
      //   // scroll +=
      //   //   (e.deltaY < 0 ? -1 : 1) * Math.pow(Math.abs(e.deltaY), 2) * 0.05;
      //   scroll +=
      //     (e.deltaY < 0 ? -1 : 1) * Math.pow(Math.abs(e.deltaY), 2) * 0.5;
      //   // scroll += getS(a, timeScroll);
      //   // scroll += e.deltaY * a;
      //   scroll = Math.min(maxScroll, scroll);
      //   fullPage.classList.add("transition");
      //   fullPage.style.transform = `translateY(-${scroll}px)`;
      // });
    } else {
      scroll += e.deltaY;
      scroll = Math.min(maxScroll, scroll);
      fullPage.style.transform = `translateY(-${scroll}px)`;
    }

    addEvent();
  }

  console.groupEnd();
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
      s.querySelector(".switch__item.active").classList.remove("active");
      sItem.classList.add("active");
      calcSwitchSelect(switchSelect, sItem);

      // change img
      const target = sItem.getAttribute("data-target");
      const index = sItem.getAttribute("data-index-slide");
      curIndex = index;
      mainBlock.querySelector(".main__slide.active").classList.remove("active");
      document.getElementById(target).classList.add("active");

      mainBlock.querySelectorAll(".circle").forEach((circle, i) => {
        colors.forEach((color) => {
          circle.classList.remove("circle_" + color);
        });

        circle.classList.add("circle_" + colorsCircle[curIndex][i]);
      });

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

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = link.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
    scroll = document.querySelector(id).offsetTop;
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

function getS(a, t) {
  return a / 2;
}

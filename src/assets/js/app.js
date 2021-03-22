$(window).scroll(function () {
  let height = $(window).scrollTop();
  if (height > 21) {
    $(".nav-container").addClass("nav-container-fixed");
  } else {
    $(".nav-container").removeClass("nav-container-fixed");
  }
  if (height > 170) {
    $(".nav-container").addClass("nav-container-bg");
  } else {
    $(".nav-container").removeClass("nav-container-bg");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
// Header swiper
var mySwiper = new Swiper(".header-swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '">' +
        '<div class="inner-dot"></div>' +
        "</span>"
      );
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//Team swiper

var galleryThumbs = new Swiper(".gallery-thumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  loop: true,
  freeMode: true,
  loopedSlides: 5, //looped slides should be the same
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
var swiper = new Swiper(".gallery-top", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  spaceBetween: 10,
  loop: true,
  loopedSlides: 5, //looped slides should be the same
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: galleryThumbs,
  },
});

// Line and ball animation

gsap.registerPlugin(MotionPathPlugin);

// The start and end positions in terms of the page scroll
const offsetFromTop = innerHeight * 0.2;
const pathBB = document.querySelector("#path").getBoundingClientRect();
const startY = pathBB.top - innerHeight + offsetFromTop;
const finishDistance = startY + pathBB.height - offsetFromTop;

// the animation to use
var tween = gsap
  .to("#rec", {
    duration: 5,
    paused: true,
    ease: "none",
    motionPath: {
      path: "#path",
      align: "#path",
      alignOrigin: [0.5, 0.5],
    },
  })
  .pause(0.001);

// Listen to the scroll event
document.addEventListener("scroll", function () {
  // Prevent the update from happening too often (throttle the scroll event)
  if (!requestId) {
    requestId = requestAnimationFrame(update);
  }
});

update();

function update() {
  // Update our animation
  tween.progress((scrollY - startY) / finishDistance);

  // Let the scroll event fire again
  requestId = null;
}

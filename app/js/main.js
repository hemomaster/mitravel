"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider__container"),
    mainSlider = document.querySelector(".main-slider"),
    nav = document.getElementById("nav"),
    burger = document.getElementById("burger"),
    videoPlayBtns = document.querySelectorAll(".main-slider__media-btn"),
    videos = document.querySelectorAll(".main-slider__media-video");

  // swiper 1
  const swiperMainSlider = new Swiper(mainSlider, {
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".main-slider__btn.btn-next",
      prevEl: ".main-slider__btn.btn-prev",
    },
  });

  swiperMainSlider.on("slideChange", () =>
    videos.forEach((video, index) => {
      video.pause();
      video.currentTime = 0;
      videoPlayBtns[index].style.display = "flex";
    })
  );

  // swiper 2
  const swiperSliderContainer = new Swiper(sliderContainer, {
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 15,
    breakpoints: {
      460: {
        spaceBetween: 50,
      },
      // when window width is >= 768px
      768: {
        spaceBetween: 100,
      },
    },
  });

  // navigation menu

  burger.addEventListener("click", () => nav.classList.add("active"));

  nav.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("nav__close")) nav.classList.remove("active");
    if (target.classList.contains("nav__list-link"))
      nav.classList.remove("active");
  });

  videoPlayBtns.forEach((btn, index) =>
    btn.addEventListener("click", (e) => {
      btn.style.display = "none";
      videos[index].play();
    })
  );

  // inputMask

  // validate forms
});

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider__container"),
    nav = document.getElementById("nav"),
    burger = document.getElementById("burger");

  const swiper = new Swiper(sliderContainer, {
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 100,
  });

  burger.addEventListener("click", () => nav.classList.add("active"));

  nav.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("nav__close")) nav.classList.remove("active");
    if (target.classList.contains("nav__list-link"))
      nav.classList.remove("active");
  });
});

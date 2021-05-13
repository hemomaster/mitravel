"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider__container"),
    mainSlider = document.querySelector(".main-slider"),
    nav = document.getElementById("nav"),
    burger = document.getElementById("burger"),
    videoPlayBtns = document.querySelectorAll(".main-slider__media-btn"),
    videos = document.querySelectorAll(".main-slider__media-video"),
    telFields = document.querySelectorAll("input[type='tel']"),
    formsSend = document.querySelectorAll(".form-sending");
  const pass = "mR6Evr18giCff5qw";

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

  // SCROLL SMOOTH
  // к якорным ссылкам добавить класс scroll-link
  const scrollToElem = (el) => {
    document.querySelector(el).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  {
    const scrollLinks = document.querySelectorAll("a.scroll-link");
    scrollLinks.forEach((link) => {
      link.addEventListener("click", (evt) => {
        evt.preventDefault();
        scrollToElem(link.getAttribute("href"));
      });
    });
  }

  // inputMask
  Inputmask("+380 (99) 999-99-99").mask(telFields);

  // validating and submitting forms

  const createSpinner = () => {
    const el = document.createElement("div");
    el.className = "spinner";
    el.insertAdjacentHTML(
      "afterbegin",
      `<div class="spinner-body">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>`
    );

    return el;
  };

  const toggleLoader = (form) => {
    if (form.classList.contains("overlay-loading")) {
      // spinner есть - удаляем
      form.querySelector(".spinner").remove();
      form.classList.remove("overlay-loading");
    } else {
      // spinner нет - добавляем
      form.classList.add("overlay-loading");
      form.insertAdjacentElement("beforeend", createSpinner());
    }
  };

  const validateForm = (selector, rules) => {
    new window.JustValidate(selector, {
      rules,
      submitHandler: function (form) {
        const data = new FormData(form);

        toggleLoader(form);
        fetch(form.action, {
          method: "POST",
          body: data,
        })
          .then((response) => {
            if (response.ok) return response.json();
            else new Error(response);
          })
          .then((data) => console.log(data))
          .catch((err) => console.log(`Ошибка: ${err}`))
          .finally(() => {
            toggleLoader(form);
            form.reset();
          });
      },
    });
  };

  validateForm(".newsletter__form", {
    fio: { required: true },
    email: { required: true, email: true },
    tel: { required: true },
  });

  validateForm(".subscribe", {
    email: { required: true, email: true },
  });
});

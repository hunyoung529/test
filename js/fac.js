const sections = document.querySelectorAll(".fac_sec");

for (const div of sections) {
  const elBtn = div.querySelector(".more_btn");
  const imgBox = div.querySelector(".img_box");
  const textBox = div.querySelector(".text_box");
  const swiperBox = div.querySelector(".swiper-container");
  const btnClose = div.querySelector(".btn_close");

  elBtn.addEventListener("click", function () {
    textBox.style.color = "transparent";
    elBtn.style.border = "none";

    setTimeout(() => {
      imgBox.style.width = "100%";
      textBox.style.width = "0";
    }, 100);

    setTimeout(() => {
      imgBox.classList.add("deactive");
      textBox.classList.add("deactive");

      swiperBox.classList.add("active");
      btnClose.classList.add("active");
    }, 500);
  });

  btnClose.addEventListener("click", function () {
    swiperBox.classList.remove("active");
    btnClose.classList.remove("active");

    imgBox.classList.remove("deactive");
    textBox.classList.remove("deactive");

    setTimeout(() => {
      imgBox.style.width = "70%";
      textBox.style.width = "30%";
    }, 500);

    setTimeout(() => {
      textBox.style.color = "#eff299";
      elBtn.style.border = "1px solid #eff299";
    }, 100);
  });
}

var swiper2 = new Swiper(".swiper", {
  slidesPerView: "1",
  loop: true,
  spaceBetween: 10,
  loopedSlides: 1,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



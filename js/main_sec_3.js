$(function () {
  //section3 이벤트 스와이퍼
  var swiper = new Swiper(".mySwiperSec3", {
    direction: "vertical", // 세로 슬라이드로 변경
    slidesPerView: "2", // 한 화면에 슬라이드 2개로
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev", 
    },
  });
});

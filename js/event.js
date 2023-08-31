$(function () {

    var swiper;
  
    function initializeSwiper() {
      swiper = new Swiper(".mySwiperEvent", {
        slidesPerView: getSlidesPerView(),
        slidesPerColumn: 2,
        slidesPerColumnFill: "column",
        slidesPerGroup: getSlidesPerGroup(), 
        spaceBetween: 15,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  
    function getSlidesPerView() {
      // Adjust slidesPerView based on screen width
      if (window.innerWidth < 480) {
        return 1; // Show 1 slide on small screens
      } else if (window.innerWidth < 1220) {
        return 2; // Show 2 slides on medium screens
      } else {
        return 3; // Show 3 slides on larger screens
      }
    }


    function getSlidesPerGroup() {
      if (window.innerWidth < 480) {
        return 1; // Show 1 slide group on small screens
      } else if (window.innerWidth < 1220) {
        return 2; // Show 2 slide groups on medium screens
      } else {
        return 6; // Show 6 slide groups on larger screens
      }
    }

  
    // Initialize Swiper on page load
    initializeSwiper();
  
    // Update Swiper on window resize
    window.addEventListener("resize", function () {
      if (swiper) {
        swiper.destroy(); // Destroy the existing Swiper instance
      }
      initializeSwiper(); // Reinitialize Swiper with updated settings
    });
  });

  var appendNumber = 4;
  var prependNumber = 1;
  document
    .querySelector(".prepend-2-slides")
    .addEventListener("click", function (e) {
      e.preventDefault();
      swiper.prependSlide([
        '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
        '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
      ]);
    });
  document
    .querySelector(".prepend-slide")
    .addEventListener("click", function (e) {
      e.preventDefault();
      swiper.prependSlide(
        '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
      );
    });
  document
    .querySelector(".append-slide")
    .addEventListener("click", function (e) {
      e.preventDefault();
      swiper.appendSlide(
        '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
      );
    });
  document
    .querySelector(".append-2-slides")
    .addEventListener("click", function (e) {
      e.preventDefault();
      swiper.appendSlide([
        '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
        '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
      ]);
    });


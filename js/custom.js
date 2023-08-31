$(function () {
  $(".btt").click(function () {
    $(".modal-window").toggleClass("on"); //id가 "followModal"인 모달창을 열어준다.
    // $('.modal-title').text("팔로우");    //modal 의 header 부분에 "팔로우"라는 값을 넣어준다.
  });

  $('input[name="daterange"]').daterangepicker({
    opens: "center",
    locale: {
      minDate: 0,
    },
  });

  

  $(".new_m").click(function () {
    $(".cont_reser").addClass("on"); //id가 "followModal"인 모달창을 열어준다.
    $(".cont_center").addClass("on"); //id가 "followModal"인 모달창을 열어준다.
  });

  $(".prev").click(function () {
    $(".cont_center").removeClass("on"); //id가 "followModal"인 모달창을 열어준다.
    $(".cont_reser").removeClass("on"); //id가 "followModal"인 모달창을 열어준다.
  });

  $(".close").click(function () {
    $(".modal-window").toggleClass("on");
  });

  AOS.init();

});
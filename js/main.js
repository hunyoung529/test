$(document).ready(function () {
  $.get("./common/common.html", function (data) {
    // 가져온 내용에서 header와 footer의 내용을 추출
    var headerContent = $(data).filter("header").html();
    var footerContent = $(data).filter("footer").html();

    // 이미지 소스 경로 변경
    headerContent = headerContent.replace(
      '"../common/img/wh_logo.PNG',
      '"./common/img/wh_logo.PNG'
    );
    footerContent = footerContent.replace(
      '"../common/img/wh_logo.PNG',
      '"./common/img/wh_logo.PNG'
    );

    // 헤더와 푸터 내용 삽입
    $("header").html(headerContent);
    $("footer").html(footerContent);
  });

  var page = 1; // 초기 페이지 번호
  var maxPage = 7; // 총 페이지(섹션) 수
  var mHtml = $("html, body"); // 대상 DOM 요소

  function calculateScrollTop(page) {
    var scrollTop = 0;
    $(".wrap section").each(function (index) {
      if (index < page - 1) {
        scrollTop += $(this).outerHeight();
      }
    });
    return scrollTop;
  }

  $(window).on("wheel", function (e) {
    // 페이지가 이미 애니메이션 중인 경우 추가 이동을 막습니다.
    if (mHtml.is(":animated")) return;

    // deltaY 값에 따라 페이지 번호를 증가 또는 감소시킵니다.
    if (e.originalEvent.deltaY > 0) {
      if (page == maxPage) return; // 마지막 페이지인 경우 이동을 막습니다.
      page++;
    } else if (e.originalEvent.deltaY < 0) {
      if (page == 1) return; // 첫 페이지인 경우 이동을 막습니다.
      page--;
    }

    // 새로운 스크롤 위치를 계산합니다.
    var posTop = calculateScrollTop(page);

    // 스크롤 애니메이션을 실행합니다.
    mHtml.animate({ scrollTop: posTop }, 500); // 500은 애니메이션 속도(ms)입니다.
  });

  const elBtn = document.querySelector(".more_btn");
  const textBox = document.querySelector(".text_box");
  const imgBox = document.querySelector(".img_box");
  const acorImg = document.querySelector(".acor_wrap");
  const btnClose = document.querySelector(".btn_close");

  elBtn.addEventListener("click", function () {
    imgBox.classList.add("deactive");
    textBox.classList.add("deactive");
    acorImg.classList.remove("deactive");
    btnClose.style.display = "block";
  });

  btnClose.addEventListener("click", function () {
    imgBox.classList.remove("deactive");
    textBox.classList.remove("deactive");
    acorImg.classList.add("deactive");
    btnClose.style.display = "none";
  });
  const acorImages = document.querySelectorAll(".acor_img");

  acorImages.forEach((acorImg) => {
    const figDesc = acorImg.querySelector(".sec2_desc");

    acorImg.addEventListener("mouseover", function () {
      acorImg.style.flex = "7";
      setTimeout(function () {
        figDesc.classList.add("on");
      }, 700);
    });

    acorImg.addEventListener("mouseout", function () {
      figDesc.classList.remove("on");
      acorImg.style.flex = "1";
    });
  });
});

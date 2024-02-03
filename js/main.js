$(document).ready(function () {
  // $.get("./common/mainCommon.html", function (data) {
  //   var headerContent = $(data).filter("header").html();
  //   var footerContent = $(data).filter("footer").html();

  //   headerContent = headerContent.replace(
  //     '"../common/img/wh_logo.PNG',
  //     '"./common/img/wh_logo.PNG'
  //   );
  //   footerContent = footerContent.replace(
  //     '"../common/img/wh_logo.PNG',
  //     '"./common/img/wh_logo.PNG'
  //   );

  //   $("header").html(headerContent);
  //   $("footer").html(footerContent);
  // });

  // 슬라이딩 컨텐츠 펼치기
  $(
    " .select_room,.select_date,.total_room_num,.total_adult_num,.total_children_num,.check_room figure img"
  ).click(function () {
    $(".box_wrap").empty();
    $(".btn_room").removeClass("active");
    $(".room").removeClass("active");
    $(".sliding_content").addClass("active");
    $(".sliding_dim").addClass("active");
    $(".total_room_num p,total_adult_num p,total_children_num p").text();
  });
  $(".btn_close").click(function () {
    $(".sliding_content").removeClass("active");
    $(".sliding_dim").removeClass("active");
    $(".box_wrap").empty();
  });

  // 웹 페이지가 로드되면 buildCalendar 실행
  buildCalendar();

  var currentDate = new Date();

  // 년, 월, 일 포맷을 설정합니다 (예: 2023-08-21)
  var formattedDate =
    currentDate.getFullYear() +
    "년 " +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    "월 " +
    ("0" + currentDate.getDate()).slice(-2) +
    "일";

  // start_date와 end_date 요소에 날짜를 삽입합니다
  $(".start_date, .end_date").text(formattedDate);

  $(".room").each(function () {
    var $room = $(this);
    var $adultInput = $room.find(".adult_num input");
    var $childrenInput = $room.find(".children_num input");

    $room.find(".num_plus").click(function () {
      var $input = $(this).siblings("input");
      var val = parseInt($input.val().split(" ")[1], 10);

      if (val < 4) {
        val += 1;
        $input.val(
          `${$input.parent().hasClass("adult_num") ? "어른" : "아동"} ${val}`
        );
      }
    });

    $room.find(".num_minus").click(function () {
      var $input = $(this).siblings("input");
      var val = parseInt($input.val().split(" ")[1], 10);

      if (val > 0) {
        val -= 1;
        $input.val(
          `${$input.parent().hasClass("adult_num") ? "어른" : "아동"} ${val}`
        );
      }
    });
  });

  $(".quantity").each(function () {
    var $adultInput = $(this).find(
      ".op_adult_quantity input, .adult_quantity input"
    );
    var $childrenInput = $(this).find(
      ".op_children_quantity input, .children_quantity input"
    );
    $(this)
      .find(".op_adult_quantity .num_plus, .adult_quantity .num_plus")
      .click(function () {
        var val = parseInt($adultInput.val(), 10);
        val = val === undefined ? 0 : val;
        if (val < 4) {
          val++;
        }
        $adultInput.val(val + "명");
      });

    $(this)
      .find(".op_adult_quantity .num_minus, .adult_quantity .num_minus")
      .click(function () {
        var val = parseInt($adultInput.val(), 10);
        val = val === undefined ? 0 : val;
        if (val > 0) {
          val--;
        }
        $adultInput.val(val + "명");
      });

    $(this)
      .find(".op_children_quantity .num_plus, .children_quantity .num_plus")
      .click(function () {
        var val = parseInt($childrenInput.val(), 10);
        val = val === undefined ? 0 : val;
        if (val < 4) {
          val++;
        }
        $childrenInput.val(val + "명");
      });

    $(this)
      .find(".op_children_quantity .num_minus, .children_quantity .num_minus")
      .click(function () {
        var val = parseInt($childrenInput.val(), 10);
        val = val === undefined ? 0 : val;
        if (val > 0) {
          val--;
        }
        $childrenInput.val(val + "명");
      });
  });

  var selectedRoomPrices = [];
  var selectedOptionPrices = [];
  var currentRoomTotal = 0;

  $(".room_sum span").text("0원");
  $(".grand_total span").text("0원");

  $(document).on("click", ".select", function () {
    var priceText = $(this).next("p").find("span").text();
    var price = parseInt(priceText.replace(/,/g, ""), 10);
    var roomId = $(this).siblings(".room_name").text();
    var priceSpan = $(this).siblings("p").find("span");

    var roomIndex = selectedRoomPrices.findIndex(
      (item) => item.roomId === roomId
    );

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      if (roomIndex !== -1) {
        selectedRoomPrices.splice(roomIndex, 1);
      }
    } else {
      $(this).addClass("active");
      selectedRoomPrices.push({ roomId: roomId, price: price });
    }

    currentRoomTotal = selectedRoomPrices.reduce(
      (total, item) => total + item.price,
      0
    );
    $(".room_sum span").text(formatCurrency(currentRoomTotal) + "원");

    var currentOptionTotal = selectedOptionPrices.reduce(
      (total, item) => total + item.price,
      0
    );

    var totalSum = currentRoomTotal + currentOptionTotal;

    $(".grand_total span").text(formatCurrency(totalSum) + "원");

    priceSpan.text(formatCurrency(price) + "원");
  });

  $(".confirm_option").on("click", function () {
    var price = parseInt($(this).next("p").text().replace(/\D/g, ""), 10);
    var optionIndex = selectedOptionPrices.findIndex(
      (item) => item.price === price
    );

    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      selectedOptionPrices.push({ price: price });
    } else {
      $(this).removeClass("active");
      if (optionIndex !== -1) {
        selectedOptionPrices.splice(optionIndex, 1);
      }
    }

    var currentOptionTotal = selectedOptionPrices.reduce(
      (total, item) => total + item.price,
      0
    );

    var totalSum = currentRoomTotal + currentOptionTotal;

    $(".grand_total span").text(formatCurrency(totalSum) + "원");
  });

  function formatCurrency(number) {
    return new Intl.NumberFormat("ko-KR").format(number);
  }

  $(".btn_room").on("click", function () {
    var index = $(this).index();
    var roomId = $(this).data("room");
    var jsonDataPath = "../db/reser_data.json";
    var boxWrap = $(".box_wrap");
    var activeButton = $(this).hasClass("active");
    console.log(roomId);
    if (!activeButton) {
      $(this).addClass("active");
      $(".room").eq(index).addClass("active");

      $.getJSON(jsonDataPath, function (data) {
        var selectedRoom = data.find((room) => room.room_name === roomId);

        if (selectedRoom) {
          var roomHtml = `
                    <div class="room_info">
                        <div class="left_box">
                            <figure><img src="${selectedRoom.image}" alt="${selectedRoom.room_name}">
                            <figcaption class="mo_only">${selectedRoom.room_name}</figcaption></figure>
                            <div class="text_box">
                                <h2 class="room_name title2 pc_only">${selectedRoom.room_name}</h2>
                                <p class="capability pc_only">${selectedRoom.capability}</p>
                                <p class="size pc_only">${selectedRoom.size}</p>
                            </div>
                        </div>
                        <div class="right_box">
                            <div class="quantity">
                            <div class="wrap_num">
                              <div class="adult_quantity">
                                  <label for="adultInput">어른</label>
                                  <input type="text" id="adultInput" value=" ${selectedRoom.adult}명" readonly>
                                  </div>
                              <div class="children_quantity">
                                  <label for="childrenInput">아동</label>
                                  <input type="text" id="childrenInput" value=" ${selectedRoom.children}명" readonly>
                                  </div>
                            </div>
                        </div>
                        <div class="room_select">
                        <button class="select">선택</button>
                        <p><span>${selectedRoom.price}</span></p>
                    </div>
                    </div>
                `;
          boxWrap.append(roomHtml);
        }
      });
    } else {
      // Remove the room info when button is already active
      $(this).removeClass("active");
      $(".room").eq(index).removeClass("active");
      $(".room_info")
        .filter(function () {
          return $(this).find(".room_name").text() === roomId;
        })
        .remove();
    }
  });

  $(".btn_confirm").on("click", function () {
    var totalRoomNum = $(".btn_room.active").length;
    var totalChildrenNum = 0;
    var totalAdultNum = 0;
    var reserRoomInfo = [];
    $(".children_num input").each(function () {
      var childrenValue = $(this).val();
      var numericValue = parseNumberFromString(childrenValue);
      totalChildrenNum += numericValue;
    });

    $(".adult_num input").each(function () {
      var adultValue = $(this).val();
      var numericValue = parseNumberFromString(adultValue);
      totalAdultNum += numericValue;
    });

    function parseNumberFromString(str) {
      var numberOnly = str.replace(/[^\d]/g, "");
      return parseInt(numberOnly, 10);
    }
    var totalRoomNum = 0;
    var totalAdultNum = 0;
    var totalChildrenNum = 0;

    var startDate = $(".start_date").text().trim();
    var endDate = $(".end_date").text().trim();

    $(".select_num .room").each(function () {
      var roomName = $(this).find("p").text().trim();
      var activeRoom = $(this);
      var adultInput = activeRoom.find(".adult_num input").val();
      var childrenInput = activeRoom.find(".children_num input").val();
      var roomInfoContainer = $(
        ".room_info h2.room_name:contains('" + roomName + "')"
      ).closest(".room_info");
      var roomAdultInput = roomInfoContainer.find(".adult_quantity input");
      var roomChildrenInput = roomInfoContainer.find(
        ".children_quantity input"
      );

      if (activeRoom.hasClass("active")) {
        var adultInput = activeRoom.find(".adult_num input").val();
        var childrenInput = activeRoom.find(".children_num input").val();
        var roomInfo = {
          roomName: roomName,
          adultNumber: parseNumberFromString(adultInput),
          childrenNumber: parseNumberFromString(childrenInput),
          totalRoomNumber: parseNumberFromString(childrenInput),
        };
        reserRoomInfo.push(roomInfo);
        totalRoomNum++;
        totalAdultNum += roomInfo.adultNumber;
        totalChildrenNum += roomInfo.childrenNumber;
      }

      var adultNumber = parseNumberFromString(adultInput);
      var childrenNumber = parseNumberFromString(childrenInput);

      roomAdultInput.val(adultNumber + "명");
      roomChildrenInput.val(childrenNumber + "명");
    });

    $(".total_room_num p").text(totalRoomNum);
    $(".total_children_num p").text(totalChildrenNum);
    $(".total_adult_num p").text(totalAdultNum);

    // 세션 스토리지에 값 저장
    sessionStorage.setItem("totalRoomNum", totalRoomNum);
    sessionStorage.setItem("totalChildrenNum", totalChildrenNum);
    sessionStorage.setItem("totalAdultNum", totalAdultNum);
    sessionStorage.setItem("startDate", startDate);
    sessionStorage.setItem("endDate", endDate);
    sessionStorage.setItem("reserRoomInfo", JSON.stringify(reserRoomInfo));

    $(".total_room_num p").text(totalRoomNum);
    $(".total_children_num p").text(totalChildrenNum);
    $(".total_adult_num p").text(totalAdultNum);

    $(".sliding_content").removeClass("active");
    $(".sliding_dim").removeClass("active");
  });

  const elBtn = document.querySelector(".more_btn");
  const textBox = document.querySelector(".text_box");
  const imgBox = document.querySelector(".img_box");
  const acorImg = document.querySelector(".acor_wrap");
  const btnClose = document.querySelector(".acor_wrap .btn_close");

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
  var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 3,
      slideShadows: true,
    },
    keyboard: {
      enabled: true,
    },
    mousewheel: {
      thresholdDelta: 70,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 2,
      },
      1560: {
        slidesPerView: 2,
      },
    },
  });
  // 이미지 자동 변경
  const content = [
    {
      image: "./main/img/main_sec2_img1.jpg",
      title: "다이닝 룸",
      text: "다이닝은 신선하고 고급스러운 재료로 만든 다양한 요리를 제공합니다. 메뉴는 매일 바뀌며, 계절에 따라 제철 식재료를 사용합니다.다이닝은 제주 숲을 감상할 수 있는 아름다운 공간으로,편안하고 여유로운 분위기에서 식사를 즐길 수 있습니다.",
    },
    {
      image: "./main/img/main_sec2_img2.jpg",
      title: "공용주방",
      text: " 공용 주방은 투숙객들이 함께 요리하고 식사할 수 있는 공간입니다. 주방에는 다양한 조리기구와 식기류가 구비되어 있어 편리하게 이용할 수 있습니다.공용 주방은 예약제로 운영되며 예약은 프런트 데스크에서 할 수 있습니다. 이용 시간은 오전 10시부터 오전 0시까지입니다.",
    },

    {
      image: "./main/img/main_sec2_img3.jpg",
      title: "반려동물 운동장",
      text: "라이온힐에 머무시는 동안 반려동물들이 마음껏 뛰어놀 수있는 공간입니다.",
    },

    {
      image: "./main/img/main_sec2_img4.jpg",
      title: "피트니스 센터",
      text: "최신 운동기구와 편안한 공간을 제공합니다.머무는 동안 피트니스 센터를 이용하여 건강하고 활기찬 휴식을 즐겨보세요. 이용 시간은 오전 6시부터 오후 8시까지입니다.",
    },

    {
      image: "./main/img/main_sec2_img5.jpg",
      title: "수영장",
      text: "각 객실별로 프라이빗 온수 풀이 있습니다.아름다운 제주 숲을 만끽하며 수영할 수 있습니다.",
    },
  ];

  let currentIndex = -1;
  const changingImage = document.getElementById("changingImage");
  const changingTitle = document.getElementById("changingTitle");
  const changingText = document.getElementById("changingText");

  function changeContent() {
    currentIndex = (currentIndex + 1) % content.length;
    changingImage.onload = function () {
      changingTitle.textContent = content[currentIndex].title;
      changingText.textContent = content[currentIndex].text;
    };
    changingImage.src = content[currentIndex].image;
  }

  changeContent();

  setInterval(changeContent, 5000);
});

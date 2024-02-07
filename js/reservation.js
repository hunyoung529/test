$(document).ready(function () {
 

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

  if (window.location.pathname.endsWith("reservation.html")) {
    var totalChildrenNum = sessionStorage.getItem("totalChildrenNum") || 0;
    var startDate = sessionStorage.getItem("startDate") || formattedDate;
    var endDate = sessionStorage.getItem("endDate") || formattedDate;
    var totalAdultNum = sessionStorage.getItem("totalAdultNum") || 0;
    var totalRoomNum = sessionStorage.getItem("totalRoomNum") || 0;

    // 가져온 값들을 요소에 삽입
    $(".total_children_num p").text(totalChildrenNum);
    $(".start_date").text(startDate);
    $(".end_date").text(endDate);
    $(".total_adult_num p").text(totalAdultNum);
    $(".total_room_num p").text(totalRoomNum);

    var reserRoomInfo = JSON.parse(sessionStorage.getItem("reserRoomInfo"));

    if (reserRoomInfo) {
      var jsonDataPath = "../db/reser_data.json";
      var boxWrap = $(".box_wrap");

      $(".box_wrap").empty();

      for (var i = 0; i < reserRoomInfo.length; i++) {
        (function (roomInfo) {
          var roomInfo = reserRoomInfo[i];
          var roomName = roomInfo.roomName;
          var adultNumber = roomInfo.adultNumber;
          console.log(adultNumber);
          $.getJSON(jsonDataPath, function (data) {
            var selectedRoom = data.find((room) => room.room_name === roomName);
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
                        <input type="text" id="adultInput" value=" ${roomInfo.adultNumber}명" readonly>
                        </div>
                    <div class="children_quantity">
                        <label for="childrenInput">아동</label>
                        <input type="text" id="childrenInput" value=" ${roomInfo.childrenNumber}명" readonly>
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
        })(reserRoomInfo[i]);
      }
    }
  }

  var currentPageURL = window.location.href;

  // 현재 페이지가 reservation.html인지 확인합니다.
  if (currentPageURL.indexOf("reservation.html") !== -1) {
    // 세션스토리지의 특정 키가 있는지 확인합니다.
    var keys = [
      "totalRoomNum",
      "totalChildrenNum",
      "totalAdultNum",
      "startDate",
      "endDate",
      "reserRoomInfo",
    ];
    var keyExists = keys.some((key) => sessionStorage.getItem(key) !== null);

    if (keyExists) {
      // 페이지를 벗어나거나 새로고침 할 때
      $(window).on("beforeunload", function () {
        // 경고문 띄우기
        var warningMessage = "정말로 페이지를 벗어나시겠습니까?";
        return warningMessage;
      });

      $(window).on("unload", function () {
        // 세션스토리지의 특정 키를 삭제
        keys.forEach((key) => sessionStorage.removeItem(key));
      });
    }
  }
});

let nowMonth = new Date(); // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date(); // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0); // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {
  let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1); // 이번달 1일
  let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0); // 이번달 마지막날

  let $tbody_Calendar = $(".Calendar > tbody");
  $("#calYear").text(nowMonth.getFullYear()); // 연도 숫자 갱신
  $("#calMonth").text(leftPad(nowMonth.getMonth() + 1)); // 월 숫자 갱신

  $tbody_Calendar.empty();

  let $nowRow = $tbody_Calendar.append("<tr></tr>");

  for (let j = 0; j < firstDate.getDay(); j++) {
    $nowRow.append("<td></td>");
  }

  for (
    let nowDay = firstDate;
    nowDay <= lastDate;
    nowDay.setDate(nowDay.getDate() + 1)
  ) {
    let $nowColumn = $("<td></td>").text(leftPad(nowDay.getDate()));
    $nowRow.append($nowColumn);

    if (nowDay.getDay() == 0) {
      $nowColumn.addClass("sunday");
      $nowColumn.css("color", "#DC143C"); // 일요일인 경우 글자색 빨강으로
    }
    if (nowDay.getDay() == 6) {
      $nowColumn.addClass("saturday");
      $nowColumn.css("color", "#0000CD"); // 토요일인 경우 글자색 파랑으로
      $nowRow = $tbody_Calendar.append("<tr></tr>"); // 새로운 행 추가
    }

    if (nowDay < today) {
      $nowColumn.addClass("pastDay"); // 지난날인 경우
    } else if (
      nowDay.getFullYear() == today.getFullYear() &&
      nowDay.getMonth() == today.getMonth() &&
      nowDay.getDate() == today.getDate()
    ) {
      $nowColumn.addClass("today"); // 오늘인 경우
      $nowColumn.on("click", function () {
        choiceDate(this);
      });
    } else {
      $nowColumn.addClass("futureDay"); // 미래인 경우
      $nowColumn.on("click", function () {
        choiceDate(this);
        $(this).addClass("highlight");
      });
    }
  }
}

// 날짜 선택
function choiceDate(nowColumn) {
  $(".choiceDay").removeClass("choiceDay"); // 기존 선택 날짜의 클래스 제거
  $(nowColumn).addClass("choiceDay"); // 선택된 날짜에 클래스 추가
}

// 이전달 버튼 클릭
$(document).on("click", "#prevCalendar", function () {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() - 1,
    nowMonth.getDate()
  ); // 현재 달을 1 감소
  buildCalendar(); // 달력 다시 생성
});

// 다음달 버튼 클릭
$(document).on("click", "#nextCalendar", function () {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() + 1,
    nowMonth.getDate()
  ); // 현재 달을 1 증가
  buildCalendar(); // 달력 다시 생성
});

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
  if (value < 10) {
    value = "0" + value;
    return value;
  }
  return value;
}

let startDate = null;
let endDate = null;

function choiceDate(nowColumn) {
  $(".choiceDay").removeClass("choiceDay"); // 이전 선택 클래스 제거
  $(nowColumn).addClass("choiceDay"); // 클릭한 날짜에 선택 클래스 추가

  const selectedYear = nowMonth.getFullYear();
  const selectedMonth = nowMonth.getMonth() + 1;
  const selectedDate = parseInt($(nowColumn).text(), 10);

  const selectedDateString = new Date(
    selectedYear,
    selectedMonth - 1,
    selectedDate
  );

  if (startDate === null) {
    startDate = selectedDateString;
    $(".start_date").text(
      `${selectedYear}년 ${selectedMonth}월 ${selectedDate}일`
    );
    $(".end_date").empty(); // end_date 내용 초기화
  } else if (endDate === null) {
    endDate = selectedDateString;
    $(".end_date").text(
      `${selectedYear}년 ${selectedMonth}월 ${selectedDate}일`
    );

    // 날짜 비교 후 교체
    if (endDate < startDate) {
      [startDate, endDate] = [endDate, startDate]; // 날짜 교체
      $(".start_date").text(
        `${startDate.getFullYear()}년 ${
          startDate.getMonth() + 1
        }월 ${startDate.getDate()}일`
      );
      $(".end_date").text(
        `${endDate.getFullYear()}년 ${
          endDate.getMonth() + 1
        }월 ${endDate.getDate()}일`
      );
    }

    $(".futureDay").each(function () {
      const dateStr = $(this).text();
      const currentDate = new Date(selectedYear, selectedMonth - 1, dateStr);

      if (currentDate >= startDate && currentDate <= endDate) {
        $(this).css("background-color", "#112619");
        $(this).css("color", "#eff299");
      }
    });
  } else {
    // 세 번째 날짜 선택 시 모든 선택 초기화
    startDate = null;
    endDate = null;
    $(".choiceDay").removeClass("choiceDay");
    $(".futureDay").removeClass("highlight");
    $(".start_date, .end_date").empty();
    startDate = selectedDateString;
    $(".start_date").text(
      `${selectedYear}년 ${selectedMonth}월 ${selectedDate}일`
    );

    $(".futureDay").css("background-color", "");

    $(".futureDay").each(function (e) {
      if ($(this).hasClass("saturday")) {
        // 현재 .futureDay 요소의 배경 색상 초기화
        $(this).css("color", "#0000CD");
      } else if ($(this).hasClass("sunday")) {
        $(this).css("color", "#DC143C");
      } else {
        $(this).css("color", "#000000");
      }
    });
  }
}


//========결제버튼 클릭시 기존 회원정보에 예약정보 추가하기========

// 예약 정보를 추가하는 함수
function addReservationInfo(user, commonInfo) {
  // 총 금액 추가하기
  var totalAmountText = $(".grand_total span").text();
  var totalAmount = parseFloat(totalAmountText.replace("총 금액: ", "").replace(/,/g, ""));
  user.totalAmount = totalAmount;

  // 체크인/아웃 날짜 추가
  var checkinDateText = $(".select_date .start_date").text();
  var checkoutDateText = $(".select_date .end_date").text();
  user.checkinDateText = checkinDateText;
  user.checkoutDateText = checkoutDateText;

  // 어른 인원수 추가
  var adultCountText = $(".total_adult_num p").text();
  var adultCount = parseInt(adultCountText.replace("어른 ", ""));
  user.adultCount = adultCount;

  // 아동 인원수 추가
  var childrenCountText = $(".total_children_num p").text();
  var childrenCount = parseInt(childrenCountText.replace("아동 ", ""));
  user.childrenCount = childrenCount;

  // 방 이름 추가, 2개 이상일때 사이에 ,넣기
  var RoomTitleText = document.querySelectorAll(".room_name.title2");
  var RoomTitles = Array.from(RoomTitleText).map(e => e.textContent).join(", ");
  user.RoomTitleText = RoomTitles;
}

document.getElementById('payBtn').addEventListener('click', function () {
  // 로컬 정보 불러옴
  const storedLocalData = localStorage.getItem('userInfos');
  // 기존 데이터가 없으면 빈 배열로 초기화
  const userList = storedLocalData ? JSON.parse(storedLocalData) : [];

  // 세션 스토리지에서 현재 사용자 정보 가져오기
  const sessionData = sessionStorage.getItem('user');
  const sessionUser = sessionData ? JSON.parse(sessionData) : null;

  //예약번호 생성
  function generateLHNumber() {
    const today = new Date();
    const yy = today.getFullYear().toString().slice(-2); 
    const mm = (today.getMonth() + 1).toString().padStart(2, '0');
    const dd = today.getDate().toString().padStart(2, '0'); 
    const last5Digits = (today.getTime() + '').slice(-5);
    const LHtoday = `LH${yy}${mm}${dd}${last5Digits}`;
    return LHtoday;
  }
  const yourLHNum = generateLHNumber();

  if (sessionUser) {
    const userToUpdate = userList.find(user => user.email === sessionUser.email);
      // 세션 스토리지에 있는 이메일과 일치하는 유저 찾기

      if (userToUpdate) {//로그인중인 회원
        addReservationInfo(userToUpdate, {});
        // 로컬에 업데이트된 데이터 저장
        const updatedData = JSON.stringify(userList);
        localStorage.setItem('userInfos', updatedData);
          //회원 예약완료
          alert('예약이 완료 되었습니다.');
        }
  }else {//세션값 없음 = 로그인 중이 아님 => 비회원 예약
    const nonMemberInfo = {
      email: 'none',
      name: '비회원', 
      yourLHNum: yourLHNum
    };
    // 로컬 스토리지에서 기존 데이터 가져오기
    const storedLocalData = localStorage.getItem('userInfos');
    const userList = storedLocalData ? JSON.parse(storedLocalData) : [];

    // 새로운 비회원 정보를 목록에 추가
    userList.push(nonMemberInfo);
    // 공통 정보를 추가
    addReservationInfo(nonMemberInfo, {});

    // 로컬 스토리지에 업데이트된 데이터 저장
    const nonMemberUpdatedData = JSON.stringify(userList);
    localStorage.setItem('userInfos', nonMemberUpdatedData);

    alert('비회원으로 예약되었습니다. 예약 번호를 잘 보관해 주세요.');
    
    //비회원도 확인창에서 예약정보 볼수있게 세션에 값 보내기 
    sessionStorage.setItem('nonMemberLHNum', yourLHNum);
    // 예약 확인창으로 보내기
    window.location.href = '../sub/checkReservation.html';
  }
  
  //예약번호 로컬에 저장
  alert(`예약번호는 ${yourLHNum}입니다.`);
  const userToUpdate = userList.find(user => user.email === sessionUser.email);
  userToUpdate.yourLHNum = yourLHNum;
  const updatedData = JSON.stringify(userList);
  localStorage.setItem('userInfos', updatedData);

  //예약 확인창으로 보내기
  window.location.href = '../sub/checkReservation.html';
})//end payBtn

document.getElementById('checkMove').addEventListener('click',function(){
  // 세션에서 로그인정보(key:user)값을 가져옴
  var userSession = sessionStorage.getItem('user');

  // "user" 키가 세션에 존재하는 경우
  if (userSession !== null) {//로그인중임
    window.location.href = '../sub/checkReservation.html';
  } else {//비회원임
    window.location.href = '../sub/checkCustomer.html';
  }
})

//비로그인 상태로 접속시 회원가입 유도하기
window.addEventListener('load', function() {
  const sessionData = sessionStorage.getItem('user');
  if (!sessionData) {
      alert('로그인 상태가 아닙니다. \n로그인을 하시면 예약 내역을 더 편리하게 확인하실 수 있습니다.');
  }
});





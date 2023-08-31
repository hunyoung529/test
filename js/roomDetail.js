//room에서 받아온 roomKey값 받기
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}//getQueryParam(param) 함수정의

// console.log('키값은?', getQueryParam('key'));

let RoomKey = getQueryParam('key');
if(!RoomKey) RoomKey = 0; //RoomKey가 undefined거나 0일때

const elH2_RoomName = document.querySelector('section.roomDetail_sec1 > h2'),
      elDiv_info = document.querySelector('section.roomDetail_sec1 > .infoTxtWrapper'),
      elCode = elDiv_info.querySelectorAll('li>code'),
      elUl_main = document.querySelector('div.main > ul.swiper-wrapper'),
      elUl_slide = document.querySelector('div.otherRoomsSwiper > ul.swiper-wrapper');

//데이터 입력
$.ajax({
    url: "../db/room.json",

    success: function(data){
        let obj = data[RoomKey];

        let tag = '';

        obj.roomImg.forEach((img, k)=>{
            tag += `
            <li class="swiper-slide">
                <p class="bg"><img src="./img/room/${img}" alt="${obj.roomImgAlt[k]}"></p>
                <div class="blackBg"></div>
            </li>
            `
        });

        elUl_main.innerHTML = tag;

        elH2_RoomName.innerText = obj.name;
        
        elCode[0].innerText = obj.size; //사이즈
        elCode[1].innerText = obj.InRoomAmenities; //객실형태
        elCode[2].innerText = obj.occupancy; //최대 / 최소 인원수
        elCode[3].innerText = obj.roomRate; //금액

        tag = '';
        for(key in obj.roomDetail){
            tag += `<dl class='name'>
                <dt>${key}</dt>
                <dd>
                    <ul>`;
        obj.roomDetail[key].forEach((ele) => {
            tag += `<li>${ele}</li>`
        });
            tag += `</ul>
                </dd>
            </dl> 
            `;
        };
        elCode[4].innerHTML = tag; //어메니티


        tag = '';

        data.forEach((obj, k)=>{
            tag += `<li class="swiper-slide">
                <a href="./roomDetail.html?key=${k}">
                    <figure>
                        <p><img src="./img/room/${obj.roomImg[0]}" alt="${obj.roomImgAlt[0]}"></p>
                        <figcaption>${obj.name}</figcaption>
                    </figure>
                </a>
            </li>`
        });

        elUl_slide.innerHTML = tag;
        


        //섹션중(section태그는 아님) main의 스와이퍼
let swiper1 = new Swiper(".mainSwiper", { 
    slidesPerView: 1,
      loop: true,   
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

        // sec2의 스와이퍼
        let swiper2 = new Swiper(".otherRoomsSwiper", {
            loop: true,
            breakpoints: {
                750: {//750이상부터
                    slidesPerView: 2,
                },
                1200: {//1200이상부터
                slidesPerView: 3,
                },
            },
            slidesPerView: 1,
            spaceBetween: 20,

            navigation: {
                nextEl: ".swiper-button-next2",
                prevEl: ".swiper-button-prev2",
            },        
            on:{
                slideChange: function(e){
                const elPage = document.querySelector('section.roomDetail_sec2 .pagination'),
                    elPrePage = elPage.querySelector('span.prePage'), 
                    elAllPage = elPage.querySelector('span.allPage'); 

                elPrePage.innerText = e.realIndex+1;

                // elPage.innerHTML = `<span>${e.realIndex+1}</span> <span>/</span> <span>${e.slides.length}</span>`
                }
            }
        });
    }, //success


    error: function(){
        console.log('---ajax에 문제가 발생했습니다.---');
    }
});


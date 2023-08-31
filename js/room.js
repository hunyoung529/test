let swiper = '';

const elUl = document.querySelectorAll('section.room_sec1 .roomWrapper>ul');
console.log('elUl', elUl);

$.ajax({
    url: "../db/room.json",


    success: function(data){
        console.log('data',data);
        console.log('data[0]',data[0]);

        
        let tagAll = '', tagStandard = '', tagDeluxe = ''; 

        // const createRoom = (tagName, ele, k) => {
        //         let sub_tag = '';

        //         tagName += `<li>
        //                     <figure>
        //                         <div class="swiper roomSwiper slide">
        //                             <ul class="swiper-wrapper">`;
               
        //             //슬라이드 사진
        //         ele.roomImg.forEach((src, key)=>{
                            
        //                     sub_tag += `<li class="swiper-slide">
        //                                     <a href="./roomDetail.html">
        //                                     <img src="./img/room/${src}" alt="${ele.roomImgAlt[key]}">
        //                                     <div class="blackBg"></div>
        //                                     </a>
        //                             </li>`;
        //         });//ele.roomImg.forEach((src, key)
        //         tagName += sub_tag;
    
                
    
        //         tagName +=              `</ul>
    
        //                             <button class="leftBtn swiper-button-prev" type="button"></button>
        //                             <button class="rightBtn swiper-button-next" type="button"></button>
        //                         </div>
    
        //                         <div class="txtWrapper">
        //                             <figcaption>${ele.name}</figcaption>
        //                             <span class="roomType">
        //                                 객실형태: <code>${ele.InRoomAmenities}</code>
        //                             </span>
        //                             <span class="roomPersonnel">
        //                                 인원수: <code>${ele.occupancy}</code>
        //                             </span>
        //                             <a href="./roomDetail.html">DETAIL VIEW</a>
        //                         </div>
        //                     </figure>
        //                 </li>`;
        
        // }//createRoom()
        
        let tagName = '';

        const createRoom = (ele, k) => {
                let sub_tag = '';

                tagName += `<li>
                            <figure>
                                <div class="swiper roomSwiper slide">
                                    <ul class="swiper-wrapper">`;
               
                    //슬라이드 사진
                ele.roomImg.forEach((src, key)=>{
                            
                            sub_tag += `<li class="swiper-slide">
                                            <a href="./roomDetail.html?key=${k}">
                                            <img src="./img/room/${src}" alt="${ele.roomImgAlt[key]}">
                                            <div class="blackBg"></div>
                                            </a>
                                    </li>`;
                });//ele.roomImg.forEach((src, key)
                tagName += sub_tag;
    
                
    
                tagName +=              `</ul>
    
                                    <button class="leftBtn swiper-button-prev" type="button"></button>
                                    <button class="rightBtn swiper-button-next" type="button"></button>
                                </div>
    
                                <div class="txtWrapper">
                                    <figcaption>${ele.name}</figcaption>
                                    <span class="roomType">
                                        객실형태: <code>${ele.InRoomAmenities}</code>
                                    </span>
                                    <span class="roomPersonnel">
                                        인원수: <code>${ele.occupancy}</code>
                                    </span>
                                    <a href="./roomDetail.html?key=${k}">DETAIL VIEW</a>
                                </div>
                            </figure>
                        </li>`;

                return tagName;
        }//createRoom()


        // All 탭 - - - - - - - - - - - - - - - - - - - - - - - - -
        data.forEach((ele, k)=>{
                tagAll = createRoom(ele, k);
        });//data.forEach((ele, k)
        tagName = '';

        // Standard 탭 - - - - - - - - - - - - - - - - - - - - - - - - -
        data.forEach((ele, k)=>{
          if(ele.type == "standard single" || ele.type == "standard couple"){
                tagStandard = createRoom(ele, k);
          }

        });//data.forEach((ele, k)
        tagName = '';

        // Deluxe 탭 - - - - - - - - - - - - - - - - - - - - - - - - -
        data.forEach((ele, k)=>{
                if(ele.type == "deluxe single" || ele.type == "deluxe couple"){
                        tagDeluxe = createRoom(ele, k);
                }

        });//data.forEach((ele, k)
        console.log(tagAll, tagStandard, tagDeluxe);

        elUl[0].innerHTML = tagAll;
        elUl[1].innerHTML = tagStandard;
        elUl[2].innerHTML = tagDeluxe;

        swiper = new Swiper(".roomSwiper", {
                loop: true,
                navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                }
        });
        
        $( function() {
                $( "#RoomsTab" ).tabs();
        } );
        
    }, //success


    error: function(){
        console.log('---ajax에 문제가 발생했습니다.---');
    }
});//ajax













{/* <li>
<figure>
    <div class="swiper roomSwiper slide">
        <ul class="swiper-wrapper">
            <!-- <li>반복 구간_2. 방의 사진들(json에서 필요한 거 (id로 쓸 이름, a태그 이동경로, 이미지 소스, alt)) -->
            <li class="swiper-slide">
                <a href="">
                    <img src="./img/room/img_standardSingle1.jpg" alt="거실사진">
                    <div class="blackBg"></div>
                </a>
            </li>
            <li class="swiper-slide">
                <a href="">
                    <img src="./img/room/img_standardSingle2.jpg" alt="??사진">
                    <div class="blackBg"></div>
                </a>
            </li>
            <li class="swiper-slide">
                <a href="">
                    <img src="./img/room/img_standardSingle3.jpg" alt="??사진">
                    <div class="blackBg"></div>
                </a>
            </li>
        </ul>

        <button class="leftBtn swiper-button-prev" type="button"></button>
        <button class="rightBtn swiper-button-next" type="button"></button>
    </div>

    <div class="txtWrapper">
        <figcaption>Standard Single A</figcaption>
        <span class="roomType">
            객실형태: <code>거실1 부엌1 화장실1</code>
        </span>
        <span class="roomPersonnel">
            인원수: <code>1 ~ 3명</code>
        </span>
        <a href="">DETAIL VIEW</a>
    </div>
</figure>
</li> */}
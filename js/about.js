//sec2 - 아코디언 ----- ----- ----- ----- -----


//sec2 - 페이지네이션 ----- ----- ----- ----- -----
const elAcc = document.querySelector('.about_sec2 div.accordion');

let accTag = '';
$.ajax({
    url: "../db/question.json",

    success: function(data){
        const elAcc = document.querySelector('.about_sec2 .swiper .accordionWrapper'),
              elBtnsWrapper = document.querySelector('.about_sec2 .btnsWrapper'),
              elLeftBtn = elBtnsWrapper.querySelector('.left'),
              elRightBtn = elBtnsWrapper.querySelector('.right'),
              elSpan_prePage = elBtnsWrapper.querySelector('nav span:nth-of-type(1)'), //현재페이지
              elSpan_allPage = elBtnsWrapper.querySelector('nav span:nth-of-type(3)'); //전체페이지

        let prePage = 1, //현재페이지
            allPage = Math.trunc((data.length-1)/7)+1, // 전체페이지
            visibleData;

        

        elSpan_allPage.innerText = allPage; //전체페이지 반영

        //페이지네이션 버튼 클릭했을 때 발동
        let pageFun = (next="first") => {
            if(next == "next"){//다음버튼을 누름
                (prePage < allPage) ? prePage++ : '';
            }else if(next == "prev"){//이전버튼을 누름
                (prePage > 1) ? prePage-- : '';
            }


            // 화면에 보일 것만 내놓기
            visibleData = data.filter((obj, k)=>{                        
                return (Math.trunc(k/7)+1 == prePage ) ? true : false;
            }); //현재 페이지에 내놓을 객체만 따로 빼서 배열로 만듦
    
            // console.log('visibleData' , visibleData); //따로 모은 배열

            let tag = '<div class="accordion" id="accordion">';
            visibleData.forEach((QnA_obj)=>{
                tag += `<h3 class="question"><span class="q">${QnA_obj.Q}</span> <span class="arrow">keyboard_arrow_down</span></h3>
                <div class="answer">${QnA_obj.A}</div>`;
            });
            tag += '</div>'
            elAcc.innerHTML = tag; 

            elSpan_prePage.innerText = prePage; //현재페이지 반영

            $( ".accordion" ).accordion({
                active: false,
                collapsible: true,
                heightStyle: "content"
             });
        }//pageFun() 함수정의

        pageFun();

        elLeftBtn.onclick = () => {
            pageFun("prev");
        }//elLeftBtn.onclick
        
        elRightBtn.onclick = () => {
            pageFun("next");
        }//elRightBtn.onclick

    }, //success


    error: function(){
        console.log('---ajax에 문제가 발생했습니다.---');
    }
});//ajax

//sec4 - 모바일 스와이퍼 ----- ----- ----- ----- -----
const swiper = new Swiper(".SNSSwiper_Mb", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

//nav 관련 것들 ----- ----- ----- ----- -----

//초기화
let elNav_reset = document.querySelector('nav.navigation'),
    elAAll_reset = elNav_reset.querySelectorAll('li>a'), 
    elSecAll_reset = document.querySelectorAll('section');

let elSecAll_offsetTop_reset = [];
elSecAll_reset.forEach(function(ele, key){
    elSecAll_offsetTop_reset.push(ele.offsetTop); //ele.offsetTop //절대 위치(문서기준)
});

elAAll_reset.forEach(function(ele, k){
    ele.onclick = (e) => {
        e.preventDefault(); //a태그 이동 막기

        window.scrollTo({
            top: elSecAll_offsetTop_reset[k] ,
            left: 0,
            behavior: "smooth"
        });//window.scrollTo
    };//ele.onclick
});//elAAll.forEach(function(ele, k)

//스크롤 등록
let Prekey = 0;
window.onload = function(){  
    //scroll nav색 바꾸기
    window.addEventListener('scroll', function(){

        let elNav = document.querySelector('nav.navigation'),
            elAAll = elNav.querySelectorAll('li>a');     
        let elSecAll = document.querySelectorAll('section');
        

        //section 뷰포트부터의 Y거리 알아내기 //전부 elSecAll_h 배열로 만들기
        let elSecAll_h = [];
        elSecAll.forEach(function(ele, key){
            elSecAll_h.push(ele.getBoundingClientRect().top); 
        });

        //section 절대위치 Y거리 알아내기 //전부 elSecAll_offsetTop 배열로 만들기
        let elSecAll_offsetTop = [];
        elSecAll.forEach(function(ele, key){
            elSecAll_offsetTop.push(ele.offsetTop); //ele.offsetTop //절대 위치(문서기준)
        });
        
        //a태그 뷰포트부터의 Y거리 알아내기 //전부 elAAll_h 배열로 만들기
        let elAAll_h = [];
        elAAll.forEach(function(ele, key){
            elAAll_h.push(ele.getBoundingClientRect().top);
        });
        
        // console.log('elSecAll_offsetTop',elSecAll_offsetTop);
        // console.log('window.scrollY', window.scrollY + window.innerHeight);
        
        //section위치에 맞게 불 들어오기
        elSecAll_offsetTop.forEach(function(ele, k){
            if((window.scrollY + window.innerHeight*1/3) > ele){
                elAAll[Prekey].classList.remove('active');
                elAAll[k].classList.add('active');
                Prekey = k
            }
        });


        //녹색 -> 흰색 -> 녹색 //sec 1, 3에 녹색이 들어가야 함
        elAAll_h.forEach(function(ele, k){
                if(ele > elSecAll_h[1] || ele > elSecAll_h[3] ){ 
                    elAAll[k].classList.add('green');
                }else{
                    elAAll[k].classList.remove('green');
                }

                if(elSecAll_h[3] > ele && ele > elSecAll_h[2]) 
                elAAll[k].classList.remove('green');
        });






        elAAll.forEach(function(ele, k){
            ele.onclick = (e) => {
                e.preventDefault(); //a태그 이동 막기

                window.scrollTo({
                    top: elSecAll_offsetTop[k] ,
                    left: 0,
                    behavior: "smooth"
                });//window.scrollTo
            };//ele.onclick
        });//elAAll.forEach(function(ele, k)

    });//window.scroll

    

}//window.onload

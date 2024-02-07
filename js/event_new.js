const elPage = document.querySelector('.swiper-pagination'),
elPrePage = elPage.querySelector('span.prePage');

const swiper = new Swiper(".mySwiperEvent", {
    // loop: true,
    spaceBetween: 20,
    slidesPerView: 3,

    breakpoints: {
      950: {
        slidesPerView: 1,
        // slidesPerColumn: 1,\
      },
      1440: {
        slidesPerView: 2, //다써줘야 함 css같은 걸로 생각 ㄴㄴ
      }
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on:{
      slideChange: function(e){              
        console.log(elPage, elAllPage);

        elPrePage.innerText = swiper.realIndex+1;
      }
    }
  });

  // const elPage = document.querySelector('.swiper-pagination'),
  //       elPrePage = elPage.querySelector('span.prePage'),
  //       elAllPage = elPage.querySelector('span.AllPage'),
  //       elRightBtn = document.querySelector('.btnsWrapper .swiper-button-next'),
  //       elLeftBtn = document.querySelector('.btnsWrapper .swiper-button-prev');

  // const pageFun = function(lt){//오른쪽 버튼
  //   console.log('ddd');
  //   let num = elPrePage.innerText; 
  //   if(lt){
  //     num < 8 ? num++ : '';
  //   }else{
  //     num > 1 ? num-- : '';
  //   }
    
  //   elPrePage.innerText = num;
  // }//pageFun()

  // elLeftBtn.onclick = function(){
  //   pageFun(false);
  // }
  // elRightBtn.onclick = function(){
  //   pageFun(true);
  // }

  const elAllPage = elPage.querySelector('span.allPage');
  let wdFirst = window.innerWidth;

    if(wdFirst >= 1440){
      elAllPage.innerText = 6;
    }else if(wdFirst >= 950){
      elAllPage.innerText = 7;
    }else{
      elAllPage.innerText = 8;
    }

  window.onresize = () => {
    let wd = window.innerWidth;

    if(wd >= 1440){
      elAllPage.innerText = 6;
    }else if(wd >= 950){
      elAllPage.innerText = 7;
    }else{
      elAllPage.innerText = 8;
    }
  };



  

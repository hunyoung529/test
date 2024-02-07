$(document).ready(function () {
    $.get("../common/common.html", function (data) {
        var headerContent = $(data).filter("header").html();
        var footerContent = $(data).filter("footer").html(); 
        
        $("header").html(headerContent);
        $("footer").html(footerContent);
        
        headerMotion1();
        headerMotion2();
    });

    function headerMotion2(){
        const elMenu = document.querySelector('.menu_btn'),
            elS3Nav = document.querySelector('.menu_show');
        elMenu.onclick = function(){
            if(elS3Nav.classList.contains('active')){
                $('body').css("overflow-y","scroll")
                elS3Nav.style.height = "-100%"
                setTimeout(function(){
                    elS3Nav.classList.remove('active')
                    elS3Nav.style.color = "transparents"
                },30)
            } else {
                elS3Nav.classList.add('active'),
                $('body').css("overflow-y","hidden")
                elS3Nav.style.display = "flex"
                setTimeout(function(){
                    elS3Nav.style.height = "100vh"
           
                },30)
            }
        };

    }
    function headerMotion1() {
        let pos = {y:0,y2:0,status:true};

        window.addEventListener('scroll',function(){ 
            pos.y = window.pageYOffset;
            // 삼항연산자
            pos.status = (pos.y > pos.y2) ? true : false;
            pos.y2 = pos.y;
    
    
            if(pos.status){ header.classList.add('active');  }
            else{ header.classList.remove('active');  }
        });
    }

});
//=====이메일 중복확인====================================
let emailButtonClicked = false;

document.getElementById('askUseEmail').addEventListener('click', function () {
    var inputEmail = document.getElementById('emailID').value;
    //공백이면 입력부탁
    if (inputEmail === "") {
        alert("이메일 주소를 입력해주세요.");
        return;
    }
    // 로컬 스토리지에서 회원 정보 가져오기
    var storedUsers = JSON.parse(localStorage.getItem('userInfos'));
    
    if (storedUsers) {
        var userFound = false;
        for (var i = 0; i < storedUsers.length; i++) {
            var user = storedUsers[i];
            if (user.email === inputEmail) {
                // 이메일이 이미 있는 경우
                userFound = true;
                alert("이미 사용 중인 이메일입니다."); break;
            }
        }
        //사용 가능한 이메일일 경ㅇ우
        if(!userFound){
            alert("사용 가능한 이메일입니다."); 
            emailButtonClicked = true;
        }
    }else{//로컬 스토리지가 아예 비어있을 경우
        alert("사용 가능한 이메일입니다."); 
        emailButtonClicked = true;
    }
});
//========약관동의창 All버튼===========================
plzAgreeID.addEventListener('click',(e)=>{    
    //모두 동의 누르면 전부 눌리게
    if(e.target.id=='checkAll'){
        agree1.checked = e.target.checked;
        agree2.checked = e.target.checked;
        agree3.checked = e.target.checked;
    }
    //다른거 모두 동의하면 모두동의 눌리게
    if(agree1.checked && agree2.checked && agree3.checked){
        checkAll.checked = true;
    }else{checkAll.checked = false;}
})
//========input창 조건 확인===========================
const elInput = document.querySelectorAll('input');

window.addEventListener('submit',function(e){
    e.preventDefault();

    // 다른 조건들을 검사하기 전에 이메일 중복확인 했는지
    if (!emailButtonClicked) {
        alert('이메일 중복 확인을 해주세요');
        return;
    }
    let regPw = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    let regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let regTel1 = /^\+\d+$/;
    let regTel2 = /^01([0|1|6|7|8|9])(\d{3,4})\d{4}$|^02-(\d{3,4})\d{4}$/;

    //이메일 확인
    if(!regEmail.test(elInput[0].value)){
        alert('이메일을 다시 입력해 주세요');
        elInput[0].focus;
        return;
    }
    //비밀번호
    if(!regPw.test(elInput[3].value)){
        alert('비밀 번호를 영문+숫자 포함 8자 이상으로 입력해 주세요');
        elInput[3].focus;
        return
    }
    //비밀번호 확인
    if(elInput[3].value != elInput[4].value){
        alert('비밀번호가 일치하지 않습니다');
        return
    }
    //전화번호 확인(+82)
    if(!regTel1.test(elInput[5].value)){
        alert('국제전화 국가 번호를 다시 입력해 주세요');
        elInput[5].focus;
        return;
    }
    //전화번호 확인
    if(!regTel2.test(elInput[6].value)){
        alert('전화번호를 다시 입력해 주세요');
        elInput[6].focus;
        return;
    }
    //약관동의
    if(elInput[7].checked === false){
        alert('이용 약관에 동의 해주세요');
        return;
    }
    else{
        alert('가입을 축하합니다!')
        
//회원가입 정보 로컬에 저장==================
        const userInfo = {
            email: elInput[0].value,
            name: `${elInput[1].value}${elInput[2].value}`,
            password: elInput[3].value,
            phoneNumber: elInput[6].value
        };
        // 이전에 저장된 userInfo 목록 가져오기
        const ListUserInfo = JSON.parse(localStorage.getItem('userInfos')) || [];
        // 새 userInfo를 목록에 추가
        ListUserInfo.push(userInfo);
        // 로컬 스토리지에 저장
        localStorage.setItem('userInfos', JSON.stringify(ListUserInfo));
    }//end else

    member.submit();//모든 조건이 맞으면 action값으로 이동
});
//==========비밀번호 토글====2개로 변경======
const twoEyeToggle = document.querySelectorAll('.eyeBtn');
const twoPwInput = document.querySelectorAll('input[type="password"]');

twoEyeToggle.forEach(function(eyeToggle,index){
    eyeToggle.onclick = function(){
        eyeToggle.classList.toggle('active');
        if (eyeToggle.classList.contains('active')){
            twoPwInput[index].type = 'text';
        }else{
            twoPwInput[index].type = 'password';
        }
    }
})


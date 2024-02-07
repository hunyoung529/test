//로그인 페이지

//로그인 정보 로컬에 있는 회원 정보랑 일치하는지 확인하기==================
document.getElementById('loginButton').addEventListener('click', function () {
    var inputEmail = document.getElementById('emailField').value;
    var inputPassword = document.getElementById('passwordField').value; 

    // 로컬 스토리지에서 회원 정보 가져오기
    var storedUsers = JSON.parse(localStorage.getItem('userInfos'));

    if (storedUsers) {
        var userFound = false;
        for (var i = 0; i < storedUsers.length; i++) {
            var user = storedUsers[i];
            if (user.email === inputEmail && user.password === inputPassword) {
                // 이메일과 비밀번호가 일치하는 경우
                userFound = true;
                alert(`${user.name}님! 환영합니다!`);
                //세션에 로그인 정보 기록
                const userInfoSession = {
                    email: `${user.email}`,
                    name: `${user.name}`,
                    phoneNumber: `${user.phoneNumber}`
                };
                sessionStorage.setItem(`user`,JSON.stringify(userInfoSession));
                window.location.href = '../index.html';
                break;
            }
        }
        if (!userFound) {
            alert('로그인 실패. 이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    } else {
        alert('회원 정보가 없습니다. 먼저 회원 가입을 해주세요.');
    }
});
//세션에 값이 있을 경우(=로그인 중) 로그인 버튼=>로그아웃으로=======================
const alreadyLogin = sessionStorage.getItem('user');

    //카카오 로그인은 값이 로컬에 저장되네요....====
    const localStorageKeys = Object.keys(localStorage);
    const kakaoKeys = localStorageKeys.filter(key => key.startsWith('kakao'));

const loginBtnChange = document.getElementById('logInOut');
const loginBtnChangeM = document.getElementById('logInOutM');

if (alreadyLogin || kakaoKeys.length > 0) {
    loginBtnChange.textContent = `로그아웃`;
    loginBtnChangeM.textContent = `로그아웃`;

    // 로그아웃 버튼 클릭 시 세션 스토리지에서 값을 제거
    loginBtnChange.addEventListener('click', function(e) {
        sessionStorage.removeItem('user');
        kakaoKeys.forEach(key => {
            localStorage.removeItem(key);
        });
        window.location.href = '../index.html';
    });

    loginBtnChangeM.addEventListener('click', function(e) {
        sessionStorage.removeItem('user');
        kakaoKeys.forEach(key => {
            localStorage.removeItem(key);
        });
        window.location.href = '../index.html';
    });
}

//헤더에 있는 로그인 버튼 누르면 팝업 띄우기==================================
const toggleLogin = document.querySelector('.login_backg');
document.getElementById('headerLogin').addEventListener('click', function () {
    if(!alreadyLogin && kakaoKeys.length === 0){
        //로그아웃 버튼일때는 팝업 띄우지 않기
        toggleLogin.classList.add('active');
    }
});
//모바일 헤더에 있는 로그인 버튼 누르면 팝업 띄우기==================================
document.getElementById('headerLoginM').addEventListener('click', function () {
    if(!alreadyLogin && kakaoKeys.length === 0){
        //로그아웃 버튼일때는 팝업 띄우지 않게
        toggleLogin.classList.add('active');
    }
});
//창 닫기 누르면 팝업 꺼지기==================================
document.getElementById('closeBtn').addEventListener('click', function () {
    toggleLogin.classList.remove('active');
});
//비밀번호 토글=================================================
const eyeToggle = document.querySelector('.eyeBtn');
const pwInput = document.querySelector('input[type="password"]');

eyeToggle.onclick = function(){
    eyeToggle.classList.toggle('active');
    if (eyeToggle.classList.contains('active')){
        pwInput.type = 'text';
    }else{
        pwInput.type = 'password';
    }
}
//이메일 기억하기(쿠키)==========================================
let savedEmail; // 전역 스코프에서 변수 선언, 공백으로 초기화하면 안됨

const btnLogin = document.querySelector('button')
const askSave = document.querySelector('.saveId')
const inputEmail = document.querySelector('.forEmailCookie')

btnLogin.onclick =function(){
    //체크를 하고 눌렀다면 true, 아니면 false
    if(askSave.checked==true){
        //쿠키에 이메일 저장
        let forAskSave = new Date();
        forAskSave.setDate(forAskSave.getDate()+7);//7일동안 쿠키
        
        //이메일 담을 변수생성
        savedEmail = inputEmail.value;
        document.cookie = `saveEmailCookie=${savedEmail}; expires=${forAskSave.toUTCString()}`;
    }

}
//이메일 쿠키가 있다면 그 정보를 이메일 주소창에 띄우기=================
window.addEventListener('load', function () {
    if(document.cookie.match('saveEmailCookie')){
        savedEmail = document.cookie.split('; ').find(row => row.startsWith('saveEmailCookie=')).split('=')[1];
        const writeSavedEmail = savedEmail;
        inputEmail.value = writeSavedEmail;
    }
});
//구글 로그인 api는 loginLoad.js로 옮김======
//카카오 로그인 api=======================
Kakao.init('c74cee27e841ddfac6edca4429b56ab3');
console.log(Kakao.isInitialized());
function kakaoLogin() {
    Kakao.Auth.login({
    success: function (response) {
        Kakao.API.request({
        url: '/v2/user/me',
        success: function (response) {
            console.log(response)
            window.location.href = '../index.html';
        },
        fail: function (error) {
            console.log(error)
        },
        })
    },
    fail: function (error) {
        console.log(error)
    },
    })
}



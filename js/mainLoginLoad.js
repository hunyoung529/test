jQuery(document).ready(function($) {
    $('body').prepend('<article class="loginPopup"></article>');
    $('.loginPopup').load('./sub/mainLogin.html', function() {
        // Kakao와 Google 로그인 스크립트 로드 후에 해당 함수 실행
        $.getScript('./js/mainLogin.js');
        $.getScript('https://apis.google.com/js/platform.js?onload=init');
        doKakaoLogin();
    });
});

//로그인 API
function doKakaoLogin() {
    Kakao.init('c74cee27e841ddfac6edca4429b56ab3');
    console.log(Kakao.isInitialized());
    function kakaoLogin() {
        Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
            url: '/v2/user/me',
            success: function (response) {
                console.log(response)
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
}
//구글
function init() {
    gapi.load('auth2', function() {
        gapi.auth2.init();
        options = new gapi.auth2.SigninOptionsBuilder();
        options.setPrompt('select_account');
        // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
        options.setScope('email profile openid https://www.googleapis.com/auth/user.birthday.read');
        // 인스턴스의 함수 호출 - element에 로그인 기능 추가
        // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
        gapi.auth2.getAuthInstance().attachClickHandler('GgCustomLogin', options, onSignIn, onSignInFailure);
    })
}
function onSignIn(googleUser) {
    var access_token = googleUser.getAuthResponse().access_token
    $.ajax({
        // people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
        url: 'https://people.googleapis.com/v1/people/me'
        // key에 자신의 API 키를 넣습니다.
        , data: {personFields:'birthdays', key:'AIzaSyDlGUZNRJZ-_CYec_5xsY2D8ZmlNu3Np_Y', 'access_token': access_token}
        , method:'GET'
    })
    .done(function(e){
        //프로필을 가져온다.
        var profile = googleUser.getBasicProfile();
        console.log(profile)
    })
    .fail(function(e){
        console.log(e);
    })
}
function onSignInFailure(t){		
    console.log(t);
}

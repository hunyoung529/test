//예약 정보 조회 창
window.addEventListener('submit',function(e){
    e.preventDefault();
    //유저가 인풋창에 입력한 내용
    const inputLHNum = document.getElementById('yourLHNumInput').value;
    if (inputLHNum === "") {
        alert('예약 번호를 입력하세요.');
        return;
    }
    //로컬에 저장된 예약 번호와 일치하는 것이 있으면 세션에 예약번호 보내기
    const storedLocalData = localStorage.getItem('userInfos');
    const userList = storedLocalData ? JSON.parse(storedLocalData) : [];

    // 입력된 값과 일치하는 정보 찾기
    const matchingUser = userList.find(user => user.yourLHNum === inputLHNum);
    if (matchingUser) {
            // 세션에 nonMemberLHNum 값을 저장
            sessionStorage.setItem('nonMemberLHNum', matchingUser.yourLHNum);

            resCheck.submit();
        } else {
            alert('일치하는 예약 정보를 찾을 수 없습니다.');
        }
})//end submit event

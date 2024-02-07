//예약 확인창
document.addEventListener('DOMContentLoaded', function () {
    // 로컬 정보 불러옴
    const storedLocalData = localStorage.getItem('userInfos');
    // 세션 스토리지에서 현재 사용자 정보 가져오기
    const sessionData = sessionStorage.getItem('user');
    const sessionUser = sessionData ? JSON.parse(sessionData) : null;
  
    if (sessionUser) {
        const userList = JSON.parse(storedLocalData) || [];
        // 세션 스토리지에 있는 이메일과 일치하는 유저 찾기
        const userToUpdate = userList.find(user => user.email === sessionUser.email);
        if (userToUpdate) {
            //전화번호 형식 바꾸기
            const uglyTel = userToUpdate.phoneNumber;
            const newTypeTel = uglyTel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            
            //금액 3자리마다 , 넣기
            const uglyAmount = userToUpdate.totalAmount;
            const newAmount = Number(uglyAmount).toLocaleString();
            
            //로컬에서 뽑아와서 출력하기
            var resInfo = `
                <div class="top_personal">
                    <h2>예약이 완료되었습니다.<br>라이온힐을 선택해 주셔서 감사합니다.</h2>
                    <p>예약자명: <span>${userToUpdate.name}</span></p>
                    <p class="tooLong">예약자 전화번호: <span>${newTypeTel}</span></p>
                    <p>예약 번호: <span>${userToUpdate.yourLHNum}</span></p>
                </div>
                <div class="top_res_info">
                    <b>방정보: <span>${userToUpdate.RoomTitleText}</span></b><br>
                    <b>예약 날짜: <span>${userToUpdate.checkinDateText} ~ ${userToUpdate.checkoutDateText}</span></b><br>
                    <b>인원수: <span>성인 ${userToUpdate.adultCount}명, 아동 ${userToUpdate.childrenCount}명</span></b><br>
                </div>
                <div class="top_totalfee">
                    <h3>총 금액: <span>${newAmount}</span>원</h3>
                </div>
            `;
            $(".checkRes_body_top").append(resInfo);
        }
    }else{//비회원
        //예약 정보 조회 페이지에서 세션에 저장한 예약번호와 
        // 로컬의 예약번호가 일치하는 사용자 정보 가져오기
        
        /// 세션에서 nonMemberLHNum 값을 가져옵니다.
        const nonMemberLHNum = sessionStorage.getItem('nonMemberLHNum');

        // 로컬 스토리지에서 userInfos 데이터를 가져옵니다.
        const storedLocalData = localStorage.getItem('userInfos');
        const userList = storedLocalData ? JSON.parse(storedLocalData) : [];

        // nonMemberLHNum 값과 일치하는 사용자 정보를 찾습니다.
        const matchingUser = userList.find(user => user.yourLHNum === nonMemberLHNum);
        if (matchingUser) {

            // //금액 3자리마다 , 넣기
            const uglyAmount = matchingUser.totalAmount;
            const newAmount = Number(uglyAmount).toLocaleString();
            
            // nonMemberLHNum 값과 일치하는 사용자 정보가 있을 경우 해당 정보를 출력합니다.
            var resInfo = `
                <div class="top_personal">
                    <h2>예약이 완료되었습니다.<br>라이온힐을 선택해 주셔서 감사합니다.</h2>
                    <p>예약자명: <span>${matchingUser.name}</span></p>
                    <p>예약 번호: <span>${matchingUser.yourLHNum}</span></p>
                </div>
                <div class="top_res_info">
                    <b>방정보: <span>${matchingUser.RoomTitleText}</span></b><br>
                    <b>예약 날짜: <span>${matchingUser.checkinDateText} ~ ${matchingUser.checkoutDateText}</span></b><br>
                    <b>인원수: <span>성인 ${matchingUser.adultCount}명, 아동 ${matchingUser.childrenCount}명</span></b><br>
                </div>
                <div class="top_totalfee">
                    <h3>총 금액: <span>${newAmount}</span>원</h3>
                </div>
            `;
            console.log(matchingUser);
            $(".checkRes_body_top").append(resInfo);
        }
    }
})
//sec3 - map ----- ----- ----- ----- -----
window.kakao.maps.load(() => {
    const container = document.querySelectorAll('.map')[0];
    const options = {
        center: new kakao.maps.LatLng(33.281601, 126.319233),
        level: 3
    };
    const map = new kakao.maps.Map(container, options); 

    var markerPosition  = new kakao.maps.LatLng(33.281450, 126.319130); 

    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);

    var path = [
        new kakao.maps.LatLng(33.438411, 126.296615),
        new kakao.maps.LatLng(33.330161, 126.173631),
        new kakao.maps.LatLng(33.205402, 126.279165),
        new kakao.maps.LatLng(33.254580, 126.530025),
        new kakao.maps.LatLng(33.477217, 126.418072),
    ];
    
    // var hole = [
    //     new kakao.maps.LatLng(,),
    // ];

    // 다각형을 생성하고 지도에 표시합니다
    var polygon = new kakao.maps.Polygon({
        map: map,
        path: [path], // 좌표 배열의 배열로 하나의 다각형을 표시할 수 있습니다
        strokeWeight: 2,
        strokeColor: '#000',
        strokeOpacity: 0.2,
        fillColor: '#000',
        fillOpacity: 0.1 
    });

    // 커스텀 오버레이에 표시할 컨텐츠 입니다
// 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
// 별도의 이벤트 메소드를 제공하지 않습니다 
    let content = '<div class="wrap">' + 
    '    <div class="info">' + 
    '        <div class="title">' + 
    '            라이온 힐 LION HILL' + 
    '            <div class="close" title="닫기"></div>' + 
    '        </div>' + 
    '        <div class="body">' + 
    '            <div class="img">' +
    '                <img src="./img/about/icon_logo.svg" width="73" height="70">' +
    '           </div>' + 
    '            <div class="desc">' + 
    '                <div class="ellipsis">제주특별자치도 서귀포시 안덕면 평화로 507</div>' + 
    '                <div class="jibun ellipsis">제주특별자치도 서귀포시 안덕면 덕수리 236</div>' + 
    '            </div>' + 
    '        </div>' + 
    '    </div>' +    
    '</div>';

    // 마커 위에 커스텀오버레이를 표시합니다
// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
var overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition()       
});

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
function closeOverlay(){
    console.log('되나오?')
    overlay.setMap(null);     
}

$('.close').on('click', closeOverlay);

// 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
kakao.maps.event.addListener(marker, 'click', function() {
    overlay.setMap(map);
});


});
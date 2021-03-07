const COOR_DEFAULT = { lat: 37.4761472, lng: 126.9659149, }

$(document).ready(function () {
	let coor = JSON.parse(window.localStorage.getItem("myCoor"))
	if (coor === null) {
		coor = COOR_DEFAULT
	}
	const mapOptions = {
		center: new naver.maps.LatLng(coor.lat, coor.lng),
		zoom: 18,
		zoomControl: true, //줌 컨트롤의 표시 여부
		zoomControlOptions: { //줌 컨트롤의 옵션
			position: naver.maps.Position.RIGHT_CENTER
		},
	}
	const map = new naver.maps.Map('myMap', mapOptions)

	//마커 표시하기
	const marker = new Array()
	let marker_set_by_user = undefined

	//
	$("#get-map-data").click(function () {
		console.log(map.center)
	})

	//나중에 다시 접속했을 때 현재의 위치가 유지되도록 설정을 로컬스토리지에 저장한다
	$("#save-coor-for-later").click(function () {
		coor.lat = map.center._lat
		coor.lng = map.center._lng
		window.localStorage.setItem("myCoor", JSON.stringify(coor))
	})

	//DB에서 마커 불러오기, 마커 클릭하면 정보 보여주기
	$("#search-marker").click(function () {
		$.get("/map", { request: "markers" }, result => {
			for (let i of result) {
				console.log(i)
				marker.push(new naver.maps.Marker({
					position: new naver.maps.LatLng(i.lat, i.lng),
					map: map
				}))
			}
		})

		const infowindow = new naver.maps.InfoWindow({
			content: "<p>횡단보도</p>",
		})

		naver.maps.Event.addListener(marker[0], "click", function (e) {
			if (infowindow.getMap()) {
				infowindow.close()
			} else {
				infowindow.open(map, marker)
			}
		})
	})

	//버튼을 클릭한 다음 지도를 클릭하면 클릭된 부분에 마커(임시)가 생성된다.
	let isSetMarkerOn = false		//이런 지도 클릭시 상태같은 것들은 여러 개가 나올텐데 묶어서 모아두고, 하나만 선택 가능하도록 해야겠다
	$("#set-marker").click(function () {
		isSetMarkerOn = !(isSetMarkerOn)
	})
	naver.maps.Event.addListener(map, 'click', function (e) {
		if (isSetMarkerOn) {
			if (marker_set_by_user === undefined) {
				marker_set_by_user = new naver.maps.Marker({
					position: new naver.maps.LatLng(37.3595704, 127.105399),
					map: map,
				})
			}
			marker_set_by_user.setPosition(e.coord)

			isSetMarkerOn = false
		}
	})
})
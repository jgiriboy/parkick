<script>
    import { onMount } from 'svelte'; // Lifecycle 관리 메소드
    import { PSInfos } from '../stores';
    import VehicleRentMenu from '../components/vehicleRentMenu.svelte';

    let showRentMenu = false;
    let markerInfo = {};
    let markers = [];
    let latLngList = [];
    let pinTitle = '';
    let pinId = 0;
    let pinKickBoardCnt = 0;
    let myPosition = {
        lat: 0,
        lng: 0,
    };
    let distanceFromPS = '';

    const getPinInfo = (title) => {
        for (let i = 0; i < latLngList.length; i++) {
            if (latLngList[i].title === title) {
                return latLngList[i];
            }
        }
    };

    const getDistanceFromLatLon = (lat1, lng1, lat2, lng2) => {
        function deg2rad(deg) {
            return deg * (Math.PI / 180);
        }
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1); // deg2rad below
        const dLon = deg2rad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c * 1000; // Distance in m
        return d.toFixed();
    };

    onMount(() => {
        PSInfos.resetPSInfos();

        // 정보를 받아와서
        PSInfos.fetchPSInfos().then(() => {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(37.450699, 126.656855),
                level: 3,
            };
            const map = new kakao.maps.Map(container, options);

            kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                showRentMenu = false;
            });
            const pinXLen = 46;
            const pinYLen = 46;
            const imageSrc = 'images/pin.svg';
            const imageSize = new kakao.maps.Size(pinXLen, pinYLen);

            // 마커의 좌표와 일치시킬 이미지 안에서의 좌표. 꼭짓점 위치.
            const imageOption = {
                offset: new kakao.maps.Point(pinXLen / 2, pinYLen),
            };
            // 마커 이미지 생성
            const markerImage = new kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption
            );
            latLngList = $PSInfos.parkedKickBoardCntList;
            const positions = [];

            for (let i = 0; i < latLngList.length; i++) {
                const pos = {
                    title: latLngList[i].title,
                    latlng: new kakao.maps.LatLng(
                        latLngList[i].latlng.x,
                        latLngList[i].latlng.y
                    ),
                };
                positions.push(pos);
            }

            for (let i = 0; i < positions.length; i++) {
                const markerPosition = positions[i].latlng;

                const marker = new kakao.maps.Marker({
                    title: positions[i].title,
                    position: markerPosition,
                    image: markerImage,
                });

                markers.push(marker);
                marker.setMap(map);

                kakao.maps.event.addListener(marker, 'click', function () {
                    showRentMenu = true;
                    const curPin = getPinInfo(this.getTitle());
                    pinTitle = curPin.title;
                    pinId = curPin.parkingStationId;
                    pinKickBoardCnt = curPin.kickBoardCount;

                    distanceFromPS = getDistanceFromLatLon(
                        myPosition.lat,
                        myPosition.lng,
                        curPin.latlng.x,
                        curPin.latlng.y
                    );
                    console.log(distanceFromPS);
                });
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    myPosition.lat = latitude;
                    myPosition.lng = longitude;

                    const locPosition = new kakao.maps.LatLng(
                        latitude,
                        longitude
                    );
                    const marker = new kakao.maps.Marker({
                        position: locPosition,
                    });
                    marker.setMap(map);
                });
            }
        });
    });
</script>

<div id="map" />
<!-- <main class="map-main" /> -->

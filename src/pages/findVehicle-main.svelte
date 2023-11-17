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

<link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
/>

<div id="findVehicle-main" class="e39_345">
    <!-- kakao map api 연동 -->
    <div id="map" style="width:393px;height:852px;position:relative;" />

    <!-- UI seciton -->
    <div class="e39_387" />
    <div class="e39_371">
        <span class="e39_372 font-medium">3:53</span>

        <div class="e39_373">
            <img src="images/wifi.svg" alt="" />
        </div>

        <div class="e39_375">
            <img src="images/signal.svg" alt="" />
        </div>

        <div class="e39_379">
            <img src="images/battery.svg" alt="" />
        </div>
    </div>
    <span class="e39_408 font-regular">장소를 검색하세요.</span>

    <div class="e39_407">
        <img src="images/search.svg" alt="" />
    </div>

    <div class="e39_411">
        <img src="images/menu.svg" alt="" />
    </div>
</div>

{#if showRentMenu}
    <VehicleRentMenu {pinTitle} {pinId} {pinKickBoardCnt} {distanceFromPS} />
{/if}

<style>
    .e39_345 {
        overflow: hidden;
    }
    .e39_345 {
        /* background-color:rgba(255, 216.00000232458115, 57.00000040233135, 0.4000000059604645); */
        width: 393px;
        height: 852px;
        position: absolute;
    }
    .e39_385 {
        width: 393px;
        height: 852px;
        position: absolute;
        left: 0px;
        top: 0px;
        /* background-image:url(images/screenshot_2023_11_15_at_5_10_1.png); */
        /* background-repeat:no-repeat; */
        /* background-size:cover; */
    }
    .e39_387 {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        background-color: rgba(255, 255, 255, 1);
        width: 307px;
        height: 49px;
        position: absolute;
        left: 51px;
        top: 65px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        z-index: 1;
    }
    .e39_371 {
        width: 313px;
        height: 27px;
        position: absolute;
        left: 51px;
        top: 16px;
        z-index: 1;
    }
    .e39_372 {
        color: rgba(0, 0, 0, 1);
        width: 39px;
        height: 21px;
        position: absolute;
        left: 0px;
        top: 6px;
        font-family: Pretendard;
        text-align: center;
        font-size: 18px;
        letter-spacing: 0;
        z-index: 1;
    }
    .e39_373 {
        width: 20.399999618530273px;
        height: 15.692307472229004px;
        position: absolute;
        left: 257px;
        top: 5px;
        z-index: 1;
    }
    .e39_374 {
        background-color: rgba(0, 0, 0, 1);
        width: 20.399999618530273px;
        height: 15.692307472229004px;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1;
    }
    .e39_375 {
        width: 19.9226131439209px;
        height: 14.388821601867676px;
        position: absolute;
        left: 227px;
        top: 6px;
        z-index: 1;
    }
    .e39_376 {
        width: 19.9226131439209px;
        height: 14.388821601867676px;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1;
    }
    .e39_377 {
        background-color: rgba(
            46.000001057982445,
            52.000000700354576,
            54.00000058114529,
            1
        );
        width: 14.609915733337402px;
        height: 11.305502891540527px;
        position: absolute;
        left: 0px;
        top: 3.0834412574768066px;
        z-index: 1;
    }
    .e39_378 {
        background-color: rgba(
            46.000001057982445,
            52.000000700354576,
            54.00000058114529,
            0.34902000427246094
        );
        width: 3.984522819519043px;
        height: 14.388821601867676px;
        position: absolute;
        left: 15.938106536865234px;
        top: 0.00009432507067685947px;
        z-index: 1;
    }
    .e39_379 {
        width: 26px;
        height: 26px;
        position: absolute;
        left: 287px;
        top: 0px;
        z-index: 1;
    }
    .e39_380 {
        background-color: rgba(
            248.0000004172325,
            248.0000004172325,
            248.0000004172325,
            1
        );
        width: 26px;
        height: 26px;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1;
    }
    .e39_381 {
        width: 21.6702823638916px;
        height: 13px;
        position: absolute;
        left: 2.163015127182007px;
        top: 6.5px;
        z-index: 1;
    }
    .e39_382 {
        background-color: rgba(
            35.00000171363354,
            31.000000052154064,
            32.00000189244747,
            1
        );
        width: 17.34056282043457px;
        height: 13px;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1;
    }
    .e39_383 {
        background-color: rgba(
            35.00000171363354,
            31.000000052154064,
            32.00000189244747,
            1
        );
        width: 2.1666665077209473px;
        height: 6.5px;
        position: absolute;
        left: 19.50373649597168px;
        top: 3.25px;
        z-index: 1;
    }
    .e39_408 {
        color: rgba(
            153.00000607967377,
            153.00000607967377,
            153.00000607967377,
            1
        );
        width: 104px;
        height: 17px;
        position: absolute;
        left: 92px;
        top: 81px;
        font-family: Pretendard;
        text-align: center;
        font-size: 14px;
        letter-spacing: 0;
        z-index: 1;
    }
    .e39_412 {
        width: 46px;
        height: 46px;
        position: absolute;
        left: 278px;
        top: 155px;
        z-index: 1;
    }
    .e39_413 {
        background-color: rgba(
            221.00000202655792,
            101.00000157952309,
            159.0000057220459,
            1
        );
        width: 34.51533508300781px;
        height: 46.0008659362793px;
        position: absolute;
        left: 5.7346673011779785px;
        top: -0.0008679244783706963px;
        z-index: 1;
    }
    .e39_414 {
        width: 46px;
        height: 46px;
        position: absolute;
        left: 312px;
        top: 201px;
        z-index: 1;
    }
    .e39_415 {
        background-color: rgba(
            221.00000202655792,
            101.00000157952309,
            159.0000057220459,
            1
        );
        width: 34.51533508300781px;
        height: 46.0008659362793px;
        position: absolute;
        left: 5.7346673011779785px;
        top: -0.0008679244783706963px;
        z-index: 1;
    }
    .e39_416 {
        width: 46px;
        height: 46px;
        position: absolute;
        left: 106px;
        top: 372px;
        z-index: 1;
    }
    .e39_417 {
        background-color: rgba(
            221.00000202655792,
            101.00000157952309,
            159.0000057220459,
            1
        );
        width: 34.51533508300781px;
        height: 46.0008659362793px;
        position: absolute;
        left: 5.7346673011779785px;
        top: -0.0008679244783706963px;
        z-index: 1;
    }
    .e39_418 {
        width: 46px;
        height: 46px;
        position: absolute;
        left: 5px;
        top: 548px;
        z-index: 1;
    }
    .e39_419 {
        background-color: rgba(
            221.00000202655792,
            101.00000157952309,
            159.0000057220459,
            1
        );
        width: 34.51533508300781px;
        height: 46.0008659362793px;
        position: absolute;
        left: 5.7346673011779785px;
        top: -0.0008679244783706963px;
        z-index: 1;
    }
    .e39_420 {
        background-color: rgba(0, 0, 0, 1);
        width: 342px;
        height: 51px;
        position: absolute;
        left: 25px;
        top: 771px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        z-index: 1;
    }
    .e39_421 {
        color: rgba(255, 255, 255, 1);
        width: 63px;
        height: 21px;
        position: absolute;
        left: 165px;
        top: 786px;
        font-family: Pretendard;
        text-align: center;
        font-size: 18px;
        letter-spacing: 0;
        z-index: 1;
    }
    .e39_407 {
        width: 15.118727684020996px;
        height: 15.107250213623047px;
        position: absolute;
        left: 68px;
        z-index: 1;
        top: 81px;
    }
    .e39_406 {
        background-color: rgba(
            153.00000607967377,
            153.00000607967377,
            153.00000607967377,
            1
        );
        width: 15.118727684020996px;
        height: 15.107250213623047px;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1;
    }
    .e39_411 {
        width: 21.202266693115234px;
        height: 18.472475051879883px;
        position: absolute;
        left: 318px;
        top: 80px;
        z-index: 1;
    }
    .e39_410 {
        background-color: rgba(
            51.00000075995922,
            51.00000075995922,
            51.00000075995922,
            1
        );
        width: 21.202266693115234px;
        height: 18.472475051879883px;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1;
    }

    * {
        font-family: Pretendard;
    }
    .font-extrabold {
        font-weight: 800;
    }
    .font-bold {
        font-weight: 700;
    }
    .font-semibold {
        font-weight: 600;
    }
    .font-medium {
        font-weight: 500;
    }
    .font-regular {
        font-weight: 400;
    }
</style>

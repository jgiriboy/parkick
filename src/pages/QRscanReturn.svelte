<script>
    import { Html5Qrcode } from 'html5-qrcode';
    import { onMount } from 'svelte';
    import { getApi, putApi, delApi, postApi } from '../service/api';
    import { slide, blur, fly, fade, scale } from 'svelte/transition';
    import { currentRentStatus } from '../stores';
    import { rewards } from '../stores';

    let scanning = false;
    let goodParking = false;
    let worstParking = false;

    let html5Qrcode;

    onMount(() => {
        init();
        start();
    });

    let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
        let minEdgePercentage = 0.8; // 80%
        let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
        let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
        return {
            width: qrboxSize,
            height: qrboxSize,
        };
    };

    function init() {
        html5Qrcode = new Html5Qrcode('reader');
    }

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: qrboxFunction,
            },
            onScanSuccess,
            onScanFailure
        );
        scanning = true;
    }

    async function stop() {
        await html5Qrcode.stop();
        scanning = false;
    }

    async function onScanSuccess(decodedText, decodedResult) {
        const options = {
            path: '/app/parking/' + decodedText,
        };
        const res = await getApi(options);
        if (res.isRightParkingStation) {
            goodParking = true;
            worstParking = false;
        } else {
            if (res.isLocked) {
                // alert('잘못 주차된 킥보드에 잠금 처리함');
            } else {
                // 그냥 QR 찍기
            }
            worstParking = true;
            goodParking = false;
        }
        scanning = false;

        if (goodParking) {
            // 리워드 지급하도록 요청 보내기
            const resultRewards = $rewards.currentPoint + 500;
            const options = {
                path: '/app/point?updatedPoint=' + resultRewards.toString(),
            };
            const res = await postApi(options);
            console.log(res.currentPoint);
        }
        // 패널티
        if (worstParking) {
            const resultRewards = $rewards.currentPoint - 500;
            const options = {
                path: '/app/point?updatedPoint=' + resultRewards.toString(),
            };
            const res = await postApi(options);
            console.log(res.currentPoint);
        }
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }
</script>

{#if goodParking && $currentRentStatus.parkedStatus == 'PARKED'}
    {#key goodParking}
        <div class="BP-main" transition:fly>
            <div class="note-box">
                <img src="images/park-success.gif" alt="" class="good-img" />
                <div class="thank-you-msg-box">
                    <span class="thank-you-msg font-regular"
                        >모범 주차 감사합니다.</span
                    >
                    <span
                        class="thank-you-msg font-regular"
                        style="font-size:14px">(+500 PK 코인 적립됨)</span
                    >
                </div>
            </div>
            <a href="/">
                <div class="BP-button">
                    <span class="confirm-text font-semibold">확인</span>
                </div>
            </a>
        </div>
    {/key}
{:else if goodParking && $currentRentStatus.parkedStatus == 'UN_PARKED'}
    {#key goodParking}
        <div class="BP-main" transition:fly>
            <div class="note-box">
                <img src="images/park-success.gif" alt="" class="good-img" />
                <div class="thank-you-msg-box">
                    <span class="thank-you-msg font-regular"
                        >반납 감사합니다.</span
                    >
                    <span
                        class="thank-you-msg font-regular"
                        style="font-size:14px">(+500 PK 코인 적립됨)</span
                    >
                </div>
            </div>
            <a href="/">
                <div class="BP-button">
                    <span class="confirm-text font-semibold">확인</span>
                </div>
            </a>
        </div>
    {/key}
{/if}

{#if worstParking}
    {#key worstParking}
        <div class="BP-main" transition:fly>
            <div class="note-box">
                <img src="images/park-fail.gif" alt="" class="good-img" />
                <div class="thank-you-msg-box">
                    <span class="thank-you-msg font-regular"
                        >정상적인 주차가 아닙니다.</span
                    >
                    <span
                        class="thank-you-msg font-regular"
                        style="font-size:14px">(5% 추가 요금 부과됨)</span
                    >
                </div>
            </div>
            <a href="/">
                <div class="BP-button">
                    <span class="confirm-text font-semibold">확인</span>
                </div>
            </a>
        </div>
    {/key}
{/if}

<div class="qrcode-main">
    <nav class="qrcode-nav">
        <a class="cancel-button" href="/">
            <img src="images/cancel.svg" alt="" />
        </a>
        <div><span class="code-scan-text">코드스캔</span></div>
        <div />
    </nav>
    <div id="reader" />
    <div class="notice-text-div">
        <span class="notice-text"
            >QR코드를 스캔하여 대여/반납을 할 수 있습니다.</span
        >

        <span class="notice-text">(파킹 스테이션에 주차 시 리워드 지급)</span>
    </div>
    <div class="scan-button">
        <img src="images/qrcode.svg" alt="" />
        <span>코드스캔</span>
    </div>
</div>

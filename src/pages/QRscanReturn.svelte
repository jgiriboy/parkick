<script>
    import { Html5Qrcode } from 'html5-qrcode';
    import { onMount } from 'svelte';
    import { getApi, putApi, delApi, postApi } from '../service/api';
    import WorstParking from './worstParking.svelte';
    import BestParking from './bestParking.svelte';

    let scanning = false;
    let goodParking = false;
    let worstParking = false;

    let html5Qrcode;
    let toUrl = '';

    onMount(() => {
        init();
        start();
    });

    function init() {
        html5Qrcode = new Html5Qrcode('reader');
    }

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
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
            // alert('올바른 주차!');
            goodParking = true;
        } else {
            if (res.isLocked) {
                // alert('잘못 주차된 킥보드에 잠금 처리함');
            } else {
                // alert('잠그지 않고  QR을 찍었음');
            }
            worstParking = true;
        }
        scanning = false;
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }
</script>

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

{#if goodParking}
    <BestParking />
{/if}
{#if worstParking}
    <WorstParking />
{/if}

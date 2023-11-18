<script>
    import { Html5Qrcode } from 'html5-qrcode';
    import { onMount } from 'svelte';
    import { getApi, putApi, delApi, postApi } from '../service/api';
    import { Link } from 'svelte-routing';
    import axios from 'axios';

    let scanning = false;
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
                fps: 1,
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
            alert('올바른 주차!');
            toUrl = '/bestParking';
        } else {
            if (res.isLocked) {
                alert('잘못 주차된 킥보드에 잠금 처리함');
            } else {
                alert('잠그지 않고  QR을 찍었음');
            }
            toUrl = '/worstParking';
        }
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }
</script>

<div class="e107_3">
    <a class="cancel-button" href="/">
        <img src="images/cancel.svg" alt="" />
    </a>
    <span class="e107_4">코드스캔</span>
    <span class="e107_11">코드스캔</span><span class="e107_12"
        >QR코드를 스캔하여 대여/반납을 할 수 있습니다.(파킹 스테이션에 주차 시
        리워드 지급)</span
    >
    <div id="reader" />
    <div class="e107_10">
        <div>
            <img src="images/qrcode.svg" alt="" style="cursor:pointer" />
        </div>
    </div>
</div>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    reader {
        width: 100%;
        min-height: 500px;
        background-color: black;
    }
</style>

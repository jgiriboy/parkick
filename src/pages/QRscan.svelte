<script>
    import { Html5Qrcode } from 'html5-qrcode';
    import { onMount } from 'svelte';
    import { getApi, putApi, delApi, postApi } from '../service/api';

    let scanning = false;
    let scannedUrl = '';
    let html5Qrcode;

    onMount(init);

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

    function onScanSuccess(decodedText, decodedResult) {
        scannedUrl = decodedText;
        alert(`Code matched = ${scannedUrl}`);
        // console.log(decodedResult);
    }

    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }

    const requestThroughQR = async () => {
        const options = {
            path: scannedUrl,
        };
        const getDatas = await getApi(options);
        console.log(getDatas);
    };
</script>

<main>
    <reader id="reader" />
    {#if scanning}
        <button on:click={stop}>stop</button>
    {:else}
        <button on:click={start}>start</button>
    {/if}
    <button on:click={requestThroughQR}>request</button>
</main>

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

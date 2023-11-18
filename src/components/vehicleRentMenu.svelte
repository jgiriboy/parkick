<script>
    import { slide, blur, fly, fade, scale } from 'svelte/transition';

    export let pinTitle;
    export let pinId;
    export let pinKickBoardCnt;
    export let distanceFromPS;
</script>

<div class="rentModal-main">
    <div class="rent-modal-nav">
        <div class="rent-modal-remain">
            <img src="images/kickboard.svg" alt="" />
            <span class="font-semibold">{pinKickBoardCnt}대 남음</span>
        </div>
        <span class="rent-modal-distance">
            현재 위치로부터 {distanceFromPS}m
        </span>
    </div>
    <div class="rent-modal-info">
        <div class="modal-info-text">
            <span class="font-semibold">{pinTitle}</span>
            <span class="font-semibold">INHA_PS_{pinId}</span>
        </div>
        <img src="images/bell2.svg" class="modal-info-img" alt="" />
    </div>
    <div class="rent-mdoal-fee">
        <span class="font-semibold">평일</span>
        <span>잠금해제 1,000원 + 주행요금 150원/1분</span>
    </div>
    <a href="/QRscanReturn" class="rent-modal-button">
        <div class="rent-modal-button-border">
            <span class="font-semibold">대여하기</span>
        </div>
    </a>
</div>

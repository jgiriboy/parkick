<script>
    import { slide, blur, fly, fade, scale } from 'svelte/transition';

    export let pinTitle;
    export let pinId;
    export let pinKickBoardCnt;
    export let distanceFromPS;
</script>

<link
    rel="stylesheet"
    type="text/css"
    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
/>

<div class="e92_53" transition:fade>
    <div class="e92_74" />
    <div class="e92_75" />
    <span class="e92_76 font-semibold">대여하기</span>
    <div class="e92_77" />
    <span class="e92_78 font-semibold">평일</span><span
        class="e92_79 font-regular">잠금해제 1,000원 + 주행요금 150원/1분</span
    ><span class="e92_80 font-semibold">{pinTitle}</span><span
        class="e92_81 font-semibold">ID: INHA_PS_{pinId}</span
    >
    <span class="e92_85 font-semibold">{pinKickBoardCnt}대 남음</span>
    <span class="e92_86 font-regular">현재 위치로부터 {distanceFromPS}m</span>
    <div class="e92_87">
        <img src="images/bell2.svg" alt="" />
    </div>
    <div class="e92_91">
        <img src="images/kickboard.svg" width="20px" height="20px" alt="" />
    </div>
</div>

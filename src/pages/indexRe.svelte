<script>
    import { rewards } from '../stores';
    import { onMount } from 'svelte';
    import IndexHeader from '../components/indexHeader.svelte';
    import indexMenu from '../components/indexMenu.svelte';

    onMount(() => {
        rewards.resetRewards();
        rewards.fetchRewards();
    });
</script>

<main class="index-main">
    <nav class="index-nav">
        <span class="nav-logo font-semibold">ParKick</span>
        <div class="nav-menu">
            <img src="images/coupon.svg" class="nav-menu-item" alt="" />
            <img src="images/bell.svg" class="nav-menu-item" alt="" />
            <img src="images/menu.svg" class="nav-menu-item" alt="" />
        </div>
    </nav>
    <div class="index-ad">
        <div class="ad-text">
            <span class="font-regular">ParKick</span>
            <span class="font-bold"
                >바르게 주차만 해도<br />PK 코인이<br />쌓인다!</span
            >
            <div class="ad-text-box font-bold">
                <span>Ride To Earn</span>
            </div>
        </div>
        <img src="images/kickboard-woman.png" class="ad-image" alt="" />
    </div>
    <div class="index-note">
        <img src="images/megaphone.svg" class="index-note-icon" alt="" />
        <div class="index-note-text-border">
            <span class="index-note-text"
                >ParKick 출시 기념 PK 코인 적립 이벤트 !</span
            >
        </div>
    </div>
    <div class="index-boxes">
        <div class="index-service">
            <div class="index-parkingStation index-service-box">
                <span class="font-semibold">파킹 스테이션</span>
                <span>가까운<br />파킹 스테이션을<br />찾아요</span>
                <img src="images/bicycle.svg" class="service-img-PS" alt="" />
            </div>
            <div class="index-QRcode index-service-box">
                <span class="font-semibold">대여하기</span>
                <span>QR 찍고<br />바로 출발해요</span>
                <img src="images/qrcode.svg" class="service-img-QR" alt="" />
            </div>
        </div>
        <div class="index-get-reward">
            <div class="get-reward-text">
                <span class="font-semibold">주차하고 리워드 받기 !</span>
                <span>흩어져 있는 킥보드를 다시 주차해요</span>
            </div>
            <a href="/">
                <span>리워드 받기</span>
            </a>
        </div>
        <div class="index-user-reward">
            <div class="user-reward-text">
                <div class="user-reward-left">
                    <span class="font-semibold">모은 PK 코인</span>
                    <span class="font-regular">OOO 라이더 님</span>
                </div>
                <div class="user-reward-right">
                    <span class="font-regular">{$rewards.currentPoint} 원</span>
                </div>
            </div>
            <div class="user-reward-button">
                <span>코인 사용하러 가기</span>
            </div>
        </div>
    </div>
</main>

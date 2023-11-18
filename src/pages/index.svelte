<script>
    import { rewards } from '../stores';
    import { onMount } from 'svelte';
    import { getApi } from '../service/api';

    onMount(() => {
        rewards.resetRewards();
        rewards.fetchRewards();
    });

    const initRequest = async () => {
        const options = {
            path: '/admin/set-up',
        };
        await getApi(options);
        alert('주행 상태로 변경');
    };
</script>

<main class="index-main">
    <nav class="index-nav">
        <span class="nav-logo font-semibold">ParKick</span>
        <div class="nav-menu">
            <img
                src="images/coupon.svg"
                class="nav-menu-item"
                alt=""
                on:click={initRequest}
            />

            <img src="images/bell.svg" class="nav-menu-item" alt="" />
            <img src="images/menu.svg" class="nav-menu-item" alt="" />
        </div>
    </nav>
    <div class="index-my">
        <div class="my-text">
            <span class="font-regular">ParKick</span>
            <span class="font-bold"
                >바르게 주차만 해도<br />PK 코인이<br />쌓인다!</span
            >
            <div class="my-text-box font-bold">
                <span>Ride To Earn</span>
            </div>
        </div>
        <img src="images/kickboard-woman.png" class="my-image" alt="" />
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
            <a
                href="/parkickMap"
                class="index-parkingStation index-service-box"
            >
                <span class="font-semibold">파킹 스테이션</span>
                <span>가까운<br />파킹 스테이션을<br />찾아요</span>
                <img src="images/bicycle.svg" class="service-img-PS" alt="" />
            </a>
            <a href="/rent" class="index-QRcode index-service-box">
                <span class="font-semibold">대여하기</span>
                <span>QR 찍고<br />바로 출발해요</span>
                <img src="images/qrcode.svg" class="service-img-QR" alt="" />
            </a>
        </div>
        <div class="index-get-reward">
            <div class="get-reward-text">
                <span class="font-semibold">주차하고 리워드 받기 !</span>
                <span>파킹 스테이션에 올바르게 주차해요</span>
            </div>
            <a href="/QRscanReturn">
                <span>반납하기</span>
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

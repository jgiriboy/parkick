<script>
    import { Route } from 'tinro';

    import Index from './pages/index.svelte';
    import NotFound from './pages/notFound.svelte';
    import FindVehicleMain from './pages/findVehicle-main.svelte';
    import VehicleRentMenu from './components/vehicleRentMenu.svelte';
    import QRscan from './pages/QRscan.svelte';
</script>

<Route path="/" redirect="/index" />
<!-- 수정해야 함 -->
<Route path="index/"><QRscan /></Route>
<Route path="findVehicle-main/"><FindVehicleMain /></Route>
<Route path="QRscan/"><QRscan /></Route>
<Route fallback><NotFound /></Route>

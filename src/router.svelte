<script>
    import { Route, router, active } from 'tinro';

    import Index from './pages/index.svelte';
    import NotFound from './pages/notFound.svelte';
    import FindVehicleMain from './pages/findVehicle-main.svelte';
    import VehicleRentMenu from './components/vehicleRentMenu.svelte';
    import QRscanRent from './pages/QRscanRent.svelte';
    import QRscanReturn from './pages/QRscanReturn.svelte';
</script>

<Route path="/" redirect="/index" />
<Route path="/index/"><Index /></Route>
<Route path="/findVehicle-main/"><FindVehicleMain /></Route>
<Route path="/QRscanRent/"><QRscanRent /></Route>
<Route path="/QRscanReturn/"><QRscanReturn /></Route>
<Route fallback><NotFound /></Route>

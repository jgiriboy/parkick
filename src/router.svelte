<script>
    import { Route, router, active } from 'tinro';

    import Index from './pages/index.svelte';
    import NotFound from './pages/notFound.svelte';
    import FindVehicleMain from './pages/findVehicle-main.svelte';
    import VehicleRentMenu from './components/vehicleRentMenu.svelte';
    import QRscanRent from './pages/QRscanReturn.svelte';
    import QRscanReturn from './pages/QRscanRent.svelte';
    import BestParking from './pages/bestParking.svelte';
    import WorstParking from './pages/worstParking.svelte';
    import IndexRe from './pages/indexRe.svelte';
</script>

<Route path="/" redirect="/index" />
<Route path="/index/"><Index /></Route>
<Route path="/findVehicle-main/"><FindVehicleMain /></Route>
<Route path="/QRscanRent/"><QRscanRent /></Route>
<Route path="/QRscanReturn/"><QRscanReturn /></Route>
<Route path="/bestParking/"><BestParking /></Route>
<Route path="/worstParking/"><WorstParking /></Route>
<Route path="/indexRe"><IndexRe /></Route>
<Route fallback><NotFound /></Route>

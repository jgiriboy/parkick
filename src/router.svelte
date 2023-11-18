<script>
    import { Route, router, active } from 'tinro';

    import Index from './pages/index.svelte';
    import NotFound from './pages/notFound.svelte';
    import VehicleRentMenu from './components/vehicleRentMenu.svelte';
    import QRscanRent from './pages/QRscanRent.svelte';
    import QRscanReturn from './pages/QRscanReturn.svelte';
    import BestParking from './pages/bestParking.svelte';
    import WorstParking from './pages/worstParking.svelte';
    import ParkickMap from './pages/parkickMap.svelte';
</script>

<Route path="/" redirect="/index" />
<Route path="/index/"><Index /></Route>
<Route path="/rent/"><QRscanReturn /></Route>
<Route path="/QRscanReturn/"><QRscanReturn /></Route>
<Route path="/bestParking/"><BestParking /></Route>
<Route path="/worstParking/"><WorstParking /></Route>
<Route path="/parkickMap"><ParkickMap /></Route>
<Route fallback><NotFound /></Route>

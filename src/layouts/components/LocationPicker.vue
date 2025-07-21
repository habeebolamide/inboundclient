<script setup>
import {
    LMap,
    LMarker,
    LTileLayer,
} from '@vue-leaflet/vue-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['update:latitude', 'update:longitude'])

import 'leaflet/dist/leaflet.css'
const mapRef = ref(null)
const marker = ref([6.5244, 3.3792]) // Lagos fallback

// register components
defineExpose({ LMap, LTileLayer, LMarker })
// helper to init the geosearch control safely
const initGeoSearch = (map) => {
    const provider = new OpenStreetMapProvider()

    const searchControl = new GeoSearchControl({
        provider,
        style: 'bar',
        showMarker: false,
        autoClose: true,
        retainZoomLevel: false,
        searchLabel: 'Search building or area...',
    })

    map.addControl(searchControl)

    map.on('geosearch/showlocation', (result) => {
        const { y: lat, x: lng } = result.location
        marker.value = [lat, lng]
        emit('update:latitude', lat)
        emit('update:longitude', lng)
    })
}

onMounted(async () => {
    const interval = setInterval(() => {
        const map = mapRef.value?.leafletObject
        if (map) {
            clearInterval(interval)
            initGeoSearch(map)
        }
    }, 100)
})
</script>


<template>
    <LMap ref="mapRef" :zoom="17" :center="marker" style="height: 400px;">
        <LTileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="© Esri" />
        <LMarker :lat-lng="marker" />
    </LMap>
</template>

<style scoped>
.leaflet-control-geosearch {
    max-width: 100%;
    width: 100%;
    z-index: 9999;
}

.leaflet-control-geosearch form {
    background-color: white;
    border-radius: 8px;
    border: 1px solid #ddd;
    padding: 5px 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.leaflet-control-geosearch input {
    padding: 8px 12px;
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
    border-radius: 6px;
    background: #f9f9f9;
    color: #333;
}

.leaflet-control-geosearch input::placeholder {
    color: #aaa;
}

.leaflet-control-geosearch .results {
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-top: 4px;
    font-size: 14px;
    max-height: 200px;
    overflow-y: auto;
}

.leaflet-control-geosearch .results>*:hover {
    background: #f0f0f0;
}
</style>

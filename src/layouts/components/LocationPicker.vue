<script setup>
import {
    LMap,
    LMarker,
    LTileLayer,
} from '@vue-leaflet/vue-leaflet'
import 'leaflet-geosearch/assets/css/leaflet.css'
import 'leaflet/dist/leaflet.css'
import { onMounted, ref } from 'vue'

import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

const emit = defineEmits(['update:latitude', 'update:longitude', 'update:locationName'])

const mapRef = ref(null)
const marker = ref([7.2076, 3.3869])
const mapCenter = ref(marker.value)

// Replace with your LocationIQ API Key
const LOCATIONIQ_API_KEY = 'pk.fe2c718e886c22261f70a1b3041dc292'

const fetchLocationName = async (lat, lng) => {
    try {
        const response = await fetch(`https://us1.locationiq.com/reverse?key=${LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lng}&format=json`)
        const data = await response.json()
        emit('update:locationName', data.display_name || 'Unknown location')
    } catch (err) {
        console.error('Reverse geocoding failed:', err)
    }
}

const updateLocation = (lat, lng) => {
    marker.value = [lat, lng]
    mapCenter.value = [lat, lng]
    emit('update:latitude', lat)
    emit('update:longitude', lng)
    fetchLocationName(lat, lng)
}

const initGeoSearch = (map) => {
    const provider = new OpenStreetMapProvider()
    const searchControl = new GeoSearchControl({
        provider,
        style: 'bar',
        autoClose: true,
        searchLabel: 'Search location...',
        keepResult: true,
        showMarker: false,
    })

    map.addControl(searchControl)

    map.on('geosearch/showlocation', (result) => {
        const { y: lat, x: lng } = result.location
        updateLocation(lat, lng)
    })

    map.on('click', (e) => {
        const { lat, lng } = e.latlng
        updateLocation(lat, lng)
    })
}

// Get user's real location
const useCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                updateLocation(lat, lng)
            },
            (error) => {
                alert('Unable to get current location. Please allow permission.')
                console.error(error)
            }
        )
    } else {
        alert('Geolocation is not supported by your browser.')
    }
}

onMounted(() => {
    const interval = setInterval(() => {
        const map = mapRef.value?.leafletObject
        if (map) {
            clearInterval(interval)
            initGeoSearch(map)
            updateLocation(marker.value[0], marker.value[1])
        }
    }, 100)
})
</script>

<template>
    <div>
        <div style="margin-bottom: 10px; text-align: right;">
            <VBtn @click="useCurrentLocation"
                style="padding: 6px 12px; color: white; border-radius: 6px; border: none; cursor: pointer;">
                📍 Use Current Location
            </VBtn>
        </div>

        <LMap ref="mapRef" :zoom="18" :center="mapCenter" style="height: 400px; border-radius: 8px;">
            <LTileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles © Esri" />
            <LMarker :lat-lng="marker" />
        </LMap>
    </div>
</template>

<style scoped>
.leaflet-control-geosearch {
    max-width: 100%;
    width: 100%;
    z-index: 9999;
}

.leaflet-control-geosearch input {
    padding: 8px 12px;
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
    border-radius: 6px;
    background: #fff;
    color: #333;
}

.leaflet-control-geosearch .results {
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
}

.leaflet-control-geosearch .results>*:hover {
    background: #f0f0f0;
}
</style>

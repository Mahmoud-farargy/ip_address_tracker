<template>
    <div id="mapid"></div>
</template>

<script>
import leaflet from "leaflet";
import { mapBoxKey } from "../info";
export default {
    props: {
       "receivedResults":  {
         type: Object,
         required: true
       } 
    },
    data() {
        return {
          mapInitData: {}
        }
    },
    methods: {
      updateMarker(val) {
              if(val && Object.keys(val).length > 0){ 
                const location = val.location;
                if(location){
                  this.mapInitData.setView([location?.lat, location?.lng], 13); 
                  const marker = leaflet.marker([location?.lat, location?.lng]).addTo(this.mapInitData);
                  marker.bindPopup(`${location?.city}, ${location.region}, ${location.country}`).openPopup();
                }
              }
      }
    },
    watch: {
      receivedResults(val) {
        this.updateMarker(val);
      }
    },
    mounted() {
      this.mapInitData = leaflet.map("mapid").setView([51.505, -0.09], 8);
          leaflet
            .tileLayer(
              `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapBoxKey}`,
              {
                attribution: "Mahmoud Farargy",
                maxZoom: 18,
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
                accessToken: mapBoxKey,
              }
            )
            .addTo(this.mapInitData);    
    },
}
</script>

<style >
        #mapid {
            width:100%;
            z-index: 10;
            height: 250px;
            
        }   
        @media only screen and (max-width: 670px){
           #mapid {
             min-height: 70vh;
           }
        }
</style>
<template>
  <l-map ref="map" :center="mapData.center" :zoom="7" :maxZoom="11">
    <l-tile-layer :url="mapData.layerUrl" :options="mapData.layerOptions" />
    <template v-for="(l, i) in catalogue">
      <l-marker v-if="l.coordinates" :lat-lng="l.coordinates" :key="i">
        <l-icon class-name="marker">
          <h2 :class="{ highlight: selected[i] }">
            {{ l.name }}
          </h2>
        </l-icon>
      </l-marker></template
    >
  </l-map>
</template>

<script>
export default {
  name: "LectsMap",
  props: ["catalogue", "selected"],
  data() {
    return {
      mapData: {
        center: [43.711379, 41.406538],
        options: { zoomControl: false },
        layerUrl:
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        layerOptions: {
          // attribution:
          //   'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 12,
          id: "mapbox/light-v10",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.VUE_APP_MAP_TOKEN,
        },
      },
    };
  },
};
</script>

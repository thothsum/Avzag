<template>
  <l-map ref="map" :center="mapData.center" :zoom="7" :maxZoom="11">
    <l-tile-layer :url="mapData.layerUrl" :options="mapData.layerOptions" />
    <template v-for="(l, i) in catalogue">
      <l-marker
        @click="$emit('toggle', l)"
        v-if="l.coordinates"
        :lat-lng="l.coordinates"
        :key="i"
      >
        <l-icon class-name="marker">
          <h2 :class="{ selected: selected[i] }">
            {{ l.name }}
          </h2>
        </l-icon>
      </l-marker></template
    >
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";

export default {
  name: "LectsMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  props: ["catalogue", "selected"],
  data() {
    return {
      mapData: {
        center: [43.711379, 41.406538],
        options: { zoomControl: false },
        layerUrl:
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        layerOptions: {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
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

<style lang="scss">
.leaflet-control-attribution {
  margin: 0;
  padding: 0;
  * {
    margin: 0;
    padding: 0;
    font-size: map-get($font-sizes, "small") !important;
    height: min-content;
  }
}
</style>

<style lang="scss" scoped>
.marker {
  position: relative;
}
h2 {
  $pd: map-get($margins, "normal");
  position: absolute;
  text-shadow: map-get($shadows, "elevated");
  left: calc(-100% - #{$pd});
  padding: $pd;
}
.selected {
  color: var(--color-highlight);
}
</style>

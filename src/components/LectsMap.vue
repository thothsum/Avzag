<template>
  <l-map ref="map" :center="center" :zoom="7" :maxZoom="11">
    <l-tile-layer :url="layerUrl" :options="layerOptions" />
    <template v-for="(l, i) in catalogue">
      <l-marker
        @click="$emit('toggle', l)"
        v-if="l.coordinates"
        :lat-lng="l.coordinates"
        :key="i"
      >
        <l-icon>
          <h2 :class="{ selected: selected[i], 'text-faded': faded[i] }">
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
  props: ["catalogue", "selected", "visible"],
  data() {
    return {
      center: [43.711379, 41.406538],
      options: { zoomControl: false },
      layerUrl:
        "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
      layerOptions: {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 12,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.VUE_APP_MAP_TOKEN,
      },
    };
  },
  computed: {
    faded() {
      return this.visible.length
        ? this.catalogue.map(
            (l, i) => !(this.selected[i] || this.visible.includes(l))
          )
        : [];
    },
  },
  created() {
    let url = (t) =>
      (this.layerUrl = `https://api.mapbox.com/styles/v1/mapbox/${t}-v10/tiles/{z}/{x}/{y}?access_token={accessToken}`);

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      url("dark");

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        url(e.matches ? "dark" : "light");
      });
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
.leaflet-marker-icon {
  position: relative;
  z-index: 100 !important;
  &:hover {
    z-index: 101 !important;
  }
}
</style>

<style lang="scss" scoped>
h2 {
  position: absolute;
  width: min-content;

  $pd: map-get($margins, "half");
  padding: 0 $pd;
  left: calc(-100% - #{$pd});

  text-shadow: map-get($shadows, "elevated");
  border-bottom: $border-width dashed transparent;
  border-radius: 0;
  &:hover {
    border-color: var(--color-text);
  }
}
.selected {
  color: var(--color-highlight);
}
</style>

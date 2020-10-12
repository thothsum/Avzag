<template>
  <l-map ref="map" :center="center" :zoom.sync="zoom">
    <l-tile-layer :url="layerUrl" :options="layerOptions" />
    <template v-for="(l, i) in catalogue">
      <l-marker
        @click="$emit('toggle', l)"
        v-if="l.coordinates"
        :lat-lng="l.coordinates"
        :key="i"
      >
        <l-icon :icon-anchor="[0, 0]">
          <div class="marker" :style="scale">
            <div class="marker-container panel-solid">
              <div class="icon">expand_less</div>
              <h2 :class="{ selected: selected[i], 'text-faded': faded[i] }">
                {{ l.name }}
              </h2>
            </div>
          </div>
        </l-icon>
      </l-marker>
    </template>
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
      zoom: 7,
      options: { zoomControl: false },
      layerUrl:
        "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
      layerOptions: {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
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
    scale() {
      return {
        transform: `translate(-50%) scale(${this.zoom / 9})`,
        "transform-origin": "top center",
      };
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
  z-index: 100 !important;
  position: relative;
  &:hover {
    z-index: 101 !important;
  }
}
</style>

<style lang="scss" scoped>
.marker {
  position: absolute;
}
.marker-container {
  text-align: center;
  line-height: 100%;
  text-shadow: map-get($shadows, "elevated");
  overflow: visible;
  &:hover h2 {
    border-color: var(--color-text);
  }
}
.icon {
  font-size: map-get($font-sizes, "large");
}
h2 {
  border-bottom: $border-width dashed transparent;
  border-radius: 0;
  padding-bottom: $border-width;
}
.selected {
  color: var(--color-highlight);
}
</style>

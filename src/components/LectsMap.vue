<template>
  <l-map
    ref="map"
    v-model:center="center"
    v-model:zoom="zoom"
    :options="{ zoomControl: false }"
  >
    <!-- <l-tile-layer :url="layerUrl" :options="layerOptions" /> -->
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <template v-for="(l, i) in catalogue" :key="i">
      <l-marker
        v-if="l.coordinates"
        :lat-lng="l.coordinates"
        @click="$emit('toggle', l)"
      >
        <l-icon :icon-anchor="[0, 0]">
          <div class="marker" :class="'zoom-' + zoom">
            <div class="icon" :class="{ selected: selected[i] }">
              expand_less
            </div>
            <h2
              :class="{
                'text-faded': faded[i],
                selected: !faded[i] && selected[i],
              }"
            >
              {{ l.name }}
            </h2>
          </div>
        </l-icon>
      </l-marker>
    </template>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";

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
      center: null,
      zoom: null,
      options: { zoomControl: false },
      layerUrl:
        "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
      layerOptions: {
        attribution:
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> | <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> | <a href="https://www.mapbox.com/">Mapbox</a>',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.VUE_APP_MAP_TOKEN,
      },
    };
  },
  computed: {
    faded() {
      return this.visible?.length
        ? this.catalogue.map((l) => !this.visible.includes(l))
        : [];
    },
  },
  created() {
    this.center = JSON.parse(localStorage.mapCenter ?? "[43, 44]");
    this.zoom = JSON.parse(localStorage.mapZoom ?? "7");

    this.setupTheming();
  },
  unmounted() {
    localStorage.mapCenter = JSON.stringify(this.center);
    localStorage.mapZoom = JSON.stringify(this.zoom);
  },
  methods: {
    setupTheming() {
      const url = (t) =>
        (this.layerUrl = `https://api.mapbox.com/styles/v1/mapbox/${t}-v10/tiles/{z}/{x}/{y}?access_token={accessToken}`);

      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        url("dark");
      }

      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          url(e.matches ? "dark" : "light");
        });
    },
  },
};
</script>

<style lang="scss">
.vue2leaflet-map * {
  transition: none;
}
.leaflet-tile-container * {
  border-radius: 0;
}
.leaflet-control-attribution * {
  margin: 0;
  padding: 0;
  font-size: map-get($font-sizes, "small") !important;
  line-height: normal;
}
.leaflet-marker-icon {
  z-index: 100 !important;
  transition: initial;
  &:hover {
    z-index: 101 !important;
  }
}
</style>

<style lang="scss" scoped>
.marker {
  * {
    transition: $transition;
  }
  transform-origin: top center;
  width: fit-content;
  height: fit-content;
  text-align: center;
  line-height: 100%;
  text-shadow: map-get($shadows, "elevated");
  &:hover h2 {
    border-color: var(--color-text);
  }
  @for $i from 1 through 13 {
    &.zoom-#{$i} {
      transform: translate(-50%) scale(#{$i * $i / 72});
    }
  }
}
.icon {
  font-size: map-get($font-sizes, "large");
}
.selected {
  color: var(--color-highlight);
}
h2 {
  padding-bottom: $border-width;
  border-bottom: $border-width dashed transparent;
  border-radius: 0;
}
</style>

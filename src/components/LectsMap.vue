<template>
  <l-map
    ref="map"
    v-model:center="camera.center"
    v-model:zoom="camera.zoom"
    :options="{ zoomControl: false }"
  >
    <!-- <l-tile-layer :url="layerUrl" :options="layerOptions" /> -->
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <template v-for="(l, i) in catalogue" :key="i">
      <l-marker
        v-if="l.coordinates"
        :lat-lng="l.coordinates"
        @click="emit('toggle', l)"
      >
        <l-icon :icon-anchor="[0, 0]">
          <div class="marker" :class="'zoom-' + camera.zoom">
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

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import {
  computed,
  defineEmit,
  defineProps,
  PropType,
  reactive,
  ref,
  onUnmounted,
} from "vue";

type Point = [number, number];
interface Lect {
  name: string;
  coordinates: Point;
  family: string[];
  tags: string;
  quote: string;
}
interface Camera {
  center: Point;
  zoom: number;
}

const props = defineProps({
  catalogue: { type: Array as PropType<Lect[]>, default: [] },
  selected: { type: Array as PropType<boolean[]>, default: [] },
  visible: { type: Array as PropType<Lect[]>, default: [] },
});
const emit = defineEmit(["toggle"]);

const faded = computed(() =>
  props.visible?.length
    ? props.catalogue.map((l) => !props.visible.includes(l))
    : []
);

const camera = reactive<Camera>({ center: [0, 0], zoom: 1 });
if (localStorage.camera) Object.assign(camera, JSON.parse(localStorage.camera));
onUnmounted(() => (localStorage.camera = JSON.stringify(camera)));

const layerUrl = ref(
  "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}"
);
const setupTheming = () => {
  const url = (t: string) =>
    (layerUrl.value = `https://api.mapbox.com/styles/v1/mapbox/${t}-v10/tiles/{z}/{x}/{y}?access_token={accessToken}`);

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
};
setupTheming();

// created() {
//   this.center = JSON.parse(localStorage.mapCenter ?? "[43, 44]");
//   this.zoom = JSON.parse(localStorage.mapZoom ?? "7");

//   this.setupTheming();
// },
// unmounted() {
//   localStorage.mapCenter = JSON.stringify(this.center);
//   localStorage.mapZoom = JSON.stringify(this.zoom);
// },
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

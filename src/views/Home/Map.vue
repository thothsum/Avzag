<template>
  <div>
    <div><div id="map" /></div>
    <Marker
      v-for="{ name, coordinates } in catalogue"
      :key="name"
      :ref="(m) => markers.push([m, coordinates])"
      :name="name"
      :search="search"
      @click="toggle(name)"
    />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  onMounted,
  defineProps,
  defineEmit,
  PropType,
  reactive,
  watch,
  ref,
  onUpdated,
} from "vue";
import { Lect, SearchState } from "./lect";
import { initMarkers, attachRef } from "./markerManager";
import initMap from "./mapManager";
import mapboxgl from "mapbox-gl";
import Marker from "./Marker";

const props = defineProps({
  catalogue: { type: Array as PropType<Lect[]>, default: [] },
  search: { type: Object as PropType<SearchState>, default: {} },
});
const emit = defineEmit(["toggle"]);

let map: undefined | mapboxgl.Map;
const markers = reactive([] as [HTMLElement, [number, number]][]);

function toggle(name: string) {
  emit("toggle", name);
}

onMounted(() => {
  // map = initMap();
  // initMarkers(map, props.catalogue, toggle);
  console.log("markers", markers);
  // markers.forEach(([marker, point]) => attachRef(marker, point));
  // markers.value.length = 0;
});

onUpdated(() => console.log("markers updated", markers));
</script>

<style lang="scss">
.map-marker {
  * {
    transition: $transition;
  }
  transform-origin: top center;
  width: fit-content;
  height: fit-content;
  text-align: center;
  line-height: 100%;
  text-shadow: map-get($shadows, "elevated");
  h2 {
    padding-bottom: $border-width;
    border-bottom: $border-width dashed transparent;
    border-radius: 0;
    &:hover {
      border-color: var(--color-text);
    }
  }
  p {
    font-size: map-get($font-sizes, "large");
  }
  @for $i from 1 through 13 {
    &.zoom-#{$i} {
      transform: translate(-50%) scale(#{$i * $i / 72});
    }
  }
}
</style>

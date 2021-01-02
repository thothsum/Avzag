<template>
  <div><div id="map" /></div>
  <Marker
    v-for="{ name, coordinates } in catalogue"
    :key="name"
    :ref="(el) => addRefs(el, coordinates)"
    :name="name"
    :search="search"
    @click="toggle(name)"
  />
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  onMounted,
  watch,
  defineProps,
  defineEmit,
  PropType,
  reactive,
} from "vue";
import { Lect, SearchState } from "./lect";
import Marker from "./Marker";
import { updateVisuals, initMarkers, attachRef } from "./markerManager";
import initMap from "./mapManager";
import mapboxgl from "mapbox-gl";

const props = defineProps({
  catalogue: { type: Array as PropType<Lect[]>, default: [] },
  search: { type: Object as PropType<SearchState>, default: {} },
});
const emit = defineEmit(["toggle"]);

let map: undefined | mapboxgl.Map;
const refs = reactive([] as [HTMLElement, [number, number]][]);
watch(refs, () => console.log(refs));
function addRefs(ref: HTMLElement, point: [number, number]) {
  // console.log("adding", ref);
  // if (map) attachRef(ref, point);
  // else refs.push([ref, point]);
  refs.push([ref, point]);
}

function toggle(name: string) {
  emit("toggle", name);
}

onMounted(() => {
  map = initMap();
  initMarkers(map, props.catalogue, toggle);

  console.log("ref", refs[0]);
  // refs.forEach(([ref, point]) => addRefs(ref, point));
  // refs.length = 0;
});
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

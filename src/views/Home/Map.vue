<template>
  <div><div id="map" /></div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  computed,
  defineEmit,
  defineProps,
  PropType,
  reactive,
  ref,
  onUnmounted,
  onMounted,
  watchEffect,
  watch,
  useContext,
  onBeforeMount,
  nextTick,
} from "vue";
import { Lect, SearchState } from "./lect";
import { updateVisuals, initMarkers } from "./markerManager";
import initMap from "./mapManager";
import mapboxgl from "mapbox-gl";

const props = defineProps({
  catalogue: { type: Array as PropType<Lect[]>, default: [] },
  state: { type: Object as PropType<SearchState>, default: {} },
});
const emit = defineEmit(["toggle"]);

function toggle(name: string) {
  emit("toggle", name);
}
watch(props.state, (state) => updateVisuals(state));
onMounted(() => {
  initMarkers(initMap(), props.catalogue, toggle);
  updateVisuals(props.state);
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

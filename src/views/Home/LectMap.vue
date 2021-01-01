<template>
  <div><div id="map" /></div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Lect from "./lect";
import Camera from "./camera";
import { updateVisuals, initMarkers } from "./initMarkers";
import initMap from "./initMap";
import mapboxgl from "mapbox-gl";
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

const props = defineProps({
  catalogue: { type: Array as PropType<Lect[]>, default: [] },
  selected: { type: Array as PropType<boolean[]>, default: [] },
  visible: { type: Array as PropType<Lect[]>, default: [] },
});
const emit = defineEmit(["toggle"]);

const camera = reactive<Camera>({ center: [0, 0], zoom: 5 });
if (localStorage.camera) Object.assign(camera, JSON.parse(localStorage.camera));
onUnmounted(() => (localStorage.camera = JSON.stringify(camera)));

const faded = computed(() =>
  props.visible?.length
    ? props.catalogue.map((l) => !props.visible.includes(l))
    : []
);

watch(
  () => faded.value,
  () => updateVisuals(props.selected, props.visible)
);
watch(
  () => props.selected,
  () => updateVisuals(props.selected, props.visible)
);

onMounted(() => {
  const map = initMap(camera);
  initMarkers(map, props.catalogue, emit);

  map.on(
    "moveend",
    () => (camera.center = map.getCenter().toArray() as [number, number])
  );
  map.on("zoomend", () => (camera.zoom = map.getZoom()));
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

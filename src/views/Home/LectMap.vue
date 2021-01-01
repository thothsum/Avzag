<template>
  <div><div id="map" /></div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Lect from "./lect";
import { updateVisuals, initMarkers } from "./initMarkers";
import initMap from "./mapManager";
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
  const map = initMap();
  initMarkers(map, props.catalogue, emit);
  updateVisuals(props.selected, props.visible);
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

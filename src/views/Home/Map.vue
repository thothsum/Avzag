<template>
  <div>
    <div><div id="map" /></div>
    <Marker
      v-for="{ name, point } in catalogue"
      :key="name"
      :ref="(m) => addMarkerInfo(m?.$el, point)"
      :name="name"
      :search="search"
      @click="toggle(name)"
    />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { onMounted, defineProps, defineEmit, PropType } from "vue";
import { Lect, SearchState } from "./lect";
import Marker from "./Marker";
import { MarkerInfo, attachMarkers } from "./markerManager";
import initMap from "./mapManager";

const props = defineProps({
  catalogue: { type: Array as PropType<Lect[]>, default: [] },
  search: { type: Object as PropType<SearchState>, default: {} },
});
const emit = defineEmit(["toggle"]);

function toggle(name: string) {
  emit("toggle", name);
}

const markers = [] as MarkerInfo[];
function addMarkerInfo(el: HTMLElement, point: [number, number]) {
  markers.push({ el, point });
}
onMounted(() => {
  attachMarkers(initMap(), markers);
  markers.length = 0;
});
</script>

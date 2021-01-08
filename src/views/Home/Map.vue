<template>
  <div>
    <div><div id="map" /></div>
    <Marker
      v-for="l in catalogue"
      :key="l.name"
      :lect="l"
      :search="search"
      :map="map"
      @click="emit('toggle', l.name)"
    />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, onMounted, defineProps, defineEmit, PropType } from "vue";
import { Lect, SearchState } from "./types";
import Marker from "./Marker";
import createMap from "./mapManager";
import mapboxgl from "mapbox-gl";

const props = defineProps({
  catalogue: { type: Array as PropType<Lect[]>, default: [] },
  search: { type: Object as PropType<SearchState>, default: {} },
});
const emit = defineEmit(["toggle"]);

const map = ref(undefined as undefined | mapboxgl.Map);
onMounted(() => (map.value = createMap()));
</script>

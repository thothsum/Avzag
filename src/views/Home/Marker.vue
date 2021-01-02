<template>
  <div class="map-marker">
    <p class="icon">expand_less</p>
    <h2 :class="{ 'highlight-font': selected, faded }" @click="emit('click')">
      {{ name }}
    </h2>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, defineEmit, defineProps, PropType } from "vue";
import { SearchState } from "./lect";

const props = defineProps({
  name: { type: String, default: "{} " },
  search: { type: Object as PropType<SearchState>, default: {} },
});
const emit = defineEmit(["emit"]);

const selected = computed(() => props.search.selected.has(props.name));
const faded = computed(
  () => props.search.visible.size && !props.search.visible.has(props.name)
);
</script>

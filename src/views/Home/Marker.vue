<template>
  <div class="map-marker">
    <p class="icon" :class="{ 'highlight-font': selected }">expand_less</p>
    <h2
      :class="{ 'highlight-font': selected && !faded, 'text-faded': faded }"
      @click="emit('click')"
    >
      {{ name }}
    </h2>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, defineComponent, PropType } from "vue";
import { SearchState } from "./lect";

export default defineComponent({
  props: {
    name: { type: String, default: "" },
    search: { type: Object as PropType<SearchState>, default: {} },
  },
  emits: ["click"],
  setup(props, { emit }) {
    return {
      emit,
      selected: computed(() => props.search.selected.has(props.name)),
      faded: computed(
        () => props.search.visible.size && !props.search.visible.has(props.name)
      ),
    };
  },
});

// const props = defineProps({
//   name: { type: String, default: "" },
//   search: { type: Object as PropType<SearchState>, default: {} },
// });
// const emit = defineEmit(["click"]);

// const selected = computed(() => props.search.selected.has(props.name));
// const faded = computed(
//   () => props.search.visible.size && !props.search.visible.has(props.name)
// );
</script>

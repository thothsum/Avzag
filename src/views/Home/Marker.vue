<template>
  <div ref="root" class="map-marker">
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
import {
  ref,
  computed,
  defineComponent,
  PropType,
  watchEffect,
  toRaw,
} from "vue";
import { Lect, SearchState } from "./types";
import mapboxgl from "mapbox-gl";

export default defineComponent({
  props: {
    lect: { type: Object as PropType<Lect>, default: {} },
    search: { type: Object as PropType<SearchState>, default: {} },
    map: {
      type: Object as PropType<undefined | mapboxgl.Map>,
      default: undefined,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const root = ref(undefined as undefined | HTMLElement);
    watchEffect(() => {
      const map = toRaw(props.map);
      if (root.value && map)
        new mapboxgl.Marker({
          element: root.value,
          anchor: "top",
        })
          .setLngLat(props.lect.point)
          .addTo(map);
    });

    const name = computed(() => props.lect.name);
    const selected = computed(() => props.search.selected.has(name.value));
    const faded = computed(
      () => props.search.visible.size && !props.search.visible.has(name.value)
    );

    return { emit, root, name, selected, faded };
  },
});
</script>

<style lang="scss" scoped>
.map-marker {
  text-align: center;
  text-shadow: map-get($shadows, "elevated");
}
.icon {
  line-height: 30%;
  margin-bottom: map-get($margins, "half");
}
h2 {
  line-height: 100%;
  cursor: pointer;
  padding-bottom: $border-width;
  border-bottom: $border-width dashed transparent;
  border-radius: 0;
  &:hover {
    border-color: var(--color-text);
  }
}
</style>

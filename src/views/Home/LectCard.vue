<template>
  <div v-if="visible" class="row-1 card">
    <div class="col-0">
      <h1 :class="{ 'highlight-font': state.selected.has(lect.name) }">
        {{ lect.name }}
      </h1>
      <p class="text-caption">
        <span v-for="f in lect.family" :key="f" split class="text-dot">
          {{ f }}
        </span>
      </p>
    </div>
    <img :src="flag" />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, defineEmit, defineProps, PropType, watchEffect } from "vue";
import { useStore } from "vuex";
import { Lect, SearchState } from "./lect";

const props = defineProps({
  lect: { type: Object as PropType<Lect>, default: {} },
  state: { type: Object as PropType<SearchState>, default: {} },
  query: { type: Array as PropType<string[] | null>, default: [] },
});
const emit = defineEmit(["visible"]);
const store = useStore();

const flag = computed(() => store.state.root + props.lect.name + "/flag.png");
const family = computed(() => props.lect.family.join(" › "));
const tags = computed(() =>
  [props.lect.name, props.lect.tags, props.lect.family]
    .flat()
    .join(" ")
    .toLowerCase()
);

const visible = computed(() =>
  props.query?.every((t) => tags.value.includes(t))
);
watchEffect(() => emit("visible", visible.value));
</script>

<style lang="scss" scoped>
* {
  text-align: left;
  user-select: none;
}
.card {
  min-height: 54px;
  max-height: 54px;
  background-color: var(--color-foreground);
  position: relative;
  cursor: pointer;
  overflow: hidden;
  * {
    z-index: 1;
  }
  &:hover img {
    transform: translate(27%) rotate(-45deg);
  }
  &:active img {
    opacity: 1;
  }
  img {
    pointer-events: none;
    z-index: 0;
    position: absolute;
    right: 0;
    height: 2 * 100%;
    transform: translate(32%) rotate(-45deg);
    opacity: 0.5;
    mask-image: linear-gradient(transparent, white);
  }
}
</style>

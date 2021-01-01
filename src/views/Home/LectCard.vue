<template>
  <div v-if="visible" class="row-1 card">
    <div class="col-0">
      <h1 :class="{ 'highlight-font': state.selected.has(name) }">
        {{ name }}
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
import { computed, defineEmit, defineProps, PropType, watch } from "vue";
import { useStore } from "vuex";
import { Lect, SearchState } from "./lect";

const props = defineProps({
  lect: { type: Object as PropType<Lect>, default: {} },
  state: { type: Object as PropType<SearchState>, default: {} },
  query: { type: Object as PropType<Query>, default: {} },
});
const store = useStore();

const name = computed(() => props.lect.name);
const flag = computed(() => store.state.root + props.lect.name + "/flag.png");
const family = computed(() => props.lect.family.join(" › "));
const tags = computed(() =>
  [props.lect.name, props.lect.tags ?? "", props.lect.family]
    .flat()
    .join(" ")
    .toLowerCase()
);

type Query = Record<string, boolean>;
function pass(tags: string[] | string, query: Query) {
  if (!query) return true;
  for (const [tag, flag] of Object.entries(query)) {
    if (flag !== tags.includes(tag)) return false;
  }
  return true;
}

const visible = computed(
  () => Object.keys(props.query).length && pass(tags.value, props.query)
);
watch(visible, (visible) => {
  if (visible) props.state.visible.delete(name.value);
  else props.state.visible.delete(name.value);
});
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

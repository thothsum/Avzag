<template>
  <div v-if="visible" class="row-1 card">
    <div class="col-0">
      <h1 :class="{ 'highlight-font': selected }">
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

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Lect, SearchState } from "./types";
import { root } from "@/store";

export default defineComponent({
  props: {
    lect: { type: Object as PropType<Lect>, default: {} },
    search: { type: Object as PropType<SearchState>, default: {} },
  },
  setup(props) {
    const name = computed(() => props.lect.name);
    const flag = computed(() => root + name.value + "/flag.png");
    const family = computed(() => props.lect.family.join(" › "));

    const selected = computed(() => props.search.selected.has(name.value));
    const visible = computed(() => props.search.visible.has(name.value));

    return { flag, family, selected, visible };
  },
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

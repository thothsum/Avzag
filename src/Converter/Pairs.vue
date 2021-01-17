<template>
  <div v-if="pairs.length" class="card row-1 wrap">
    <p v-for="([l, r], i) in texts" :key="i">
      <span class="text-faded">{{ l }}</span>
      <span>{{ r }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Pairs } from "./types";

export default defineComponent({
  props: {
    pairs: { type: Object as PropType<Pairs>, default: () => ({}) },
  },
  setup(props) {
    const texts = computed(() =>
      props.pairs.map((p) => p.map((t) => t.replace(" ", "_")))
    );
    return { texts };
  },
});
</script>

<style lang="scss" scoped>
div {
  justify-content: center;
  row-gap: 0;
}
p {
  width: 64px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: map-get($margins, "half");
  span {
    font-size: map-get($font-sizes, "small");
    &:first-child {
      text-align: right;
    }
  }
}
</style>

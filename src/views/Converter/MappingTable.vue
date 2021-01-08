<template>
  <div v-if="pairs.length > 0" class="card row-1 wrap">
    <p v-for="(p, i) in pairs" :key="i">
      <span class="text-faded">{{ p[left].replace(" ", "_") }}</span>
      <span>{{ p[right].replace(" ", "_") }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, defineProps, PropType } from "vue";
import { Mapping } from "./types";

const props = defineProps({
  mapping: { type: Object as PropType<Mapping>, default: {} },
  reverse: Boolean,
});

const pairs = computed(() => props.mapping.pairs);
const right = computed(() => (props.reverse ? 0 : 1));
const left = computed(() => (right.value + 1) % 2);
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

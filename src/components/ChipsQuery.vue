<template>
  <div v-if="visible" class="row scroll">
    <button class="small icon round" @click="reset">clear</button>
    <button
      v-for="(k, i) in keys"
      :key="k"
      class="small round"
      :class="highlights[i]"
      @click="toggle(i)"
    >
      {{ k }}
    </button>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PropType,
  computed,
  defineEmit,
  defineProps,
  ref,
  watch,
  watchEffect,
} from "vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<Record<string, boolean>>,
    default: {},
  },
  items: { type: Array as PropType<string[]>, default: [] },
});
const emit = defineEmit(["query"]);

const input = ref<number[]>([]);

const highlights = computed<string[]>(() =>
  input.value.map((i) =>
    i ? (i > 0 ? "highlight-confirm" : "highlight-alert") : ""
  )
);
const visible = computed(() => props.items.length > 1);
const query = computed(() =>
  input.value.reduce((q, inp: number, i: number) => {
    if (inp) q[props.items[i]] = inp > 0;
    return q;
  }, {} as Record<string, boolean>)
);

const reset = () => (input.value = []);
const toggle = (i: number) => (input.value[i] = ((input.value[i] + 2) % 3) - 1);

watch(props.items, () => {
  reset();
  if (props.items.length === 1) input.value[0] = 1;
});
watchEffect(() => emit("query", query));
</script>

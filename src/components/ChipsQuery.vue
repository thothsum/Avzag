<template>
  <div v-if="many" class="row scroll">
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
  computed,
  defineEmit,
  defineProps,
  ref,
  watch,
  watchEffect,
} from "vue";

const props = defineProps({
  items: { type: Object, default: {} },
  itemKey: { type: String, default: "name" },
});
const emit = defineEmit(["query"]);

const input = ref<number[]>([]);

const keys = computed<string[]>(() =>
  props.itemKey
    ? props.items.map((it: Record<string, string>) => it[props.itemKey])
    : props.items
);
const highlights = computed<string[]>(() =>
  input.value.map((i) =>
    i ? (i > 0 ? "highlight-confirm" : "highlight-alert") : ""
  )
);
const many = computed(() => keys.value.length > 1);
const query = computed(() =>
  many.value
    ? input.value.reduce(
        (q: Record<string, boolean>, inp: number, i: number) => {
          if (inp) q[keys.value[i]] = inp > 0;
          return q;
        },
        {}
      )
    : { [keys.value[0]]: 1 }
);

const reset = () => (input.value = []);
const toggle = (i: number) => (input.value[i] = ((input.value[i] + 2) % 3) - 1);

watch(props.items, () => reset());
watchEffect(() => emit("query", query));
</script>

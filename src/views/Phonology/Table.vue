<template>
  <div id="root" :class="{ narrow }" class="row scroll wrap">
    <TableEntry
      v-for="(p, i) in filtered"
      :key="i"
      :faded="!fitting[i]"
      :ipa="p.ipa"
      :str="graphemes[i]"
      :selected="selected == p"
      @click="selected = p"
    />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, defineEmit, defineProps, PropType } from "vue";
import TableEntry from "./TableEntry";
import { Query, EvaluateQuery } from "@/components/Query/types";
import { Phoneme } from "./types";

const props = defineProps({
  modelValue: { type: Object as PropType<Phoneme>, default: {} },
  phonemes: { type: Array, default: [] },
  filter: { type: String, default: "" },
  lectQuery: { type: Object as PropType<Query>, default: "" },
  featureQuery: { type: Object as PropType<Query>, default: "" },
});
const emit = defineEmit(["update:modelValue"]);

const selected = computed({
  get: () => props.modelValue,
  set: (s) => emit("update:modelValue", s),
});
const filtered = computed(() =>
  props.filter
    ? props.phonemes.filter(({ tags }) => tags.includes(props.filter))
    : props.phonemes
);
const fitting = computed(() =>
  filtered.value.map(
    ({ lects, tags }) =>
      EvaluateQuery(Object.keys(lects), props.lectQuery) &&
      EvaluateQuery(tags, props.featureQuery)
  )
);
const singleLect = computed(() => {
  let single;
  for (const [lect, flag] of Object.entries(props.lectQuery))
    if (flag)
      if (!single) single = lect;
      else return;
  return single;
});
const graphemes = computed(() =>
  singleLect.value
    ? filtered.value.map(
        ({ lects }) => lects[singleLect.value]?.samples[0]?.grapheme
      )
    : []
);
const narrow = computed(() => filtered.value.length <= 12);
</script>

<style lang="scss" scoped>
@import "@/scss/_panels";
$item-width: 46px;
$item-height: 40px;

#root > * {
  width: $item-width;
  height: $item-height;
}

@media only screen and (max-width: $mobile-width) {
  #root {
    flex-direction: column;
    place-content: flex-start;
    max-height: 5 * $item-height;

    &.narrow {
      max-height: 1.5 * $item-height;
    }
  }
}
</style>

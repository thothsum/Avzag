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

<script lang="ts">
import { computed, PropType, defineComponent } from "vue";
import TableEntry from "./TableEntry.vue";
import { Query, EvaluateQuery } from "src/components/Query/types";
import { Phoneme } from "./types";

export default defineComponent({
  components: { TableEntry },
  props: {
    modelValue: { type: Object as PropType<Phoneme>, default: undefined },
    phonemes: { type: Array as PropType<Phoneme[]>, default: () => [] },
    filter: { type: String, default: "" },
    lectQuery: { type: Object as PropType<Query>, default: () => ({}) },
    featureQuery: { type: Object as PropType<Query>, default: () => ({}) },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const selected = computed({
      get: () => props.modelValue,
      set: (s) => emit("update:modelValue", s),
    });
    const filtered = computed(() =>
      props.filter
        ? props.phonemes.filter(({ tags }) => tags?.includes(props.filter))
        : props.phonemes
    );
    const fitting = computed(() =>
      filtered.value.map(
        ({ lects, tags }) =>
          EvaluateQuery(Object.keys(lects), props.lectQuery) &&
          EvaluateQuery(tags as string, props.featureQuery)
      )
    );
    const singleLect = computed(() => {
      const lects = Object.entries(props.lectQuery)
        .filter(([, f]) => f)
        .map(([l]) => l);
      return lects.length === 1 ? lects[0] : "";
    });
    const graphemes = computed(() =>
      singleLect.value
        ? filtered.value.map(
            ({ lects }) => lects[singleLect.value]?.samples?.[0]?.grapheme
          )
        : []
    );
    const narrow = computed(() => filtered.value.length <= 12);

    return { narrow, graphemes, fitting, selected, filtered };
  },
});
</script>

<style lang="scss" scoped>
@import "src/scss/_panels";
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

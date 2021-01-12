<template>
  <div v-if="visible" class="row scroll small">
    <btn class="round" icon="clear" @click="query = {}" />
    <btn
      v-for="l in labels"
      :key="l"
      :text="l"
      class="round"
      :class="highlights[l]"
      @click="toggle(l)"
    />
  </div>
</template>

<script lang="ts">
import { PropType, computed, watch, defineComponent } from "vue";
import { Query } from "./types";

export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<Query>, default: {} },
    labels: { type: Array as PropType<string[]>, default: [] },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const query = computed({
      get: () => props.modelValue,
      set: (q) => emit("update:modelValue", q),
    });
    function toggle(label: string) {
      if (label in query.value)
        if (query.value[label]) query.value[label] = false;
        else delete query.value[label];
      else query.value[label] = true;
    }

    const visible = computed(() => props.labels.length > 1);
    const highlights = computed(() =>
      Object.fromEntries(
        Object.entries(query.value).map(([label, flag]) => [
          label,
          flag ? "highlight-confirm" : "highlight-alert",
        ])
      )
    );

    const defaultQuery = computed(() => {
      if (props.labels.length === 1) return { [props.labels[0]]: true };
      return {};
    });
    watch(
      () => props.labels,
      () => (query.value = defaultQuery.value),
      { immediate: true }
    );

    return { query, highlights, visible, toggle };
  },
});
</script>

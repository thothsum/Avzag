<template>
  <EditorCard icon="alt_route" header="transition">
    <template #header>
      <div class="row">
        <btn icon="navigate_next" :is-on="!bestOf" @click="bestOf = false" />
        <btn icon="star_outline" :is-on="bestOf" @click="bestOf = true" />
      </div>
    </template>
    <div v-if="bestOf" class="row wrap">
      <button
        v-for="(s, i) in states"
        :key="i"
        class="col"
        :class="'select-' + transition.includes(i)"
        @click="toggle(i)"
      >
        <VState :state="s" />
      </button>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import EditorCard from "@/components/EditorCard.vue";
import VState from "./index.vue";

import { computed, defineComponent, PropType } from "vue";
import { Transition, State } from "../types";

export default defineComponent({
  name: "TransitionEditor",
  components: { EditorCard, VState },
  props: {
    modelValue: { type: Array, default: undefined },
    states: { type: Array as PropType<State[]>, default: () => [] },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const transition = computed({
      get: () => props.modelValue as Transition,
      set: (t) => emit("update:modelValue", t),
    });
    const bestOf = computed({
      get: () => Array.isArray(transition.value),
      set: (b) => (transition.value = b ? [] : undefined),
    });

    function toggle(stateIndex: number) {
      if (!Array.isArray(transition.value)) return;
      const index = transition.value.indexOf(stateIndex);
      if (index < 0) transition.value.push(stateIndex);
      else transition.value.splice(index, 1);
    }
    return { transition, bestOf, toggle };
  },
});
</script>

<template>
  <EditorCard button="" icon="alt_route" header="transition">
    <template #header>
      <div class="row">
        <btn icon="block" :is-on="mode === 0" @click="mode = 0" />
        <btn icon="arrow_forward" :is-on="mode === 1" @click="mode = 1" />
        <btn icon="star_outline" :is-on="mode === 2" @click="mode = 2" />
      </div>
    </template>
    <div v-if="mode === 2" class="row-1 wrap block-editor">
      <div v-for="(s, i) in states" :key="i" class="row">
        <btn icon="check" :is-on="transition.inclides(i)" @click="toggle(i)" />
        <VState :state="s" />
      </div>
    </div>
  </EditorCard>
</template>

<script lang="ts">
import EditorCard from "@/components/EditorCard.vue";
import VState from "./index.vue";

import { computed, defineComponent, PropType } from "vue";
import { Transition, State } from "../types";

export default defineComponent({
  components: { EditorCard, VState },
  props: {
    modelValue: {
      type: Object as PropType<undefined | Transition>,
      default: "",
    },
    states: { type: Array as PropType<State[]>, default: () => [] },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const transition = computed({
      get: () => props.modelValue,
      set: (t) => emit("update:modelValue", t),
    });
    const mode = computed({
      get: () => (transition.value ? (transition.value === "next" ? 1 : 2) : 0),
      set: (m) => (transition.value = m ? (m === 1 ? "next" : []) : undefined),
    });

    function toggle(stateIndex: number) {
      if (!Array.isArray(transition.value)) return;
      const index = transition.value.indexOf(stateIndex);
      if (index < 0) transition.value.push(stateIndex);
      else transition.value.splice(index, 1);
    }
    return { transition, mode, toggle };
  },
});
</script>

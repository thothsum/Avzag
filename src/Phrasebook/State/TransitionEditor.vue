<template>
  <EditorCard icon="alt_route" header="transition">
    <template #header>
      <div class="row">
        <btn icon="block" :is-on="mode === 0" @click="mode = 0" />
        <btn icon="arrow_forward" :is-on="mode === 1" @click="mode = 1" />
        <btn icon="star_outline" :is-on="mode === 2" @click="mode = 2" />
      </div>
    </template>
    <div v-if="mode === 2" class="row wrap">
      <button v-for="(s, i) in states" :key="i" class="row" @click="toggle(i)">
        <!-- <p v-if="transition.includes(i)" class="icon">arrow_right</p> -->
        <p v-if="transition.includes(i)" class="icon highlight-font">
          star_outline
        </p>
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
    modelValue: {
      type: [Array, String],
      default: undefined,
    },
    states: { type: Array as PropType<State[]>, default: () => [] },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const transition = computed({
      get: () => props.modelValue as Transition,
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

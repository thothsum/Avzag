<template>
  <div v-if="block" class="block col-2">
    <EditorCard icon="account_tree" header="States">
      <template #header>
        <ArrayControl
          v-model="block"
          v-model:item="state"
          :add="newState"
          copy
          shift
          remove
        />
      </template>
      <div class="row wrap">
        <button
          v-for="(s, i) in block"
          :key="i"
          :class="'select-' + (state === s)"
          @click="state = s"
        >
          <VState :state="s" />
        </button>
      </div>
    </EditorCard>
    <template v-if="state">
      <ConditionsEditor v-model="state.conditions" />
      <TransitionEditor v-model="state.transition" :states="block" />
      <EditorCard :key="Math.random()" icon="segment" header="text">
        <template #header>
          <toggle v-model="state.implicit" icon="opacity" />
        </template>
        <div class="row">
          <input v-model="state.text.plain" type="text" placeholder="plain" />
          <input
            v-model="state.text.ipa"
            class="text-ipa"
            type="text"
            placeholder="ipa"
          />
          <input
            v-model="state.text.glossed"
            type="text"
            placeholder="glossed"
          />
        </div>
      </EditorCard>
    </template>
  </div>
</template>

<script lang="ts">
import ArrayControl from "@/components/ArrayControl.vue";
import EditorCard from "@/components/EditorCard.vue";
import ConditionsEditor from "../State/ConditionsEditor.vue";
import TransitionEditor from "../State/TransitionEditor.vue";
import VState from "../State/index.vue";

import { defineComponent, PropType, computed, ref } from "vue";
import { State } from "../types";
import { newState } from "../utils";

export default defineComponent({
  name: "BlockEditor",
  components: {
    ArrayControl,
    EditorCard,
    ConditionsEditor,
    TransitionEditor,
    VState,
  },
  props: {
    modelValue: { type: Array as PropType<State[]>, default: undefined },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const block = computed({
      get: () => props.modelValue,
      set: (b) => emit("update:modelValue", b),
    });
    const state = ref(undefined as undefined | State);

    return { newState, state, block };
  },
});
</script>

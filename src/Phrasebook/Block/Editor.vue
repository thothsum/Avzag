<template>
  <div v-if="block" class="block col-2">
    <EditorCard icon="account_tree" header="States">
      <template #header>
        <toggle v-model="glossed" icon="layers" />
        <ArrayControl
          v-model="block"
          v-model:item="state"
          :add="newState"
          copy
          shift
          remove
        />
      </template>
      <div class="row-1 wrap block-editor">
        <button v-for="(s, i) in block" :key="i" class="row" @click="state = s">
          <p v-if="state === s" class="icon highlight-font">edit</p>
          <VState :state="s" :glossed="glossed" />
        </button>
      </div>
    </EditorCard>
    <template v-if="state">
      <TextsEditor v-model="state.texts" />
      <ConditionsEditor v-model="state.conditions" />
      <TransitionEditor v-model="state.transition" :states="block" />
    </template>
  </div>
</template>

<script lang="ts">
import ArrayControl from "@/components/ArrayControl.vue";
import EditorCard from "@/components/EditorCard.vue";
import ConditionsEditor from "../State/ConditionsEditor.vue";
import TransitionEditor from "../State/TransitionEditor.vue";
import TextsEditor from "../State/TextsEditor.vue";
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
    TextsEditor,
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
    const glossed = ref(false);

    return { newState, glossed, state, block };
  },
});
</script>

<template>
  <div v-if="block" class="block col-2">
    <EditorCard icon="account_tree" header="States" @action="add">
      <template v-if="state" #header>
        <ArrayCopy v-model="block" v-model:item="state" />
        <toggle v-model="glossed" icon="layers" />
        <ConfirmButton @confirm="remove" />
      </template>
      <div class="row-1 wrap block-editor">
        <div v-for="(s, i) in block" :key="i" class="row">
          <btn icon="edit" :is-on="state === s" @click="state = s" />
          <VState :state="s" :glossed="glossed" />
        </div>
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
import ConfirmButton from "@/components/ConfirmButton.vue";
import ArrayCopy from "@/components/ArrayCopy.vue";
import EditorCard from "@/components/EditorCard.vue";
import ConditionsEditor from "../State/ConditionsEditor.vue";
import TransitionEditor from "../State/TransitionEditor.vue";
import TextsEditor from "../State/TextsEditor.vue";
import VState from "../State/index.vue";

import { defineComponent, PropType, computed, ref, toRaw, watch } from "vue";
import { State } from "../types";
import { newState } from "../utils";

export default defineComponent({
  name: "BlockEditor",
  components: {
    ArrayCopy,
    ConfirmButton,
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
    watch(block, (block) => (state.value = block?.[block.length - 1]), {
      immediate: true,
    });

    function add() {
      state.value = newState();
      block.value.push(state.value);
    }
    function remove() {
      if (!state.value) return;
      block.value.splice(toRaw(block.value).indexOf(toRaw(state.value)), 1);
      state.value = block.value[block.value.length - 1];
    }
    return { add, remove, glossed, state, block };
  },
});
</script>

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
      <TextsEditor v-model="state.texts" />
      <EditorCard icon="miscellaneous_services" header="miscellaneous">
        <template #header>
          <div class="row">
            <btn
              icon="music_off"
              :is-on="state.audio === null"
              @click="state.audio = state.audio === null ? '' : null"
            />
            <toggle v-model="state.implicit" icon="opacity" />
            <toggle v-model="state.noSpace" icon="compress" />
          </div>
        </template>
        <input
          v-if="state.audio !== null"
          v-model="state.audio"
          type="text"
          placeholder="audio filename override, by default - plain text value"
        />
      </EditorCard>
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

    return { newState, state, block };
  },
});
</script>

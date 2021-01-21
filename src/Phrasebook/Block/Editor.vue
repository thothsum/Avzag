<template>
  <div v-if="block" class="block col-2">
    <EditorCard icon="widgets" header="States" @action="add">
      <template v-if="state" #header>
        <toggle v-model="glossed" icon="layers" />
        <p class="text-dot" />
        <ButtonAlert @confirm="remove" />
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

<script>
import ButtonAlert from "@/components/ButtonAlert";
import EditorCard from "@/components/EditorCard";
import ConditionsEditor from "../State/ConditionsEditor";
import TransitionEditor from "../State/TransitionEditor";
import TextsEditor from "../State/TextsEditor";
import VState from "../State/index.vue";

import { State } from "../types";

export default {
  name: "PhraseBlockEditor",
  components: {
    ButtonAlert,
    EditorCard,
    ConditionsEditor,
    TransitionEditor,
    VState,
    TextsEditor,
  },
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      state: undefined,
      glossed: false,
    };
  },
  computed: {
    block: {
      get() {
        return this.modelValue;
      },
      set(b) {
        this.$emit("update:modelValue", b);
      },
    },
  },
  watch: {
    block: {
      handler() {
        if (!this.block?.length) {
          this.block = [];
          this.add();
        } else this.state = this.block[this.block.length - 1];
      },
      immediate: true,
    },
  },
  methods: {
    add() {
      const state = {
        texts: [{ plain: "new state" }],
        transition: "next",
        conditions: {},
      };
      this.block.push(state);
      this.state = state;
    },
    remove() {
      if (this.block.length > 1) {
        this.block.splice(this.block.indexOf(this.state), 1);
        this.state = this.block[this.block.length - 1];
      }
    },
  },
};
</script>

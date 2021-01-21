<template>
  <div class="block col-2">
    <EditorCard icon="widgets" header="States" @action="add">
      <template v-if="state" #header>
        <toggle v-model="glossed" icon="layers" />
        <p class="text-dot" />
        <ButtonAlert @confirm="remove" />
      </template>
      <div class="row-1 wrap block-editor">
        <div v-for="(s, i) in states" :key="i" class="row">
          <btn icon="edit" :is-on="state === s" @click="state = s" />
          <State :state="s" :glossed="glossed" />
        </div>
      </div>
    </EditorCard>
    <template v-if="state">
      <TextsEditor v-model="state.texts" />
      <ConditionsEditor v-model="state.conditions" />
      <TransitionEditor v-model="state.transition" :states="states" />
    </template>
  </div>
</template>

<script>
import ButtonAlert from "@/components/ButtonAlert";
import EditorCard from "@/components/EditorCard";
import ConditionsEditor from "../State/ConditionsEditor";
import TransitionEditor from "../State/TransitionEditor";
import TextsEditor from "../State/TextsEditor";
import State from "../State/index.vue";

export default {
  name: "PhraseBlockEditor",
  components: {
    ButtonAlert,
    EditorCard,
    ConditionsEditor,
    TransitionEditor,
    State,
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
    states() {
      return this.block?.states;
    },
  },
  watch: {
    block: {
      handler() {
        if (!this.states?.length) {
          this.block.states = [];
          this.add();
        } else this.state = this.states[this.states.length - 1];
      },
      immediate: true,
    },
  },
  methods: {
    add() {
      const state = {
        display: [{ text: "new state" }],
        transition: "next",
      };
      this.states.push(state);
      this.state = state;
    },
    remove() {
      if (this.states.length > 1) {
        this.states.splice(this.states.indexOf(this.state), 1);
        this.state = this.states[this.states.length - 1];
      }
    },
  },
};
</script>

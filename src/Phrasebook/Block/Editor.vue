<template>
  <div class="block col-2">
    <ConditionsEditor
      v-model="block.requirements"
      icon="lock"
      header="Requirements"
    >
      If at least one of these conditions fails, the block will be completely
      hidden.
    </ConditionsEditor>
    <EditorCard icon="tune" header="States" @action="add">
      <template v-if="state" #header>
        <ButtonAlert @confirm="remove" />
      </template>
      <div class="row-1 wrap block-editor">
        <div v-for="(s, i) in states" :key="i" class="row">
          <btn icon="edit" :is-on="state === s" @click="state = s" />
          <Display :state="s" />
        </div>
      </div>
    </EditorCard>
    <template v-if="state">
      <DisplayEditor
        v-model="state.display"
        v-model:implicit="state.implicit"
      />
      <ConditionsEditor
        v-model="state.conditions"
        :allow-passive="true"
        icon="widgets"
        header="conditions"
      />
      <TransitionEditor v-model="state.transition" :states="states" />
    </template>
  </div>
</template>

<script>
import ButtonAlert from "@/components/ButtonAlert";
import EditorCard from "@/components/EditorCard";
import ConditionsEditor from "./ConditionsEditor";
import TransitionEditor from "./TransitionEditor";
import DisplayEditor from "./DisplayEditor";
import Display from "./Display";

export default {
  name: "PhraseBlockEditor",
  components: {
    ButtonAlert,
    EditorCard,
    ConditionsEditor,
    TransitionEditor,
    Display,
    DisplayEditor,
  },
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      state: undefined,
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
      }
    },
  },
};
</script>

/* eslint-disable vue/no-mutating-props */
<template>
  <div class="block col-2">
    <ConditionsEditor
      v-model:conditions="block.requirements"
      :context="context"
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
          <control
            icon="edit"
            :class="{ highlight: state == s }"
            @click="state = s"
          />
          <Display :state="s" :context="context" />
        </div>
      </div>
    </EditorCard>
    <template v-if="state">
      <DisplayEditor :state="state" :context="context" />
      <ConditionsEditor
        v-model:conditions="state.conditions"
        :context="context"
        :allow-passive="true"
        icon="widgets"
        header="conditions"
      />
      <TransitionEditor :state="state" :context="context" :states="states" />
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
  props: ["block", "context"],
  data() {
    return {
      state: undefined,
    };
  },
  computed: {
    states() {
      return this.block.states;
    },
  },
  watch: {
    block: {
      handler() {
        if (!this.states?.length) {
          this.$set(this.block, "states", []);
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
        this.$delete(this.states, this.states.indexOf(this.state));
      }
    },
  },
};
</script>

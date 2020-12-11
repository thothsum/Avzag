<template>
  <div class="block col-2">
    <PhraseConditionsEditor
      v-model:conditions="block.requirements"
      :context="context"
      icon="lock"
      header="Requirements"
    >
      If at least one of these conditions fails, the block will be completely
      hidden.
    </PhraseConditionsEditor>
    <ActionHeader @action="add" icon="tune" header="States">
      <template #header v-if="state">
        <ButtonAlert @confirm="remove" />
      </template>
      <div class="row-1 wrap block-editor">
        <div class="row" :key="i" v-for="(s, i) in states">
          <Button
            @click="state = s"
            icon="edit"
            :class="{ highlight: state == s }"
          />
          <PhraseStateDisplay :state="s" :context="context" />
        </div>
      </div>
    </ActionHeader>
    <template v-if="state">
      <PhraseStateDisplayEditor :state="state" :context="context" />
      <PhraseConditionsEditor
        v-model:conditions="state.conditions"
        :context="context"
        :allowPassive="true"
        icon="widgets"
        header="conditions"
      />
      <PhraseStateTransitionEditor
        :state="state"
        :context="context"
        :states="states"
      />
    </template>
  </div>
</template>

<script>
import Button from "./Button";
import ButtonAlert from "./ButtonAlert";
import ActionHeader from "./ActionHeader";
import PhraseConditionsEditor from "./PhraseConditionsEditor";
import PhraseStateTransitionEditor from "./PhraseStateTransitionEditor";
import PhraseStateDisplayEditor from "./PhraseStateDisplayEditor";
import PhraseStateDisplay from "./PhraseStateDisplay";

export default {
  name: "PhraseBlockEditor",
  components: {
    Button,
    ButtonAlert,
    ActionHeader,
    PhraseConditionsEditor,
    PhraseStateTransitionEditor,
    PhraseStateDisplayEditor,
    PhraseStateDisplay,
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
      if (this.states.length > 1)
        this.$delete(this.states, this.states.indexOf(this.state));
    },
  },
};
</script>

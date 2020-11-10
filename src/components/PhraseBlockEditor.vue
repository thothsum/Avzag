<template>
  <div class="block panel-sparse">
    <PhraseConditionsEditor
      :conditions.sync="block.requirements"
      :context="context"
      icon="lock"
      header="Requirements"
    >
      If at least one of these conditions fails, the block will be completely
      hidden.
    </PhraseConditionsEditor>
    <ActionHeader @action="add" icon="tune" header="States">
      <template #header v-if="state">
        <Button :value.sync="state.implicit" icon="opacity" />
        <p class="text-dot" />
        <ToggleGroup
          :icons="['visibility', 'widgets', 'alt_route']"
          :value.sync="editingMode"
        />
        <p class="text-dot" />
        <ButtonAlert @confirm="remove" />
      </template>
      <div class="panel-horizontal wrap">
        <div class="panel-horizontal-dense" :key="i" v-for="(s, i) in states">
          <Button
            @click.native="state = s"
            icon="edit"
            :class="{ highlight: state == s }"
          />
          <PhraseStateDisplay :display="s.display" :context="context" />
        </div>
      </div>
    </ActionHeader>
    <template v-if="state">
      <PhraseConditionsEditor
        v-if="editingMode == 1"
        :conditions.sync="state.conditions"
        :context="context"
        :allowPassive="true"
        icon="widgets"
        header="conditions"
      />
      <PhraseStateTransitionEditor
        v-else-if="editingMode == 2"
        :transition.sync="state.transition"
      />
      <PhraseStateDisplayEditor
        :display.sync="state.display"
        :context="context"
        v-else
      />
    </template>
  </div>
</template>

<script>
import Button from "./Button";
import ButtonAlert from "./ButtonAlert";
import ToggleGroup from "./ToggleGroup";
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
    ToggleGroup,
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
      editingMode: 0,
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
        }
      },
      immediate: true,
    },
  },
  methods: {
    add() {
      this.states.push({
        display: [{ text: "new state" }],
        transition: "next",
      });
    },
    remove() {
      if (this.states.length > 1)
        this.$delete(this.states, this.states.indexOf(this.state));
    },
  },
};
</script>

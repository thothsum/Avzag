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
          <PhraseStateDisplay :display="s.text" :context="context" />
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
      <div class="display-editors" v-else>
        <PhraseStateDisplayEditor
          icon="short_text"
          header="Text"
          :display.sync="state.text"
          :context="context"
        />
        <PhraseStateDisplayEditor
          icon="hearing"
          header="IPA"
          :allowEmpty="true"
          :display.sync="state.ipa"
          :context="context"
        />
        <PhraseStateDisplayEditor
          icon="science"
          header="Glossing"
          :allowEmpty="true"
          :display.sync="state.glossing"
          :context="context"
        />
      </div>
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
        text: [["new state", ""]],
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

<style lang="scss" scoped>
.display-editors {
  display: grid;
  gap: map-get($margins, "normal");
  grid-template-columns: repeat(3, 1fr);
}
@media only screen and (max-width: 384px) {
  .display-editors {
    grid-template-columns: 100%;
  }
}
</style>

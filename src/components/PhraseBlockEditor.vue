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
      <template #header> <ButtonAlert /></template>
      <div class="panel-dense" :key="i" v-for="(s, i) in states">
        <div class="panel-dense card">
          <div class="panel-horizontal-dense">
            <p class="flex">{{ s.text[0][0] }}</p>
            <ToggleGroup
              :icons="['visibility', 'widgets', 'alt_route']"
              :value.sync="editingMode[i]"
            />
            <Button :value.sync="s.implicit" icon="format_color_reset" />
          </div>
        </div>
        <PhraseConditionsEditor
          v-if="editingMode[i] == 1"
          :conditions.sync="s.conditions"
          :context="context"
          :allowPassive="true"
          icon="widgets"
          header="conditions"
        />
        <PhraseBlockTransitionEditor
          v-else-if="editingMode[i] == 2"
          :transition.sync="s.transition"
        />
        <template v-else>
          <PhraseBlockDisplayEditor
            icon="short_text"
            header="Text"
            :display.sync="s.text"
            :context="context"
          />
          <PhraseBlockDisplayEditor
            icon="hearing"
            header="IPA"
            :allowEmpty="true"
            :display.sync="s.ipa"
            :context="context"
          />
          <PhraseBlockDisplayEditor
            icon="science"
            header="Glossing"
            :allowEmpty="true"
            :display.sync="s.glossing"
            :context="context"
          />
        </template>
      </div>
    </ActionHeader>
  </div>
</template>

<script>
import Button from "./Button";
import ButtonAlert from "./ButtonAlert";
import ToggleGroup from "./ToggleGroup";
import ActionHeader from "./ActionHeader";
import PhraseConditionsEditor from "./PhraseConditionsEditor";
import PhraseBlockTransitionEditor from "./PhraseBlockTransitionEditor";
import PhraseBlockDisplayEditor from "./PhraseBlockDisplayEditor";

export default {
  name: "PhraseBlockEditor",
  components: {
    Button,
    ButtonAlert,
    ToggleGroup,
    ActionHeader,
    PhraseConditionsEditor,
    PhraseBlockTransitionEditor,
    PhraseBlockDisplayEditor,
  },
  props: ["block", "context"],
  data() {
    return {
      editingMode: [],
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
        this.editingMode = new Array(this.states?.length).fill(0);
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
    remove(i) {
      if (this.states.length > 1) this.$delete(this.states, i);
    },
  },
};
</script>

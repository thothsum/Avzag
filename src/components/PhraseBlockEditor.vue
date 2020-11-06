<template>
  <div class="block panel-sparse">
    <div class="panel-dense">
      <div class="panel-horizontal-dense card">
        <h2 class="flex">Block</h2>
        <Button @click.native="addState(null)" icon="add" text="State" />
        <Button
          :value.sync="editingRequirements"
          icon="visibility"
          text="Requirements"
        />
        <p class="text-dot" />
        <Button @click.native="deleteBlock" icon="delete" />
      </div>
      <PhraseConditionsEditor
        v-if="editingRequirements"
        :conditions.sync="block.requirements"
        :context="context"
      />
    </div>
    <div class="panel-dense" :key="i" v-for="(s, i) in states">
      <div class="panel-horizontal-dense card">
        <Button icon="arrow_upward" />
        <Button icon="arrow_downward" />
        <p class="text-dot" />
        <h2 class="flex">State #{{ i }}</h2>
        <Button :value.sync="editingConditions[i]" icon="widgets" />
        <Button :value.sync="s.implicit" icon="format_color_reset" />
        <p class="text-dot" />
        <Button @click.native="deleteState(i)" icon="delete" />
      </div>
      <PhraseConditionsEditor
        v-if="editingConditions[i]"
        :conditions.sync="s.conditions"
        :context="context"
        :allowPassive="true"
      />
      <template v-else>
        <input type="text" v-model="s.text" placeholder="text" />
        <p class="text-caption text-faded">Advanced data: IPA & glossing.</p>
        <div class="panel-horizontal-dense flex-content">
          <input type="text" v-model="s.ipa" placeholder="ipa" />
          <input type="text" v-model="s.glossing" placeholder="glossing" />
        </div>
        <p class="text-caption text-faded">
          Transition: "next" or best of "0 1 ...".
        </p>
        <input type="text" v-model="s.transition" placeholder="transition" />
      </template>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import PhraseConditionsEditor from "./PhraseConditionsEditor";

export default {
  name: "PhraseBlockEditor",
  components: {
    Button,
    PhraseConditionsEditor,
  },
  props: ["block", "context"],
  data() {
    return {
      editingRequirements: false,
      editingConditions: null,
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
        this.editingConditions = new Array(this.states.length).fill(false);
      },
      immediate: true,
    },
  },
  methods: {
    addState(i) {
      if (i == null) i = this.states.length;
      this.states.splice(i, 0, { text: "new state", transition: "next" });
    },
    deleteState(i) {
      this.$delete(this.states, i);
    },
  },
};
</script>

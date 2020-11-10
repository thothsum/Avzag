<template>
  <ActionHeader @action="add" icon="visibility" header="display">
    <template #header>
      <Button :value.sync="state.implicit" icon="opacity" />
    </template>
    <div v-if="display" class="panel-dense">
      <div class="panel-horizontal-dense" :key="i" v-for="(d, i) in display">
        <Button @click.native="toggle(i)" icon="palette" />
        <input
          :class="colors[i]"
          type="text"
          v-model="d.text"
          placeholder="text"
        />
        <input
          :class="colors[i]"
          type="text"
          v-model="d.ipa"
          placeholder="ipa"
        />
        <input
          :class="colors[i]"
          type="text"
          v-model="d.glossing"
          placeholder="gossing"
        />
        <Button @click.native="remove(i)" icon="clear" />
      </div>
    </div>
  </ActionHeader>
</template>

<script>
import Button from "./Button";
import ActionHeader from "./ActionHeader";

export default {
  name: "PhraseStateDisplayEditor",
  components: {
    Button,
    ActionHeader,
  },
  props: ["state", "context", "allowEmpty"],
  computed: {
    display() {
      return this.state.display;
    },
    entities() {
      return [undefined].concat(Object.keys(this.context));
    },
    colors() {
      return this.state.display?.map(
        (d) => "colored-" + (this.entities.indexOf(d.entity) - 1)
      );
    },
  },
  methods: {
    add() {
      if (this.display) this.display.push({});
      else this.$set(this.state, "display", [{}]);
    },
    toggle(j) {
      let i = this.entities.indexOf(this.display[j].entity);
      i = (i + 1) % this.entities.length;
      this.$set(this.display[j], "entity", this.entities[i]);
    },
    remove(i) {
      if (this.allowEmpty || this.display.length > 1)
        this.$delete(this.display, i);
    },
  },
};
</script>

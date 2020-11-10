<template>
  <ActionHeader @action="add" :icon="icon" :header="header">
    <div v-if="display" class="panel-dense">
      <div class="panel-horizontal-dense" :key="i" v-for="(d, i) in display">
        <Button @click.native="toggle(i)" icon="palette" />
        <input class="flex" :class="colors[i]" type="text" v-model="d[0]" />
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
  props: ["icon", "header", "display", "context", "allowEmpty"],
  computed: {
    entities() {
      return [""].concat(Object.keys(this.context));
    },
    colors() {
      return this.display?.map(
        (d) => "colored-" + (this.entities.indexOf(d[1]) - 1)
      );
    },
  },
  methods: {
    add() {
      if (this.display) this.display.push(["", ""]);
      else this.$emit("update:display", [["", ""]]);
    },
    toggle(j) {
      let i = this.entities.indexOf(this.display[j][1]);
      i = (i + 1) % this.entities.length;
      this.$set(this.display[j], 1, this.entities[i]);
    },
    remove(i) {
      if (this.allowEmpty || this.display.length > 1)
        this.$delete(this.display, i);
    },
  },
};
</script>

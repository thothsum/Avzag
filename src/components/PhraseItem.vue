<template>
  <div class="panel-horizontal-dense card">
    <div class="panel-horizontal-dense text-dot">
      <Button class="small" @click.native="copy" icon="copy" />
      <h2>{{ lect }}</h2>
    </div>
    <div class="panel-horizontal-dense wrap flex">
      <PhraseBlock
        ref="blocks"
        :entities.sync="entities_"
        :interactive="interactive"
        :phonemic="phonemic"
        :block="b"
        :key="j"
        v-for="(b, j) in blocks"
      />
    </div>
  </div>
</template>

<script>
import Button from "./Button";
import PhraseBlock from "./PhraseBlock";

export default {
  name: "PhraseItem",
  components: {
    PhraseBlock,
    Button,
  },
  props: ["lect", "entities", "blocks", "interactive", "phonemic"],
  data() {
    return {
      entities_: undefined,
    };
  },
  computed: {
    text() {
      return this.$refs.blocks
        ?.filter((b) => b.passed)
        .map((b) => b.display)
        .join(" ");
    },
  },
  watch: {
    entities() {
      this.entities_ = this.entities;
    },
    entities_() {
      this.$emit("update:entities", this.entities_);
    },
  },
  methods: {
    copy() {
      navigator.clipboard.writeText(this.text);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  align-items: flex-start;
}
</style>

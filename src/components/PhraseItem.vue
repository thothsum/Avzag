<template>
  <div class="panel card" v-if="blocks">
    <div class="panel-horizontal">
      <Button class="small" @click.native="copy" icon="copy" />
      <h2>{{ lect }}</h2>
    </div>
    <div class="panel-horizontal-dense wrap flex">
      <PhraseBlock
        ref="blocks"
        :id="id"
        :entities.sync="entities_"
        :interactive="interactive"
        :glossed="glossed"
        :requirements="b.requirements"
        :states="b.states"
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
  props: ["id", "lect", "entities", "blocks", "interactive", "glossed"],
  data() {
    return {
      entities_: undefined,
    };
  },
  computed: {
    text() {
      return this.$refs.blocks
        ?.filter((b) => b.valid)
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
@media only screen and (max-width: $mobile-width) {
  .card {
    flex-direction: column;
  }
}
</style>

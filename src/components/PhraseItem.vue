<template>
  <div class="panel-horizontal card">
    <Button class="small" @click.native="copy" icon="copy" />
    <h2>{{ lect }}</h2>
    <p class="text-dot"></p>
    <div class="panel-horizontal-dense wrap flex blocks">
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
    return { entities_: undefined };
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
    entities: {
      handler() {
        this.entities_ = this.entities;
      },
      immediate: true,
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

<template>
  <div class="panel card" v-if="translation">
    <div class="panel-horizontal">
      <Button class="small" @click.native="copy" icon="content_copy" />
      <h2>{{ lect }}</h2>
    </div>
    <div class="panel-horizontal-dense wrap flex">
      <PhraseBlock
        ref="blocks"
        :id="id"
        :context.sync="context_"
        :interactive="interactive"
        :glossed="glossed"
        :requirements="b.requirements"
        :states="b.states"
        :key="j"
        v-for="(b, j) in translation.blocks"
      />
    </div>
    <template v-if="noted">
      <PhoneticNote :key="i" v-for="(n, i) in translation.notes" :text="n" />
    </template>
  </div>
</template>

<script>
import Button from "./Button";
import PhraseBlock from "./PhraseBlock";
import PhoneticNote from "./PhoneticNote";

export default {
  name: "PhraseTranslation",
  components: {
    Button,
    PhraseBlock,
    PhoneticNote,
  },
  props: [
    "id",
    "lect",
    "context",
    "translation",
    "interactive",
    "glossed",
    "noted",
  ],
  data() {
    return {
      context_: undefined,
    };
  },
  computed: {
    text() {
      return this.$refs.blocks
        ?.filter((b) => b.valid)
        .map((b) => b.display)
        .join("");
    },
  },
  watch: {
    context() {
      this.context_ = this.context;
    },
    context_() {
      this.$emit("update:context", this.context_);
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

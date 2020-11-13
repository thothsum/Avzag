<template>
  <div class="panel card" v-if="translation">
    <div class="panel-horizontal-dense small">
      <Button @click.native="copy" icon="content_copy" />
      <h2>{{ lect }}</h2>
    </div>
    <PhraseContext
      v-if="interactive"
      :context="context"
      :translation="translation.context"
      :blocks="$refs.blocks"
    />
    <div class="panel-horizontal-dense wrap flex">
      <PhraseBlock
        ref="blocks"
        :id="id"
        :context.sync="context_"
        :interactive="interactive"
        :glossed="glossed"
        :block="b"
        :key="i"
        v-for="(b, i) in translation.blocks"
      />
    </div>
    <template v-if="showNotes">
      <PhoneticNote :key="i" v-for="(n, i) in translation.notes" :text="n" />
    </template>
  </div>
</template>

<script>
import Button from "./Button";
import PhraseContext from "@/components/PhraseContext";
import PhraseBlock from "./PhraseBlock";
import PhoneticNote from "./PhoneticNote";

export default {
  name: "PhraseTranslation",
  components: {
    Button,
    PhraseContext,
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
    "showNotes",
  ],
  data() {
    return {
      context_: undefined,
    };
  },
  computed: {
    text() {
      return this.$refs.blocks
        ?.filter((b) => b.visible)
        .map((b) => b.$refs.display.text)
        .join(" ");
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

<template>
  <div v-if="translation" class="col-1 card">
    <div class="row-1 small">
      <Button icon="content_copy" @click="copy" />
      <h2>{{ lect }}</h2>
    </div>
    <PhraseContext
      v-if="interactive"
      :context="context"
      :translation="translation.context"
      :blocks="$refs.blocks"
    />
    <div class="row wrap flex">
      <PhraseBlock
        :id="id"
        ref="blocks"
        v-for="(b, i) in translation.blocks"
        :key="i"
        :context="context"
        :interactive="interactive"
        :glossed="glossed"
        :block="b"
        @update:context="$emit('update:context', $event)"
      />
    </div>
    <template v-if="showNotes">
      <PhoneticNote v-for="(n, i) in translation.notes" :key="i" :text="n" />
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
      blocks: [],
    };
  },
  computed: {
    text() {
      return this.blocks
        ?.filter((b) => b.visible)
        .map((b) => b.$refs.display.text)
        .join(" ");
    },
  },
  beforeUpdate() {
    this.blocks = [];
  },
  methods: {
    setBlock(el) {
      this.blocks.push(el);
    },
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

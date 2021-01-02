<template>
  <div v-if="translation" class="col-1 card">
    <div class="row-1 small">
      <control icon="content_copy" @click="copy" />
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
    <Notes v-if="showNotes" class="text-caption" :notes="translation.notes" />
  </div>
</template>

<script>
import PhraseContext from "@/components/PhraseContext";
import PhraseBlock from "./PhraseBlock";
import Notes from "@/components/Notes";

export default {
  name: "PhraseTranslation",
  components: {
    PhraseContext,
    PhraseBlock,
    Notes,
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

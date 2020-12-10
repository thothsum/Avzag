<template>
  <div class="col-1 card" v-if="translation">
    <div class="row-1 small">
      <Button @click="copy" icon="content_copy" />
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
        ref="blocks"
        :id="id"
        :context="context"
        @update:context="$emit('update:context', $event)"
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
  computed: {
    text() {
      return this.$refs.blocks
        ?.filter((b) => b.visible)
        .map((b) => b.$refs.display.text)
        .join(" ");
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

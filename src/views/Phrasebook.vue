<template>
  <div class="section panel" v-if="lects && phrasebook">
    <List
      :value.sync="selected"
      :items="phrasebook"
      indexed="true"
      display="preview"
    />
    <div class="panel" v-if="phrase">
      <div class="panel-horizontal-dense scroll small">
        <Button
          class="round"
          v-model="noted"
          icon="sticky_note_2"
          text="Notes"
        />
        <Button
          class="round"
          v-model="contextual"
          icon="widgets"
          text="Context"
        />
        <Button
          class="round"
          v-model="interactive"
          icon="tune"
          text="Interactive"
        />
        <Button class="round" v-model="glossed" icon="layers" text="Glossed" />
      </div>
      <div class="panel wrap card" v-show="contextual">
        <div class="panel-horizontal-dense wrap">
          <PhraseBlock
            :id="selected"
            :context.sync="context"
            :interactive="interactive"
            :requirements="b.requirements"
            :states="b.states"
            :key="i"
            v-for="(b, i) in phrase.blocks"
          />
        </div>
        <PhraseContext v-if="interactive" :context="context" />
      </div>
      <PhraseTranslation
        :id="selected"
        :context.sync="context"
        :lect="lects[i].name"
        :translation="t"
        :interactive="interactive"
        :glossed="glossed"
        :noted="noted"
        :key="i"
        v-for="(t, i) in translations"
      />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import List from "@/components/List";
import PhraseContext from "@/components/PhraseContext";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseTranslation from "@/components/PhraseTranslation";

export default {
  name: "Phrasebook",
  components: {
    Button,
    List,
    PhraseContext,
    PhraseBlock,
    PhraseTranslation,
  },
  data() {
    return {
      selected: undefined,
      context: undefined,
      interactive: false,
      glossed: false,
      noted: false,
      contextual: true,
    };
  },
  computed: {
    lects() {
      return this.$store.state.lects;
    },
    phrasebook() {
      return this.$store.state.phrasebook;
    },
    phrase() {
      return this.phrasebook ? this.phrasebook[this.selected] : undefined;
    },
    translations() {
      return this.lects.map((l) =>
        l.phrasebook ? l.phrasebook[this.selected] : undefined
      );
    },
  },
  watch: {
    phrasebook: {
      handler() {
        if (this.phrasebook) this.selected = localStorage.phrase;
      },
      immediate: true,
    },
    phrase: {
      handler() {
        this.context =
          this.phrase?.context?.reduce((acc, s) => {
            acc[s.entity] = new Set();
            return acc;
          }, {}) ?? {};
      },
      immediate: true,
    },
  },
  destroyed() {
    localStorage.phrase = this.selected;
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 256px 1fr;
}
@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>

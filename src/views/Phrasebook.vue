<template>
  <div class="section panel" v-if="phrasebook">
    <List
      :value.sync="selected"
      :items="phrasebook"
      indexed="true"
      display="preview"
    />
    <div class="panel scroll" v-if="context">
      <div class="panel-horizontal scroll">
        <Button v-model="noted" icon="sticky_note_2" text="Notes" />
        <Button v-model="contextual" icon="info" text="Context" />
        <Button v-model="interactive" icon="tune" text="Interactive" />
        <Button v-model="glossed" icon="layers" text="Glossed" />
      </div>
      <div class="panel wrap card" v-show="contextual">
        <div class="panel-horizontal-dense wrap blocks">
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
        <div class="panel-horizontal-dense wrap" v-show="interactive">
          <div
            class="panel-horizontal-dense text-caption text-faded context wrap text-dot"
            :key="e"
            v-for="(t, e, i) of context"
          >
            <h2>{{ e }}<IndexedColor :indexes="[i]" /></h2>
            <p :key="tg" v-for="tg in t">{{ tg }}</p>
          </div>
        </div>
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
import IndexedColor from "@/components/IndexedColor";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseTranslation from "@/components/PhraseTranslation";

export default {
  name: "Phrasebook",
  components: {
    Button,
    List,
    IndexedColor,
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
    phrase() {
      this.context =
        this.phrase?.context?.reduce((acc, s) => {
          acc[s.entity] = new Set();
          return acc;
        }, {}) ?? {};
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
.context > * {
  position: relative;
  line-height: 150%;
}
@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>

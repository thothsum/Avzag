<template>
  <div class="section panel" v-if="lects && phrasebook">
    <div class="panel">
      <div class="panel-horizontal">
        <Button :value.sync="searching" icon="search" />
        <input
          v-if="searching"
          v-model="query"
          class="flex"
          type="text"
          placeholder="Search all phrases..."
        />
        <h2 v-else class="panel flex">
          <Select :value.sync="category" :items="categories" />
        </h2>
      </div>
      <div v-if="searching" class="panel scroll">
        <div class="panel-dense" :key="c" v-for="(ph, c) of phrases">
          <h2>{{ c }}</h2>
          <div class="panel-solid">
            <Button
              :class="{ highlight: category == c && selected == i }"
              @click.native="select(c, i)"
              :key="i"
              v-for="(p, i) in ph"
              :text="p.preview"
            />
          </div>
        </div>
      </div>
      <List
        class="scroll"
        v-else
        :value.sync="selected"
        :items="phrases"
        indexed="true"
        display="preview"
      />
    </div>
    <div class="panel" v-if="phrase">
      <div class="panel-horizontal-dense scroll small">
        <Button
          class="round"
          :value.sync="noted"
          icon="sticky_note_2"
          text="Notes"
        />
        <Button
          class="round"
          :value.sync="contextual"
          icon="widgets"
          text="Context"
        />
        <Button
          class="round"
          :value.sync="interactive"
          icon="tune"
          text="Interactive"
        />
        <Button
          class="round"
          :value.sync="glossed"
          icon="layers"
          text="Glossed"
        />
      </div>
      <div class="panel wrap card" v-show="contextual">
        <div class="panel-horizontal-dense wrap">
          <PhraseBlock
            :id="selected"
            :context.sync="context"
            :interactive="interactive"
            :block="b"
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
import Select from "@/components/Select";
import List from "@/components/List";
import PhraseContext from "@/components/PhraseContext";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseTranslation from "@/components/PhraseTranslation";

export default {
  name: "Phrasebook",
  components: {
    Button,
    Select,
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
      searching: false,
      category: "",
      query: "",
    };
  },
  computed: {
    lects() {
      return this.$store.state.lects;
    },
    phrasebook() {
      return this.$store.state.phrasebook;
    },
    categories() {
      return Object.keys(this.phrasebook);
    },
    phrases() {
      return this.searching
        ? Object.entries(this.phrasebook).reduce((acc, [c, ps]) => {
            let p = ps.filter((p) => p.preview.includes(this.query));
            if (p.length > 0) acc[c] = p;
            return acc;
          }, {})
        : this.phrasebook[this.category] ?? [];
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
  methods: {
    select(c, i) {
      this.category = c;
      this.selected = i;
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 288px minmax(0, 1fr);
  gap: map-get($margins, "double");
  > :first-child {
    max-height: 640px;
  }
}
@media only screen and (max-width: $mobile-width) {
  .section {
    > :first-child {
      max-height: 320px;
    }
    grid-template-columns: 100%;
  }
}
</style>

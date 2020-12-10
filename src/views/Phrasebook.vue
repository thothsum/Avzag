<template>
  <div class="section col-1" v-if="lects && phrasebook">
    <div class="col-1">
      <div class="row">
        <Button v-model:value="searching" icon="search" />
        <input
          v-if="searching"
          v-model="query"
          class="flex"
          type="text"
          placeholder="Search all phrases..."
        />
        <h2 v-else class="col-1 flex">
          <Select v-model:value="section" :items="phrasebook" display="name" />
        </h2>
      </div>
      <template v-if="phrases">
        <div v-if="searching" class="col-1 scroll">
          <div class="col" v-for="(ps, s) of phrases">
            <h2>{{ phrasebook[s].name }}</h2>
            <div class="col-0">
              <Button
                :class="{
                  highlight: phrase == phrasebook[s].phrases[p],
                }"
                @click="select(s, p)"
                v-for="p in ps"
                :text="phrasebook[s].phrases[p].preview"
              />
            </div>
          </div>
        </div>
        <List
          class="scroll"
          v-else
          v-model:value="phrase"
          :items="phrases"
          display="preview"
        />
      </template>
    </div>
    <div class="col-1" v-if="phrase">
      <div class="row scroll small">
        <Button
          class="round"
          v-model:value="showNotes"
          icon="sticky_note_2"
          text="Notes"
        />
        <Button
          class="round"
          v-model:value="showSource"
          icon="short_text"
          text="Source"
        />
        <Button
          class="round"
          v-model:value="interactive"
          icon="tune"
          text="Interactive"
        />
        <Button
          class="round"
          v-model:value="glossed"
          icon="layers"
          text="Glossed"
        />
      </div>
      <div class="col-1 wrap card" v-show="showSource">
        <PhraseContext v-if="interactive" :context="context" />
        <div class="row wrap">
          <PhraseBlock
            :id="selected"
            v-model:context="context"
            :interactive="interactive"
            :block="b"
            v-for="(b, i) in phrase.blocks"
          />
        </div>
      </div>
      <PhraseTranslation
        :id="selected"
        v-model:context="context"
        :lect="lects[i].name"
        :translation="t"
        :interactive="interactive"
        :glossed="glossed"
        :showNotes="showNotes"
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
      section: undefined,
      phrase: undefined,
      context: undefined,
      interactive: false,
      glossed: false,
      showNotes: false,
      showSource: true,
      searching: false,
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
    phrases() {
      return this.searching
        ? this.phrasebook.reduce((f, s, i) => {
            f[i] = s.phrases
              .map((p, i) => [p, i])
              .filter((p) => p[0].preview.includes(this.query))
              .map((p) => p[1]);
            if (!f[i].length) delete f[i];
            return f;
          }, {})
        : this.section?.phrases;
    },
    translations() {
      return this.lects.map(({ phrasebook }) =>
        phrasebook ? phrasebook[this.phrase.id] : null
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
          this.phrase?.context?.reduce((c, { entity }) => {
            c[entity] = new Set();
            return c;
          }, {}) ?? {};
      },
      immediate: true,
    },
  },
  destroyed() {
    localStorage.phrase = this.selected;
  },
  methods: {
    select(s, p) {
      this.section = this.phrasebook[s];
      this.phrase = this.section.phrases[p];
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

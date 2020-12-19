<template>
  <div v-if="lects && phrasebook" class="section col-1">
    <div class="col-1">
      <div class="row">
        <Button v-model="searching" icon="search" />
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
          <div v-for="(ps, s) of phrases" :key="s" class="col">
            <h2>{{ phrasebook[s].name }}</h2>
            <div class="col-0">
              <Button
                v-for="p in ps"
                :key="p"
                :class="{
                  highlight: phrase == phrasebook[s].phrases[p],
                }"
                :text="phrasebook[s].phrases[p].preview"
                @click="select(s, p)"
              />
            </div>
          </div>
        </div>
        <List
          v-else
          v-model:value="phrase"
          class="scroll"
          :items="phrases"
          display="preview"
        />
      </template>
    </div>
    <div v-if="phrase" class="col-1">
      <div class="row scroll small">
        <Button
          v-model="showNotes"
          class="round"
          icon="sticky_note_2"
          text="Notes"
        />
        <Button
          v-model="showSource"
          class="round"
          icon="short_text"
          text="Source"
        />
        <Button
          v-model="interactive"
          class="round"
          icon="tune"
          text="Interactive"
        />
        <Button v-model="glossed" class="round" icon="layers" text="Glossed" />
      </div>
      <div v-show="showSource" class="col-1 wrap card">
        <PhraseContext v-if="interactive" :context="context" />
        <div class="row wrap">
          <PhraseBlock
            v-for="(b, i) in phrase.blocks"
            :id="selected"
            :key="i"
            v-model:context="context"
            :interactive="interactive"
            :block="b"
          />
        </div>
      </div>
      <PhraseTranslation
        v-for="(t, i) in translations"
        :id="selected"
        :key="i"
        v-model:context="context"
        :lect="lects[i].name"
        :translation="t"
        :interactive="interactive"
        :glossed="glossed"
        :show-notes="showNotes"
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
  unmounted() {
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

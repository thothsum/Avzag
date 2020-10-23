<template>
  <div class="section panel">
    <List
      :value.sync="selected"
      :items="phrasebook"
      indexed="true"
      display="preview"
    />
    <div class="panel" v-if="phrase">
      <div class="panel-horizontal">
        <Button v-model="interactive" icon="tune" text="Interactive" />
        <Button v-model="phonemic" icon="music_note" text="IPA" />
      </div>
      <div class="panel wrap card">
        <div class="panel-horizontal-dense wrap blocks">
          <PhraseBlock
            :entities.sync="entities"
            :interactive="interactive"
            :block="b"
            :key="i"
            v-for="(b, i) in phrase.blocks"
          />
        </div>
        <div class="panel-horizontal-sparse wrap" v-show="interactive">
          <div
            class="panel-horizontal-dense text-caption text-faded entity"
            :key="e"
            v-for="(t, e, i) of entities"
          >
            <h2 :class="'colored-' + i">{{ e }}</h2>
            <p class="text-dot"></p>
            <p :key="tg" v-for="tg in t">{{ tg }}</p>
          </div>
        </div>
      </div>
      <PhraseItem
        :entities.sync="entities"
        :lect="lects[i].name"
        :blocks="t"
        :interactive="interactive"
        :phonemic="phonemic"
        :key="lects[i].name"
        v-for="(t, i) in translations"
      />
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import List from "@/components/List";
import PhraseBlock from "@/components/PhraseBlock";
import PhraseItem from "@/components/PhraseItem";

export default {
  name: "Phrasebook",
  components: {
    Button,
    List,
    PhraseBlock,
    PhraseItem,
  },
  data() {
    return {
      selected: 0,
      entities: {},
      interactive: false,
      phonemic: false,
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
      return this.lects.map((l) => l?.phrasebook[this.selected]);
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
        this.entities =
          this.phrase?.state.reduce((acc, s) => {
            acc[s.entity] = new Set(s.tags.split(" "));
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
.entity {
  align-items: flex-start;
}
.text-caption * {
  line-height: 125% !important;
}
</style>

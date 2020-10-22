<template>
  <div class="section panel" v-if="phrasebook">
    <div class="panel-solid">
      <Button
        :key="i"
        v-for="(p, i) in phrasebook"
        :text="p.preview"
        :class="{ highlight: selected == i }"
        @click.native="selected = i"
      />
    </div>
    <div class="panel">
      <div class="panel-horizontal">
        <Button v-model="showIpa" icon="music_note" text="IPA" />
      </div>
      <div class="panel wrap card">
        <div class="panel-horizontal-dense wrap blocks">
          <PhraseBlock
            v-model="entities"
            :block="b"
            :key="i"
            v-for="(b, i) in phrasebook[selected].blocks"
          />
        </div>
        <div class="panel-horizontal-sparse wrap">
          <div
            class="panel-horizontal-dense text-caption text-faded blocks"
            :key="e"
            v-for="(t, e, i) of entities"
          >
            <h2 :class="'colored-' + i">{{ e }}</h2>
            <p class="text-dot"></p>
            <p :key="tg" v-for="tg in t">{{ tg }}</p>
          </div>
        </div>
      </div>
      <div
        class="panel-horizontal card"
        :key="i"
        v-for="(t, i) in translations"
      >
        <h2>{{ lects[i].name }}</h2>
        <p class="text-dot"></p>
        <div class="panel-horizontal-dense wrap flex blocks">
          <PhraseBlock
            v-model="entities"
            :showIpa="showIpa"
            :block="b"
            :key="j"
            v-for="(b, j) in t"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhraseBlock from "@/components/PhraseBlock";
import Button from "@/components/Button";

export default {
  name: "Phrasebook",
  components: {
    PhraseBlock,
    Button,
  },
  data() {
    return {
      selected: 0,
      entities: {},
      showIpa: false,
    };
  },
  computed: {
    phrasebook() {
      return this.$store.state.phrasebook;
    },
    lects() {
      return this.$store.state.lects;
    },
    translations() {
      return this.lects.map((l) => l?.phrasebook[this.selected]);
    },
  },
  watch: {
    selected: {
      handler() {
        let e = {};
        this.phrasebook[this.selected].state.forEach(
          (s) => (e[s.entity] = new Set(s.tags.split(" ")))
        );
        this.entities = e;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
$colors: #aed581, #e57373, #64b5f6, #ffb74d #9575cd, #a1887f;
.colored--1 {
  border-bottom: $border-width solid transparent;
}
@for $i from 0 through 4 {
  .colored-#{$i} {
    border-bottom: $border-width solid nth($colors, $i + 1);
  }
}
</style>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 256px 1fr;
}
.text-caption * {
  line-height: 125% !important;
}
</style>

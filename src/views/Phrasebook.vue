<template>
  <div class="section" v-if="phrasebooks">
    <div id="translations" class="panel">
      <!-- <div id="header" class="panel-horizontal">
        <button @click="searching=!searching" class="icon">{{searching?"sort":"search"}}</button>
        <input v-if="searching" placeholder="search in translations" type="text" v-model="search" />
        <select v-else v-model="category">
          <option :value="i" :key="i" v-for="(ct, i) in categories">{{ct}}</option>
        </select>
      </div>
      <div v-if="searchResults" class="panel-solid scroll">
        <template v-for="(c, i) of searchResults">
          <h3 :key="categories[i]">{{categories[i]}}</h3>
          <button
            :class="{highlight: i===category && j===phrase}"
            @click="() => {category=i; phrase=j;}"
            :key="'-'+i+j"
            v-for="(p, j) in c"
          >{{phrasebook[categories[i]][p].translation}}</button>
        </template>
      </div>
      <p v-else-if="searching" class="text-caption">Nothing found...</p>
      <div v-else class="panel-solid scroll">
        <button
          :class="{highlight: i===phrase}"
          @click="phrase=i"
          :key="i"
          v-for="(tr, i) in translations"
        >{{tr}}</button>
      </div>-->
    </div>
    <div class="panel" v-if="phrasebooks">
      <PhraseBuilder :source="text" :ids="ids" />
      <PhrasebookEntry
        class="card"
        :key="i"
        v-for="(l, i) in lectNames"
        :lect="l"
        :source="lang_sources[i]"
        :ids="ids"
      />
    </div>
  </div>
</template>

<script>
import PhrasebookEntry from "@/components/PhrasebookEntry";
import PhraseBuilder from "@/components/PhraseBuilder";

export default {
  name: "Phrasebook",
  components: {
    PhrasebookEntry,
    PhraseBuilder,
  },
  data() {
    return {
      // category: 0,
      phrase: 0,
      searching: false,
      search: "",
      ids: {},
    };
  },
  computed: {
    lects() {
      return this.$store.state.lects;
    },
    lectNames() {
      return Object.keys(this.lects);
    },
    phrasebooks() {
      return this.lectNames.map((l) => this.lects[l].phrasebook);
    },
    text() {
      return this.phrasebooks[0]["Greeting"][0].text;
    },
    lang_sources() {
      return this.phrasebooks.map((p) => p["Greeting"][0].source);
    },
    // phrases() {
    //   return this.phrasebook
    //     ? this.phrasebook[this.categories[this.category]]
    //     : null;
    // },
  },
  watch: {
    text: {
      handler(text) {
        if (!text) return;
        let ids = {};
        text.forEach((s) => {
          if (typeof s !== "string") {
            ids[s.id] = 0;
          }
        });
        this.ids = ids;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
#header {
  select {
    font-weight: bold;
  }
  > *:nth-child(2) {
    flex: 1;
  }
}
.section {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: map-get($margins, "double");
}
.panel-solid {
  h3 {
    margin-bottom: map-get($margins, "normal");
    &:not(:first-child) {
      margin-top: map-get($margins, "normal");
    }
  }
}
@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 1fr;
  }
  .panel-solid {
    max-height: 7 * map-get($button-height, "normal");
  }
}
</style>

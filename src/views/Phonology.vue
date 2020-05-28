<template>
  <div class="section" v-if="phonemes">
    <div id="phonemes">
      <QueryList
        :title="'Lects'"
        :tags="lects"
        :large="true"
        v-show="lects.length>0"
        @query="lectQuery=$event"
      />
      <QueryList :title="'Vowels'" :tags="vowelFeatures" @query="vowelQuery=$event" />
      <PhoneticTable
        :phonemes="vowels"
        :featureQuery="vowelQuery"
        :lectQuery="lectQuery"
        @phoneme="selected=$event"
      />
      <QueryList :title="'Consonants'" :tags="consonantFeatures" @query="consonantQuery=$event" />
      <PhoneticTable
        :phonemes="consonants"
        :featureQuery="consonantQuery"
        :lectQuery="lectQuery"
        @phoneme="selected=$event"
      />
    </div>
    <PhonemeDetails :phoneme="phonemes[selected]" />
  </div>
</template>

<script>
import QueryList from "@/components/QueryList";
import PhoneticTable from "@/components/PhoneticTable";
import PhonemeDetails from "@/components/PhonemeDetails";

export default {
  name: "Phonology",
  components: {
    PhoneticTable,
    PhonemeDetails,
    QueryList
  },
  data() {
    return {
      lectQuery: {},
      vowelQuery: {},
      consonantQuery: {},
      selected: 0
    };
  },
  computed: {
    phonemes() {
      return this.$store.state.phonology;
    },
    lects() {
      return this.collectTags(
        this.phonemes.flatMap(p => p.lects.map(l => l.name))
      );
    },
    vowels() {
      return this.categorize("vowel");
    },
    vowelFeatures() {
      return this.collectTags(
        this.vowels.flatMap(p => p.features),
        ["vowel"]
      );
    },
    consonants() {
      return this.categorize("consonant");
    },
    consonantFeatures() {
      return this.collectTags(
        this.consonants.flatMap(p => p.features),
        ["consonant"]
      );
    }
  },
  watch: {
    phonemes() {
      this.selected = 0;
    }
  },
  methods: {
    categorize(category) {
      return this.phonemes.filter(p => p.features.includes(category));
    },
    collectTags(tags, exclude = []) {
      let result = new Set();
      tags.filter(t => !exclude.includes(t)).forEach(t => result.add(t));
      return [...result];
    }
  }
};
</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 20px;
}
#phonemes {
  display: flex;
  flex-direction: column;
}
#phonemes > * {
  width: 100%;
}
#phonemes > *:nth-child(odd):not(:last-child) {
  margin-bottom: 20px;
}
#phonemes > *:nth-child(even):not(:last-child) {
  margin-bottom: 10px;
}
@media only screen and (max-width: 600px) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>

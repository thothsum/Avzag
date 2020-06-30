<template>
  <div class="section" v-if="phonemes && lects">
    <div class="panel-sparse">
      <QueryList :tags="lects" @query="lectQuery = $event" />
      <PhoneticTable
        :selected="selected"
        :phonemes="vowels"
        :featureQuery="featureQuery"
        :lectQuery="lectQuery"
        @phoneme="select($event)"
      />
      <PhoneticTable
        :selected="selected"
        :phonemes="consonants"
        :featureQuery="featureQuery"
        :lectQuery="lectQuery"
        @phoneme="select($event)"
      />
      <QueryInput @query="featureQuery = $event" />
    </div>
    <PhonemeDetails :phoneme="phonemes[selected]" />
  </div>
</template>

<script>
import QueryList from "@/components/QueryList";
import QueryInput from "@/components/QueryInput";
import PhoneticTable from "@/components/PhoneticTable";
import PhonemeDetails from "@/components/PhonemeDetails";

export default {
  name: "Phonology",
  components: {
    PhoneticTable,
    PhonemeDetails,
    QueryList,
    QueryInput,
  },
  data() {
    return {
      lectQuery: {},
      featureQuery: {},
    };
  },
  computed: {
    selected() {
      let index = this.$route.query.phoneme ?? 0;
      return index < this.phonemes.length ? index : 0;
    },
    phonemes() {
      return this.$store.state.phonology;
    },
    lects() {
      return this.$store.getters.languageInfo?.lects;
    },
    vowels() {
      return this.categorize("vowel");
    },
    consonants() {
      return this.categorize("consonant");
    },
  },
  methods: {
    select(i) {
      if (this.selected !== i) this.$router.replace({ query: { phoneme: i } });
    },
    categorize(category) {
      return this.phonemes.filter((p) => p.features.includes(category));
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: var(--margin-large);
}
.panel-sparse {
  overflow: hidden;
}
@media only screen and (max-width: 568px) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>

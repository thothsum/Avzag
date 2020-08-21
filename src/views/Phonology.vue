<template>
  <div class="section" v-if="lects">
    <div class="panel scroll">
      <QueryList :tags="lectNames" @query="lectQuery=$event" />
      <!-- <PhoneticTable
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
      /> -->
      <QueryInput @query="featureQuery=$event" />
    </div>
    <!-- <PhonemeDetails :phoneme="phonemes[selected]" /> -->
  </div>
</template>

<script>
import QueryList from "@/components/QueryList";
import QueryInput from "@/components/QueryInput";
// import PhoneticTable from "@/components/PhoneticTable";
// import PhonemeDetails from "@/components/PhonemeDetails";

export default {
  name: "Phonology",
  components: {
    // PhoneticTable,
    // PhonemeDetails,
    QueryList,
    QueryInput,
  },
  data() {
    return {
      selected: 0,
      lectQuery: {},
      featureQuery: {},
    };
  },
  computed: {
    ipa() {
      return this.$store.state.ipa;
    },
    lects() {
      return this.$store.state.lects;
    },
    lectNames() {
      return Object.keys(this.lects);
    },
    // vowels() {
    //   return this.categorize("vowel");
    // },
    // consonants() {
    //   return this.categorize("consonant");
    // },
  },
  watch: {
    lects(lects) {
      if (lects == null) return;

      for (let lect in lects) {
        let phonology = lects[lect].phonology;

        let vowels = phonology.vowels;
        for (const ph in vowels) {
          if (vowels[ph].tags?.length == 0) {
            vowels[ph].tags = [];
            for (const ipa in this.ipa.vowels)
              if (ph.includes(ipa)) {
                vowels[ph].tags.push(this.ipa.vowels[ipa]);
                break;
              }
          }
        }

        let consonants = phonology.consonants;
        for (const ph in consonants) {
          if (consonants[ph].tags?.length == 0) {
            consonants[ph].tags = [];
            for (const ipa in this.ipa.consonants)
              if (ph.includes(ipa)) {
                consonants[ph].tags.push(this.ipa.consonants[ipa]);
                break;
              }
          }
        }
      }
    },
  },
  methods: {
    select(i) {
      console.log("selecting", i);
      // if (this.selected !== i) this.$router.replace({ query: { phoneme: i } });
    }
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 1fr 224px;
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>

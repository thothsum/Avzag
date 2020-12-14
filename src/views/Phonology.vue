<template>
  <div v-if="phonemes" class="section">
    <div class="col-1 scroll">
      <ChipsQuery :items="lects" item-key="name" @query="lectQuery = $event" />
      <InputQuery
        placeholder="Query phonemes, e.g. voiced -velar..."
        @query="featureQuery = $event"
      />
      <div v-for="c in categories" :key="c" class="col">
        <h2>{{ c + "s" }}</h2>
        <PhoneticTable
          v-model:phoneme="phoneme"
          :filter="c"
          :feature-query="featureQuery"
          :lect-query="lectQuery"
          :phonemes="phonemes"
        />
      </div>
    </div>
    <PhonemeDetails :phoneme="phoneme" />
  </div>
</template>

<script>
import ChipsQuery from "@/components/ChipsQuery";
import InputQuery from "@/components/InputQuery";
import PhoneticTable from "@/components/PhoneticTable";
import PhonemeDetails from "@/components/PhonemeDetails";

export default {
  name: "Phonology",
  components: {
    PhoneticTable,
    PhonemeDetails,
    ChipsQuery,
    InputQuery,
  },
  data() {
    return {
      categories: ["vowel", "consonant"],
      phoneme: undefined,
      lectQuery: undefined,
      featureQuery: undefined,
    };
  },
  computed: {
    lects() {
      return this.$store.state.lects;
    },
    phonemes() {
      return this.$store.state.phonemes;
    },
  },
  watch: {
    phonemes: {
      handler() {
        if (this.phonemes) {
          const phoneme = localStorage.phoneme;
          this.phoneme =
            this.phonemes.find(({ ipa }) => ipa === phoneme) ??
            this.phonemes[0];
        }
      },
      immediate: true,
    },
  },
  unmounted() {
    localStorage.phoneme = this.phoneme.ipa;
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 224px;
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 100%;
  }
}
</style>

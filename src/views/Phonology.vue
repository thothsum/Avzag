<template>
  <div class="section" v-if="phonemes">
    <div class="col-1 scroll">
      <ChipsQuery @query="lectQuery = $event" :items="lects" itemKey="name" />
      <InputQuery
        placeholder="Query phonemes, e.g. voiced -velar..."
        @query="featureQuery = $event"
      />
      <div class="col" v-for="c in categories">
        <h2>{{ c + "s" }}</h2>
        <PhoneticTable
          v-model:phoneme="phoneme"
          :filter="c"
          :featureQuery="featureQuery"
          :lectQuery="lectQuery"
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
            this.phonemes.find((p) => p.ipa == phoneme) ?? this.phonemes[0];
        }
      },
      immediate: true,
    },
  },
  destroyed() {
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

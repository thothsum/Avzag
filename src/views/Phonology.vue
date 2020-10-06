<template>
  <div class="section" v-if="phonemes">
    <div class="panel scroll">
      <ChipsQuery @query="lectQuery = $event" :items="lects" itemKey="name" />
      <InputQuery
        placeholder="Query phonemes, e.g. voiced -velar ..."
        @query="featureQuery = $event"
      />
      <div class="panel" :key="t" v-for="[t, n] in categories">
        <h2>{{ n }}</h2>
        <PhoneticTable
          v-model="phoneme"
          :filter="t"
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
      categories: [
        ["vowel", "Vowels"],
        ["consonant", "Consonants"],
      ],
      phoneme: null,
      lectQuery: {},
      featureQuery: {},
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
        this.phoneme = this.phonemes[0];
      },
      immediate: true,
    },
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

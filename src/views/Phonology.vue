<template>
  <div class="section" v-if="lects && phonemes">
    <div class="panel scroll">
      <ChipsQuery @query="lectQuery=$event" :items="lects" itemKey="name" />
      <div class="panel" :key="t" v-for="[t, n] in categories">
        <h3>{{n}}</h3>
        <PhoneticTable
          v-model="phoneme"
          :filter="t"
          :featureQuery="featureQuery"
          :lectQuery="lectQuery"
          :phonemes="phonemes"
        />
      </div>
      <InputQuery placeholder="e.g. voiced -velar" @query="featureQuery=$event" />
    </div>
    <PhonemeDetails :phoneme="phoneme" v-if="phoneme" />
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
    ipa() {
      return this.$store.state.ipa;
    },
    lects() {
      return this.$store.state.lects;
    },
    phonemes() {
      if (!this.lects) return;

      let phonemes = {};
      this.lects.forEach((l) => {
        l.phonology.forEach((p) => {
          const ph = p.phoneme;
          if (!(ph in phonemes))
            phonemes[ph] = { ipa: ph, tags: this.getTags(ph), lects: {} };
          phonemes[ph]["lects"][l.name] = p;
        });
      });
      return Object.values(phonemes);
    },
  },
  watch: {
    phonemes() {
      this.phoneme = this.phonemes[0];
    },
  },
  methods: {
    getTags(p) {
      let tags = [];
      for (const i in this.ipa.primary)
        if (p.includes(i)) {
          tags.push(...this.ipa.primary[i]);
          break;
        }
      for (const i in this.ipa.secondary)
        if (p.includes(i)) {
          tags.push(...this.ipa.secondary[i]);
        }
      return tags;
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

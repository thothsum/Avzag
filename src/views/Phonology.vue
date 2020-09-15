<template>
  <div class="section" v-if="lects && database">
    <div class="panel scroll">
      <ChipsQuery v-model="lectQuery" :items="lects" itemKey="name" />
      <div class="panel" :key="t" v-for="t in types">
        <h3>{{t}}</h3>
        <PhoneticTable
          v-model="selected"
          :featureQuery="featureQuery"
          :lectQuery="lectQuery"
          :phonemes="phonemes[t]"
          :database="database"
        />
      </div>
      <InputQuery placeholder="e.g. voiced -velar" @query="featureQuery=$event" />
    </div>
    <PhonemeDetails :phoneme="selected" :database="database[selected]" />
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
      types: ["vowels", "consonants"],
      selected: null,
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
      this.types.forEach((t) => {
        phonemes[t] = [
          ...new Set(
            this.lectNames.flatMap((l) =>
              Object.keys(this.lects[l].phonemes[t])
            )
          ),
        ].sort(function (a, b) {
          return a.localeCompare(b);
        });
      });
      return phonemes;
    },
    database() {
      let data = {};
      this.types.forEach((t) => {
        this.phonemes[t].forEach((p) => {
          data[p] = {
            tags: this.getTags(p, t),
            uses: this.getUses(p, t),
          };
        });
      });
      return data;
    },
  },
  watch: {
    phonemes() {
      this.selected = this.phonemes[this.types[0]][0];
    },
    singleLect(lect) {
      if (!lect) return;
      this.lectQuery = {};
      this.lectQuery[lect] = true;
    },
  },
  methods: {
    getTags(p, t) {
      let tags = [];
      for (const i in this.ipa[t])
        if (p.includes(i)) {
          tags = tags.concat(this.ipa[t][i].split(" "));
          break;
        }
      for (const i in this.ipa.secondary)
        if (p.includes(i)) {
          tags = tags.concat(this.ipa.secondary[i].split(" "));
        }
      return tags;
    },
    getUses(p, t) {
      let uses = {};
      this.lectNames.forEach((l) => {
        const use = this.lects[l].phonemes[t][p];
        if (use) uses[l] = use;
      });
      return uses;
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

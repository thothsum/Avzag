<template>
  <div class="section" v-if="lects">
    <div class="panel scroll">
      <QueryList :tags="lectNames" @query="lectQuery=$event" />
      <PhoneticTable
        v-model="selected"
        :featureQuery="featureQuery"
        :lectQuery="lectQuery"
        :phonemes="phonemes[t]"
        :database="database[t]"
        :key="t"
        v-for="t in types"
      />
      <QueryInput @query="featureQuery=$event" />
    </div>
    <!-- <PhonemeDetails :phoneme="phonemes[selected]" /> -->
  </div>
</template>

<script>
import QueryList from "@/components/QueryList";
import QueryInput from "@/components/QueryInput";
import PhoneticTable from "@/components/PhoneticTable";
// import PhonemeDetails from "@/components/PhonemeDetails";

export default {
  name: "Phonology",
  components: {
    PhoneticTable,
    // PhonemeDetails,
    QueryList,
    QueryInput,
  },
  data() {
    return {
      types: ["vowels", "consonants"],
      selected: "",
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
    phonemes() {
      let phonemes = {};
      for (const t of this.types) {
        phonemes[t] = [
          ...new Set(
            this.lectNames
              .map((l) => Object.keys(this.lects[l].phonemes[t]))
              .flat()
          ),
        ];
      }
      return phonemes;
    },
    database() {
      let data = {};
      for (const t of this.types) {
        let type = {};
        for (const p of this.phonemes[t]) {
          const tags = this.getTags(p, t);
          const uses = this.getUses(p, t);
          type[p] = { tags, uses };
        }
        data[t] = type;
      }
      return data;
    },
  },
  watch: {},
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
      for (const l of this.lectNames) {
        const use = this.lects[l].phonemes[t][p]?.uses;
        if (use) uses[l] = use;
      }
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

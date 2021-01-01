<template>
  <div v-if="phonemes" class="section">
    <div class="col-1 scroll">
      <ToggleQuery v-model="lectQuery" :labels="lects" />
      <InputQuery
        v-model="featureQuery"
        placeholder="Query phonemes, e.g. voiced -velar..."
      />
      <div v-for="c in categories" :key="c" class="col">
        <h2>{{ c + "s" }}</h2>
        <Table
          v-model:phoneme="phoneme"
          :filter="c"
          :feature-query="featureQuery"
          :lect-query="lectQuery"
          :phonemes="phonemes"
        />
      </div>
    </div>
    <Inspector :phoneme="phoneme" />
  </div>
</template>

<script>
import ToggleQuery from "@/components/Query/ToggleQuery";
import InputQuery from "@/components/Query/InputQuery";
import Table from "./Table";
import Inspector from "./Inspector";

export default {
  name: "Phonology",
  components: {
    Table,
    Inspector,
    ToggleQuery,
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
      return this.$store.state.lects.map((l) => l.name);
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

<template>
  <div class="section" v-if="phonemes">
    <div id="phonemes">
      <div class="table">
        <h3>Idioms</h3>
        <QueryList :phonemes="phonemes" :source="'idioms'" :big="true" @query="idiomQuery=$event" />
      </div>
      <PhoneticTable
        :key="ctg"
        :category="ctg"
        :phonemes="categorize(ctg)"
        :prequery="idiomQuery"
        @phoneme="selected=$event"
        v-for="ctg in ['vowel', 'consonant']"
      />
    </div>
    <PhonemeDetails :langRoot="langRoot" :phoneme="phonemes[selected]" />
  </div>
</template>

<script>
import QueryList from "./QueryList";
import PhoneticTable from "./PhoneticTable";
import PhonemeDetails from "./PhonemeDetails";

export default {
  name: "Phonology",
  props: ["langRoot"],
  watch: {
    langRoot: {
      handler: async function(langRoot) {
        const res = await fetch(langRoot + "phonemes.json");
        let data = await res.json();
        data
          .sort((a, b) => a.str.localeCompare(b.str))
          .forEach(function(p, i) {
            p.i = i;
            p._all = p.tags.concat(p.idioms);
          });
        this.phonemes = data;
      },
      immediate: true
    }
  },
  data() {
    return {
      phonemes: undefined,
      idiomQuery: undefined,
      selected: 0
    };
  },
  components: {
    PhoneticTable,
    PhonemeDetails,
    QueryList
  },
  methods: {
    categorize(category) {
      return this.phonemes.filter(p => p.tags.includes(category));
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
  gap: 20px;
}
#phonemes > * {
  width: 100%;
}
.table {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.table > * {
  margin: 5px;
}
@media only screen and (max-width: 600px) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }
  .table {
    display: flex;
    flex-wrap: wrap;
    place-content: center;
  }
  h3 {
    text-align: center;
  }
}
</style>

<template>
  <div class="table">
    <h3>{{title}}</h3>
    <QueryList
      :phonemes="phonemes"
      :prequery="prequery"
      :tagsKey="'tags'"
      :visible="true"
      @query="getResults($event)"
    />
    <PhonemeItem
      :phoneme="phn"
      :faded="results && !results.includes(phn)"
      :key="phn.i"
      v-for="phn in phonemes"
      @click.native="$emit('phoneme', phn.i)"
    />
  </div>
</template>

<script>
import QueryList from "./QueryList";
import PhonemeItem from "./PhonemeItem";

export default {
  name: "PhoneticTable",
  props: ["category", "phonemes", "prequery"],
  components: {
    QueryList,
    PhonemeItem
  },
  data() {
    return {
      results: null
    };
  },
  watch: {
    phonemes() {
      this.results = null;
    },

  },
  computed: {
    title: function() {
      return this.category[0].toUpperCase() + this.category.slice(1);
    }
  },
  methods: {
    getResults(query) {
      let results = this.phonemes;
      Object.keys(query).forEach(
        t => (results = results.filter(r => query[t] === r._all.includes(t)))
      );
      this.results = results;
    }
  }
};
</script>

<style scoped>
.table {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.table > * {
  margin: 5px;
}

h3 {
  width: 100%;
}

.query {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0;
}
@media only screen and (max-width: 600px) {
  h3 {
    text-align: center;
  }
}
</style>

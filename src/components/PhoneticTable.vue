<template>
  <div class="table">
    <div id="header">
      <h3>{{title}}</h3>
      <a @click="showTags=!showTags">[+]</a>
    </div>
    <QueryList
      :phonemes="phonemes"
      :prequery="prequery"
      :exclude="[category]"
      :source="'tags'"
      @query="getResults($event)"
      v-if="showTags"
      v-show="showTags"
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
      results: null,
      showTags: false
    };
  },
  watch: {
    phonemes() {
      this.results = null;
    }
  },
  computed: {
    title: function() {
      return this.category[0].toUpperCase() + this.category.slice(1) + "s";
    }
  },
  methods: {
    getResults(query) {
      console.log("total: " + JSON.stringify({ ...this.prequery, ...query }));
      let results = this.phonemes;
      for (const [tag, mode] of Object.entries({
        ...this.prequery,
        ...query
      })) {
        results = results.filter(r => mode === r._all.includes(tag));
      }
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

#header {
  width: 100%;
}

h3 {
  margin: 0;
}

#header {
  display: flex;
  flex-wrap: nowrap;
}

#header > a {
  margin-left: 10px;
  padding: 0;
  text-decoration: none;
}

.query {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0;
}
@media only screen and (max-width: 600px) {
  #header {
    place-content: center;
  }
}
</style>

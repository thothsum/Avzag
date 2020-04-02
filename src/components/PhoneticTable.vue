<template>
  <div class="table">
    <h3>{{title}}s</h3>
    <div class="query">
      <QueryItem :key="i" :tag="tag" @query="addQuery(tag, $event)" v-for="(tag, i) in tags" />
    </div>
    <PhonemeItem
      :phoneme="phn"
      :faded="!results.includes(phn)"
      :key="phn.i"
      v-for="phn in phonemes"
      @click.native="$emit('phoneme', phn.i)"
    />
  </div>
</template>

<script>
import QueryItem from "./QueryItem";
import PhonemeItem from "./PhonemeItem";

export default {
  name: "PhoneticTable",
  props: ["category", "phonemes"],
  components: {
    QueryItem,
    PhonemeItem
  },
  data() {
    return {
      query: [],
      results: []
    };
  },
  computed: {
    tags: function() {
      let set = new Set();
      this.phonemes.forEach(p => p.tags?.forEach(t => set.add(t)));
      set.delete(this.category);
      return set;
    },
    title: function() {
      return this.category[0].toUpperCase() + this.category.slice(1);
    }
  },
  created() {
    this.getResults();
  },
  methods: {
    addQuery(tag, mode) {
      if (mode === 0) delete this.query[tag];
      else this.query[tag] = mode === 1 ? true : false;
      this.getResults();
    },
    getResults() {
      let results = this.phonemes;
      Object.keys(this.query).forEach(
        t =>
          (results = results.filter(r => this.query[t] === r.tags.includes(t)))
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

.query > p {
  margin: 0 5px;
  font-style: italic;
  font-size: 12px;
}
</style>

<template>
  <div class="table">
    <h3>{{category}}s</h3>
    <div class="query">
      <QueryItem :key="i" :tag="tag" @query="addQuery(tag, $event)" v-for="(tag, i) in allTags()" />
    </div>
    <PhonemeItem
      :phoneme="phonemes[i]"
      :faded="!queried.includes(i)"
      :key="i"
      v-for="i in doQuery(phonemes)"
      @click.native="$emit('phoneme', i)"
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
      queried: []
    };
  },
  created() {
    this.queried = this.phonemes.map(p => p.i);
  },
  methods: {
    doQuery(query) {
      let results = this.phonemes.map(p => p.i);
      Object.keys(query).forEach(
        tag =>
          (results = results.filter(
            i => query[tag] === this.phonemes[i].tags.includes(tag)
          ))
      );
      return results;
    },
    allTags() {
      let set = new Set();
      this.phonemes.forEach(p => p.tags?.forEach(t => set.add(t)));
      set.delete(this.category);
      return set;
    },
    addQuery(tag, mode) {
      if (mode === 0) delete this.query[tag];
      else this.query[tag] = mode === 1 ? true : false;
      this.queried = this.sortBy(this.query);
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
</style>

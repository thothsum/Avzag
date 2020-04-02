<template>
  <div class="list">
    <h3>{{title}}s</h3>
    <QueryItem
      v-show="visible"
      :key="i"
      :tag="tag"
      :clean="clean"
      @query="addQuery(tag, $event)"
      v-for="(tag, i) in tags"
    />
  </div>
</template>

<script>
import QueryItem from "./QueryItem";

export default {
  name: "QueryTable",
  props: ["category", "phonemes", "tagsKey", "visible"],
  components: {
    QueryItem
  },
  data() {
    return {
      query: [],
      clean: true
    };
  },
  watch: {
    phonemes() {
      this.clean = !this.clean;
    }
  },
  computed: {
    tags: function() {
      let set = new Set();
      this.phonemes.forEach(p => p[this.tagsKey]?.forEach(t => set.add(t)));
      set.delete(this.category);

      let tags = [...set];
      tags.sort((a, b) => a.localeCompare(b));
      return tags;
    },
    title: function() {
      return this.category[0].toUpperCase() + this.category.slice(1);
    }
  },
  methods: {
    addQuery(tag, mode) {
      if (mode === 0) delete this.query[tag];
      else this.query[tag] = mode === 1 ? true : false;
      this.$emit("query", this.query);
    }
  }
};
</script>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
  margin: -5px;
}
h3 {
  width: 100%;
  margin: 0 0 5px 0;
}
.query {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 5px;
}
</style>

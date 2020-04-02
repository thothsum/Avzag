<template>
  <div class="list">
    <QueryItem
      v-show="visible"
      :key="i"
      :tag="tag"
      :clean="clean"
      :big="big"
      @query="addQuery(tag, $event)"
      v-for="(tag, i) in tags"
    />
  </div>
</template>

<script>
import QueryItem from "./QueryItem";

export default {
  name: "QueryTable",
  props: ["prequery", "phonemes", "tagsKey", "visible", "big"],
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
    },
    prequery(value) {
      this.$emit("query", { ...value, ...this.query });
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
    }
  },
  methods: {
    addQuery(tag, mode) {
      if (mode === 0) delete this.query[tag];
      else this.query[tag] = mode === 1 ? true : false;
      this.$emit("query", { ...this.prequery, ...this.query });
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
.query {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 5px;
}
@media only screen and (max-width: 600px) {
  .list {
    place-content: center;
  }
}
</style>

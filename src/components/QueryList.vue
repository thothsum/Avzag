<template>
  <div id="list">
    <div id="header">
      <h3>{{title}}</h3>
      <a @click="visible=!visible">[+]</a>
      <a v-show="visible" @click="resetAll">[reset all]</a>
    </div>
    <div id="body" v-show="visible">
      <p
        :class="{ex:mode===-1, in:mode===1, big:big}"
        :key="tag"
        @click="updateQuery(tag)"
        v-for="(mode, tag) of query"
      >{{tag}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "QueryList",
  props: ["title", "tags", "big"],
  data() {
    return {
      visible: false,
      query: {}
    };
  },
  watch: {
    tags: {
      handler: function(tags) {
        this.query = {};
        [...tags]
          .sort((a, b) => a.localeCompare(b))
          .forEach(t => (this.query[t] = 0));
        this.resetAll();
      },
      immediate: true
    }
  },
  methods: {
    updateQuery(tag) {
      this.query[tag] = ((this.query[tag] + 2) % 3) - 1;
      this.applyQuery();
    },
    resetAll() {
      Object.keys(this.query).forEach(t => (this.query[t] = 0));
      this.applyQuery();
    },
    applyQuery() {
      let result = {};
      for (const [tag, mode] of Object.entries(this.query)) {
        if (mode !== 0) result[tag] = mode === 1;
      }
      this.$emit("query", result);
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 0;
}
#list {
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  width: 100%;
}
#header,
#body {
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
#header > a {
  margin-left: 10px;
  padding: 0;
  text-decoration: none;
}
#body > p {
  margin: 0 5px 0 0;
  padding: 2px 4px;
  font-size: 12px;
  font-style: italic;
  cursor: pointer;
  user-select: none;
  text-decoration: underline;
}
.in {
  color: var(--nord14);
  font-weight: bolder;
}
.ex {
  color: var(--nord11);
  font-weight: bolder;
}
.big {
  margin: 0 10px 0 0 !important;
  padding: 4px 8px !important;
  font-size: 16px !important;
}
@media only screen and (max-width: 600px) {
  #header,
  #body {
    place-content: center;
  }
}
</style>

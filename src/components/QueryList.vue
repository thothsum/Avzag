<template>
  <div id="list">
    <div id="header">
      <h3>{{title}}</h3>
      <a v-show="!locked" @click="visible=!visible">
        <span>? </span>query
      </a>
      <a v-show="visible && !empty" @click="resetAll">
        <span>! </span>reset
      </a>
    </div>
    <div id="body" v-show="visible">
      <a :class="{big:big}" :key="tag" @click="updateQuery(tag)" v-for="(mode, tag) of query">
        <span v-if="mode===-1">-</span>
        <span v-else-if="mode===1">+</span>
        <span v-else>·</span>
        {{tag}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "QueryList",
  props: ["title", "tags", "big", "locked"],
  data() {
    return {
      visible: false,
      empty: true,
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
  created() {
    this.visible = this.locked;
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

      this.empty = Object.keys(result).length === 0;
      this.$emit("query", result);
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  display: flex;
  flex-wrap: nowrap;
}
h3 {
  margin: 0;
}
#list {
  display: flex;
  flex-flow: column;
  width: 100%;
}
#header,
#body {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
}
#header {
  height: 30px;
  margin-left: 5px;
}
#header > a {
  margin-left: 20px;
}
#body * {
  font-size: 12px;
  cursor: pointer;
  user-select: none;
}
#body > a {
  font-style: italic;
  margin: 0 5px 0 0;
  padding: 2px 4px;
}
#body > a.big {
  margin: 0 10px 0 0 !important;
  padding: 4px 8px !important;
  font-size: 16px !important;
}
.big * {
  font-size: 16px !important;
}
span {
  font-family: monospace;
  font-style: normal;
  margin-right: 3px;
}
@media only screen and (max-width: 600px) {
  #header,
  #body {
    place-content: center;
  }
}
</style>

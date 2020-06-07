<template>
  <div id="root">
    <div id="header">
      <h3>{{title}}</h3>
      <button class="inline" v-show="!large" @click="visible=!visible">
        <span class="material-icons-outlined">filter_list</span>
        query
      </button>
      <button class="inline" v-show="!isEmpty" @click="reset">
        <span class="material-icons-outlined">clear</span>
        reset
      </button>
    </div>
    <div id="body" v-show="visible">
      <QueryParam :large="large" :text="t" v-model="values[i]" :key="i" v-for="(t, i) in tags" />
    </div>
  </div>
</template>

<script>
import QueryParam from "./QueryParam";

export default {
  name: "QueryList",
  components: {
    QueryParam
  },
  props: ["title", "tags", "large"],
  data() {
    return {
      visible: false,
      values: []
    };
  },
  computed: {
    result() {
      return this.tags.reduce((q, t, i) => {
        if (this.values[i]) q[t] = this.values[i] > 0;
        return q;
      }, {});
    },
    isEmpty() {
      return !Object.keys(this.result).length;
    }
  },
  watch: {
    result: {
      handler() {
        this.$emit("query", this.result);
      },
      immediate: true
    },
    tags: {
      handler() {
        this.reset();
      },
      immediate: true
    }
  },
  created() {
    this.visible = this.large;
  },
  methods: {
    reset() {
      this.values = new Array(this.tags.length).fill(0);
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 0 var(--margin-double) 0 0;
}
#root {
  display: flex;
  flex-flow: column;
  width: 100%;
}
#header {
  height: var(--control-height-small);
}
#body {
  margin-top: var(--margin-double);
  padding: var(--padding);
  place-content: flex-start;
}
#header,
#body {
  display: flex;
  flex-wrap: wrap;
  place-items: center;
  width: 100%;
}
@media only screen and (max-width: 568px) {
  #body {
    flex-direction: column;
    max-height: 100px;
    overflow-y: scroll;
    place-items: flex-start;
  }
}
</style>

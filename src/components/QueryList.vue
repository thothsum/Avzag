<template>
  <div id="root">
    <div id="header">
      <h2>{{title}}</h2>
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
      <QueryParam
        :large="large"
        :text="tag"
        v-model="query[tag]"
        :key="i"
        v-for="(tag, i) in tags"
      />
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
      query: {}
    };
  },
  computed: {
    result() {
      let result = {};
      for (const [key, value] of Object.entries(this.query)) {
        if (value !== 0) result[key] = value === 1;
      }
      return result;
    },
    isEmpty() {
      return Object.keys(this.result).length === 0;
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
        this.query = {};
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
      this.tags.forEach(t => (this.query[t] = 0));
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 0 10px 0 0;
}
#root {
  display: flex;
  flex-flow: column;
  width: 100%;
}
#header,
#body {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  place-items: center;
  width: 100%;
}

#header > a {
  margin-left: 20px;
}
#header > a * {
  font-size: 16px;
}
#body * {
  font-size: 12px;
  cursor: pointer;
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
  font-style: normal;
}
.big > * {
  font-size: 16px !important;
}

@media only screen and (max-width: 600px) {
  #header,
  #body {
    place-content: center;
  }
}
</style>

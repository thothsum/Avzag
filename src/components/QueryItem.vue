<template>
  <div id="query">
    <p id="tag">{{tag}}</p>
    <button id="include" @click="toggle(1)">+</button>
    <button id="exclude" @click="toggle(-1)">-</button>
  </div>
</template>

<script>
export default {
  name: "QueryItem",
  props: ["tag", "enabled"],
  data() {
    return {
      mode: 0
    };
  },
  methods: {
    toggle(mode) {
      this.mode = mode == this.mode ? 0 : mode;
      this.$emit("query", this.mode);
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 2px;
}
button {
  height: 20px;
  width: 20px;
  align-items: center;
}
#query {
  display: flex;
  place-items: center;
  /* border: 1px solid var(--nord4); */
  margin-left: 5px;
}
#tag {
  font-size: 12px;
  font-style: italic;
}
#include {
  font-weight: bold;
  font-size: 14px;
  color: var(--nord10);
}
#exclude {
  font-weight: bold;
  font-size: 14px;
  color: var(--nord11);
}
</style>

<template>
  <p id="query" :class="{ex:this.mode===0, in:this.mode===2}" @click="toggle">{{tag}}</p>
</template>

<script>
export default {
  name: "QueryItem",
  props: ["tag", "clean", "enabled"],
  data() {
    return {
      mode: 1
    };
  },
  watch: {
    clean() {
      this.mode = 1;
    }
  },
  methods: {
    toggle() {
      this.mode = (this.mode + 1) % 3;
      this.$emit("query", this.mode - 1);
    }
  }
};
</script>

<style scoped>
#query {
  margin: 0 5px 0 0;
  padding: 2px 4px;
  font-size: 12px;
  font-style: italic;
  cursor: pointer;
  user-select: none;
}
.in {
  color: var(--nord14);
  font-weight: bolder;
}
.ex {
  font-weight: bolder;
  color: var(--nord11);
}
</style>

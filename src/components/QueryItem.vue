<template>
  <p id="query" :class="{ex:this.mode===0, in:this.mode===2, big:big}" @click="toggle">{{tag}}</p>
</template>

<script>
export default {
  name: "QueryItem",
  props: ["tag", "clean", "enabled", "big"],
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
.big {
  margin: 0 10px 0 0 !important;
  padding: 4px 8px !important;
  font-size: 16px !important;
  text-decoration: underline;
}
</style>

<template>
  <div id="root">
    <input placeholder="search for phonetic features, '-' to exclude" type="text" v-model="input" />
  </div>
</template>

<script>
export default {
  name: "QueryInput",
  data() {
    return {
      input: ""
    };
  },
  computed: {
    result() {
      return this.input
        .toLowerCase()
        .split(" ")
        .filter(s => s)
        .reduce((q, t) => {
          if (t[0] === "-") q[t.substr(1)] = false;
          else q[t] = true;
          return q;
        }, {});
    }
  },
  watch: {
    result: {
      handler() {
        this.$emit("query", this.result);
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
input {
  width: 350px;
}
@media only screen and (max-width: 568px) {
  input {
    width: 100%;
  }
}
</style>

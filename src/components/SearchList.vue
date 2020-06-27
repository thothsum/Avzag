<template>
  <div id="root">
    <input placeholder="search" type="text" v-model="query" />
    <div class="list">
      <button
        :class="{selected: i===selected}"
        @click="$emit('update', i)"
        :key="i"
        v-for="(it, i) in items"
      >{{it}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchList",
  props: ["items", "selected"],
  model: {
    prop: "selected",
    event: "update"
  },
  data() {
    return {
      query: ""
    };
  },
  computed: {
    filtered() {
      return this.items.filter(i => i.includes(this.query));
    }
  }
};
</script>

<style scoped>
#root {
  display: flex;
  flex-direction: column;
}
#root > *:not(:last-child) {
  margin-bottom: var(--margin-double);
}
.list > button {
  border: var(--border-width) solid transparent;
  height: var(--control-height);
}
</style>

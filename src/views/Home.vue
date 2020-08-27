<template>
  <div v-if="catalogue">
    <div id="header" class="section panel-horizontal wrap">
      <h1>Ævzag</h1>
      <div class="panel-horizontal">
        <a href="https://github.com/alkaitagi/Avzag#contacts">Contacts</a>
        <a href="https://github.com/alkaitagi/Avzag#credits">Credits</a>
        <span class="text-dot"></span>
        <a href="https://github.com/alkaitagi/Avzag">GitHub</a>
      </div>
    </div>
    <button v-if="selected.length > 0" @click="load">LOAD</button>
    <div id="languages" class="section panel-horizontal-sparse wrap">
      <div class="panel" :key="c" v-for="(ls, c) of catalogue">
        <div>
          <h2>{{c}}</h2>
        </div>
        <button
          :key="l"
          v-for="l in ls"
          @click="toggleSelection(l)"
          :class="{selected:selected.includes(l)}"
        >
          <span class="icon" hidden>check</span>
          {{l}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    catalogue() {
      return this.$store.state.catalogue;
    },
  },
  methods: {
    toggleSelection(l) {
      const i = this.selected.indexOf(l);
      if (i >= 0) this.selected.splice(i, 1);
      else this.selected.push(l);
    },
    load() {
      this.$store.dispatch("loadLects", this.selected);
      this.$router.push({ name: "Phonology" });
    },
  },
};
</script>

<style lang="scss" scoped>
#languages {
  place-content: center;
  > * {
    flex: 1;
    min-width: 256px;
    height: 192px;
  }
}
button.selected {
  &,
  * {
    color: var(--color-highlight);
  }
  .icon {
    display: initial;
  }
}
</style>

<template>
  <div class="panel-sparse" id="root">
    <div id="header" class="panel-horizontal wrap">
      <div class="panel-horizontal-sparse" id="title">
        <h1>Ævzag</h1>
        <button @click="load" class="highlight">
          <h1 class="icon">arrow_forward</h1>
        </button>
      </div>
      <div class="panel-horizontal">
        <a href="https://github.com/alkaitagi/Avzag#contacts">Contacts</a>
        <a href="https://github.com/alkaitagi/Avzag#credits">Credits</a>
        <span class="text-dot"></span>
        <a href="https://github.com/alkaitagi/Avzag">GitHub</a>
      </div>
    </div>
    <LectFamily :key="i" v-for="(f, i) in catalogue" :family="f" />
  </div>
</template>

<script>
import LectFamily from "@/components/LectFamily";

export default {
  name: "Home",
  components: {
    LectFamily,
  },
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
      // this.$store.dispatch("loadLects", this.selected);
      this.$store.dispatch("loadLects", ["Iron", "Kaitag"]);
      this.$router.push({ name: "Phonology" });
    },
  },
};
</script>

<style lang="scss" scoped>
#header {
  z-index: 2;
  justify-content: space-between;
  background-color: var(--color-foreground);
  border-radius: 0;
  box-shadow: map-get($shadows, "elevated");
  position: fixed;
  top: 0;
  width: 100%;
  margin: -1 * map-get($margins, "normal");
  padding: map-get($margins, "normal");
  padding-top: map-get($margins, "double");
}
#title {
  h1 {
    flex: 0;
  }
}
#root {
  padding-top: 64px;
}

@media only screen and (max-width: $mobile-width) {
  #header {
    flex-direction: column;
    justify-content: center;
  }
  #root {
    padding-top: 98px;
  }
}
</style>

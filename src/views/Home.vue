<template>
  <div class="panel-sparse scroll">
    <div id="header" class="panel-horizontal wrap">
      <h1>Ævzag</h1>
      <div class="panel-horizontal">
        <a href="https://github.com/alkaitagi/Avzag#contacts">Contacts</a>
        <a href="https://github.com/alkaitagi/Avzag#credits">Credits</a>
        <span class="text-dot"></span>
        <a href="https://github.com/alkaitagi/Avzag">GitHub</a>
      </div>
    </div>
    <button @click="load">LOAD</button>
    <LectFamily :key="i" v-for="(f, i) in catalogue" :family="f" />
  </div>
</template>

<script>
import LectFamily from "@/components/LectFamily";

export default {
  name: "Home",
  components: { LectFamily },
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

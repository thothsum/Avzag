<template>
  <div class="section panel-sparse small">
    <div class="panel-horizontal-dense wrap card">
      <router-link to="/home">Home</router-link>
      <p class="text-dot" />
      <router-link to="/editor/phonology">Phonology</router-link>
      <router-link to="/editor/converter">Converter</router-link>
      <router-link to="/editor/phrasebook">Phrasebook</router-link>
      <Button @click.native="loadFromLect" text="load from lect" />
      <Button @click.native="loadFromJson" text="load from JSON" />
      <Button @click.native="saveToJson" text="save JSON to clipboard" />
      <Button @click.native="reset" text="reset" />
    </div>
    <div class="grid small">
      <div class="panel-dense">
        <div class="panel-horizontal-dense">
          <h2 class="flex">Phrases</h2>
          <Button @click.native="addMapping" icon="add" />
        </div>
        <List
          :value.sync="selected"
          :items="phrasebook"
          indexed="true"
          display="preview"
        />
      </div>
      <div v-if="phrase">
        <Button v-if="!translation" text="create translation" icon="add" />
        <div v-else>
          <h2 class="flex">Blocks</h2>
          <div
            class="panel-horizontal-dense"
            :key="i"
            v-for="(b, i) in translation.blocks"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
// import Select from "@/components/Select";
import List from "@/components/List";

export default {
  name: "PhrasebookEditor",
  components: {
    Button,
    // Select,
    List,
  },
  data() {
    return {
      file: [],
      selected: 0,
      context: [],
    };
  },
  computed: {
    phrasebook() {
      return this.$store.state.phrasebook;
    },
    phrase() {
      return this.phrasebook[this.selected];
    },
    translation() {
      return this.file[this.selected];
    },
  },
  methods: {
    loadFromLect() {
      fetch(
        this.$store.state.root +
          window.prompt("Enter lect name") +
          "/phrasebook.json"
      )
        .then((r) => r.json())
        .then((j) => {
          if (j) this.file = j;
        });
    },
    loadFromJson() {
      const file = JSON.parse(window.prompt("Enter JSON"));
      if (file) this.file = file;
    },
    saveToJson() {
      navigator.clipboard.writeText(JSON.stringify(this.file));
    },
    addTranslation() {
      while ((this, this.file.length < this.selected)) this.file.push({});
      this.file[this.selected] = { blocks: {} };
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-top: -1 * map-get($margins, "double");
  padding-top: 2 * map-get($margins, "normal");
}
.grid {
  display: grid;
  grid-template-columns: 352px 1fr;
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>

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
        <div class="panel-horizontal-dense">
          <h2 class="flex">Blocks</h2>
          <Button @click.native="addBlock" icon="add" />
        </div>
        <template v-if="translation">
          <div
            class="panel-dense wrap"
            :key="i"
            v-for="(b, i) in translation.blocks"
          >
            <div class="panel-horizontal-dense">
              <h2 class="flex">Block 1</h2>
              <Button @click.native="addState(i)" icon="add" />
            </div>
            <div class="panel-dense wrap" :key="j" v-for="(s, j) in b.states">
              <p>State {{ j }}</p>
              <div class="panel-horizontal-dense">
                <input class="flex" type="text" v-model="b.text" />
                <input class="flex" type="text" v-model="b.ipa" />
                <input class="flex" type="text" v-model="b.glossing" />
              </div>
              <input class="flex" type="text" v-model="b.transition" />
              <Button v-model="b.implicit" text="implicit" />
              <ConditionsEditor
                header="Conditions"
                :conditions.sync="b.conditions"
                :context="context"
                :enablePassive="true"
              />
            </div></div
        ></template>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
// import Select from "@/components/Select";
import List from "@/components/List";
// import PhraseBlock from "@/components/PhraseBlock";
import ConditionsEditor from "@/components/ConditionsEditor";

export default {
  name: "PhrasebookEditor",
  components: {
    Button,
    // Select,
    List,
    // PhraseBlock,
    ConditionsEditor,
  },
  data() {
    return {
      file: [],
      selected: 0,
      context: {},
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
    blocks() {
      return this.translation.blocks;
    },
  },
  watch: {
    phrase: {
      handler() {
        console.log(this.phrase?.context);
        this.context =
          this.phrase?.context?.reduce((acc, s) => {
            acc[s.entity] = new Set(s.tags.split(" "));
            return acc;
          }, {}) ?? {};
      },
      immediate: true,
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
    addBlock() {
      if (!this.translation) {
        while ((this, this.file.length < this.selected)) this.file.push({});
        this.$set(this.file, this.selected, {});
      }
      if (!this.blocks) this.$set(this.translation, "blocks", []);
      this.$set(this.blocks, this.blocks.length, { states: [] });
      this.$forceUpdate();
    },
    addState(i) {
      if (!this.blocks[i].states) this.$set(this.blocks[i], "states", []);
      this.$set(this.blocks[i].states, this.blocks[i].states.length, {
        transition: "next",
      });
      this.$forceUpdate();
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

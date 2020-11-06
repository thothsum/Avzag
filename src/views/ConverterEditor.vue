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
      <div class="panel-sparse" v-if="file">
        <div class="panel-dense">
          <div class="panel-horizontal-dense">
            <h2 class="flex">Mappings</h2>
            <Button @click.native="addMapping" icon="add" />
          </div>
          <List :value.sync="mapping" :items="mappings" display="name" />
        </div>
        <template v-if="file">
          <div class="panel-dense">
            <h2>Sample text</h2>
            <p class="text-caption text-faded">
              Text that will be displayed to demonstrate the conversion.
            </p>
            <textarea v-model="file.sample" />
          </div>
          <div class="panel-dense">
            <h2>Default conversion</h2>
            <p class="text-caption text-faded">
              Two mappings that will be set by default. The left should be set
              to the sample's original writing system.
            </p>
            <div class="panel-horizontal-dense" v-if="defaultConversion">
              <p class="icon">south</p>
              <div class="panel-dense flex">
                <Select
                  :value.sync="defaultConversion[0]"
                  :items="mappings"
                  display="name"
                  indexed="true"
                />
                <Select
                  :value.sync="defaultConversion[1]"
                  :items="mappings"
                  display="name"
                  indexed="true"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="panel-sparse" v-if="mapping">
        <div class="panel-horizontal-dense">
          <h2>Name</h2>
          <input type="text" v-model="mapping.name" />
          <Button @click.native="deleteMapping" icon="delete" />
        </div>
        <div class="panel-dense">
          <div class="panel-horizontal-dense">
            <h2 class="flex">Pairs</h2>
            <Button @click.native="addPair(pairs.length)" icon="add" />
          </div>
          <p class="text-caption text-faded">
            During conversion system will consuquently go over these pairs,
            replacing text from the left with the text from the right or vise
            versa (right with left) if conversion is reversed.
          </p>
          <div class="panel-horizontal-dense" :key="i" v-for="(p, i) in pairs">
            <Button @click.native="addPair(i)" icon="vertical_align_top" />
            <input class="flex" type="text" v-model="p[0]" placeholder="from" />
            <input class="flex" type="text" v-model="p[1]" placeholder="to" />
            <Button @click.native="deletePair(i)" icon="clear" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Select from "@/components/Select";
import List from "@/components/List";

export default {
  name: "ConverterEditor",
  components: {
    Button,
    Select,
    List,
  },
  data() {
    return {
      file: [],
      mapping: undefined,
    };
  },
  computed: {
    mappings() {
      return this.file?.mappings ?? [];
    },
    defaultConversion() {
      return this.file.default;
    },
    pairs() {
      return this.mapping?.pairs ?? [];
    },
  },
  mounted() {
    try {
      const file = JSON.parse(localStorage.cEditor);
      if (file) this.file = file;
      return;
    } catch (error) {
      console.log(error);
    }
    this.reset();
  },
  updated() {
    localStorage.cEditor = JSON.stringify(this.file);
  },
  methods: {
    addMapping() {
      this.mapping = { name: "newMapping", pairs: [] };
      this.mappings.push(this.mapping);
    },
    deleteMapping() {
      this.mappings.splice(this.mappings.indexOf(this.mapping), 1);
      this.mapping = this.mappings[this.mappings.length - 1];
    },
    addPair(i) {
      this.mapping.pairs.splice(i, 0, ["", ""]);
    },
    deletePair(i) {
      this.$delete(this.mapping.pairs, i);
    },
    loadFromLect() {
      fetch(
        this.$store.state.root +
          window.prompt("Enter lect name") +
          "/converter.json"
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
    reset() {
      this.file = { default: [0, 0], mappings: [] };
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
  grid-template-columns: 352px minmax(0, 1fr);
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>

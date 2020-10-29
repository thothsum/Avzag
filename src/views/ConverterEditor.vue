<template>
  <div class="section panel-sparse small">
    <div class="panel-horizontal-dense wrap card">
      <router-link to="/home">Home</router-link>
      <p class="text-dot" />
      <router-link to="/editor/phonology">Phonology</router-link>
      <router-link to="/editor/converter">Converter</router-link>
      <Button @click.native="loadFromLect" text="load from lect" />
      <Button @click.native="loadFromJson" text="load from JSON" />
      <Button @click.native="saveToJson" text="save JSON to clipboard" />
      <Button @click.native="reset" text="reset" />
    </div>
    <div class="grid small">
      <div class="panel" v-if="file">
        <template v-if="file">
          <h2>Sample text</h2>
          <p class="text-caption text-faded">
            Text that will be displayed to demonstrate the conversion.
          </p>
          <textarea v-model="file.sample" />
          <h2>Default conversion</h2>
          <p class="text-caption text-faded">
            Two mappings that will be set by default. The left should be set to
            the sample's original writing system.
          </p>
          <div class="panel-dense" v-if="defaultConversion">
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
        </template>
        <div class="panel-horizontal-dense">
          <h2 class="flex">Mappings</h2>
          <Button @click.native="addMapping" icon="add" />
        </div>
        <List :value.sync="mapping" :items="mappings" display="name" />
      </div>
      <div class="panel" v-if="mapping">
        <h2>Mapping name</h2>
        <p class="text-caption text-faded">
          Select 'partial' if there are two or more mapping pairs that result in
          the same text. I.e. th-ð & th-θ.
        </p>
        <div class="panel-horizontal">
          <input class="flex" type="text" v-model="mapping.name" />
          <Button
            v-model="mapping.partial"
            icon="sync_disabled"
            text="Partial"
          />
        </div>
        <div class="panel-horizontal-dense">
          <h2 class="flex">Pairs</h2>
          <Button @click.native="addPair(pairs.length)" icon="add" />
        </div>
        <div class="panel-solid">
          <p class="text-caption text-faded">
            During conversion system will consuquently go over these pairs,
            replacing text from the left with the text from the right or vise
            versa (right with left) if conversion is reversed.
          </p>
          <div class="panel-horizontal-solid" :key="i" v-for="(p, i) in pairs">
            <input class="flex" type="text" v-model="p[0]" placeholder="from" />
            <input class="flex" type="text" v-model="p[1]" placeholder="to" />
            <Button @click.native="addPair(i)" icon="vertical_align_top" />
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
      let m = { name: "newMapping", pairs: [] };
      this.mappings.push(m);
      this.mapping = m;
    },
    addPair(i) {
      this.mapping.pairs.splice(i, 0, ["", ""]);
    },
    deletePair(i) {
      this.mapping.pairs.splice(i, 1);
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
      this.mapping = null;
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
  grid-template-columns: 300px 1fr;
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>

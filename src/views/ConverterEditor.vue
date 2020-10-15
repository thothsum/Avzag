<template>
  <div class="section">
    <div class="panel">
      <div class="panel-horizontal-dense">
        <Button @click.native="loadFromLect" text="import from lect" />
        <Button @click.native="loadFromJson" text="load from JSON" />
        <Button @click.native="saveToJson" text="save JSON to clipboard" />
        <Button @click.native="reset" text="reset" />
      </div>
      <div class="panel scroll">
        <template v-if="file">
          <h2>Sample text</h2>
          <textarea v-model="file.sample" />
          <h2>Default conversion</h2>
          <div class="panel-horizontal-solid pair">
            <input
              class="flex"
              type="text"
              v-model="file.default[0]"
              placeholder="from"
            />
            <input
              class="flex"
              type="text"
              v-model="file.default[1]"
              placeholder="to"
            />
          </div>
        </template>
        <div class="panel-horizontal-dense">
          <h2 class="flex">Mappings</h2>
          <Button @click.native="addMapping" icon="add" />
        </div>
        <div class="panel-solid">
          <Button
            :key="i"
            v-for="(m, i) in mappings"
            @click.native="mapping = m"
            :text="m.name"
            :class="{ highlight: m == mapping }"
          />
        </div>
      </div>
    </div>
    <div class="panel">
      <template v-if="mapping">
        <h2>Mapping name</h2>
        <input type="text" v-model="mapping.name" />
        <Button v-model="mapping.partial" icon="sync_disabled" text="Partial" />
        <div class="panel-horizontal-dense">
          <h2 class="flex">Pairs</h2>
          <Button @click.native="addPair(pairs.length)" icon="add" />
        </div>
        <div class="panel-solid">
          <div
            class="panel-horizontal-solid pair"
            :key="i"
            v-for="(p, i) in pairs"
          >
            <input class="flex" type="text" v-model="p[0]" placeholder="from" />
            <input class="flex" type="text" v-model="p[1]" placeholder="to" />
            <Button
              class="small"
              @click.native="addPair(i)"
              icon="vertical_align_top"
            />
            <Button class="small" @click.native="deletePair(i)" icon="clear" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "ConverterEditor",
  components: {
    Button,
  },
  data() {
    return {
      file: [],
      pair: undefined,
      mapping: undefined,
    };
  },
  computed: {
    mappings() {
      return this.file?.mappings ?? [];
    },
    pairs() {
      return this.mapping?.pairs ?? [];
    },
    jsonOutput() {
      return JSON.stringify(this.file);
    },
  },
  mounted() {
    this.file = JSON.parse(localStorage.cEditor);
    if (!this.file) this.reset();
  },
  updated() {
    localStorage.cEditor = this.jsonOutput;
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
      navigator.clipboard.writeText(this.jsonOutput);
    },
    reset() {
      this.file = { default: [0, 0], mappings: [] };
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: map-get($margins, "double");
}
.pair {
  > input {
    height: map-get($button-height, "small");
    width: 64px;
  }
}
@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>

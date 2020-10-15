<template>
  <div class="section" v-if="file">
    <div class="panel">
      <div class="panel">
        <div class="panel-horizontal-dense">
          <Button @click.native="loadFromLect" text="import from lect" />
          <Button @click.native="loadFromJson" text="import from JSON" />
          <Button @click.native="loadToJson" text="export to JSON" />
          <Button @click.native="reset" text="reset" />
        </div>
        <textarea v-model="jsonInput"></textarea>
      </div>
      <div class="panel scroll">
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
    <div>
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
      jsonInput: null,
      mapping: undefined,
    };
  },
  computed: {
    jsonOutput() {
      return JSON.stringify(this.file);
    },
    mappings() {
      return this.file?.mappings ?? [];
    },
    pairs() {
      return this.mapping?.pairs ?? [];
    },
  },
  mounted() {
    this.file = JSON.parse(localStorage.cEditor) ?? {};
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
      fetch(this.$store.state.root + this.jsonInput + "/converter.json")
        .then((r) => r.json())
        .then((j) => {
          if (j) this.file = j;
        });
    },
    loadFromJson() {
      const json = JSON.parse(this.jsonInput);
      if (json) this.file = json;
    },
    loadToJson() {
      this.jsonInput = this.jsonOutput;
    },
    reset() {
      this.file = { defaults: [], mappings: [] };
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

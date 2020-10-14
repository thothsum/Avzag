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
    <div></div>
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
      mapping: undefined,
      jsonInput: null,
    };
  },
  computed: {
    mappings() {
      return this.file?.mappings ?? [];
    },
    jsonOutput() {
      return JSON.stringify(this.file);
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
    deletePhoneme() {
      let i = this.file.indexOf(this.phoneme);
      this.file.splice(i, 1);
      this.phoneme = this.file[this.file.length - 1];
    },
    addItem(key, value) {
      if (!this.phoneme[key]) this.phoneme[key] = [];
      this.phoneme[key].push(value);
      this.$forceUpdate();
    },
    deleteItem(i, key) {
      this.phoneme[key].splice(i, 1);
      if (this.phoneme[key].length == 0) delete this.phoneme[key];
      this.$forceUpdate();
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
      this.file = JSON.parse("[]");
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
.edit,
.sample {
  gap: map-get($margins, "half");
  display: grid;
  grid-template-columns: 64px 1fr 1fr;
  * {
    width: 100%;
    height: 100%;
  }
}
.edit {
  grid-template-columns: 1fr 36px;
}

@media only screen and (max-width: $mobile-width) {
  .section {
    grid-template-columns: 1fr;
    direction: ltr;
  }
}
</style>

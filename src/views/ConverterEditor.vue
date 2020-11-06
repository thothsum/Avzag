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
      <ButtonAlert @confirm="reset" text="Reset" />
    </div>
    <div class="grid small">
      <div class="panel-sparse">
        <ActionHeader button="" icon="subject" header="Sample Text">
          <template #caption>
            Text that will be displayed to demonstrate the converter.
          </template>
          <textarea v-model="file.sample" />
        </ActionHeader>
        <ActionHeader
          button=""
          icon="compare_arrows"
          header="Default Conversion"
        >
          <template #caption>
            Two mappings that will be set by default. The left should be set to
            the sample's original writing system.
          </template>
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
        </ActionHeader>
        <ActionHeader @action="addMapping" icon="call_merge" header="Mappings">
          <div
            class="panel-horizontal-dense"
            :key="i"
            v-for="(m, i) in mappings"
          >
            <Button
              @click.native="mapping = m"
              :class="{ highlight: mapping == m }"
              icon="format_list_numbered"
            />
            <input class="flex" type="text" v-model="m.name" />
            <ButtonAlert @confirm="deleteMapping" />
          </div>
        </ActionHeader>
      </div>
      <ActionHeader
        v-if="mapping"
        @action="addPair(pairs.length)"
        icon="format_list_numbered"
        header="Pairs"
      >
        <template #caption>
          During conversion system will consuquently go over these pairs,
          replacing text from the left with the text from the right or vise
          versa (right with left) if conversion is reversed.</template
        >
        <div class="panel-horizontal-dense" :key="i" v-for="(p, i) in pairs">
          <Button @click.native="addPair(i)" icon="add" />
          <input class="flex" type="text" v-model="p[0]" placeholder="from" />
          <input class="flex" type="text" v-model="p[1]" placeholder="to" />
          <Button @click.native="deletePair(i)" icon="clear" />
        </div>
      </ActionHeader>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import ButtonAlert from "@/components/ButtonAlert";
import ActionHeader from "@/components/ActionHeader";
import Select from "@/components/Select";

export default {
  name: "ConverterEditor",
  components: {
    Button,
    ButtonAlert,
    ActionHeader,
    Select,
  },
  data() {
    return {
      file: [],
      mapping: {},
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

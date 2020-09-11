<template>
  <div class="section panel">
    <ChipsSelect v-model="selectedLect" :items="lects" itemKey="name" />
    <div class="split" v-if="converter">
      <div class="panel">
        <div class="panel-horizontal">
          <Select v-model="sourceMapping" :items="mappings" itemKey="name" />
          <Toggle v-model="empty" :icons="['subject','clear']" />
          <!-- <button @click="empty=!source" class="icon">{{source?"subject":"clear"}}</button> -->
          <Button @click.native="$refs.file.click()" icon="publish" />
          <Button v-show="!resultMapping.many21" @click.native="swap" icon="swap_horiz" />
        </div>
        <ConverterText :source="source" :mapping="sourcePairs" @result="intermediate=$event" />
        <MappingTable v-if="showMapping" :mapping="sourcePairs" />
      </div>
      <div class="panel">
        <div class="panel-horizontal">
          <Select v-model="resultMapping" :items="mappings" itemKey="name" />
          <Toggle v-model="showMapping" :icons="['visibility','visibility_off']" />
          <Button @click.native="copy" icon="file_copy" />
        </div>
        <ConverterText
          ref="resultText"
          :readonly="true"
          :source="intermediate"
          :mapping="resultPairs"
          @result="result=$event"
        />
        <MappingTable v-if="showMapping" :mapping="resultPairs" />
      </div>
    </div>
    <h2 v-else>No data for this lect</h2>
    <input v-show="false" type="file" accept=".txt" ref="file" @change="upload" />
    <a v-show="false" ref="link"></a>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Toggle from "@/components/Toggle";
import Select from "@/components/Select";

import ChipsSelect from "@/components/ChipsSelect";
import MappingTable from "@/components/MappingTable";
import ConverterText from "@/components/ConverterText";

export default {
  name: "Converter",
  components: {
    Button,
    Toggle,
    Select,
    ChipsSelect,
    MappingTable,
    ConverterText,
  },
  data() {
    return {
      selectedLect: undefined,
      source: "",
      sourceMapping: undefined,
      result: "",
      resultMapping: undefined,
      empty: false,
      intermediate: "",
      showMapping: false,
    };
  },
  computed: {
    lects() {
      const st = this.$store.state.lects;
      return Object.keys(st).map((n) => {
        let l = st[n];
        l.name = n;
        return l;
      });
    },
    converter() {
      return this.selectedLect?.converter;
    },
    mappings() {
      return this.converter?.mappings;
    },
    sourcePairs() {
      return this.sourceMapping.pairs;
    },
    resultPairs() {
      return this.resultMapping.pairs.map((m) => [m[1], m[0]]) ?? [];
    },
    defaultConversion() {
      return this.converter?.defaultConversion;
    },
    sample() {
      return this.converter?.sample ?? "";
    },
  },
  watch: {
    mappings(m) {
      this.sourceMapping = m[0];
      this.resultMapping = m[1];
    },
    defaultConversion(c) {
      this.sourceMapping = this.mappings[c[0]];
      this.resultMapping = this.mappings[c[1]];
    },
    sample(s) {
      this.source = s;
    },
    empty(e) {
      this.source = e ? this.sample : "";
    },
  },
  methods: {
    swap() {
      const source = this.result;
      const mapping = this.sourceMapping;
      this.sourceMapping = this.resultMapping;
      this.resultMapping = mapping;
      this.source = source;
    },
    upload(event) {
      let reader = new FileReader();
      reader.onload = (e) =>
        this.download(
          event.target.files[0].name,
          this.convert(e.target.result)
        );
      reader.readAsText(event.target.files[0]);
    },
    download(filename, text) {
      let link = this.$refs.link;
      link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
      link.download = filename;
      link.click();
    },
    copy() {
      this.$refs.resultText.$refs.textarea.select();
      document.execCommand("copy");
    },
  },
};
</script>

<style lang="scss" scoped>
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .split {
    grid-template-columns: 1fr;
  }
  select {
    flex: 1;
  }
}
</style>

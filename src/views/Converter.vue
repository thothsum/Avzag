<template>
  <div class="section panel">
    <ChipsSelect v-model="selectedLect" :items="lects" itemKey="name" />
    <div class="split" v-if="converter">
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="sourceMapping">
            <option :value="m" :key="m.name" v-for="m in mappings">{{m.name}}</option>
          </select>
          <button @click="empty=!source" class="icon">{{source?"subject":"clear"}}</button>
          <button @click="$refs.file.click()" class="icon">publish</button>
          <button v-show="!sourceMapping.many21" @click="swap" class="icon">swap_horiz</button>
        </div>
        <ConverterText :source="source" :mapping="sourcePairs" @result="intermediate=$event" />
        <MappingTable v-if="showMapping" :mapping="sourcePairs" />
      </div>
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="resultMapping">
            <option :value="m" :key="m.name" v-for="m in mappings">{{m.name}}</option>
          </select>
          <button
            @click="showMapping=!showMapping"
            class="icon"
          >{{showMapping?'visibility_off':'visibility'}}</button>
          <button @click="copy" class="icon">file_copy</button>
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
import ChipsSelect from "@/components/ChipsSelect";
import MappingTable from "@/components/MappingTable";
import ConverterText from "@/components/ConverterText";

export default {
  name: "Converter",
  components: {
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
      this.sourceMapping = this.mappings.find((m) => m.name == c[0]);
      this.resultMapping = this.mappings.find((m) => m.name == c[1]);
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

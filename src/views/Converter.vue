<template>
  <div class="section panel">
    <ChipsSelect v-model="selectedLect" :items="lectNames" />
    <div class="split" v-if="converter">
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="mappingFrom">
            <option :value="n" :key="n" v-for="n in many21Names">{{n}}</option>
          </select>
          <button @click="empty=!source" class="icon">{{source?"subject":"clear"}}</button>
          <button @click="$refs.file.click()" class="icon">publish</button>
          <button v-show="canSwap" @click="swap" class="icon">swap_horiz</button>
        </div>
        <ConverterText :source="source" :mapping="mappingSource" @result="intermediate=$event" />
        <MappingTable v-if="showMapping" :mapping="mappingSource" />
      </div>
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="mappingTo">
            <option :value="n" :key="n" v-for="n in mappingNames">{{n}}</option>
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
          :mapping="mappingResult"
          @result="result=$event"
        />
        <MappingTable v-if="showMapping" :mapping="mappingResult" />
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
      selectedLect: "",
      mappingFrom: "",
      mappingTo: "",
      source: "",
      empty: false,
      intermediate: "",
      result: "",
      showMapping: false,
    };
  },
  computed: {
    lects() {
      return this.$store.state.lects;
    },
    lectNames() {
      return Object.keys(this.lects);
    },
    converter() {
      return this.lects[this.selectedLect]?.converter;
    },
    defaultConversion() {
      return this.converter?.defaultConversion;
    },
    mappings() {
      return this.converter.mappings;
    },
    mappingNames() {
      return Object.keys(this.mappings);
    },
    many21Names() {
      return this.mappingNames.filter((n) => !this.mappings[n].many21);
    },
    canSwap() {
      return this.many21Names.includes(this.mappingTo);
    },
    sample() {
      return this.converter?.sample ?? "";
    },
    mappingSource() {
      return this.mappings[this.mappingFrom]?.pairs;
    },
    mappingResult() {
      return this.mappings[this.mappingTo]?.pairs?.map((m) => [m[1], m[0]]);
    },
  },
  watch: {
    defaultConversion(c) {
      this.mappingFrom = c[0];
      this.mappingTo = c[1];
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
      let source = this.result;
      let from = this.mappingFrom;
      this.mappingFrom = this.mappingTo;
      this.mappingTo = from;
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

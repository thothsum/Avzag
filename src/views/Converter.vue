<template>
  <div class="section">
    <ChipsSelect v-model="selectedLect" :items="lectNames" />
    <!-- <div class="split">
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="mappingFrom">
            <option
              :value="cn.i"
              :key="cn.i"
              v-for="cn in converters.filter(c => !c.many21)"
            >{{cn.name}}</option>
          </select>
          <button @click="empty=!empty" class="icon">{{empty ? "subject":"clear"}}</button>
          <button @click="$refs.file.click()" class="icon">publish</button>
          <button v-show="!converters[this.mappingTo].many21" @click="swap" class="icon">swap_horiz</button>
        </div>
        <ConverterText :source="source" :mapping="mappingSource" @result="intermediate=$event" />
        <MappingTable v-if="showMapping" :mapping="mappingSource" />
      </div>
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="mappingTo">
            <option :value="cn.i" :key="cn.i" v-for="cn in converters">{{cn.name}}</option>
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
    <input v-show="false" type="file" accept=".txt" ref="file" @change="upload" />
    <a v-show="false" ref="link"></a>-->
  </div>
</template>

<script>
import ChipsSelect from "@/components/ChipsSelect";
// import MappingTable from "@/components/MappingTable";
// import ConverterText from "@/components/ConverterText";

export default {
  name: "Converter",
  components: {
    ChipsSelect,
    // MappingTable,
    // ConverterText,
  },
  data() {
    return {
      selectedLect: "",
      mappingFrom: 0,
      mappingTo: 1,
      empty: false,
      source: "",
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
      return Object.keys(this.lects ?? {});
    },
    sample() {
      return this.$store.state.sample;
    },
    converter() {
      return this.lects[this.selectedLect]?.converter;
    },
    mappingSource() {
      return this.converter?.mappings[this.mappingFrom].pairs;
    },
    mappingResult() {
      return this.converter?.mappings[this.mappingTo].pairs.map((m) => [
        m[1],
        m[0],
      ]);
    },
  },
  watch: {
    sample(sample) {
      if (!this.empty) this.source = sample;
    },
    empty(empty) {
      this.source = empty ? "" : this.sample;
      this.$router
        .replace({ query: { ...this.$route.query, empty: empty } })
        .catch(() => {});
    },
    mappingFrom(from) {
      this.$router
        .replace({ query: { ...this.$route.query, from: from } })
        .catch(() => {});
    },
    mappingTo(to) {
      this.$router
        .replace({ query: { ...this.$route.query, to: to } })
        .catch(() => {});
    },
    "$route.query": {
      handler(query) {
        this.empty = query.empty;
        this.mappingFrom = query.from ?? 0;
        this.mappingTo = query.to ?? 1;
      },
      immediate: true,
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

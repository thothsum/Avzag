<template>
  <div class="section" v-if="converters">
    <div class="split">
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="mappingFrom">
            <option
              :value="cn.i"
              :key="cn.i"
              v-for="cn in converters.filter(c => !c.many21)"
            >{{cn.name}}</option>
          </select>
          <button @click="empty=!empty">
            <span v-if="empty" class="icon">subject</span>
            <span v-else class="icon">clear</span>
          </button>
          <button @click="$refs.file.click()">
            <span class="icon">publish</span>
          </button>
          <button v-show="!converters[this.mappingTo].many21" @click="swap">
            <span class="icon">swap_horiz</span>
          </button>
        </div>
        <ConverterText :source="source" :mapping="mappingSource" @result="intermediate=$event" />
        <MappingTable v-if="showMapping" :mapping="mappingSource" />
      </div>
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="mappingTo">
            <option :value="cn.i" :key="cn.i" v-for="cn in converters">{{cn.name}}</option>
          </select>
          <button @click="showMapping=!showMapping">
            <span v-if="showMapping" class="icon">visibility_off</span>
            <span v-else class="icon">visibility</span>
          </button>
          <button @click="copy">
            <span class="icon">file_copy</span>
          </button>
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
    <a v-show="false" ref="link"></a>
  </div>
</template>

<script>
import MappingTable from "@/components/MappingTable";
import ConverterText from "@/components/ConverterText";

export default {
  name: "Converter",
  components: {
    MappingTable,
    ConverterText,
  },
  data() {
    return {
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
    sample() {
      return this.$store.state.sample;
    },
    converters() {
      return this.$store.state.converters;
    },
    mappingSource() {
      return this.converters[this.mappingFrom].mapping;
    },
    mappingResult() {
      return this.converters[this.mappingTo].mapping.map((m) => [m[1], m[0]]);
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

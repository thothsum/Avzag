<template>
  <div class="section" v-if="converters">
    <div class="split">
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="mappingFrom">
            <option
              :value="i"
              :key="i"
              v-for="(cnv, i) in converters.filter(c => !c.many21)"
            >{{cnv.name}}</option>
          </select>
          <button @click="$refs.file.click()">
            <span class="icon">publish</span>
          </button>
          <button v-show="!converters[this.mappingTo].many21" @click="swap">
            <span class="icon">swap_horiz</span>
          </button>
        </div>
        <textarea v-model="source"></textarea>
        <MappingTable v-show="showMapping" :mapping="mappingSource" />
      </div>
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="mappingTo">
            <option :value="i" :key="i" v-for="(cnv, i) in converters">{{cnv.name}}</option>
          </select>
          <button @click="showMapping=!showMapping">
            <span v-if="showMapping" class="icon">visibility_off</span>
            <span v-else class="icon">visibility</span>
          </button>
          <button @click="copy">
            <span class="icon">file_copy</span>
          </button>
        </div>
        <textarea readonly ref="result" :value="result"></textarea>
        <MappingTable v-show="showMapping" :mapping="mappingResult" />
      </div>
    </div>
    <input v-show="false" type="file" ref="file" @change="upload" />
    <a v-show="false" ref="link"></a>
  </div>
</template>

<script>
import MappingTable from "@/components/MappingTable";

export default {
  name: "Converter",
  components: {
    MappingTable
  },
  data() {
    return {
      mappingFrom: 0,
      mappingTo: 1,
      source: "",
      showMapping: false
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
      return this.getMapping(this.mappingFrom);
    },
    mappingResult() {
      return this.getMapping(this.mappingTo, true);
    },
    intermediate() {
      let source = " " + this.replace(this.source, "\n", "\n ").trim();
      return this.convert(source, this.mappingSource);
    },
    result() {
      let intermediate = this.convert(this.intermediate, this.mappingResult);
      return this.replace(intermediate, "\n ", "\n").trim();
    }
  },
  watch: {
    sample: {
      handler() {
        this.source = this.sample;
      },
      immediate: true
    },
    mappingFrom(from) {
      // print(this.intermediate);
      // this.source = this.convert(
      //   this.intermediate,
      //   this.getMapping(from, true)
      // );

      this.$router
        .replace({ query: { ...this.$route.query, from: from } })
        .catch(() => {});
    },
    mappingTo(to) {
      this.$router
        .replace({ query: { ...this.$route.query, to: to } })
        .catch(() => {});
    },
    "$route.query": function(query) {
      this.mappingFrom = query.from ?? 0;
      this.mappingTo = query.to ?? 1;
    }
  },
  methods: {
    getMapping(index, reverse = false) {
      let mapping = this.converters[index].mapping;
      let ones = mapping
        .filter(m => m[0].includes("ӏ"))
        .map(m => [m[0].replace(new RegExp("ӏ", "g"), "1"), m[1]]);
      mapping = mapping.concat(ones);

      if (reverse)
        mapping = mapping.filter(m => m[1] !== "").map(m => [m[1], m[0]]);
      return mapping;
    },
    uppercase(str) {
      let base = "";
      let i = 0;
      if (str.charAt(0) == " ") {
        base = " ";
        i = 1;
      }
      return base + str.charAt(i).toUpperCase() + str.slice(i + 1);
    },
    replace(str, from, to) {
      return str.replace(new RegExp(from, "g"), to);
    },
    convert(source, mapping) {
      for (const [from, to] of mapping) {
        source = this.replace(source, from, to);
        source = this.replace(source, this.uppercase(from), this.uppercase(to));
      }
      return source;
    },
    swap() {
      let source = this.result;
      let from = this.mappingFrom;
      this.mappingFrom = this.mappingTo;
      this.mappingTo = from;
      this.source = source;
    },
    copy() {
      this.$refs.result.select();
      document.execCommand("copy");
    },
    upload(event) {
      let reader = new FileReader();
      reader.onload = e =>
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
    }
  }
};
</script>

<style lang="scss" scoped>
textarea {
  padding: map-get($margins, "normal");
  height: 250px;
}
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: map-get($margins, "normal");
  place-items: stretch;
}
@media only screen and (max-width: $mobile-width) {
  .split {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: stretch;
  }
}
</style>

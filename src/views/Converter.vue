<template>
  <div class="section" v-if="converters">
    <div class="split">
      <div class="panel">
        <div class="panel-horizontal">
          <select v-model="mappingFrom">
            <option :value="i" :key="i" v-for="(cnv, i) in converters">{{cnv.name}}</option>
          </select>
          <button @click="$refs.file.click()">
            <span class="icon">publish</span>
          </button>
          <button @click="showMapping=!showMapping">
            <span class="icon">visibility</span>
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
      var entries = Object.entries(this.converters[this.mappingFrom].mapping);
      var ones = entries
        .filter(a => a[0].includes("ӏ"))
        .map(a => [a[0].replace(new RegExp("ӏ", "g"), "1"), a[1]]);
      return entries.concat(ones);
    },
    mappingResult() {
      var entries = Object.entries(this.converters[this.mappingTo].mapping);
      var ones = entries
        .filter(a => a[0].includes("ӏ"))
        .map(a => [a[0].replace(new RegExp("ӏ", "g"), "1"), a[1]]);

      return entries.concat(ones).map(e => [e[1], e[0]]);
    },
    result() {
      return this.convert(this.source);
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
      this.mappingFrom = query.from;
      this.mappingTo = query.to;
    }
  },
  methods: {
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
    convert(str) {
      str = " " + this.replace(str, "\n", "\n ").trim();
      for (const [from, to] of this.mappingSource) {
        str = this.replace(str, from, to);
        str = this.replace(str, this.uppercase(from), this.uppercase(to));
      }
      for (const [from, to] of this.mappingResult) {
        str = this.replace(str, from, to);
        str = this.replace(str, this.uppercase(from), this.uppercase(to));
      }
      return this.replace(str, "\n ", "\n").trim();
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
  padding: var(--margin-double);
  height: 250px;
}
.split {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  gap: var(--margin-double);
  place-items: stretch;
}
@media only screen and (max-width: 568px) {
  .split {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    align-items: stretch;
  }
}
</style>

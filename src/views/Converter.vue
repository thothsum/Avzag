<template>
  <div class="section" v-if="converters">
    <div class="split">
      <textarea v-model="source"></textarea>
      <textarea readonly ref="result" :value="result"></textarea>
    </div>
    <div id="options">
      <button @click="$refs.file.click()">
        <span class="material-icons-outlined">publish</span>
        Upload .txt file
      </button>
      <select v-model="selected">
        <option :value="i" :key="i" v-for="(cnv, i) in converters">{{cnv.name}}</option>
      </select>
      <button @click="copy">
        <span class="material-icons-outlined">file_copy</span>
        Copy to clipboard
      </button>
    </div>
    <MappingTable :mapping="mapping" />
    <input hidden type="file" ref="file" @change="upload" />
    <a hidden ref="link"></a>
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
      selected: 0,
      source: ""
    };
  },
  computed: {
    sample() {
      return this.$store.state.sample;
    },
    converters() {
      return this.$store.state.converters;
    },
    mapping() {
      var entries = Object.entries(this.converters[this.selected].mapping);
      var ones = entries
        .filter(a => a[0].includes("ӏ"))
        .map(a => [a[0].replace(new RegExp("ӏ", "g"), "1"), a[1]]);
      return entries.concat(ones);
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
      for (const [from, to] of this.mapping) {
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

<style scoped>
textarea {
  padding: 10px;
  height: 250px;
}
#options {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2.5px 0;
}
#options > * {
  margin: 2.5px 0;
}
.split {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  gap: 5px;
  align-items: stretch;
}
@media only screen and (max-width: 600px) {
  .split {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    align-items: stretch;
  }
  #options {
    flex-flow: column;
  }
}
</style>

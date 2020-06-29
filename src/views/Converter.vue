<template>
  <div class="section" v-if="converters">
    <div class="split">
      <textarea v-model="source"></textarea>
      <textarea readonly ref="result" :value="result"></textarea>
    </div>
    <div id="options">
      <button @click="$refs.file.click()">
        <span class="material-icons-outlined">publish</span>
        <p>Upload .txt file</p>
      </button>
      <button @click="showMapping=!showMapping">
        <span class="material-icons-outlined">text_rotation_none</span>
        <p>Show mapping</p>
      </button>
      <select v-model="selected">
        <option :value="i" :key="i" v-for="(cnv, i) in converters">{{cnv.name}}</option>
      </select>
      <button @click="copy">
        <span class="material-icons-outlined">file_copy</span>
        <p>Copy to clipboard</p>
      </button>
    </div>
    <MappingTable v-show="showMapping" :mapping="mapping" />
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
      selected: 0,
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

<style lang="scss" scoped>
textarea {
  padding: var(--margin-double);
  height: 250px;
}
#options {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: var(--margin-double) 0;
}
.split {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  gap: var(--margin-double);
  align-items: stretch;
}
@media only screen and (max-width: 568px) {
  .split {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    align-items: stretch;
  }
  #options {
    flex-flow: column;
  }
  #options > *:not(:last-child) {
    margin: 0 0 var(--margin-double) 0;
  }
}
</style>

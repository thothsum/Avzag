<template>
  <div class="section" v-if="converters">
    <div class="split">
      <textarea v-model="source"></textarea>
      <textarea ref="resTxt" :value="result" readonly></textarea>
    </div>
    <div id="options">
      <button @click="$refs.file.click()">Upload .txt file</button>
      <select v-model="selected">
        <option :value="i" :key="i" v-for="(cnv, i) in converters">{{cnv.name}}</option>
      </select>
      <button @click="copy">Copy to clipboard</button>
    </div>
    <MappingTable :mapping="mapping" />
    <input hidden type="file" ref="file" @change="handleFiles" />
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
      converters: null,
      selected: 0,
      source: ""
    };
  },
  computed: {
    mapping: function() {
      return Object.entries(this.converters[this.selected].mapping);
    },
    result: function() {
      return this.convert(this.source);
    }
  },
  watch: {
    "$route.params.lang": {
      handler: async function(lang) {
        const langRoot = this.$getPath(lang);

        this.converters = await fetch(langRoot + "converters.json").then(r =>
          r.json()
        );
        this.source = await fetch(langRoot + "sample.txt").then(r => r.text());
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
      this.$refs.resTxt.select();
      document.execCommand("copy");
    },
    handleFiles(event) {
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
  margin: 5px 0;
}
#options > * {
  margin: 5px 0;
}
.split {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  align-items: stretch;
}
.split :nth-child(1) {
  border-radius: 4px 0 0 4px;
}
.split :nth-child(2) {
  border-radius: 0 4px 4px 0;
}
@media only screen and (max-width: 600px) {
  .split {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    align-items: stretch;
  }
  .split :nth-child(1) {
    border-radius: 4px 4px 0 0;
  }
  .split :nth-child(2) {
    border-radius: 0 0 4px 4px;
  }
  #options {
    flex-flow: column;
  }
}
</style>

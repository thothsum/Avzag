<template>
  <div class="section panel">
    <ChipsSelect v-model="lect" :items="lects" itemKey="name" />
    <div class="split" v-if="converter">
      <div class="panel">
        <ConverterText :source="source" :mapping="sourceMapping" @result="intermediate=$event">
          <Select v-model="sourceMapping" :items="mappings" itemKey="name" />
          <Toggle v-model="empty" :icons="['subject','clear']" />
          <Button @click.native="$refs.file.click()" icon="publish" />
          <Button v-show="!resultMapping.many21" @click.native="swap" icon="swap_horiz" />
        </ConverterText>
        <MappingTable v-if="showMapping" :mapping="sourceMapping" />
      </div>
      <div class="panel">
        <ConverterText
          ref="resultText"
          :readonly="true"
          :source="intermediate"
          :mapping="resultMapping"
          :reverse="true"
          @result="result=$event"
        >
          <Select v-model="resultMapping" :items="mappings" itemKey="name" />
          <Toggle v-model="showMapping" :icons="['visibility','visibility_off']" />
          <Button @click.native="copy" icon="file_copy" />
        </ConverterText>
        <MappingTable v-if="showMapping" :mapping="resultMapping" :reverse="true" />
      </div>
    </div>
    <h2 v-else>No data for this lect.</h2>
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
      lect: undefined,
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
      return this.$store.state.lects;
    },
    converter() {
      return this.lect?.converter;
    },
    mappings() {
      return this.converter?.mappings;
    },
    sample() {
      return this.converter?.sample ?? "";
    },
    defaultConversion() {
      return this.converter?.default;
    },
  },
  watch: {
    mappings(m) {
      this.sourceMapping = m[0];
      this.resultMapping = m[1];
    },
    sample(s) {
      this.source = s;
    },
    defaultConversion(c) {
      this.sourceMapping = this.mappings[c[0]];
      this.resultMapping = this.mappings[c[1]];
    },
    empty(e) {
      if (e) {
        this.source = "";
        return;
      }
      const mp = this.sourceMapping;
      this.sourceMapping = this.mappings[this.defaultConversion[0]];
      this.source = this.sample;
      this.$nextTick(() => {
        this.sourceMapping = mp;
      });
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

<template>
  <div class="section panel" v-if="lects">
    <ChipsSelect v-model="lect" :items="lects" itemKey="name" />
    <div class="split" v-if="converter">
      <div class="panel">
        <div class="panel-horizontal">
          <Select
            v-model="sourceMapping"
            :items="fullMappings"
            itemKey="name"
          />
          <Button v-model="empty" icon="subject" />
          <Button @click.native="$refs.file.click()" icon="publish" />
          <Button
            v-show="!resultMapping.partial"
            @click.native="swap"
            icon="swap_horiz"
          />
        </div>
        <ConverterText
          :source="source"
          :mapping="sourceMapping"
          @result="intermediate = $event"
        />
        <MappingTable v-if="showMappings" :mapping="sourceMapping" />
      </div>
      <div class="panel">
        <div class="panel-horizontal">
          <Select v-model="resultMapping" :items="mappings" itemKey="name" />
          <Button v-model="showMappings" icon="visibility" />
          <Button @click.native="copy" icon="file_copy" />
        </div>
        <ConverterText
          ref="resultText"
          :readonly="true"
          :source="intermediate"
          :mapping="resultMapping"
          :reverse="true"
          @result="result = $event"
        />
        <MappingTable
          v-if="showMappings"
          :mapping="resultMapping"
          :reverse="true"
        />
      </div>
    </div>
    <h1 v-else>No data for this lect.</h1>
    <input
      v-show="false"
      type="file"
      accept=".txt"
      ref="file"
      @change="upload"
    />
    <a v-show="false" ref="link"></a>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Select from "@/components/Select";
import ChipsSelect from "@/components/ChipsSelect";
import MappingTable from "@/components/MappingTable";
import ConverterText from "@/components/ConverterText";

export default {
  name: "Converter",
  components: {
    Button,
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
      showMappings: false,
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
    fullMappings() {
      return this.mappings.filter((m) => !m.partial);
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

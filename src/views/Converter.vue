<template>
  <div v-if="lects" class="section col-1">
    <ChipsSelect v-model:lect="lect" :items="lects" item-key="name" />
    <div v-if="converter" class="split">
      <div class="col">
        <div class="row">
          <Select
            v-model:value="sourceMapping"
            class="flex"
            :items="fullMappings"
            display="name"
          />
          <Button v-if="source" icon="clear" @click="source = ''" />
          <Button v-else icon="text_snippet" @click="displaySample" />
          <Button icon="publish" @click="$refs.file.click()" />
          <Button
            v-show="!resultMapping.partial"
            icon="swap_horiz"
            @click="swap"
          />
        </div>
        <ConverterText
          :source="source"
          :mapping="sourceMapping"
          @result="intermediate = $event"
        />
        <MappingTable v-if="showMappings" :mapping="sourceMapping" />
      </div>
      <div class="col">
        <div class="row">
          <Select
            v-model:value="resultMapping"
            class="flex"
            :items="mappings"
            display="name"
          />
          <Button v-model="showMappings" icon="visibility" />
          <Button icon="file_copy" @click="copy" />
        </div>
        <ConverterText
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
    <h2 v-else>No data for this lect.</h2>
    <input
      v-show="false"
      ref="file"
      type="file"
      accept=".txt"
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
      return this.mappings.filter((m) =>
        m.pairs.every((a) => a === m.pairs.find((b) => b[0] === a[0]))
      );
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
      if (m) {
        this.sourceMapping = m[0];
        this.resultMapping = m[1];
      }
    },
    sample(s) {
      this.source = s;
    },
    defaultConversion(c) {
      if (c) {
        this.sourceMapping = this.mappings[c[0]];
        this.resultMapping = this.mappings[c[1]];
      }
    },
  },
  methods: {
    displaySample() {
      const mapping = this.sourceMapping;
      this.sourceMapping = this.mappings[this.defaultConversion[0]];
      this.source = this.sample;
      this.$nextTick(() => {
        this.sourceMapping = mapping;
      });
    },
    swap() {
      const source = this.result;
      const mapping = this.sourceMapping;
      this.sourceMapping = this.resultMapping;
      this.resultMapping = mapping;
      this.source = source;
    },
    upload(event) {
      const reader = new FileReader();
      reader.onload = (e) =>
        this.download(
          event.target.files[0].name,
          this.convert(e.target.result)
        );
      reader.readAsText(event.target.files[0]);
    },
    download(filename, text) {
      const link = this.$refs.link;
      link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
      link.download = filename;
      link.click();
    },
    copy() {
      navigator.clipboard.writeText(this.result);
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
    grid-template-columns: 100%;
  }
}
</style>

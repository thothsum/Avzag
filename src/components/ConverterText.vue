<template>
  <textarea ref="textarea" :readonly="readonly" v-model="text"></textarea>
</template>

<script>
export default {
  name: "ConverterText",
  props: ["source", "mapping", "readonly"],
  data() {
    return {
      text: ""
    };
  },
  watch: {
    source: {
      handler() {
        this.text = this.source;
      },
      immediate: true
    },
    text: {
      handler() {
        this.result = this.convert(this.text, this.mapping);
        this.$emit("result", this.result);
      },
      immediate: true
    },
    mapping(mapping) {
      this.text = this.readonly
        ? this.convert(this.source, mapping)
        : this.convert(
            this.result,
            mapping.map(m => [m[1], m[0]])
          );
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
    convert(source, mapping) {
      source = " " + this.replace(source, "\n", "\n ").trim();
      for (const [from, to] of mapping) {
        source = this.replace(source, from, to);
        source = this.replace(source, this.uppercase(from), this.uppercase(to));
      }
      source = this.replace(source, "\n ", "\n").trim();
      return source;
    }
  }
};
</script>


<style lang="scss" scoped>
textarea {
  padding: map-get($margins, "normal");
  height: 250px;
}
</style>

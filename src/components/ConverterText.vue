<template>
  <textarea ref="textarea" :readonly="readonly" v-model="text"></textarea>
</template>

<script>
export default {
  name: "ConverterText",
  props: ["source", "mapping", "readonly"],
  data() {
    return {
      text: "",
      result: ""
    };
  },
  watch: {
    source: {
      handler() {
        this.text = this.readonly
          ? this.convert(this.source, this.mapping)
          : this.source;
      },
      immediate: true
    },
    text: {
      handler() {
        this.result = this.readonly
          ? this.text
          : this.convert(this.text, this.mapping);
        this.$emit("result", this.result);
      },
      immediate: true
    },
    mapping: {
      handler(mapping) {
        this.text = this.readonly
          ? this.convert(this.source, mapping)
          : this.convert(
              this.result,
              mapping.map(m => [m[1], m[0]])
            );
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    capitalize(str) {
      let base = "";
      let i = 0;
      if (str.charAt(0) == " ") {
        base = " ";
        i = 1;
      }
      return base + str.charAt(i).toUpperCase() + str.slice(i + 1);
    },
    convert(source, mapping) {
      if (mapping.length === 0) return source;

      source = " " + source.replace(/\n/g, "\n ").trim();
      let result = "";

      for (let i = 0; i < source.length; ) {
        let found = false;
        for (const [from, to] of mapping) {
          const l = from.length;
          const sub = source.substring(i, i + l);
          const pairs = [
            [from, to],
            [this.capitalize(from), this.capitalize(to)],
            [from.toUpperCase(), to.toUpperCase()]
          ];
          
          for (const [f, t] of pairs)
            if (sub === f) {
              found = true;
              result += t;
              i += l;
              break;
            }

          if (found) break;
        }

        if (!found) {
          result += source[i];
          i++;
        }
      }

      return result.replace(/\n /g, "\n").trim();
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

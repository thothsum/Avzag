<template>
  <textarea ref="textarea" v-model="text" :readonly="readonly"></textarea>
</template>

<script>
export default {
  name: 'ConverterText',
  props: ['source', 'mapping', 'readonly', 'reverse'],
  data () {
    return {
      text: '',
      result: ''
    }
  },
  computed: {
    pairs () {
      return this.reverse
        ? this.mapping.pairs.map((m) => [m[1], m[0]])
        : this.mapping.pairs
    },
    reversePairs () {
      return this.pairs.map((m) => [m[1], m[0]])
    }
  },
  watch: {
    source: {
      handler () {
        this.text = this.readonly
          ? this.convert(this.source, this.pairs)
          : this.source
      },
      immediate: true
    },
    text: {
      handler () {
        this.result = this.readonly
          ? this.text
          : this.convert(this.text, this.pairs)
        this.$emit('result', this.result)
      },
      immediate: true
    },
    pairs: {
      handler () {
        this.text = this.readonly
          ? this.convert(this.source, this.pairs)
          : this.convert(this.result, this.reversePairs)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    capitalize (str) {
      let base = ''
      let i = 0
      if (str.charAt(0) == ' ') {
        base = ' '
        i = 1
      }
      return base + str.charAt(i).toUpperCase() + str.slice(i + 1)
    },
    convert (source, pairs) {
      if (!pairs || pairs.length === 0) return source

      source = ' ' + source.replace(/\n/g, '\n ').trim()
      let result = ''

      for (let i = 0; i < source.length;) {
        let found = false
        for (const [from, to] of pairs) {
          const l = from.length
          const sub = source.substring(i, i + l)
          const pairs = [
            [from, to],
            [this.capitalize(from), this.capitalize(to)],
            [from.toUpperCase(), to.toUpperCase()]
          ]

          for (const [f, t] of pairs) {
            if (sub === f) {
              found = true
              result += t
              i += l
              break
            }
          }

          if (found) break
        }

        if (!found) {
          result += source[i]
          i++
        }
      }

      return result.replace(/\n /g, '\n').trim()
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  height: 256px;
}
</style>

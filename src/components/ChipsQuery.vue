<template>
  <div v-if="many" class="row scroll">
    <button class="small icon round" @click="reset">clear</button>
    <button
      v-for="(k, i) in keys"
      :key="k"
      class="small round"
      :class="highlights[i]"
      @click="toggle(i)"
    >
      {{ k }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ChipsQuery',
  props: ['items', 'itemKey'],
  data () {
    return {
      input: undefined
    }
  },
  computed: {
    keys () {
      return this.itemKey
        ? this.items.map((it) => it[this.itemKey])
        : this.items
    },
    highlights () {
      return this.input.map((i) =>
        i ? (i > 0 ? 'highlight-confirm' : 'highlight-alert') : null
      )
    },
    many () {
      return this.keys.length > 1
    }
  },
  watch: {
    items: {
      handler () {
        this.reset()
      },
      immediate: true
    },
    input: {
      handler () {
        this.$emit(
          'query',
          this.many
            ? this.input.reduce((q, inp, i) => {
              if (inp) q[this.keys[i]] = inp > 0
              return q
            }, {})
            : { [this.keys[0]]: 1 }
        )
      },
      immediate: true
    }
  },
  methods: {
    toggle (i) {
      this.$set(this.input, i, ((this.input[i] + 2) % 3) - 1)
    },
    reset () {
      this.input = new Array(this.keys.length).fill(0)
    }
  }
}
</script>

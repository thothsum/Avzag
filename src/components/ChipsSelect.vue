<template>
  <div v-if="many" class="row scroll">
    <Button
      v-for="(k, i) in keys"
      :key="i"
      class="small round"
      :class="{ highlight: value == items[i] }"
      :text="k"
      @click="select(i)"
    />
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'ChipsSelect',
  components: { Button },
  props: ['value', 'items', 'itemKey'],
  computed: {
    keys () {
      return this.itemKey
        ? this.items.map((it) => it[this.itemKey])
        : this.items
    },
    many () {
      return this.keys.length > 1
    }
  },
  watch: {
    value: {
      handler () {
        if (!this.value) this.select(0)
      },
      immediate: true
    }
  },
  methods: {
    select (i) {
      this.$emit('update:value', this.items[i])
    }
  }
}
</script>

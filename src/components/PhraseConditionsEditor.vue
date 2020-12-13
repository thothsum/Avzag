<template>
  <ActionHeader :icon="icon" :header="header" @action="add">
    <template #caption><slot /></template>
    <div class="scroll col">
      <div v-for="(c, i) in conditions" :key="i" class="row">
        <Button
          v-if="allowPassive"
          v-model:value="c.passive"
          icon="call_missed"
        />
        <Select v-model:value="c.entity" class="flex" :items="entities" />
        <p class="icon">west</p>
        <Select
          v-if="context[c.entity]"
          v-model:value="c.tag"
          class="flex"
          :items="context[c.entity]"
        />
        <Button icon="clear" @click="remove(i)" />
      </div>
    </div>
  </ActionHeader>
</template>

<script>
import Button from '@/components/Button'
import ActionHeader from '@/components/ActionHeader'
import Select from '@/components/Select'

export default {
  name: 'PhraseConditionsEditor',
  components: {
    Button,
    ActionHeader,
    Select
  },
  props: ['conditions', 'context', 'allowPassive', 'header', 'icon'],
  computed: {
    entities () {
      return Object.keys(this.context)
    }
  },
  methods: {
    add () {
      let c = this.conditions
      if (!c) this.$emit('update:conditions', (c = []))
      c.push({})
    },
    remove (i) {
      this.$delete(this.conditions, i)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  max-height: 128px;
}
</style>

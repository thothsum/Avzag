<template>
  <div class="section col-2 small">
    <div class="row wrap card">
      <router-link to="/home">Home</router-link>
      <p class="text-dot" />
      <router-link to="/editor/phonology">Phonology</router-link>
      <router-link to="/editor/converter">Converter</router-link>
      <router-link to="/editor/phrasebook">Phrasebook</router-link>
      <router-link to="/editor/phrasebook/corpus">
        Phrasebook Corpus
      </router-link>
      <Button text="load from lect" @click="loadFromLect" />
      <Button text="load from JSON" @click="loadFromJson" />
      <Button text="save JSON to clipboard" @click="saveToJson" />
      <ButtonAlert text="Reset" @confirm="reset" />
    </div>
    <div v-if="file" class="grid small">
      <div class="col-2">
        <ActionHeader button="" icon="text_snippet" header="Sample Text">
          <template #caption>
            Text that will be displayed to demonstrate the converter.
          </template>
          <textarea v-model="file.sample" />
        </ActionHeader>
        <ActionHeader
          button=""
          icon="compare_arrows"
          header="Default Conversion"
        >
          <template #caption>
            Two mappings that will be set by default. The left should be set to
            the sample's original writing system.
          </template>
          <div v-if="defaultConversion" class="row">
            <p class="icon">south</p>
            <div class="col flex">
              <Select
                v-model:value="defaultConversion[0]"
                :items="mappings"
                display="name"
                indexed="true"
              />
              <Select
                v-model:value="defaultConversion[1]"
                :items="mappings"
                display="name"
                indexed="true"
              />
            </div>
          </div>
        </ActionHeader>
        <ActionHeader icon="call_merge" header="Mappings" @action="addMapping">
          <template v-if="mapping" #header>
            <ButtonAlert @confirm="deleteMapping" />
          </template>
          <div v-for="(m, i) in mappings" :key="i" class="row">
            <Button
              :class="{ highlight: mapping == m }"
              icon="edit"
              @click="mapping = m"
            />
            <input v-model="m.name" type="text" />
          </div>
        </ActionHeader>
      </div>
      <ActionHeader
        v-if="mapping"
        icon="format_list_numbered"
        header="Pairs"
        @action="addPair(pairs.length)"
      >
        <template #caption>
          During conversion system will consuquently go over these pairs,
          replacing text from the left with the text from the right or vise
          versa (right with left) if conversion is reversed.</template
        >
        <template #default>
          <div v-for="(p, i) in pairs" :key="i" class="row">
            <Button icon="add" @click="addPair(i)" />
            <input v-model="p[0]" type="text" placeholder="from" />
            <input v-model="p[1]" type="text" placeholder="to" />
            <Button icon="clear" @click="deletePair(i)" />
          </div>
        </template>
      </ActionHeader>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
import ButtonAlert from '@/components/ButtonAlert'
import ActionHeader from '@/components/ActionHeader'
import Select from '@/components/Select'

export default {
  name: 'ConverterEditor',
  components: {
    Button,
    ButtonAlert,
    ActionHeader,
    Select
  },
  data () {
    return {
      file: undefined,
      mapping: undefined
    }
  },
  computed: {
    mappings () {
      return this.file?.mappings ?? []
    },
    defaultConversion () {
      return this.file.default
    },
    pairs () {
      return this.mapping?.pairs ?? []
    }
  },
  mounted () {
    try {
      const file = JSON.parse(localStorage.cEditor)
      if (file) this.file = file
      return
    } catch (error) {
      console.log(error)
    }
    this.reset()
  },
  updated () {
    localStorage.cEditor = JSON.stringify(this.file)
  },
  beforeDestroy () {
    localStorage.cEditor = JSON.stringify(this.file)
  },
  methods: {
    addMapping () {
      this.mapping = { name: 'newMapping', pairs: [] }
      this.mappings.push(this.mapping)
    },
    deleteMapping () {
      this.mappings.splice(this.mappings.indexOf(this.mapping), 1)
      this.mapping = this.mappings[this.mappings.length - 1]
    },
    addPair (i) {
      this.mapping.pairs.splice(i, 0, ['', ''])
    },
    deletePair (i) {
      this.$delete(this.mapping.pairs, i)
    },
    loadFromLect () {
      fetch(
        this.$store.state.root +
          window.prompt('Enter lect name') +
          '/converter.json'
      )
        .then((r) => r.json())
        .then((j) => {
          if (j) this.file = j
        })
    },
    loadFromJson () {
      const file = JSON.parse(window.prompt('Enter JSON'))
      if (file) this.file = file
    },
    saveToJson () {
      navigator.clipboard.writeText(JSON.stringify(this.file))
    },
    reset () {
      this.file = { default: [0, 0], mappings: [] }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin-top: -1 * map-get($margins, "double");
  padding-top: 2 * map-get($margins, "normal");
}
.grid {
  display: grid;
  grid-template-columns: 352px minmax(0, 1fr);
  gap: map-get($margins, "double");
}
@media only screen and (max-width: $mobile-width) {
  .grid {
    grid-template-columns: 100%;
  }
}
</style>

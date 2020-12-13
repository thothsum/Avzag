<template>
  <div id="root">
    <div class="section row-1 scroll">
      <Button icon="arrow_back" @click="navigate('Home')" />
      <Button
        v-for="[t, i] in menus"
        :key="i"
        :class="{ highlight: $route.name === t }"
        :icon="i"
        :text="t"
        @click="navigate(t)"
      />
    </div>
  </div>
</template>

<script>
import Button from './Button'

export default {
  name: 'Header',
  components: {
    Button
  },
  data () {
    return {
      menus: [
        ['Phonology', 'audiotrack'],
        ['Converter', 'sync_alt'],
        ['Phrasebook', 'book']
      ]
    }
  },
  methods: {
    navigate (path) {
      if (this.$route.name !== path) {
        this.$router.push({
          name: path,
          params: { lang: this.$route.params.lang }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#root {
  background-color: var(--color-foreground);
  margin: -1 * map-get($margins, "normal");
  margin-bottom: map-get($margins, "double");
  padding: map-get($margins, "normal");
  border-radius: 0;
  box-shadow: map-get($shadows, "elevated");
}
Button {
  font-weight: bold;
}
</style>

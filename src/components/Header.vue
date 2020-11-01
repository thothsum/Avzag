<template>
  <div id="root">
    <div class="section panel-horizontal scroll">
      <Button @click.native="navigate('Home')" icon="arrow_back" />
      <Button
        @click.native="navigate(t)"
        :class="{ 'highlight': $route.name === t }"
        :icon="i"
        :text="t"
        :key="i"
        v-for="[t, i] in menus"
      />
    </div>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "Header",
  components: {
    Button,
  },
  data() {
    return {
      menus: [
        ["Phonology", "audiotrack"],
        ["Converter", "sync_alt"],
        ["Phrasebook", "book"],
      ],
    };
  },
  methods: {
    navigate(path) {
      if (this.$route.name !== path)
        this.$router.push({
          name: path,
          params: { lang: this.$route.params.lang },
        });
    },
  },
};
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

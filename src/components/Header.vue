<template>
  <div id="root">
    <div class="section panel-horizontal">
      <Button @click.native="navigate('Home')" icon="arrow_back" />
      <button
        class="panel-horizontal"
        :class="{ highlight: $route.name === t }"
        @click="navigate(t)"
        :key="i"
        v-for="[t, i] in menus"
      >
        <span class="icon">{{i}}</span>
        <p v-if="t">{{t}}</p>
      </button>
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
        ["Phrasebook", "chat"],
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
  overflow: hidden;
  position: relative;
  box-shadow: map-get($shadows, "elevated");
}
button.panel-horizontal {
  font-weight: bold;
}
</style>

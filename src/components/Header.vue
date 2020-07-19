<template>
  <div id="root">
    <div class="section">
      <div class="panel-horizontal">
        <img class="no-select" :src="flag" draggable="false" alt="flag" />
        <button @click="navigate('Home')">
          <span class="icon">arrow_back</span>
        </button>
        <h2>{{$store.state.language}}</h2>
      </div>
      <div class="panel-horizontal scroll-hidden">
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Header",
  data() {
    return {
      menus: [
        ["Phonology", "audiotrack"],
        ["Converter", "sync_alt"],
        ["Phrasebook", "chat"]
      ]
    };
  },
  computed: {
    flag(): string {
      return this.$store.getters.languageRoot + "flag.png";
    }
  },
  methods: {
    navigate(path: string): void {
      if (this.$route.name !== path)
        this.$router.push({
          name: path,
          params: { lang: this.$route.params.lang }
        });
    }
  }
});
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
  * {
    z-index: 1;
  }
  img {
    pointer-events: none;
    z-index: 0;
    position: absolute;
    height: 192px;
    left: 0;
    opacity: 0.5;
    transform: translate(-5%) rotate(-20deg);
    mask-image: linear-gradient(90deg, white, transparent);
  }
}
.section {
  display: flex;
  justify-content: space-between;
}
button {
  font-weight: bold;
}
@media only screen and (max-width: $mobile-width) {
  .section {
    height: fit-content;
    flex-flow: column;
  }
  #root {
    img {
      left: initial;
      right: 0;
      transform: translate(10%, 15%) rotate(-20deg);
      mask-image: linear-gradient(-90deg, white, transparent);
    }
  }
  .section > *:first-child {
    margin-bottom: map-get($margins, "normal");
  }
}
</style>

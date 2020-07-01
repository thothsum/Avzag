<template>
  <div id="root">
    <div class="section">
      <div class="panel-horizontal">
        <img :src="flag" draggable="false" alt="flag" />
        <button @click="navigate('Home')">
          <span class="icon">arrow_back</span>
        </button>
        <h2>{{$store.state.language}}</h2>
      </div>
      <div class="panel-horizontal scroll-hidden">
        <button
          :class="{ highlight: $route.name === m.title }"
          @click="navigate(m.title)"
          :key="i"
          v-for="(m, i) in menus"
        >
          <span class="icon">{{ m.icon }}</span>
          <p>{{ m.title }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menus: [
        {
          title: "Phonology",
          icon: "audiotrack"
        },
        {
          title: "Converter",
          icon: "sync_alt"
        },
        {
          title: "Phrasebook",
          icon: "chat"
        }
      ]
    };
  },
  computed: {
    flag() {
      return this.$store.getters.languageRoot + "flag.png";
    }
  },
  methods: {
    navigate(path) {
      if (this.$route.name !== path)
        this.$router.push({
          name: path,
          params: { lang: this.$route.params.lang }
        });
    }
  }
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
  text-shadow: map-get($shadows, "elevated");
  * {
    z-index: 1;
  }
  img {
    z-index: 0;
    user-select: none;
    position: absolute;
    height: 192px;
    left: 0;
    opacity: 0.3;
    transform: translate(-5%) rotate(-20deg);
    mask-image: linear-gradient(90deg, white, transparent);
  }
}
.section {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  justify-content: space-between;
  display: flex;
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

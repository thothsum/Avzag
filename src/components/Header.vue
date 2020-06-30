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
      <div id="menu" class="panel-horizontal">
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
  margin: calc(var(--margin-double) * -1);
  margin-bottom: var(--margin-large);
  box-shadow: var(--shadow-elevated);
  padding: var(--margin-double);
  border-radius: 0;
  overflow: hidden;
  user-select: none;
  position: relative;
  text-shadow: var(--shadow-elevated);
  * {
    z-index: 1;
  }
  img {
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
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  justify-content: space-between;
  display: flex;
}
button {
  font-weight: bold;
}
#menu {
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
@media only screen and (max-width: 568px) {
  .section {
    height: fit-content;
    flex-flow: column;
    > * {
      width: 100%;
    }
  }
  #root img {
    left: initial;
    right: 0;
    transform: translate(10%, 12.5%) rotate(-20deg);
    mask-image: linear-gradient(-90deg, white, transparent);
  }
  #menu {
    margin-top: var(--margin-double);
  }
}
</style>

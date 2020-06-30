<template>
  <div id="root">
    <div class="section">
      <div class="panel-horizontal">
        <button @click="navigate('Home')" class="round">
          <span class="material-icons-outlined-large">arrow_back</span>
        </button>
        <h2>{{$store.state.language}}</h2>
      </div>
      <div id="menu" class="panel-horizontal">
        <button
          class="round"
          :class="{ selected: $route.name === m.title }"
          @click="navigate(m.title)"
          :key="i"
          v-for="(m, i) in menus"
        >
          <span class="material-icons-outlined-large">{{ m.icon }}</span>
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
          icon: "subject"
        },
        {
          title: "Phrasebook",
          icon: "book"
        }
      ]
    };
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
  > button {
    border: var(--border-width) solid transparent;
  }
}
@media only screen and (max-width: 768px) {
  .section {
    height: fit-content;
    flex-flow: column;
    > * {
      width: 100%;
    }
  }
}
</style>

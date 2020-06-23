<template>
  <div id="root">
    <div class="section">
      <div>
        <button @click="navigate('Home')">
          <span class="material-icons-outlined large">arrow_back</span>
        </button>
        <LanguageBanner />
      </div>
      <div id="menu">
        <button
          @click="navigate(m.title)"
          :class="{selected: $route.name===m.title}"
          :key="i"
          v-for="(m, i) in menus"
        >
          <span class="material-icons-outlined large">{{m.icon}}</span>
          <p>{{m.title}}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageBanner from "./LanguageBanner";

export default {
  name: "Header",
  components: {
    LanguageBanner
  },
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

<style scoped>
#root {
  margin: calc(var(--margin-double) * -1);
  margin-bottom: var(--margin-large);
  box-shadow: 0 2px 16px var(--color-shadow);
  padding: var(--margin-double);
  border-radius: 0;
}

.section {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  justify-content: space-between;
  height: 42px;
  display: flex;
}
.section > div {
  display: flex;
  flex-wrap: nowrap;
  place-items: center;
  overflow-x: auto;
}
.section > div > *:not(:last-child) {
  margin-right: var(--margin-double);
}
button {
  height: 42px;
  font-weight: bold;
}
#menu::-webkit-scrollbar {
  display: none;
}
#menu > button {
  border: 2px solid transparent;
}
#menu > button.selected {
  border-color: var(--color-select);
}
@media only screen and (max-width: 768px) {
  .section {
    height: fit-content;
    flex-flow: column;
  }
  .section > * {
    width: 100%;
  }
  .section > *:not(:last-child) {
    margin-bottom: var(--margin-double);
  }
}
</style>

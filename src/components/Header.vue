<template>
  <div class="section">
    <div>
      <button @click="navigate('Home')">
        <span class="material-icons-outlined">arrow_back</span>
      </button>
      <HeaderBanner />
    </div>
    <div id="menu">
      <button
        @click="navigate(m.title)"
        :class="{selected: $route.name===m.title}"
        :key="i"
        v-for="(m, i) in menus"
      >
        <span class="material-icons-outlined">{{m.icon}}</span>
        <p>{{m.title}}</p>
      </button>
    </div>
  </div>
</template>

<script>
import HeaderBanner from "./HeaderBanner";

export default {
  name: "Header",
  components: {
    HeaderBanner
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
          icon: "text_fields"
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
.material-icons-outlined {
  font-size: var(--font-size-large) !important;
}
button {
  height: 42px;
  font-weight: bold;
}
#menu > button {
  border: 0 solid var(--color-hover);
  border-bottom-width: calc(2 * var(--border-width));
}
#menu > button.selected {
  border-color: var(--color-select);
}

@media only screen and (max-width: 568px) {
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

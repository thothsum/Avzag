<template>
  <div class="section">
    <HeaderBanner />
    <div id="menu">
      <button
        @click="navigate(m.title)"
        :class="{selected: $route.name===m.title}"
        :key="i"
        v-for="(m, i) in menus"
      >
        <span class="material-icons-outlined">{{m.icon}}</span>
        {{$route.name===m.title ? m.title : ""}}
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
        },
        {
          title: "Settings",
          icon: "settings"
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
#menu {
  display: flex;
  flex-wrap: nowrap;
  place-items: center;
  overflow-x: auto;
}
#menu > *:not(:last-child) {
  margin-right: var(--margin-double);
}
#menu > button {
  height: 42px;
  font-weight: bold;
  border: 0 solid var(--color-hover);
  border-bottom-width: var(--border-width);
}
.material-icons-outlined {
  font-size: var(--font-size-large) !important;
}
#menu > button > *:first-child:not(:last-child) {
  margin-right: var(--margin);
}
#menu > button.selected {
  border-color: var(--color-select);
}
#menu > button:not(.selected) > .material-icons-outlined {
  margin: 0;
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
  #menu {
    align-items: flex-start;
  }
}
</style>

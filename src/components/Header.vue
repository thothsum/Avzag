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
        <p class="material-icons-outlined">{{m.icon}}</p>
        {{m.title}}
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
          icon: "volume_up"
        },
        {
          title: "Converter",
          icon: "compare_arrows"
        },
        {
          title: "Dictionary",
          icon: "search"
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
  box-shadow: 0px 6px 8px var(--color-shadow);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}
#menu {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
#menu > * {
  margin: 5px;
}
#menu > button {
  padding: 0 15px;
  height: 40px;
  border-width: 0 0 4px 0;
  border-color: var(--color-text);
}
.material-icons-outlined {
  font-size: 20px !important;
}
#menu > button > *:first-child:not(:last-child) {
  margin-right: 10px;
}
#menu > button:hover {
  border-color: var(--text);
}
#menu > button.selected {
  border-color: var(--text);
}
@media only screen and (max-width: 600px) {
  #header {
    height: fit-content;
    flex-flow: column;
    justify-content: center;
  }
}
</style>
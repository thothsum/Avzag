<template>
  <div id="banner">
    <div id="flag">
      <img :src="langRoot + 'flag.png'" alt="Banner" />
    </div>
    <div id="titles" v-if="index">
      <h1>{{index.title}}</h1>
      <h3>{{subtitle}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderBanner",
  data() {
    return {
      index: undefined
    };
  },
  computed: {
    subtitle: function() {
      return this.index.tags.reduce((a, t) => (a = `${a} › ${t}`));
    },
    langRoot: function() {
      return this.$getPath(this.$route.params.lang);
    }
  },
  watch: {
    langRoot: async function(langRoot) {
      this.index = await fetch(langRoot + "index.json").then(r => r.json());
    }
  }
};
</script>

<style scoped>
#banner {
  display: flex;
  align-content: center;
  justify-content: flex-start;
}
#flag {
  height: 40px;
  display: flex;
  margin: 5px;
}
#flag > img {
  height: 100%;
  box-shadow: 0 0 10px var(--shadow);
}
#titles {
  display: flex;
  flex-direction: column;
  place-content: center;
}
#titles > * {
  margin: 0;
}
@media only screen and (max-width: 600px) {
  #banner {
    flex-flow: column;
    place-content: center;
  }
  #flag {
    place-content: center;
  }
  #titles {
    text-align: center;
  }
}
</style>
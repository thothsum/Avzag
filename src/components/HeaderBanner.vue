<template>
  <div id="banner">
    <div id="flag">
      <img :src="langRoot + 'flag.png'" alt="Banner" />
    </div>
    <div id="titles" v-if="index">
      <h1>{{index.title}}</h1>
      <h3>{{index.tags.reduce((a, t) => a = `${a} › ${t}`)}}</h3>
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
    langRoot: function() {
      return this.$getPath(this.$route.params.lang);
    }
  },
  watch: {
    langRoot: async function(langRoot) {
      const res = await fetch(langRoot + "index.json");
      this.index = await res.json();
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
  height: 45px;
  display: flex;
  margin: 5px;
}
#flag > img {
  height: 100%;
  box-shadow: 0 0 10px var(--shadow);
}
#titles {
  display: flex;
  flex-wrap: wrap;
  place-content: center;
  line-height: 100%;
}
#titles h1 {
  font-size: 24px;
}
#titles > * {
  width: 100%;
  margin: 5px;
}
@media only screen and (max-width: 600px) {
  #banner {
    flex-flow: column;
    place-content: center;
    justify-content: center;
  }
  #flag {
    place-content: center;
  }
  #titles {
    text-align: center;
  }
}
</style>
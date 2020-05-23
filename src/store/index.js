import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    root: process.env.BASE_URL + "languages/",
    language: undefined,
    index: undefined,
    phonology: undefined,
    sample: undefined,
    converters: undefined
  },
  getters: {
    languageRoot: state => {
      return state.root + state.language + "/"
    }
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language;
    },
    setIndex(state, json) {
      state.index = json;
    },
    setPhonology(state, json) {
      json.sort((a, b) => a.ipa.localeCompare(b.ipa));
      json.forEach((p, i) => {
        p.i = i;
        p.lects.sort((a, b) => a.name.localeCompare(b.name));
      });
      state.phonology = json;
    },
    setSample(state, text) {
      state.sample = text;
    },
    setConverters(state, json) {
      state.converters = json;
    }
  },
  actions: {
    async loadLanguage({ dispatch, commit }, language) {
      commit("setLanguage", language);
      dispatch("loadIndex");
    },
    async loadIndex({ commit, getters }) {
      const file = getters.languageRoot + "index.json";
      commit("setIndex", await fetch(file).then(r => r.json()));
    },
    async loadPhonology({ commit, getters }) {
      const file = getters.languageRoot + "phonology.json";
      commit("setPhonology", await fetch(file).then(r => r.json()));
    },

  },
  modules: {
  }
})

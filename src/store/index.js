import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    root: process.env.BASE_URL + "languages/",
    catalogue: undefined,
    language: undefined,
    phonology: undefined,
    sample: undefined,
    converters: undefined,
    phrasebook: undefined
  },
  getters: {
    languageRoot: state => {
      return state.root + state.language + "/"
    },
    languageInfo: state => {
      return state.catalogue ? state.catalogue[state.language] : undefined;
    },
    lects: (_state, getters) => {
      return getters.languageInfo?.lects;
    },
  },
  mutations: {
    setCatalogue(state, json) {
      Object.values(json).forEach(
        l => l.lects.sort((a, b) => a.localeCompare(b))
      );
      state.catalogue = json;
    },
    setLanguage(state, language) {
      state.language = language;
    },
    setPhonology(state, json) {
      json.sort((a, b) => a.ipa.localeCompare(b.ipa));
      json.forEach((p, i) => { p.i = i; });
      state.phonology = json;
    },
    setSample(state, text) {
      state.sample = text;
    },
    setConverters(state, json) {
      json.forEach((c, i) => { c.i = i; });
      state.converters = json;
    },
    setPhrasebook(state, json) {
      state.phrasebook = json;
    }
  },
  actions: {
    async loadCatalogue({ dispatch, commit }) {
      commit("setCatalogue", await dispatch("loadJson", "../catalogue.json"));
    },
    async loadLanguage({ dispatch, commit }, language) {
      commit("setLanguage", language);
      commit("setPhonology", await dispatch("loadJson", "phonology.json"));
      commit("setSample", await dispatch("loadText", "sample.txt"));
      commit("setConverters", await dispatch("loadJson", "converters.json"));
      commit("setPhrasebook", await dispatch("loadJson", "phrasebook.json"));
    },
    async loadJson({ getters }, file) {
      return await fetch(getters.languageRoot + file).then(r => r.json());
    },
    async loadText({ getters }, file) {
      return await fetch(getters.languageRoot + file).then(r => r.text());
    }
  },
  modules: {
  }
})

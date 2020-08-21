import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    root: process.env.BASE_URL + "lects/",
    catalogue: undefined,
    lects: undefined
  },
  mutations: {
    setCatalogue(state, catalogue) {
      state.catalogue = catalogue;
    },
    setLects(state, lects) {
      state.lects = lects;
    }
  },
  actions: {
    async loadCatalogue({ dispatch, commit, state }) {
      commit("setCatalogue", await dispatch("loadJson", state.root + "catalogue.json"));
    },
    async loadLects({ dispatch, commit, state }, lectNames) {
      let lects = {};
      for (const n of lectNames) {
        const root = state.root + n + "/";
        const phonology = await dispatch("loadJson", root + "phonology.json");
        lects += { root, phonology };
      }
      commit("setLects", lects);
    },
    async loadJson(_, file) {
      return await fetch(file).then(r => r.json());
    },
    async loadText(_, file) {
      return await fetch(file).then(r => r.text());
    }
  },
  modules: {
  }
})

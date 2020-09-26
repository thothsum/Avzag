import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    root: process.env.BASE_URL + "lects/",
    ipa: undefined,
    catalogue: undefined,
    lects: undefined
  },
  mutations: {
    setState(state, [key, value]) {
      state[key] = value;
    }
  },
  actions: {
    async initialize({ dispatch, commit, state }) {
      for (const k of ["ipa", "catalogue"]) {
        const v = await dispatch("loadJson", state.root + k + ".json")
        commit("setState", [k, v]);
      }
    },
    async loadLects({ dispatch, commit, state }, lectNames) {
      let lects = [];
      for (const n of lectNames) {
        const r = state.root + n + "/";
        let l = { name: n };
        for (const f of ["phonology", "phrasebook", "converter"])
          l[f] = await dispatch("loadJson", r + f + ".json");
        lects.push(l);
      }
      commit("setState", ["lects", lects]);
    },
    async loadJson(_, file) {
      try { return await fetch(file).then(r => r.json()) }
      catch { return }
    },
    async loadText(_, file) {
      try { return await fetch(file).then(r => r.text()) }
      catch { return }
    }
  }
})

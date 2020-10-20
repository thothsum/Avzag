import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const getTags = function (p, ipa) {
  let tags = '';

  for (const ph of ipa.primary)
    if (p.includes(ph.ipa)) {
      tags += ph.tags;
      break;
    }

  for (const ph of ipa.secondary)
    if (p.includes(ph.ipa))
      tags += ' ' + ph.tags;

  return tags;
};

export default new Vuex.Store({
  state: {
    root: process.env.BASE_URL + "lects/",
    ipa: undefined,
    catalogue: undefined,
    lects: undefined,
    phonemes: undefined
  },
  mutations: {
    setState(state, [key, value]) {
      state[key] = value;
    }
  },
  actions: {
    async initialize({ dispatch, commit, state }) {
      for (const k of ["ipa", "catalogue", "phrasebook_"]) {
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
      await dispatch("collectPhonemes");
    },
    async collectPhonemes({ commit, state }) {
      let phonemes = {};
      state.lects.forEach((l) => {
        l.phonology.forEach((p) => {
          const ph = p.phoneme;
          if (!(ph in phonemes))
            phonemes[ph] = {
              ipa: ph,
              tags: getTags(ph, state.ipa),
              lects: {}
            };
          phonemes[ph]["lects"][l.name] = p;
        });
      });
      commit("setState", ["phonemes", Object.values(phonemes)]);
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

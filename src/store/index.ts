import { createStore, useStore as baseUseStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { Lect } from "@/views/Home/types";
import { IPARegistry, Phoneme, PhonemeUse } from "@/views/Phonology/types";
import { Converter } from "@/views/Converter/types";
import * as Phrasebook from "@/views/Phrasebook/types";

type DBLect = {
  [key: string]: unknown;
  name: string;
  phonology?: PhonemeUse[];
  converter?: Converter;
  phrasebook?: Phrasebook.Phrasebook;
};

export interface State {
  [key: string]: unknown;
  root: string;
  ipa: IPARegistry;
  catalogue: Lect[];
  phrasebook: Phrasebook.Corpus;
  lects: DBLect[];
  phonemes: Phoneme[];
}
// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

function getTags(p: string, ipa: IPARegistry) {
  let tags = "";
  for (const ph of ipa.primary) {
    if (p.includes(ph.ipa)) {
      tags += ph.tags;
      break;
    }
  }
  for (const ph of ipa.secondary) {
    if (p.includes(ph.ipa)) {
      tags += " " + ph.tags;
    }
  }
  return tags;
}

export default createStore<State>({
  state: {
    root: process.env.BASE_URL + "lects/",
    ipa: {} as IPARegistry,
    catalogue: [],
    phrasebook: [],
    lects: [],
    phonemes: [],
  },
  mutations: {
    setState(state, [key, value]) {
      state[key] = value;
    },
  },
  actions: {
    async initialize({ dispatch, commit, state }) {
      for (const k of ["ipa", "catalogue", "phrasebook"]) {
        const v = await dispatch("loadJson", state.root + k + ".json");
        commit("setState", [k, v]);
      }
    },
    async loadLects({ dispatch, commit, state }, lectNames) {
      const lects = [];
      for (const n of lectNames) {
        const r = state.root + n + "/";
        const lect = { name: n } as DBLect;
        for (const file of ["phonology", "phrasebook", "converter"]) {
          lect[file] = await dispatch("loadJson", r + "phrasebook" + ".json");
        }
        lects.push(lect);
      }

      commit("setState", ["lects", lects]);
      await dispatch("collectPhonemes");
    },
    async collectPhonemes({ commit, state }) {
      const registry = {} as Record<string, Phoneme>;
      state.lects.forEach(({ phonology, name }) => {
        if (!phonology) return;
        phonology.forEach((p) => {
          const ph = p.phoneme;
          if (!(ph in registry)) {
            registry[ph] = {
              ipa: ph,
              tags: getTags(ph, state.ipa),
              lects: {},
            };
          }
          registry[ph].lects[name] = p;
        });
      });

      const phonemes = Object.values(registry);
      phonemes.sort(({ ipa: a }, { ipa: b }) => (a > b ? 1 : b > a ? -1 : 0));
      commit("setState", ["phonemes", phonemes]);
    },
    async loadJson<T>(_: unknown, filename: string) {
      try {
        return (await fetch(filename).then((r) => r.json())) as T;
      } catch {
        console.log("Could not load JSON from " + filename);
      }
    },
    async loadText(_, filename: string) {
      try {
        return await fetch(filename).then((r) => r.text());
      } catch {
        console.log("Could not load text from " + filename);
      }
    },
  },
});

import { key as sKey, loadJSON, loadLectsJSON } from "@/store";
import { shallowRef } from "vue";
import { CorpusPhrase, CorpusSection, Phrasebook } from "./types";

export const corpus = shallowRef<CorpusSection[]>();
export const phrasebooks = shallowRef<Record<string, Phrasebook>>();
export const section = shallowRef<CorpusSection>();
export const phrase = shallowRef<CorpusPhrase>();

let key: symbol;
export async function initialize() {
  if (key === sKey) return;
  key = sKey;

  corpus.value = await loadJSON("phrasebook");
  phrasebooks.value = await loadLectsJSON<Phrasebook>("phrasebook");
}

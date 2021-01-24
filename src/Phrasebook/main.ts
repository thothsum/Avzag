import { getInitializer, loadJSON, loadLectsJSON } from "@/store";
import { shallowRef } from "vue";
import { CorpusPhrase, CorpusSection, Phrasebook } from "./types";

export const corpus = shallowRef<CorpusSection[]>([]);
export const phrasebooks = shallowRef<Record<string, Phrasebook>>();
export const section = shallowRef<CorpusSection>();
export const phrase = shallowRef<CorpusPhrase>();

export const initialize = getInitializer(async () => {
  corpus.value = await loadJSON("phrasebook");
  phrasebooks.value = await loadLectsJSON<Phrasebook>("phrasebook");

  section.value = corpus.value[0];
  phrase.value = section.value.phrases[0];
});

import { loadJSON, loadLectsJSON, lects } from "@/store";
import { ref, shallowRef, watch } from "vue";
import { CorpusPhrase, CorpusSection, Phrasebook, State } from "./types";

export const corpus = shallowRef<CorpusSection[]>([]);
export const phrasebooks = shallowRef<Record<string, Phrasebook>>();
export const section = shallowRef<CorpusSection>();
export const phrase = shallowRef<CorpusPhrase>();
export const searchSources = ref([] as string[][]);

watch(lects, async () => {
  corpus.value = await loadJSON("phrasebook");
  phrasebooks.value = await loadLectsJSON<Phrasebook>("phrasebook");

  generateSearchSources();
  section.value = corpus.value[0];
  phrase.value = section.value.phrases[0];
});

function blocksToStrings(blocks: State[][]) {
  return blocks.flatMap((states) =>
    states.map((state) => state.text.plain.replaceAll("*", ""))
  );
}
function generateSearchSources() {
  if (!phrasebooks.value) return;
  const pbs = Object.values(phrasebooks.value);
  searchSources.value = corpus.value.map(({ phrases }) =>
    phrases.map(({ id, name, blocks }) =>
      [
        name,
        ...blocksToStrings(blocks),
        ...pbs.flatMap((p) => blocksToStrings(p[id]?.blocks ?? [])),
      ]
        .join(" ")
        .toLowerCase()
    )
  );
}

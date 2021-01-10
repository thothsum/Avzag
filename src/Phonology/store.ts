import { lects } from "@/store";
import { IPARegistry, Phoneme, PhonemeUse } from "./types";

const root = process.env.BASE_URL + "lects/";

let registry: IPARegistry;

function collectTags(phomene: string) {
  let collected = "";
  for (const { ipa, tags } of registry.primary) {
    if (phomene.includes(ipa)) {
      collected += tags;
      break;
    }
  }
  for (const { ipa, tags } of registry.secondary) {
    if (phomene.includes(ipa)) {
      collected += " " + tags;
    }
  }
  return collected;
}

async function collectPhonemes() {
  const registry = {} as Record<string, Phoneme>;

  for (const { name } of lects.value) {
    const uses = (await fetch(root + name + "/phonology.json").then((r) =>
      r.json()
    )) as PhonemeUse[];
    if (!uses) continue;

    uses.forEach((use) => {
      const phoneme = use.phoneme;
      if (!(phoneme in registry)) {
        registry[phoneme] = {
          ipa: phoneme,
          tags: collectTags(phoneme),
          lects: {},
        };
      }
      registry[phoneme].lects[name] = use;
    });
  }

  const phonemes = Object.values(registry);
  phonemes.sort(({ ipa: a }, { ipa: b }) => (a > b ? 1 : b > a ? -1 : 0));
  return phonemes;
}

export default async function setupStore() {
  if (!registry)
    registry = (await fetch(root + "ipa.json").then((r) =>
      r.json()
    )) as IPARegistry;

  return await collectPhonemes();
}

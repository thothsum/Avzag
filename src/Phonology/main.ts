import { root, lects, key as dbkey } from "@/store";
import { shallowRef } from "vue";
import { IPARegistry, Phoneme, PhonemeUse } from "./types";

let registry: IPARegistry;

export const phonemes = shallowRef<Phoneme[]>();
export const phoneme = shallowRef<Phoneme>();

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

function collectPhonemes(allUses: Record<string, undefined | PhonemeUse[]>) {
  const registry = {} as Record<string, Phoneme>;

  for (const name in allUses) {
    const uses = allUses[name];
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

  phonemes.value = Object.values(registry);
  phonemes.value.sort(({ ipa: a }, { ipa: b }) => (a > b ? 1 : b > a ? -1 : 0));
  phoneme.value = phonemes.value[0];
}

let key: symbol;
export function initialize() {
  if (key === dbkey) return;
  key = dbkey;

  let loading = fetch(root + "ipa.json")
    .then((r) => r.json())
    .then((j) => (registry = j));

  const phonemes = {} as Record<string, undefined | PhonemeUse[]>;
  lects.value.forEach(
    ({ name, root }) =>
      (loading = loading.then(() =>
        fetch(root + "phonology.json")
          .then(
            (r) => r.json(),
            () => undefined
          )
          .then((j) => {
            phonemes[name] = j;
          })
      ))
  );

  loading.then(() => collectPhonemes(phonemes));
}

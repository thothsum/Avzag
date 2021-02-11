import { loadJSON, loadLectsJSON, lects as allLects } from "@/store";
import { shallowRef, watch, ref } from "vue";
import { IPARegistry, Phoneme, PhonemeUse } from "./types";

let registry: IPARegistry;

export const phonemes = shallowRef<Phoneme[]>([]);
export const phoneme = shallowRef<Phoneme>();
export const lects = ref<string[]>([]);

watch(allLects, async () => {
  phonemes.value.length = 0;
  lects.value.length = 0;
  registry = await loadJSON("ipa", {});
  const uses = await loadLectsJSON<PhonemeUse[]>("phonology");
  lects.value = Object.keys(uses);
  collectPhonemes(uses);
});

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

function collectPhonemes(allUses: Record<string, PhonemeUse[]>) {
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

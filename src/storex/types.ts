import { Lect } from "@/Home/types";
import { Converter } from "@/Converter/types";
import * as Phrasebook from "@/Phrasebook/types";
import { IPARegistry, Phoneme, PhonemeUse } from "@/Phonology/types";

export type DBLect = {
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
  phrasebook: Phrasebook.Section[];
  lects: DBLect[];
  phonemes: Phoneme[];
}

import { Lect } from "@/views/Home/types";
import { Converter } from "@/views/Converter/types";
import * as Phrasebook from "@/views/Phrasebook/types";
import { IPARegistry, Phoneme, PhonemeUse } from "@/views/Phonology/types";

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

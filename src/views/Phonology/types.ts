export type PhonemeSample = {
  grapheme?: string;
  word?: string;
  ipa?: string;
};

export type PhonemeUse = {
  phoneme: string;
  samples?: PhonemeSample[];
  notes: string[];
};

export type Phoneme = {
  ipa: string;
  tags?: string;
  lects: Record<string, PhonemeUse>;
};

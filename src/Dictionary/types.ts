export type Meaning = {
  primary: string;
  secondary?: string;
};

export type Text = {
  plain: string;
  ipa?: string;
  glossed?: string;
};

export type Sample = {
  text: Text;
  translation: string;
};

export type Form = {
  text: Text;
  grammar: string;
};

export type Entry = {
  meaning: Meaning;
  forms: Form[];
  samples: Sample[];
  etymology?: string;
  related?: string[];
};

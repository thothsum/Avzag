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
  translation: string;
  tags: string;
  forms: Form[];
  samples: Sample[];
  explanation?: string;
  etymology?: string;
  related?: string[];
};

export type Search = Record<string, Record<string, Entry[]>>;

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
  source: Text;
  translation: string;
  grammar: string;
  samples: Sample[];
};

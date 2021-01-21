export type Conditions = Record<string, Record<string, -1 | 0 | 1>>;
export type Text = {
  entity?: string;
  plain?: string;
  ipa?: string;
  gloss?: string;
};
export type State = {
  conditions?: Conditions;
  transition: string;
  texts: Text[];
};
export type BlockVue = {
  block: State[];
  state?: State;
  text: string;
};

export type ContextSource = {
  entity: string;
  tags: string[];
};
export type Context = Record<string, Set<string>>;
export type ContextTranslation = Record<string, Record<string, string>>;
export type CorpusPhrase = {
  id: string;
  name: string;
  context: ContextSource[];
  blocks: State[][];
};
export type CorpusSection = {
  id: string;
  name: string;
  phrases: CorpusPhrase[];
};

export type Phrase = {
  notes?: string[];
  context?: ContextTranslation;
  blocks: State[][];
};
export type Phrasebook = Record<string, Phrase>;

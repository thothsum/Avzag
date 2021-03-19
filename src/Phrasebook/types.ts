export type Conditions = Record<string, Record<string, boolean>>;
export type Text = {
  plain: string;
  ipa?: string;
  glossed?: string;
};
export type Transition = undefined | number[];
export type State = {
  text: Text;
  conditions?: Conditions;
  transition?: Transition;
};
export type BlockSnapshot = {
  text: string;
  state?: State;
  show: boolean;
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

export type Condition = {
  entity: string;
  tag?: string;
  passive?: boolean;
};
export type DisplaySegment = {
  text?: string;
  ipa?: string;
  glossing?: string;
  entity?: string;
};
export type State = {
  conditions?: Condition[];
  transition?: string;
  implicit?: boolean;
  display: DisplaySegment[];
};
export type Block = {
  requirements?: Condition[];
  states: State[];
};
export type BlockVue = {
  visible: boolean;
  requirements?: Condition[];
  conditions?: Condition[];
  display: { text: string };
};

export type ContextSource = {
  entity: string;
  tags: string;
};
export type Context = Record<string, Set<string>>;
export type ContextTranslation = {
  entity: [string, string];
  tags: [string, string][];
};

export type CorpusPhrase = {
  id: string;
  name: string;
  context: ContextSource[];
  blocks: Block[];
};
export type CorpusSection = {
  id: string;
  name: string;
  phrases: CorpusPhrase[];
};

export type Phrase = {
  notes?: string[];
  context?: ContextTranslation[];
  blocks: Block[];
};
export type Phrasebook = Record<string, Phrase>;

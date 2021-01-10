export type Condition = {
  entity: string;
  tag?: string;
  passive?: boolean;
};
export type Display = {
  text?: string;
  ipa?: string;
  glossing?: string;
  entity?: string;
}[];
export type State = {
  conditions?: Condition[];
  transition?: string;
  implicit?: boolean;
  display: Display;
};
export type Block = {
  requirements?: Condition[];
  states: State[];
};

export type Context = {
  entity: string;
  tags: string;
}[];
export type DynamicContext = Record<string, Set<string>>;
export type ContextTranslation = {
  entity: [string, string];
  tags: [string, string][];
}[];
export type Phrase = {
  id: string;
  preview: string;
  context: Context;
  blocks: Block[];
};
export type PhraseTranslation = {
  notes?: string[];
  context?: ContextTranslation;
  blocks: Block[];
};
export type PhraseTranslationOptions = {
  interactive?: boolean;
  glossed?: boolean;
  notes?: boolean;
  source?: boolean;
};
export type Section = {
  id: string;
  name: string;
  phrases: Phrase[];
};
export type Phrasebook = Record<string, PhraseTranslation>;

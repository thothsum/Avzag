export type Lect = {
  name: string;
  point: [number, number];
  family: string[];
  tags?: string;
  quote?: string;
};

export type SearchState = {
  selected: Set<string>;
  visible: Set<string>;
};

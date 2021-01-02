export interface Lect {
  name: string;
  point: [number, number];
  family: string[];
  tags?: string;
  quote?: string;
}
export interface SearchState {
  selected: Set<string>;
  visible: Set<string>;
}

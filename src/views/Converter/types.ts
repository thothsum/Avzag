export type Mapping = {
  name: string;
  pairs: [string, string][];
};

export type Converter = {
  sample: string;
  default: [number, number];
  mappings: Mapping[];
};

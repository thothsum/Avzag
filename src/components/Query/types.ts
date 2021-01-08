export type Query = Record<string, boolean>;

export function EvaluateQuery(
  tags: string[] | string,
  query: Query,
  failEmpty = false
) {
  if (!query) return true;
  const entries = Object.entries(query);
  if (failEmpty && !entries.length) return false;

  for (const [tag, flag] of entries) {
    if (flag !== tags.includes(tag)) return false;
  }
  return true;
}

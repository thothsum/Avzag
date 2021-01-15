import { Condition, Context, State } from "../types";

export function getEntityIndexes(conditions: Condition[], entities: string[]) {
  const set = new Set(conditions.map((c) => c.entity));
  return [...set].map((e) => entities.indexOf(e));
}

export function checkConditions(
  conditions: undefined | Condition[],
  context: Context
): [number, number] {
  return conditions?.length
    ? [
        conditions.reduce((f, { entity, tag }) => {
          return f + (tag ? (context[entity]?.has(tag) ? 1 : 0) : 1);
        }, 0) / conditions.length,
        conditions.length,
      ]
    : [1, 0];
}

export function findBestState(
  indexes: undefined | number[],
  states: State[],
  context: Context
) {
  let state = null;
  let fit = 0;
  let len = 0;

  const candidates = indexes?.map((i) => states[i]) ?? states ?? [];
  candidates.forEach((s) => {
    if (!s.conditions) return;
    const [f, l] = checkConditions(s.conditions, context);
    if (fit === 1 ? f === 1 && l >= len : f >= fit) {
      state = s;
      fit = f;
      len = l;
    }
  });

  return state ?? candidates[0];
}

export function applyConditions(
  conditions: undefined | Condition[],
  context: Context,
  positive: boolean
) {
  if (!conditions) return;
  conditions.forEach(({ entity, tag, passive }) => {
    const set = context[entity];
    if (passive || !tag || !set) return;
    if (positive) set.add(tag);
    else set.delete(tag);
  });
}

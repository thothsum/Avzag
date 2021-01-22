import { Ref } from "vue";
import { Context, State, Conditions, ContextSource } from "./types";

export function createContext(context: Ref<Context>, source?: ContextSource[]) {
  if (!source) return;
  context.value = {};
  source.forEach(({ entity, tags }) => {
    context.value[entity] = new Set(tags);
  });
}

export function checkConditions(
  conditions: undefined | Conditions,
  context: Context
): [number, number] {
  if (!conditions) return [1, 0];
  let score = 0;
  let count = 0;
  for (const [entity, tags] of Object.entries(conditions))
    for (const [tag, flag] of Object.entries(tags)) {
      if (flag < 0) {
        if (context[entity].has(tag)) return [-1, 0];
        continue;
      }
      try {
        score += context[entity].has(tag) ? 1 : 0;
      } catch {
        console.log(entity, context);
      }
      count += 1;
    }
  return [score / count, count];
}

export function findBestState(
  indexes: undefined | number[],
  states: State[],
  context: Context
) {
  let state = null;
  let score = 0;
  let count = 0;

  const candidates = indexes?.map((i) => states[i]) ?? states ?? [];
  candidates.forEach((candidate) => {
    if (!candidate.conditions) return;
    const [s, c] = checkConditions(candidate.conditions, context);
    if (score === 1 ? s === 1 && c >= count : s >= score) {
      state = candidate;
      score = s;
      count = c;
    }
  });
  return state ?? candidates[0];
}

export function applyConditions(
  conditions: undefined | Conditions,
  context: Ref<Context>,
  positive: boolean
) {
  if (!conditions) return;
  Object.entries(conditions).forEach(([entity, tags]) =>
    Object.entries(tags).forEach(([tag, flag]) => {
      const set = context.value[entity];
      if (flag !== 1 || !set) return;
      if (positive) set.add(tag);
      else set.delete(tag);
    })
  );
}

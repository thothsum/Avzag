import { Ref } from "vue";
import { Context, State, Conditions, ContextSource } from "./types";

export function newState() {
  return {
    texts: [{ plain: "new state" }],
    transition: "next",
    conditions: {},
  } as State;
}

export function createContext(context: Ref<Context>, source?: ContextSource[]) {
  if (!source) return;
  context.value = {};
  source.forEach(({ entity }) => (context.value[entity] = new Set()));
}

export function checkConditions(
  conditions: undefined | Conditions,
  context: Context,
  oldContext?: Context
): [number, number] {
  if (!conditions) return [1, 0];
  let score = 0;
  let count = 0;
  for (const [entity, tags] of Object.entries(conditions))
    for (const [tag, flag] of Object.entries(tags)) {
      count += 1;
      if (flag) {
        if (context[entity]?.has(tag))
          score += oldContext?.[entity]?.has(tag) ? 1 : 2;
      } else {
        if (context[entity]?.has(tag)) score += 1;
        else return [-1, 0];
      }
    }

  return [score / (count || 1), count];
}

export function findBestState(
  indexes: undefined | number[],
  states: State[],
  context: Context,
  oldContext?: Context
): undefined | State {
  let state;
  let score = -1;
  let count = 0;

  const candidates = indexes?.map((i) => states[i]) ?? states;
  candidates.forEach((candidate) => {
    const [s, c] = checkConditions(candidate.conditions, context, oldContext);
    if (score === 1 ? s === 1 && c > count : s > score) {
      state = candidate;
      score = s;
      count = c;
    }
  });
  return state;
}

export function applyConditions(
  context: Ref<Context>,
  conditions: undefined | Conditions,
  additive: boolean
) {
  if (!conditions || !context.value) return;
  Object.entries(conditions).forEach(([entity, tags]) =>
    Object.entries(tags).forEach(([tag, flag]) => {
      const set = context.value[entity];
      if (!flag || !set) return;
      if (additive) set.add(tag);
      else set.delete(tag);
    })
  );
}

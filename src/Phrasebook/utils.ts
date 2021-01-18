import { Ref } from "vue";
import { Context, ContextSource } from "./types";

export function createContext(
  context: Ref<Context>,
  source: ContextSource[],
  full = false
) {
  if (!source) return;
  context.value = {};
  source.forEach(({ entity, tags }) => {
    context.value[entity] = new Set(full ? tags.split(" ") : []);
  });
}

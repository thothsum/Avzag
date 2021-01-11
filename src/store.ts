import { ref } from "vue";

export let key: symbol;

export const root = process.env.BASE_URL + "lects/";
export const lects = ref([] as { name: string; root: string }[]);

export function setupStore(lectNames: string[]) {
  lects.value = lectNames.map((name) => ({
    name,
    root: root + name + "/",
  }));
  key = Symbol("lects");
}

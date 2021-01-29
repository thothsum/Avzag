import { shallowReactive } from "vue";

export const audio = shallowReactive(new Audio());

let queue: string[];
function next() {
  const src = queue.shift();
  if (src) audio.src = src;
  console.log(audio.src);
}

audio.oncanplaythrough = () => {
  console.log("ready");
  audio.play();
};

audio.onended = next;

export function play(...srcs: string[]) {
  queue = srcs.slice();
  console.log("queue", queue);
  next();
}

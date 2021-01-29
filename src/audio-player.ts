import { ref } from "vue";

export const audio = new Audio();
export const playing = ref(false);
export const id = ref("");
export const current = ref(-1);
export const queue = ref<string[]>([]);

function next() {
  current.value += 1;
  const src = queue.value[current.value];
  if (src) audio.src = src;
  else if (current.value >= queue.value.length) stop();
}

audio.oncanplaythrough = audio.play;
audio.onended = next;
audio.onerror = next;

export function play(_id: string, ...srcs: string[]) {
  id.value = _id;
  queue.value = srcs.slice();
  playing.value = true;
  next();
}

export function stop() {
  audio.pause();
  queue.value.length = 0;
  playing.value = false;
  current.value = -1;
}

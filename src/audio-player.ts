import { ref } from "vue";

export const audio = new Audio();
export const id = ref("");
export const current = ref(-1);
export const queue = ref<string[]>([]);
export const playing = ref(false);
export const playback = ref(0);

function next() {
  if (!playing.value) return;
  current.value += 1;
  if (current.value >= queue.value.length) stop();
  else audio.src = queue.value[current.value];
}

audio.ontimeupdate = () =>
  (playback.value = audio.currentTime / audio.duration);
audio.oncanplaythrough = audio.play;
audio.onended = next;
audio.onerror = next;

export function play(_id: string, ...srcs: string[]) {
  id.value = _id;
  playing.value = true;
  queue.value = srcs.slice();
  current.value = -1;
  next();
}

export function stop() {
  audio.pause();
  playing.value = false;
  queue.value.length = 0;
  current.value = -1;
  playback.value = 0;
}

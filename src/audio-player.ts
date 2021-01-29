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

export async function play(_id: string, ...srcs: string[]) {
  id.value = _id;
  playing.value = true;
  current.value = -1;
  queue.value.forEach((u) => URL.revokeObjectURL(u));
  queue.value = await Promise.all(
    srcs.map((s) =>
      fetch(s)
        .then((r) => r.blob())
        .then((b) => URL.createObjectURL(b))
    )
  );
  next();
}

export function stop() {
  audio.pause();
  playing.value = false;
  current.value = -1;
  playback.value = 0;
  queue.value.length = 0;
}

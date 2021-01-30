import { readonly, ref } from "vue";

const audio = new Audio();

const lect = ref("");
const current = ref(-1);
const queue = ref<string[]>([]);
const playing = ref(false);
const playback = ref(0);

function next() {
  if (!playing.value) return;
  current.value += 1;
  if (current.value >= queue.value.length) stop();
  else audio.src = queue.value[current.value];
}

async function play(_lect: string, ...srcs: string[]) {
  stop();

  lect.value = _lect;
  playing.value = true;
  current.value = -1;

  queue.value = await Promise.all(
    srcs.map((s) =>
      fetch(s)
        .then((r) => r.blob())
        .then((b) => URL.createObjectURL(b))
    )
  );
  next();
}

function stop() {
  audio.pause();
  playing.value = false;
  current.value = -1;
  playback.value = 0;

  queue.value.forEach((u) => URL.revokeObjectURL(u));
  queue.value.length = 0;
}

audio.ontimeupdate = () =>
  (playback.value = audio.currentTime / audio.duration);
audio.oncanplaythrough = audio.play;
audio.onended = next;
audio.onerror = next;

export default readonly({
  lect,
  current,
  queue,
  playing,
  playback,
  play,
  stop,
  next,
});

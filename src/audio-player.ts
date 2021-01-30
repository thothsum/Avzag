import { reactive, readonly, toRefs } from "vue";

const audio = new Audio();
audio.ontimeupdate = () =>
  (state.playback = audio.currentTime / audio.duration);
audio.oncanplaythrough = audio.play;
audio.onended = next;
audio.onerror = next;

const state = reactive({
  lect: "",
  current: 1,
  queue: [] as string[],
  playing: false,
  playback: 0,
});

async function play(_lect: string, ...srcs: string[]) {
  stop();
  state.lect = _lect;
  state.playing = true;
  state.current = -1;
  state.queue = await Promise.all(
    srcs.map((s) =>
      fetch(s)
        .then((r) => r.blob())
        .then((b) => URL.createObjectURL(b))
    )
  );
  next();
}

function next() {
  if (!state.playing) return;
  state.current += 1;
  if (state.current >= state.queue.length) stop();
  else audio.src = state.queue[state.current];
}

function stop() {
  audio.pause();
  state.playing = false;
  state.current = -1;
  state.playback = 0;
  state.queue.forEach((u) => URL.revokeObjectURL(u));
  state.queue.length = 0;
}

export default readonly({ ...toRefs(state), play, stop, next });

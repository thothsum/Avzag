import { reactive, readonly, Ref, toRefs } from "vue";
import { root } from "@/store";

const audio = new Audio();
audio.ontimeupdate = () =>
  (state.playback = audio.currentTime / audio.duration);
audio.oncanplaythrough = audio.play;
audio.onended = next;
audio.onerror = next;

const state = reactive({
  playback: 0,
  index: -1,
  url: undefined as undefined | string,
  urls: [] as string[],
  queue: [] as string[],
});

async function getUrls(result: Ref<string[]>, lect: string, files: string[]) {
  files
    .map((f) => `${root}${lect}/audio/${f}.mp3`)
    .map((u, i) =>
      fetch(u, { method: "HEAD" }).then(
        ({ ok }) => (result.value[i] = ok ? u : "")
      )
    );
}

async function play(...urls: string[]) {
  stop();
  state.index = -1;
  state.urls = urls;
  state.url = urls[0];
  state.queue = await Promise.all(
    urls.map((u) =>
      fetch(u)
        .then((r) => r.blob())
        .then((b) => URL.createObjectURL(b))
    )
  );
  next();

  return state.queue;
}

function next() {
  if (!state.url) return;
  state.index += 1;
  state.url = state.urls[state.index];
  state.playback = 0;
  if (state.index >= state.queue.length) stop();
  else audio.src = state.url;
}

function stop() {
  audio.pause();
  state.playback = 0;
  state.index = -1;
  state.url = "";
  state.urls.length = 0;
  state.queue.forEach((u) => URL.revokeObjectURL(u));
  state.queue.length = 0;
}

export default readonly({ ...toRefs(state), getUrls, play, stop, next });

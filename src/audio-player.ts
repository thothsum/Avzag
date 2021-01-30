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
});

async function getUrls(result: Ref<string[]>, lect: string, files: string[]) {
  files
    .map((f) => `${root}${lect}/audio/${f}.mp3`)
    .map((u, i) =>
      fetch(u)
        .then((r) => r.blob())
        .then(({ type }) => type.includes("audio"))
        .then((a) => (result.value[i] = a ? u : ""))
    );
}

async function play(...urls: string[]) {
  stop();
  state.index = -1;
  state.urls = urls;
  state.url = urls[0];
  next();
}

function next() {
  if (!state.url) stop();
  state.index += 1;
  state.url = state.urls[state.index];
  state.playback = 0;
  if (state.index >= state.urls.length) stop();
  else audio.src = state.url;
}

function stop() {
  audio.pause();
  state.playback = 0;
  state.index = -1;
  state.url = undefined;
  state.urls.length = 0;
}

export default readonly({ ...toRefs(state), getUrls, play, stop, next });

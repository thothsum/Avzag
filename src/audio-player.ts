import { reactive, readonly, Ref, toRefs } from "vue";
import { Howl, Howler } from "howler";
import { root } from "@/store";

const state = reactive({
  playback: 0,
  index: -1,
  url: undefined as undefined | string,
  urls: [] as string[],
  howls: [] as Howl[],
});

function url(lect: string, file: string) {
  return `${root}${lect}/audio/${file}.mp3`;
}

function getUrls(result: Ref<string[]>, lect: string, files: string[]) {
  files
    .map((f) => url(lect, f))
    .map((u, i) =>
      fetch(u)
        .then((r) => r.blob())
        .then(({ type }) => type.includes("audio"))
        .then((a) => (result.value[i] = a ? u : ""))
    );
}

async function play(lect: string, files: string[]) {
  stop();
  state.index = -1;
  state.howls = files
    .map((f) => [url(lect, f)])
    .map(
      (src, i) =>
        new Howl({
          src,
          autoplay: !i,
          format: ["mp3"],
          onend: () => state.howls[i + 1]?.play(),
        })
    );
  state.howls[0].play();
}

function stop() {
  Howler.unload();
  state.playback = 0;
  state.index = -1;
  state.url = undefined;
  state.urls.length = 0;
}

export default readonly({ ...toRefs(state), getUrls, play, stop });

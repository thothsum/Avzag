import { reactive, readonly, Ref, toRefs } from "vue";
import { Howl, Howler } from "howler";
import { root } from "@/store";

type Track = {
  i: number;
  src: string[];
  loaded: boolean;
  howl: Howl;
};

const state = reactive({
  key: undefined as undefined | string,
  timer: 0,
  seek: 0,
  current: undefined as undefined | Track,
  queue: [] as Track[],
});

function url(lect: string, file: string) {
  return `${root}${lect}/audio/${file}.mp3`;
}

function canPlay(result: Ref<string[]>, lect: string, files: string[]) {
  files
    .map((f) => url(lect, f))
    .map((u, i) =>
      fetch(u)
        .then((r) => r.blob())
        .then(({ type }) => type.includes("audio"))
        .then((a) => (result.value[i] = a ? u : ""))
    );
}

function play(lect: string, files: string[], key?: string) {
  stop();
  state.key = key ?? lect;
  state.timer = setInterval(seek, 50);

  state.queue = files
    .map((f) => [lect ? url(lect, f) : f])
    .map((src, i) => {
      const track = {
        i,
        src,
        loaded: true,
        howl: new Howl({
          src,
          format: ["mp3"],
          onend: next,
          onplayerror: next,
        }),
      };
      track.howl.once("loaderror", () => (track.loaded = false));
      return track;
    });
  next();
}

function next() {
  const i = (state.current?.i ?? -1) + 1;
  const track = state.queue[i];
  if (track) {
    state.current = track;
    if (track.loaded) {
      state.seek = 0;
      track.howl.play();
    } else next();
  } else stop();
}

function seek() {
  const howl = state.current?.howl;
  if (howl) state.seek = <number>howl.seek() / howl.duration();
}

function stop() {
  Howler.unload();
  state.key = undefined;
  state.seek = 0;
  clearInterval(state.timer);
  state.current = undefined;
  state.queue.length = 0;
}

export default readonly({ ...toRefs(state), canPlay, play, stop });

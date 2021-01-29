const audio = new Audio();

audio.oncanplaythrough = () => {
  console.log("ready");
  audio.play();
};

export function play(src: string) {
  audio.src = src;
}

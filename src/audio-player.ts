const audio = new Audio();

let queue: string[];
function next() {
  const src = queue.pop();
  if (src) audio.src = src;
}

audio.oncanplaythrough = () => {
  console.log("ready");
  audio.play();
};

audio.onended = next;

export function play(...srcs: string[]) {
  queue = srcs.slice();
  next();
}

// import { Octokit } from "@octokit/rest";
import { ref } from "vue";

export const lects = ref<string[]>([]);
export const root =
  (process.env.VUE_APP_STORE as string) ??
  "https://raw.githubusercontent.com/alkaitagi/avzag/store/";

export async function loadJSON<T>(path: string, defaultValue?: T) {
  return await fetch(root + path + ".json")
    .then((r) => r.json())
    .then((j) => j as T)
    .catch(() => defaultValue as T);
}
export async function loadLectsJSON<T>(path: string, lects_?: string[]) {
  const files = {} as Record<string, T>;
  for (const lect of lects_ ?? lects.value) {
    const file = await loadJSON<T>(lect + "/" + path);
    if (file) files[lect] = file;
  }
  return files;
}

// const octokit = new Octokit();
// async function isOutdated(path: string) {
//   const commits = await octokit.repos.listCommits({
//     owner: "IU-MAP",
//     repo: "avzag",
//     sha: "store",
//     path: path,
//   });
//   const time = commits.data[0].commit.committer?.date;
//   if (!time) return;
//   const timestamp = new Date(time).getTime();
//   console.log(root + path, time);
// }

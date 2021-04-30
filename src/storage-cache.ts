import { toRaw, watch } from "vue";

type Stamp = { added: number; changed: number; skip?: boolean };
export default class StorageCache {
  storage: LocalForage;
  records: Record<string, Stamp>;
  constructor(storage: LocalForage, name = "cache") {
    this.storage = storage;
    this.records = {};

    storage.getItem<Record<string, Stamp>>(name).then((r) => {
      if (r) this.records = r;
      watch(
        () => this.records,
        () => {
          console.log(toRaw(this.records));
          storage.setItem(name, toRaw(this.records));
        },
        { deep: true }
      );
    });
  }

  addRecord(key: string) {
    if (!this.records[key]) {
      const t = Date.now();
      this.records[key] = { added: t, changed: t };
      return true;
    }
    return false;
  }

  changeRecord(key: string) {
    const t = Date.now();
    let r = this.records[key];
    if (r) {
      if (r.skip) delete r.skip;
      else r.changed = t;
    } else {
      r = { added: t, changed: t };
      this.records[key] = r;
    }
    return r;
  }
}

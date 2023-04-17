import { Settings } from "../hooks";

const { localStorage } = window;

export class LSItemHandler {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  get() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : {};
  }

  exists() {
    const data = this.get();

    if (Object.keys(data).length) {
      return true;
    }

    return false;
  }

  set(value: Settings) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  delete() {
    localStorage.removeItem(this.key);
  }
}

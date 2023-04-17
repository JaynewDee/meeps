import { Settings } from "../hooks/settings";

const { localStorage } = window;

export class LSItemHandler {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): any {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : {};
  }

  exists(): boolean {
    const data = this.get();

    if (Object.keys(data).length) {
      return true;
    }

    return false;
  }

  set(value: Settings | any): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  delete(): void {
    localStorage.removeItem(this.key);
  }
}

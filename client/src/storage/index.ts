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

  set(value: any) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  update(value: any) {
    const current = this.get();
    console.log(current);
    if (Object.keys(current).length === 0) {
    }
  }

  delete() {
    localStorage.removeItem(this.key);
  }
}

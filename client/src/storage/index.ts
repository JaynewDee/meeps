const { indexedDB, localStorage } = window;

export class IDB {
  name: string;
  version: number;

  constructor(name: string, version: number) {
    this.name = name;
    this.version = version;
  }

  public open() {
    const request = indexedDB.open(this.name, this.version);
    request.onerror = () => {
      console.error(`Error loading database ${this.name}`);
    };

    request.onsuccess = (event: any) => {
      return event.target.result;
    };
  }

  public destroy() {
    const deleteRequest = indexedDB.deleteDatabase(this.name);
    deleteRequest.onerror = () => {
      console.error(`Error deleting database ${this.name}`);
    };

    deleteRequest.onsuccess = () => {
      console.log(`Database ${this.name} successfully deleted.`);
    };
  }
}

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

  delete() {
    localStorage.removeItem(this.key);
  }
}

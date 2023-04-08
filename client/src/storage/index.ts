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
      console.log(event.target.result);
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
  item: string;

  constructor(item: string) {
    this.item = item;
  }

  get() {
    const data = localStorage.getItem(this.item);
    return data ? JSON.parse(data) : [];
  }

  set(value: any) {
    localStorage.setItem(this.item, JSON.stringify(value));
  }

  delete() {
    localStorage.removeItem(this.item);
  }
}

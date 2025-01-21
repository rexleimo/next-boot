class LocalStorage {
  public static instance: LocalStorage;

  public static getInstance() {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  get(key: string) {
    const storageValue = localStorage.getItem(key);
    return storageValue ? JSON.parse(storageValue) : null;
  }

  set(key: string, value: any) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;

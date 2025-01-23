export interface IDBStore {
  name: string;
  keyPath: string;
  autoIncrement: boolean;
  indexes?: Array<{
    name: string;
    keyPath: string;
    options?: IDBIndexParameters;
  }>;
}

export interface IDBConfig {
  name: string;
  version: number;
  stores: IDBStore[];
}

export interface IDBHookResult<T> {
  add: (data: T) => Promise<IDBValidKey>;
  bulkAdd: (items: T[]) => Promise<IDBValidKey[]>;
  get: (id: IDBValidKey) => Promise<T | undefined>;
  getAll: () => Promise<T[]>;
  update: (data: T) => Promise<IDBValidKey>;
  remove: (id: IDBValidKey) => Promise<void>;
  clear: () => Promise<void>;
  error: Error | null;
}

import { useState, useEffect, useCallback } from 'react';
import { IDBConfig, IDBHookResult } from '@/hooks/useIndexedDB/types';

function createIDBHooks(config: IDBConfig) {
  let dbInstance: IDBDatabase | null = null;

  // 初始化数据库
  const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(config.name, config.version);

      request.onerror = event => {
        reject(new Error('Failed to open database'));
      };

      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;

        config.stores.forEach(store => {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, {
              keyPath: store.keyPath,
            });

            // 创建索引
            store.indexes?.forEach(index => {
              objectStore.createIndex(index.name, index.keyPath, index.options);
            });
          }
        });
      };

      request.onsuccess = event => {
        dbInstance = (event.target as IDBOpenDBRequest).result;
        resolve(dbInstance);
      };
    });
  };
  // 返回针对特定store的hook
  return (storeName: string) => {
    return function useIndexedDB<
      T extends { [key: string]: any },
    >(): IDBHookResult<T> {
      const [error, setError] = useState<Error | null>(null);

      useEffect(() => {
        if (!dbInstance) {
          initDB().catch(err => setError(err));
        }

        return () => {
          // 组件树完全卸载时关闭数据库
          if (dbInstance) {
            dbInstance.close();
            dbInstance = null;
          }
        };
      }, []);

      // CRUD操作实现
      const add = useCallback(async (data: T): Promise<IDBValidKey> => {
        return new Promise((resolve, reject) => {
          if (!dbInstance) {
            return reject(new Error('Database not initialized'));
          }
          const transaction = dbInstance.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.add(data);

          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      }, []);

      const bulkAdd = useCallback(
        async (items: T[]): Promise<IDBValidKey[]> => {
          return new Promise((resolve, reject) => {
            if (!dbInstance) {
              return reject(new Error('Database not initialized'));
            }
            const transaction = dbInstance.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const results: IDBValidKey[] = [];

            items.forEach(item => {
              const request = store.add(item);
              request.onsuccess = () => results.push(request.result);
            });

            transaction.oncomplete = () => resolve(results);
            transaction.onerror = () => reject(transaction.error);
          });
        },
        []
      );

      const get = useCallback(
        async (id: IDBValidKey): Promise<T | undefined> => {
          return new Promise((resolve, reject) => {
            if (!dbInstance) {
              return reject(new Error('Database not initialized'));
            }
            const transaction = dbInstance.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
          });
        },
        []
      );

      const getAll = useCallback(async (): Promise<T[]> => {
        return new Promise((resolve, reject) => {
          if (!dbInstance) {
            return reject(new Error('Database not initialized'));
          }

          const transaction = dbInstance.transaction(storeName, 'readonly');
          const store = transaction.objectStore(storeName);
          const request = store.getAll();

          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      }, []);

      const update = useCallback(async (data: T): Promise<IDBValidKey> => {
        return new Promise((resolve, reject) => {
          if (!dbInstance) {
            return reject(new Error('Database not initialized'));
          }

          const transaction = dbInstance.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.put(data);

          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      }, []);

      const remove = useCallback(async (id: IDBValidKey): Promise<void> => {
        return new Promise((resolve, reject) => {
          if (!dbInstance) {
            return reject(new Error('Database not initialized'));
          }
          const transaction = dbInstance.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.delete(id);

          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }, []);

      const clear = useCallback(async (): Promise<void> => {
        return new Promise((resolve, reject) => {
          if (!dbInstance) {
            return reject(new Error('Database not initialized'));
          }
          const transaction = dbInstance.transaction(storeName, 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.clear();

          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }, []);

      return {
        add,
        bulkAdd,
        get,
        getAll,
        update,
        remove,
        clear,
        error,
      };
    };
  };
}

export default createIDBHooks;

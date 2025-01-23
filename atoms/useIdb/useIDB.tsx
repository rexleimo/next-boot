'use client';

import { createIDBHooks, IDBConfig } from '@/hooks';

function useIDB() {
  const dbConfig: IDBConfig = {
    name: 'MyDB',
    version: 1,
    stores: [
      {
        name: 'users',
        keyPath: 'id',
        autoIncrement: true,
        indexes: [{ name: 'email', keyPath: 'email' }],
      },
      {
        name: 'products',
        keyPath: 'id',
        autoIncrement: true,
        indexes: [{ name: 'name', keyPath: 'name' }],
      },
    ],
  };

  return {
    useUsers: createIDBHooks(dbConfig)('users'),
    useProducts: createIDBHooks(dbConfig)('products'),
  };
}

export default useIDB;

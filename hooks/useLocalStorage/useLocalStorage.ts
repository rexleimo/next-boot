'use client';
import { useEffect, useState } from 'react';

function useLocalStorage<T>(key: string) {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  const setValueAndStore = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const removeValueAndStore = () => {
    setValue(null);
    localStorage.removeItem(key);
  };

  return {
    value,
    setValue: setValueAndStore,
    removeValue: removeValueAndStore,
  };
}

export default useLocalStorage;

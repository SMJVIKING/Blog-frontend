'use client';

import { useEffect, useState } from 'react';

export default function useLocalStorageState(key, initialState) {
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    }
  }, [key]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}
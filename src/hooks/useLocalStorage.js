import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return JSON.parse(storedValue);
    }
    return defaultValue;
  });

  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue);
      }
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue) => {
    setValue((currentValue) => {
      const result =
        typeof newValue === 'function' ? newValue(currentValue) : newValue;
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(result));
      }
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}

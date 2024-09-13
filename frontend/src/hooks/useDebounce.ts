import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay: number) => {
  const [immediateValue, setImmediateValue] = useState<T>(value);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(immediateValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [immediateValue, delay]);

  return [immediateValue, debouncedValue, setImmediateValue] as const;
};

export default useDebounce;

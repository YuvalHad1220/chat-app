import { useState, useEffect } from 'react';

const useDebounce = <T>(value: T, delay: number = 300) => {
  const [intermediateValue, setIntermediateValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set the intermediate value immediately
    setIntermediateValue(value);

    // Set up a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(intermediateValue);
    }, delay);

    // Clean up the timeout if the component unmounts or if the value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [intermediateValue, delay]);

  return { debouncedValue, intermediateValue, setIntermediateValue };
};

export default useDebounce;

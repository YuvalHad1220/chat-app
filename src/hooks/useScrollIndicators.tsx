import { useState, useEffect, useRef } from 'react';

const useScrollIndicators = () => {
  const [showTopScroll, setShowTopScroll] = useState(false);
  const [showBottomScroll, setShowBottomScroll] = useState(false);
  const scrollableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScrollIndicators = () => {
      const scrollableElement = scrollableRef.current;
      if (scrollableElement) {
        setShowTopScroll(scrollableElement.scrollTop > 0);
        setShowBottomScroll(
          scrollableElement.scrollTop < scrollableElement.scrollHeight - scrollableElement.clientHeight
        );
      }
    };

    checkScrollIndicators(); // Initial check

    const element = scrollableRef.current;
    if (element) {
      element.addEventListener('scroll', checkScrollIndicators);
      return () => {
        element.removeEventListener('scroll', checkScrollIndicators);
      };
    }
  }, []);

  return { showTopScroll, showBottomScroll, scrollableRef };
};

export default useScrollIndicators;

import { useState, useEffect } from 'react';

export default function WindowSize() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const updateSize = () => {
      let timer = setTimeout(() => {
        setWindowSize(window.innerWidth);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return windowSize;
}

import { useState, useEffect } from 'react';

export default function WindowSize() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const updateSize = () => setWindowSize(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return windowSize;
}

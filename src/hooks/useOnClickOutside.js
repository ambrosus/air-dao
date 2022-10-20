import { useEffect } from 'react';

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      const { current } = ref;
      if (!current || current.contains(event.target)) {
        return;
      }
      handler()
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener("touchstart", listener);

    };
  }, [ref, handler]);
};

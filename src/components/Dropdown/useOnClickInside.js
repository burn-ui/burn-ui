import { useRef, useEffect } from 'react';

function useOnClickInside(ref, handler) {
  const swipe = useRef(false);

  useEffect(() => {
    const listener = event => {
      if (ref.current && ref.current.contains(event.target)) {
        handler(event);
      }
    };

    function onTouchStart() {
      swipe.current = false;
    }

    function onTouchMove() {
      swipe.current = true;
    }

    function onTouchEnd(e) {
      if (!swipe.current) {
        listener(e);
      }
    }

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [ref, handler]);
}

export default useOnClickInside;

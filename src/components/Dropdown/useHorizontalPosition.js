import { useState, useEffect, useRef } from 'react';

function useHorizontalPosition(togglerRef, contentRef) {
  // FIXME: remove window dependecy to prevent CI/CD from breaking
  const innerWidth = useRef(global.window ? window.innerWidth : null);

  const [posX, setPosX] = useState(0);

  useEffect(() => {
    if (togglerRef.current && contentRef.current) {
      const toggler = togglerRef.current.getBoundingClientRect();
      const content = contentRef.current.getBoundingClientRect();

      const togglerSize = toggler.width;
      const togglerHalfSize = toggler.width / 2;
      const contentSize = content.width;
      const screenSize = innerWidth.current;
      const screenHalfSize = innerWidth.current / 2;
      const outboundSize = Math.abs((contentSize - togglerSize) / 2);

      const isButtonOfLeftScreenSide =
        toggler.right - togglerHalfSize < screenHalfSize;

      const initialContentPos = isButtonOfLeftScreenSide
        ? 0
        : -2 * outboundSize;
      const gapBorder = 15;

      const togglerPosRef = isButtonOfLeftScreenSide
        ? toggler.left
        : screenSize - toggler.right;

      const offsetContent = isButtonOfLeftScreenSide
        ? -(togglerPosRef - gapBorder)
        : togglerPosRef - gapBorder;

      let pos;
      if (togglerPosRef < gapBorder) {
        pos = initialContentPos;
      } else if (togglerPosRef > outboundSize) {
        pos = -outboundSize;
      } else {
        pos = initialContentPos + offsetContent;
      }

      setPosX(pos);
    }
  }, [togglerRef, contentRef]);

  return posX;
}

export default useHorizontalPosition;

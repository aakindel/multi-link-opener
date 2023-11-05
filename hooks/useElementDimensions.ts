"use client";

import { useCallback, useEffect, useState } from "react";

// https://www.manuelkruisz.com/blog/posts/react-width-height-resize-hook
// https://stackoverflow.com/a/59989768 : get width of react element
// https://stackoverflow.com/a/67089559 : ResizeObserver
export const useElementDimensions = (myElem: HTMLElement) => {
  const [elemWidth, setElemWidth] = useState(-1);
  const [elemHeight, setElemHeight] = useState(-1);

  const handleResize = useCallback(() => {
    if (myElem) {
      setElemWidth(myElem.offsetWidth);
      setElemHeight(myElem.offsetHeight);
    }
  }, [myElem]);

  useEffect(() => {
    if (myElem) {
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(myElem as Element);
    }
  }, [handleResize, myElem]);

  return { elemWidth, elemHeight };
};

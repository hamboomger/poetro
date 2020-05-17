import { useState, useEffect } from 'react';

const MIN_DESKTOP_WIDTH = 500;

interface WindowDimensionsTools {
  height: number,
  width: number,
  isDesktopClient: boolean,
}

function getWindowDimensionsTools(): WindowDimensionsTools {
  const dimensions = getWindowDimensions();
  return {
    ...dimensions,
    isDesktopClient: dimensions.width > MIN_DESKTOP_WIDTH,
  };
}

export default function useWindowDimensions(): WindowDimensionsTools {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensionsTools());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensionsTools());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

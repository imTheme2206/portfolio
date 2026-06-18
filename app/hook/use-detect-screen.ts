import { useEffect, useState } from "react";

type ScreenType = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const getScreenType = (): ScreenType => {
  const width = window.innerWidth;
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
};

const ssrFallback: ScreenType = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
};

export const useDetectScreen = (): ScreenType => {
  const [screen, setScreen] = useState<ScreenType>(ssrFallback);

  useEffect(() => {
    setScreen(getScreenType());
    const handleResize = () => setScreen(getScreenType());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screen;
};

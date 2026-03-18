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

export const useDetectScreen = (): ScreenType => {
  const [screen, setScreen] = useState<ScreenType>(() => {
    if (typeof window === "undefined") {
      // SSR fallback
      return { isMobile: false, isTablet: false, isDesktop: true };
    }
    return getScreenType();
  });

  useEffect(() => {
    const handleResize = () => {
      setScreen(getScreenType());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screen;
};

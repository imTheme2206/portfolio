"use client";

import { useDetectScreen } from "@/app/hook/use-detect-screen";

export const Gap = (props: { size: "xs" | "md" | "lg" | "xl" | "vh" }) => {
  const { isMobile } = useDetectScreen();

  const desktopSizes = {
    xs: "h-5",
    md: "h-20",
    lg: "h-40",
    xl: "h-80",
    vh: "h-dvh",
  };

  const mobileSizes = {
    xs: "h-2.5",
    md: "h-10",
    lg: "h-20",
    xl: "h-40",
    vh: "h-dvh",
  };

  const sizes = isMobile ? mobileSizes : desktopSizes;

  return <div className={`w-full ${sizes[props.size]}`}></div>;
};

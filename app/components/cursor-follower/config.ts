import { CursorProps, CursorVariant } from "./types";

export const registerImageElement = (): HTMLImageElement => {
  const imgElement = document.createElement("img");
  imgElement.style.position = "absolute";
  imgElement.style.inset = "0";
  imgElement.style.width = "100%";
  imgElement.style.height = "100%";
  imgElement.style.objectFit = "cover";
  imgElement.style.pointerEvents = "none";
  imgElement.style.willChange = "opacity, transform";
  imgElement.style.transform = "translateZ(0)";
  imgElement.decoding = "async";
  imgElement.width = 500;
  imgElement.height = 350;
  imgElement.loading = "eager";
  return imgElement;
};

export const defaultTrackerClassName =
  "fixed pointer-events-none will-change-transform z-50 -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-radius,background-color,border-color,opacity] duration-300 ease-out";

export const variantConfig: Record<CursorVariant, CursorProps> = {
  default: {
    classNames: ["w-10", "h-10", "border-primary", "border-2", "rounded-full"],
  },
  invert: {
    classNames: [
      "w-10",
      "h-10",
      "border-background",
      "border-2",
      "rounded-full",
    ],
  },
  clickable: {
    classNames: [
      "w-18",
      "h-18",
      "text-primary-foreground",
      "bg-primary",
      "flex",
      "items-center",
      "justify-center",
      "rounded-full",
    ],
    text: "CLICK",
  },
  thumbnail: {
    classNames: [
      "w-126",
      "h-72",
      "translate-x-14",
      "-translate-y-36",
      "bg-secondary-foreground",
      "p-1",
      "rounded-lg",
    ],
    showThumbnail: true,
  },
};

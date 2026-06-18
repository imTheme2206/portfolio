export type CursorVariant = "default" | "invert" | "clickable" | "thumbnail";

export type CursorProps = {
  classNames: string[];
  showThumbnail?: boolean;
  text?: string;
};

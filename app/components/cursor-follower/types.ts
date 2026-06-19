export type CursorVariant =
  | "default"
  | "invert"
  | "clickable"
  | "clicked"
  | "thumbnail";

export type CursorProps = {
  classNames: string[];
  showThumbnail?: boolean;
  text?: string;
};

export type CursorVariant =
  | "default"
  | "experience"
  | "clickable"
  | "thumbnail";

export type CursorProps = {
  classNames: string[];
  showThumbnail?: boolean;
  text?: string;
};

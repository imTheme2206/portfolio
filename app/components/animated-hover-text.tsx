import Link from "next/link";
import { CSSProperties } from "react";

export const AnimatedHoverText = (props: {
  text: string;
  fontSize: string;
  textColor?: string;
  href?: string;
}) => {
  return (
    <div
      className="h-fit overflow-hidden"
      style={
        {
          "--animated-font-size": props.fontSize || "6rem",
        } as CSSProperties
      }
    >
      <Link
        data-cursor="clickable"
        className="norris uppercase font-bold"
        href={props.href || ""}
        target="_blank"
      >
        {props.text.split("").map((char, index) => (
          <span
            key={index}
            data-char={char}
            data-index={index}
            style={
              {
                "--index": index + 1,
                "--animated-accent": props.textColor || "var(--primary)",
              } as CSSProperties
            }
          >
            {char}
          </span>
        ))}
      </Link>
    </div>
  );
};

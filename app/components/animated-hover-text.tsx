import { CSSProperties } from "react";

export const AnimatedHoverText = (props: {
  text: string;
  fontSize: string;
  textColor?: string;
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
      <a data-cursor="clickable" className="norris uppercase font-bold">
        {props.text.split("").map((char, index) => (
          <span
            key={index}
            data-char={char}
            data-index={index}
            style={
              {
                "--index": index + 1,
                "--animated-accent": props.textColor || "var(--accent)",
              } as CSSProperties
            }
          >
            {char}
          </span>
        ))}
      </a>
    </div>
  );
};

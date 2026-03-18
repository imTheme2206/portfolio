import { CSSProperties } from "react";

export const AnimatedHoverText = (props: {
  text: string;
  fontSize: string;
}) => {
  return (
    <div className="h-fit overflow-hidden">
      <a
        data-cursor="clickable"
        className="norris uppercase font-bold"
        style={
          {
            "--animated-font-size": props.fontSize || "6rem",
          } as CSSProperties
        }
      >
        {props.text.split("").map((char, index) => (
          <span
            key={index}
            data-char={char}
            data-index={index}
            style={
              {
                "--index": index + 1,
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

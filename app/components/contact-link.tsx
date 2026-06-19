import Link from "next/link";

export const ContactLink = ({
  label,
  link,
  mode,
}: {
  label: string;
  link: string;
  mode: "tel" | "mailto";
}) => {
  return (
    <div className="flex gap-2 px-4 items-center">
      <span className="text-base sm:text-2xl uppercase tracking-[0.25em] text-primary">
        {label}
      </span>
      <Link
        data-cursor="clickable"
        href={`${mode}:${link}`}
        className="contact-email text-primary/40 transition-colors duration-300 hover:text-primary text-sm sm:text-xl"
        style={{
          letterSpacing: "-0.01em",
        }}
      >
        {link}
      </Link>
    </div>
  );
};

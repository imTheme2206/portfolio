export const Gap = (props: { size: "xs" | "md" | "lg" | "xl" | "vh" }) => {
  const mappedSizeToHeight = {
    xs: "h-5",
    md: "h-20",
    lg: "h-40",
    xl: "h-80",
    vh: "h-dvh",
  };

  return <div className={`w-full ${mappedSizeToHeight[props.size]}`}></div>;
};

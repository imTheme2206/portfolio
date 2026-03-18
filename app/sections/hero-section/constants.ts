export type ImageData = {
  src?: string;
  width: number;
  height: number;
  alt?: string;
};

export const heroImages: ImageData[] = [
  {
    src: "/assets/images/hero-section/hero-4.webp",
    alt: "blank",
    width: 560,
    height: 1075,
  },
  {
    src: "/assets/images/hero-section/hero-1.webp",
    alt: "Hero Image 1",
    width: 1020,
    height: 870,
  },
  {
    src: "/assets/images/hero-section/hero-2.webp",
    alt: "Hero Image 2",
    width: 560,
    height: 1375,
  },
  {
    src: "/assets/images/hero-section/hero-3.webp",
    alt: "Hero Image 3",
    width: 320,
    height: 610,
  },
  {
    alt: "",
    width: 520,
    height: 870,
  },
  {
    src: undefined,
    // alt: "Software Engineer",
    width: 520,
    height: 670,
  },
  {
    src: undefined,
    // alt: "Coffee Enjoyer",
    width: 320,
    height: 570,
  },
  {
    // src: "/assets/images/hero-section/hero-4.webp",
    src: "/assets/images/hero-section/hero-5.webp",
    alt: "Hero Image 4",
    width: 520,
    height: 1270,
  },
  {
    // src: undefined,
    src: "/assets/images/hero-section/hero-6.webp",
    alt: "blank",
    width: 560,
    height: 775,
  },

  {
    src: "/assets/images/hero-section/hero-5.webp",
    alt: "Hero Image 5",
    width: 560,
    height: 1220,
  },
  {
    src: "/assets/images/hero-section/hero-1.webp",
    // src: undefined,
    alt: "Hero Image 5",
    width: 560,
    height: 700,
  },
  {
    src: "/assets/images/hero-section/hero-5.webp",
    alt: "Hero Image 5",
    width: 560,
    height: 475,
  },
] as const;

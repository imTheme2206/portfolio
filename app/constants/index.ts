import aboutData from "./data/about.json";
import contactData from "./data/contact.json";
import experiencesData from "./data/experiences.json";
import heroData from "./data/hero.json";
import projectsData from "./data/projects.json";

export type ImageData = {
  src?: string;
  width: number;
  height: number;
  alt?: string;
};

export type FloatLabel = {
  text: string;
  className: string;
  rotation: number;
  size?: "sm" | "md";
};

export type About = {
  sectionLabel: string;
  heading: string;
  bioLabel: string;
  // Each paragraph is split into two lines that animate independently.
  paragraphs: string[][];
  portrait: { src: string; alt: string };
};

export type Framework = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  href?: string;
  github?: string;
  image: string;
  bgImage?: string;
  frameworks: Framework[];
};

export type Highlight = {
  title: string;
  description: string;
};

export type WorkExperience = {
  title: string;
  company: string;
  range: string;
  description: string;
  highlights: Highlight[];
};

export type Contact = {
  title: string;
  email: string;
  tel: string;
  docsLabel: string;
  footer: { left: string; right: string };
};

// `title` doubles as the Iconify/label key. Empty title renders a marquee gap.
export type SocialLink = {
  title: string;
  link: string;
  textColor?: string;
};

export type DocumentLink = {
  type: "CV" | "Resume";
  label: string;
  href: string;
  preview: string;
};

// Name shown in the large scrolling marquee (rendered as "first last — first last —").
export const heroName: readonly string[] = heroData.heroName;
// Floating text labels scattered over the hero. `className` controls position/opacity.
export const floatingLabels = heroData.floatingLabels as FloatLabel[];
export const heroImages = heroData.heroImages as ImageData[];

export const about = aboutData.about as About;
export const skills: string[] = aboutData.skills;
export const marqueeWords: string[] = aboutData.marqueeWords;

export const projectsHeader = projectsData.projectsHeader;
export const projects = projectsData.projects as Project[];

export const experiencesHeader = experiencesData.experiencesHeader;
export const workExperiences =
  experiencesData.workExperiences as WorkExperience[];

export const contact = contactData.contact as Contact;
export const socials = contactData.socials as SocialLink[];
export const documents = contactData.documents as DocumentLink[];

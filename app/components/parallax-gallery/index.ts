// Components
export { ParallaxContainer } from "./components/parallax-container";
export {
  ParallaxImageComponent,
  ParallaxImageGallery,
} from "./components/parallax-image";

// Hooks
export { useParallaxEngine } from "./hooks/use-parallax";

// Types & Delegates (for advanced customization)
export { ParallaxContainerDelegate } from "./controller/parallax-container-delegate";
export {
  ParallaxEngine,
  type AutoPanConfig,
  type ParallaxDelegate,
} from "./controller/parallax-engine";
export { ParallaxGalleryDelegate } from "./controller/parallax-gallery-delegate";

// Re-export useful types
export type { ImageData } from "./components/parallax-image";

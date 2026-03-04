import { Marquee } from "@/app/components/marquee";
import {
  ParallaxContainer,
  ParallaxGalleryDelegate,
  ParallaxImageComponent,
  useParallaxEngine,
} from "../../components/parallax-gallery";
import { heroImages } from "./constants";

export const HeroIndex = () => {
  const { containerRef, delegate } = useParallaxEngine(
    (container: HTMLElement) => new ParallaxGalleryDelegate(container),
  );

  return (
    <div
      id="hero-section"
      className="mx-auto relative w-screen h-screen overflow-hidden"
    >
      <ParallaxContainer>
        <div
          ref={containerRef}
          className="absolute inset-0 h-full w-full overflow-hidden grid grid-cols-2 md:grid-cols-4 auto-rows-[10px] gap-5 grid-flow-dense"
        >
          {heroImages.map((img, i) => (
            <ParallaxImageComponent
              key={`${img.src}-${i}`}
              registerLayer={delegate?.registerLayer}
              width={img.width}
              height={img.height}
              src={img.src}
              alt={img.alt}
              index={i}
            />
          ))}
        </div>
      </ParallaxContainer>
      <div className="absolute inset-0 -bottom-180 lg:-bottom-200 z-50 flex justify-center items-center px-20 font-bold pointer-events-none">
        <div className="justify-center">
          <Marquee
            items={[
              "Worrachit",
              "Pongkatekarm",
              "—",
              "Worrachit",
              "Pongkatekarm",
              "—",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

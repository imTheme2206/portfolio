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
          className="absolute inset-0 h-full w-full overflow-hidden grid grid-cols-2 md:grid-cols-4 auto-rows-[4px] gap-y-2 gap-x-2 grid-flow-dense"
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
      <div className="absolute inset-0 -bottom-[70%] z-999 flex justify-center items-center px-20 font-bold pointer-events-none">
        <div className="justify-center">
          <Marquee>
            {[
              "Worrachit",
              "Pongkatekarm",
              "—",
              "Worrachit",
              "Pongkatekarm",
              "—",
            ].map((text, index) => (
              <h1
                key={index}
                className={`whitespace-nowrap leading-none text-secondary dark:text-primary flex text-[120px] md:text-[200px] mr-24`}
              >
                {text}
              </h1>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

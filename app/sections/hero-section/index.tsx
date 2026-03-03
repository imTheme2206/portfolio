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
    <div id="hero-section" className="mx-auto relative">
      <div className="w-full gap-16 flex overflow-hidden">
        <ParallaxContainer>
          <div
            ref={containerRef}
            className="col-span-4 grid grid-cols-4 auto-rows-[10px] gap-4 grid-flow-dense"
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
      </div>
      <div className="absolute inset-0 lg:-bottom-160 z-50 flex justify-center items-center px-20 font-bold pointer-events-none">
        <div>
          <div className="uppercase text-5xl sm:text-5xl md:text-6xl xl:text-[9rem] lg:flex lg:gap-x-6 xl:gap-x-20 flex-wrap xl:flex-nowrap justify-center">
            <Marquee items={["Worrachit", "Pongkatekarm", "-"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

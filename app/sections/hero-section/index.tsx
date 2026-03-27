import { AnimatedHeader } from "@/app/components/animated-header";
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
      <div className="absolute inset-0 top-200 z-999 pointer-events-none">
        <AnimatedHeader
          // title="test"
          subtitle="Software Engineer"
          text={`Hi, I'm just a Frontend enthusiast. \\n I enjoy coding with a home-brew coffee \\n I also goes with the name \\"Theme!"`}
          withScrollTrigger={false}
          textFlow="horizontal"
          disableFlyMotion
        />
      </div>
      <div className="absolute inset-0 -bottom-180 lg:-bottom-190 z-999 flex justify-center items-center px-20 font-bold pointer-events-none">
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
                className={`whitespace-nowrap leading-none text-primary flex text-[120px] md:text-[200px] mr-24`}
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

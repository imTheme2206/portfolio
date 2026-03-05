import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatedHeader } from "@/app/components/animated-header";
import { workExperiences } from "@/app/constants";
export const Experiences = () => {
  const text = `I build secure, high-performance full-stack apps
    with smooth UX to drive growth
    not headaches.`;
  const serviceRefs = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = true;
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
        end: "+=150 90%",
        scrub: 1,
      },
      scale: 0.93,
    });

    // gsap.from(containerRef.current, {
    //   scrollTrigger: {
    //     trigger: containerRef.current,
    //     start: "top 90%",
    //     end: "+=150 90%",
    //     scrub: 1,
    //   },
    //   scale: 0.95,
    // });

    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150 bottom",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
      xPercent: 100,
    });
  }, []);
  return (
    <section
      data-cursor="experience"
      className="min-h-screen text-primary-foreground flex justify-center"
    >
      <div
        ref={containerRef}
        className="bg-popover-foreground w-full rounded-4xl"
      >
        <AnimatedHeader
          subtitle={"Behind the scene, Beyond the screen"}
          title={"Experiences"}
          text={text}
          withScrollTrigger={false}
        />
        <div ref={contentRef} className="">
          {workExperiences.map((service, index) => (
            <div
              // ref={(el) => {
              //   serviceRefs.current[index] = el as HTMLDivElement;
              // }}
              key={index}
              className="sticky px-10 pt-6 pb-12  bg-popover-foreground last:rounded-b-4xl border-t-2 border-popover"
              style={
                isDesktop
                  ? {
                      top: `calc(5vh + ${index * 5}em)`,
                      marginBottom: `${(workExperiences?.length - index - 1) * 5}rem`,
                    }
                  : { top: 0 }
              }
            >
              <div className="flex items-center justify-between gap-4 font-light">
                <div className="flex flex-col gap-6">
                  <h2 className="text-4xl lg:text-5xl">{service.title}</h2>
                  <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-pretty">
                    {service.description}
                  </p>
                  <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl ">
                    {service.highlights.map((item, itemIndex) => (
                      <div key={`item-${index}-${itemIndex}`}>
                        <h3 className="flex">
                          <span className="mr-12 text-lg text-primary/30">
                            0{itemIndex + 1}
                          </span>
                          {item.title}
                        </h3>
                        {itemIndex < service.highlights.length - 1 && (
                          <div className="w-full h-px my-2 bg-amber-900/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

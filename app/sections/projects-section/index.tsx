import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Projects = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        toggleActions: "play reverse reverse reverse",
      },
    });

    clipAnimation.to(".in", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0",
    });
  });
  return (
    <div>
      <div className="h-dvh w-screen" id="clip">
        {/*<div className="h-dvh grid place-items-center w-full">TEST</div>*/}
        <div className="in mask-clip-path about-image">
          {/*<Image
            src="/assets/images/IMG_8064 2.JPG"
            alt="test"
            className="in object-contain origin-bottom w-full h-full"
            width={2900}
            height={1900}
            layout="responsive"
          />*/}
          <div className="bg-secondary w-full h-full"></div>
        </div>
      </div>
      <div className="bg-secondary min-h-dvh w-screen">
        <div className="max-w-prose mx-auto py-10 -my-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          consequatur totam maxime quaerat mollitia, provident fugit. Corrupti,
          deserunt eius. Repellendus dolores neque ex reiciendis fugit aliquam
          veritatis vero iure error. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quo consequatur totam maxime quaerat mollitia,
          provident fugit. Corrupti, deserunt eius. Repellendus dolores neque ex
          reiciendis fugit aliquam veritatis vero iure error. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quo consequatur totam maxime
          quaerat mollitia, provident fugit. Corrupti, deserunt eius.
          Repellendus dolores neque ex reiciendis fugit aliquam veritatis vero
          iure error. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quo consequatur totam maxime quaerat mollitia, provident fugit.
          Corrupti, deserunt eius. Repellendus dolores neque ex reiciendis fugit
          aliquam veritatis vero iure error. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quo consequatur totam maxime quaerat
          mollitia, provident fugit. Corrupti, deserunt eius. Repellendus
          dolores neque ex reiciendis fugit aliquam veritatis vero iure error.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          consequatur totam maxime quaerat mollitia, provident fugit. Corrupti,
          deserunt eius. Repellendus dolores neque ex reiciendis fugit aliquam
          veritatis vero iure error. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quo consequatur totam maxime quaerat mollitia,
          provident fugit. Corrupti, deserunt eius. Repellendus dolores neque ex
          reiciendis fugit aliquam veritatis vero iure error. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quo consequatur totam maxime
          quaerat mollitia, provident fugit. Corrupti, deserunt eius.
          Repellendus dolores neque ex reiciendis fugit aliquam veritatis vero
          iure error. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quo consequatur totam maxime quaerat mollitia, provident fugit.
          Corrupti, deserunt eius. Repellendus dolores neque ex reiciendis fugit
          aliquam veritatis vero iure error. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quo consequatur totam maxime quaerat
          mollitia, provident fugit. Corrupti, deserunt eius. Repellendus
          dolores neque ex reiciendis fugit aliquam veritatis vero iure error.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          consequatur totam maxime quaerat mollitia, provident fugit. Corrupti,
          deserunt eius. Repellendus dolores neque ex reiciendis fugit aliquam
          veritatis vero iure error. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quo consequatur totam maxime quaerat mollitia,
          provident fugit. Corrupti, deserunt eius. Repellendus dolores neque ex
          reiciendis fugit aliquam veritatis vero iure error. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quo consequatur totam maxime
          quaerat mollitia, provident fugit. Corrupti, deserunt eius.
          Repellendus dolores neque ex reiciendis fugit aliquam veritatis vero
          iure error. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quo consequatur totam maxime quaerat mollitia, provident fugit.
          Corrupti, deserunt eius. Repellendus dolores neque ex reiciendis fugit
          aliquam veritatis vero iure error. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quo consequatur totam maxime quaerat
          mollitia, provident fugit. Corrupti, deserunt eius. Repellendus
          dolores neque ex reiciendis fugit aliquam veritatis vero iure error.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          consequatur totam maxime quaerat mollitia, provident fugit. Corrupti,
          deserunt eius. Repellendus dolores neque ex reiciendis fugit aliquam
          veritatis vero iure error. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quo consequatur totam maxime quaerat mollitia,
          provident fugit. Corrupti, deserunt eius. Repellendus dolores neque ex
          reiciendis fugit aliquam veritatis vero iure error. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quo consequatur totam maxime
          quaerat mollitia, provident fugit. Corrupti, deserunt eius.
          Repellendus dolores neque ex reiciendis fugit aliquam veritatis vero
          iure error. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quo consequatur totam maxime quaerat mollitia, provident fugit.
          Corrupti, deserunt eius. Repellendus dolores neque ex reiciendis fugit
          aliquam veritatis vero iure error. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quo consequatur totam maxime quaerat
          mollitia, provident fugit. Corrupti, deserunt eius. Repellendus
          dolores neque ex reiciendis fugit aliquam veritatis vero iure error.
        </div>
      </div>
    </div>
  );
};

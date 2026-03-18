import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ParallaxGalleryDelegate } from "../controller/parallax-gallery-delegate";
import { useParallaxEngine } from "../hooks/use-parallax";

export type ImageData = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

export const ParallaxImageGallery = (props: { images: ImageData[] }) => {
  const { containerRef, delegate } = useParallaxEngine(
    (container) => new ParallaxGalleryDelegate(container),
  );

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] auto-rows-[4px] gap-5 grid-flow-dense"
    >
      {props.images.map((img, i) => (
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
  );
};

export const ParallaxImageComponent = ({
  registerLayer,
  src,
  alt,
  width,
  height,
}: {
  src?: string;
  registerLayer?: (layer: {
    img: HTMLImageElement;
    container: HTMLDivElement;
  }) => (() => void) | undefined;
  index: number;
} & Partial<HTMLImageElement>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) {
      setLoaded(true);
    }
  }, []);

  // Calculate column span based on width - wider images span more columns out of 4
  const colSpan = width && width > 800 ? 2 : 1;

  // Calculate row span based on actual height needed
  // Each row is 10px, gap is 16px (gap-4 = 1rem = 16px)
  // Formula: span = (height + gap) / (row_height + gap)
  const ROW_HEIGHT = 10;
  const GAP = 16;
  const aspectRatio = height && width ? height / width : 1;
  // Assuming container width - for 1 column out of 4: ~200px, for 2 columns out of 4: ~416px
  const estimatedWidth = colSpan === 2 ? 416 : 200;
  const estimatedHeight = estimatedWidth * aspectRatio;
  const rowSpan = Math.ceil((estimatedHeight + GAP) / (ROW_HEIGHT + GAP));

  useLayoutEffect(() => {
    if (!containerRef.current || !imgRef.current) {
      return;
    }

    const img = imgRef.current;
    const container = containerRef.current;
    let unregister: (() => void) | undefined;

    const doRegister = () => {
      unregister = registerLayer?.({ img, container });
    };

    if (img.complete && img.naturalWidth > 0) {
      doRegister();
    } else {
      const onLoad = () => {
        doRegister();
        img.removeEventListener("load", onLoad);
      };

      img.addEventListener("load", onLoad);

      return () => {
        img.removeEventListener("load", onLoad);
        unregister?.();
      };
    }

    return () => {
      unregister?.();
    };
  }, [registerLayer]);

  return (
    <div
      ref={containerRef}
      className="relative transition-all w-full h-full duration-300 ease-linear overflow-hidden grayscale-100 brightness-50 hover:grayscale-0 hover:brightness-100"
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br from-zinc-800 via-zinc-900 to-zinc-800 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundSize: "200% 200%",
          animation: loaded ? "none" : "shimmer 1.5s ease-in-out infinite",
        }}
      />
      {src ? (
        <Image
          ref={imgRef}
          draggable={false}
          alt={alt || "Gallery image"}
          onLoad={() => setLoaded(true)}
          className="w-full h-full object-cover absolute inset-0 will-change-transform transition-[filter,opacity] duration-500 ease-out"
          style={{
            // transform: "scale(1)",
            scale: 1.1,
            opacity: loaded ? 1 : 0,
          }}
          width={width}
          height={height}
          src={src}
        />
      ) : (
        <div className="w-full h-full bg-zinc-800 text-primary grid place-items-center text-2xl uppercase">
          {alt}
        </div>
      )}
    </div>
  );
};

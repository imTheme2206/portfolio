import type { ParallaxDelegate } from "./parallax-engine";

export type Layer = {
  img: HTMLImageElement;
  container: HTMLDivElement;
};

export class ParallaxGalleryDelegate implements ParallaxDelegate {
  private layers: Layer[] = [];
  private bounds: DOMRect | null = null;
  private readonly SCALE = 1.15;

  constructor(private container: HTMLElement) {}

  measure = () => {
    this.bounds = this.container.getBoundingClientRect();
  };

  registerLayer = (layer: Layer) => {
    layer.img.style.transform = `scale(${this.SCALE})`;
    this.layers.push(layer);

    return () => {
      this.layers = this.layers.filter((l) => l !== layer);
    };
  };

  apply(x: number, y: number) {
    this.layers.forEach(({ img, container }) => {
      const maxX = (img.offsetWidth * this.SCALE - container.offsetWidth) / 2;
      const maxY = (img.offsetHeight * this.SCALE - container.offsetHeight) / 2;

      const tx = -x * Math.max(0, maxX) * 0.6;
      const ty = -y * Math.max(0, maxY) * 0.25;
      img.style.transform = `
        translate3d(${tx}px, ${ty}px, 0)
        scale(${this.SCALE})
      `;
    });
  }
  reset() {
    this.layers.forEach((l) => {
      l.img.style.transform = `scale(${this.SCALE})`;
    });
  }
}

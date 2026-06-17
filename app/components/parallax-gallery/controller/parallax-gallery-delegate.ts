import type { ParallaxDelegate } from "./parallax-engine";

export type Layer = {
  img: HTMLImageElement;
  container: HTMLDivElement;
};

type LayerCache = {
  maxX: number;
  maxY: number;
};

export class ParallaxGalleryDelegate implements ParallaxDelegate {
  private layers: Layer[] = [];
  private layerCache: LayerCache[] = [];
  private bounds: DOMRect | null = null;
  private readonly SCALE = 1.1;

  constructor(private container: HTMLElement) {}

  measure = () => {
    this.bounds = this.container.getBoundingClientRect();
    this.layerCache = this.layers.map(({ img, container }) => ({
      maxX: (img.offsetWidth * this.SCALE - container.offsetWidth) / 2,
      maxY: (img.offsetHeight * this.SCALE - container.offsetHeight) / 2,
    }));
  };

  registerLayer = (layer: Layer) => {
    layer.img.style.transform = `scale(${this.SCALE})`;
    this.layers.push(layer);
    this.layerCache.push({
      maxX: (layer.img.offsetWidth * this.SCALE - layer.container.offsetWidth) / 2,
      maxY: (layer.img.offsetHeight * this.SCALE - layer.container.offsetHeight) / 2,
    });

    return () => {
      const idx = this.layers.indexOf(layer);
      if (idx !== -1) {
        this.layers.splice(idx, 1);
        this.layerCache.splice(idx, 1);
      }
    };
  };

  apply(x: number, y: number) {
    this.layers.forEach(({ img }, i) => {
      const { maxX, maxY } = this.layerCache[i] ?? { maxX: 0, maxY: 0 };

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

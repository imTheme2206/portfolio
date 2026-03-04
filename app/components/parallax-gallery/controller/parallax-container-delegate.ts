import type { ParallaxDelegate } from "./parallax-engine";

export class ParallaxContainerDelegate implements ParallaxDelegate {
  private bounds: DOMRect | null = null;
  private containerScale = 1.1;

  constructor(
    private container: HTMLElement,
    private content: HTMLElement,
  ) {}

  measure = () => {
    this.bounds = this.container.getBoundingClientRect();
  };

  apply(x: number, y: number) {
    const maxX =
      (this.content.offsetWidth * this.containerScale -
        this.container.offsetWidth) /
      2;

    const maxY =
      (this.content.offsetHeight * this.containerScale -
        this.container.offsetHeight) /
      2;

    const tx = -x * Math.max(0, maxX) * 0.6;
    const ty = -y * Math.max(0, maxY) * 0.25;

    this.content.style.transform = `
      translate3d(${tx}px, ${ty}px, 0)
    `;
  }

  reset() {}
}

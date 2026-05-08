type Vector = {
  x: number;
  y: number;
};

export interface ParallaxDelegate {
  measure(): void;
  apply(x: number, y: number): void;
  reset(): void;
}

export class ParallaxEngine {
  private bounds: DOMRect | null = null;
  private frame: number | null = null;
  private isInside = false;
  private current: Vector = {
    x: 0,
    y: 0,
  };
  private target: Vector = {
    x: 0,
    y: 0,
  };

  constructor(
    private container: HTMLElement,
    private delegate: ParallaxDelegate,
    private ease = 0.1,
  ) {}

  attach() {
    this.measure();
    this.delegate.measure();
    this.container.addEventListener("mouseenter", this.onEnter);
    this.container.addEventListener("mousemove", this.onMove);
    this.container.addEventListener("mouseleave", this.onLeave);
    window.addEventListener("resize", this.onResize);
  }

  private onResize = () => {
    this.measure();
    this.delegate.measure();
  };

  detach() {
    if (!this.container) return;

    this.container.removeEventListener("mouseenter", this.onEnter);
    this.container.removeEventListener("mousemove", this.onMove);
    this.container.removeEventListener("mouseleave", this.onLeave);
    window.removeEventListener("resize", this.onResize);

    if (this.frame) cancelAnimationFrame(this.frame);
  }

  private onEnter = () => {
    this.isInside = true;
    this.measure();
    this.delegate.measure();
    this.start();
  };

  private measure = () => {
    this.bounds = this.container.getBoundingClientRect();
  };

  private onLeave = () => {
    this.isInside = false;
    this.target = { x: 0, y: 0 };
  };

  private onMove = (e: MouseEvent) => {
    if (!this.bounds) return;

    const { left, top, width, height } = this.bounds;

    this.target.x = ((e.clientX - left) / width) * 2 - 1;
    this.target.y = ((e.clientY - top) / height) * 2 - 1;

    this.start();
  };

  private start() {
    if (this.frame === null) {
      this.frame = requestAnimationFrame(this.animate);
    }
  }

  private animate = () => {
    this.current.x += (this.target.x - this.current.x) * this.ease;
    this.current.y += (this.target.y - this.current.y) * this.ease;

    this.delegate.apply(this.current.x, this.current.y);

    const settled =
      Math.abs(this.current.x - this.target.x) < 0.001 &&
      Math.abs(this.current.y - this.target.y) < 0.001;
    if (this.isInside || !settled) {
      this.frame = requestAnimationFrame(this.animate);
    } else {
      this.frame = null;
      this.delegate.reset();
    }
  };
}

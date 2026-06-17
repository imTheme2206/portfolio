type Vector = {
  x: number;
  y: number;
};

export interface ParallaxDelegate {
  measure(): void;
  apply(x: number, y: number): void;
  reset(): void;
}

export type AutoPanConfig = {
  /** angular speed of horizontal sweep, radians per ms (≈ 2π / period_ms) */
  speedX: number;
  /** angular speed of vertical sweep */
  speedY: number;
  /** horizontal amplitude in normalized [-1, 1] */
  amplitudeX: number;
  /** vertical amplitude in normalized [-1, 1] */
  amplitudeY: number;
  /** phase offset on Y so the path traces a soft figure rather than a line */
  phaseY: number;
};

const DEFAULT_AUTO_PAN: AutoPanConfig = {
  speedX: 0.0005,
  speedY: 0.00028,
  amplitudeX: 0.85,
  amplitudeY: 0.25,
  phaseY: Math.PI / 2,
};

export class ParallaxEngine {
  private bounds: DOMRect | null = null;
  private frame: number | null = null;
  private isInside = false;
  private autoPan = false;
  private autoPanConfig: AutoPanConfig = { ...DEFAULT_AUTO_PAN };
  private autoStart = 0;
  /** ambient (non-interactive) frames are throttled to this rate to cut
   * compositor load; the sweep is slow enough that 30fps is imperceptible.
   * Interactive (pointer-driven) frames always run at the display rate. */
  private autoPanFps = 30;
  private lastApply = 0;
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

  startAutoPan(config?: Partial<AutoPanConfig>) {
    if (config) Object.assign(this.autoPanConfig, config);
    if (!this.autoPan) {
      this.autoPan = true;
      // align phase so the sine starts at current target.x to avoid a jump
      const { amplitudeX, speedX } = this.autoPanConfig;
      const ratio = Math.max(-1, Math.min(1, this.target.x / amplitudeX));
      const phase = Math.asin(ratio);
      this.autoStart = performance.now() - phase / speedX;
      this.measure();
      this.delegate.measure();
      this.start();
    }
  }

  stopAutoPan() {
    this.autoPan = false;
    if (!this.isInside) this.target = { x: 0, y: 0 };
  }

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
    if (!this.autoPan) {
      this.target = { x: 0, y: 0 };
    }
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

  private animate = (now = performance.now()) => {
    // Throttle ambient sweep frames: when the pointer isn't over the gallery
    // the only motion is the slow auto-pan, which looks identical at 30fps but
    // halves the per-frame transform writes the compositor has to paint.
    if (!this.isInside) {
      const minDelta = 1000 / this.autoPanFps;
      if (now - this.lastApply < minDelta) {
        this.frame = requestAnimationFrame(this.animate);
        return;
      }
    }
    this.lastApply = now;

    if (this.autoPan && !this.isInside) {
      const t = performance.now() - this.autoStart;
      const { speedX, speedY, amplitudeX, amplitudeY, phaseY } =
        this.autoPanConfig;
      this.target.x = Math.sin(t * speedX) * amplitudeX;
      this.target.y = Math.sin(t * speedY + phaseY) * amplitudeY;
    }

    this.current.x += (this.target.x - this.current.x) * this.ease;
    this.current.y += (this.target.y - this.current.y) * this.ease;

    this.delegate.apply(this.current.x, this.current.y);

    const settled =
      Math.abs(this.current.x - this.target.x) < 0.001 &&
      Math.abs(this.current.y - this.target.y) < 0.001;
    if (this.isInside || !settled || this.autoPan) {
      this.frame = requestAnimationFrame(this.animate);
    } else {
      this.frame = null;
      this.delegate.reset();
    }
  };
}

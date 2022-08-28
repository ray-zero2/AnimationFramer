
interface IAnimationProps {
  deltaTime: number,
  time: number,
}

type AnimationFunction = (props: IAnimationProps) => void;

interface Animation {
  id: string;
  order: number;
  callback: AnimationFunction;
}

type AddedAnimation = Omit<Animation, 'order'> & Partial<Pick<Animation, 'order'>>

export default class AnimationFramer {
  private static instance: AnimationFramer | null = null;
  static getInstance() {
    if (!AnimationFramer.instance) {
      AnimationFramer.instance = new AnimationFramer();
    }
    return AnimationFramer.instance;
  }

  private time: number = 0;
  private deltaTime: number = 0;
  private lastTimestamp: number = 0;
  // private fps: number = 60;
  private animationCount: number = 0;
  private animationId: number|null = null;
  private animations: Animation[] = [];

  get animationList() { return this.animations }

  get currentTime() { return this.time }

  // get targetFPS() { return this.fps }
  // set targetFPS(value: number) { this.fps = value }

  add(animation: AddedAnimation) {
    const needsRestarting = this.animationId !== null;
    if(needsRestarting) this.stop();
    const order = animation.order ?? this.animationCount;
    this.animations.push({ ...animation, order });
    this.sortAnimationsArray();
    if(needsRestarting) this.start();
    this.animationCount++;
    return this;
  }

  remove(id: string) {
    const needsRestarting = this.animationId !== null;
    if(needsRestarting) this.stop();
    const newAnimations =
      this.animations
        .filter(animation => animation.id !== id)
    this.animations = newAnimations;
    if(needsRestarting) this.start();
    return this;
  }

  removeAll() {
    this.stop();
    this.animations = [];
    this.animationCount = 0;
    return this;
  }

  start() {
    this.lastTimestamp = performance.now();
    this.animate();
  }

  stop() {
    if(this.animationId) cancelAnimationFrame(this.animationId);
    this.lastTimestamp = 0;
    this.animationId = null;
  }

  reset(needsAllRemoving: boolean = true) {
    this.stop();
    this.time = 0;
    if(needsAllRemoving) this.removeAll();
  }

  reorder() {
    this.sortAnimationsArray();
    const renumbered =
      this.animations
        .map((animation, index) => ({
          ...animation,
          order: index
        }));
    this.animationCount = renumbered.length;
    this.animations = renumbered;
  }

  protected animate() {
    const timestamp = performance.now();
    this.animationId = requestAnimationFrame(this.animate.bind(this));
    this.deltaTime = (timestamp - this.lastTimestamp) * 0.001;
    this.time += this.deltaTime
    this.animations.forEach(animation => {
      animation.callback({ deltaTime: this.deltaTime, time: this.time });
    });
    this.lastTimestamp = timestamp;
  }

  private sortAnimationsArray() {
    this.animations.sort((a, b) => a.order - b.order);
  }
}

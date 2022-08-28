interface IAnimationProps {
    deltaTime: number;
    time: number;
}
declare type AnimationFunction = (props: IAnimationProps) => void;
interface Animation {
    id: string;
    order: number;
    callback: AnimationFunction;
}
declare type AddedAnimation = Omit<Animation, 'order'> & Partial<Pick<Animation, 'order'>>;
export default class AnimationFramer {
    private static instance;
    static getInstance(): AnimationFramer;
    private time;
    private deltaTime;
    private lastTimestamp;
    private animationCount;
    private animationId;
    private animations;
    get animationList(): Animation[];
    get currentTime(): number;
    add(animation: AddedAnimation): this;
    remove(id: string): this;
    removeAll(): this;
    start(): void;
    stop(): void;
    reset(needsAllRemoving?: boolean): void;
    reorder(): void;
    protected animate(): void;
    private sortAnimationsArray;
}
export {};

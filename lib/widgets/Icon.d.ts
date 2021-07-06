import { Clickable } from '../mixins/Clickable';
import { BoxLayout } from '../mixins/BoxLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
export declare type IconCallback = () => void;
declare const Icon_base: import("ts-mixer/dist/types/types").Class<any[], BoxLayout & Clickable, typeof BoxLayout & typeof Clickable, false>;
export declare class Icon extends Icon_base {
    private _image;
    private lastSrc;
    private _rotation;
    callback: IconCallback | null;
    viewBox: [number, number, number, number] | null;
    width: number | null;
    height: number | null;
    constructor(image: HTMLImageElement, width?: number | null, height?: number | null, viewBox?: [number, number, number, number] | null, callback?: IconCallback | null, themeOverride?: Theme | null);
    private updateDimensions;
    setImage(image: HTMLImageElement): void;
    private getIconRect;
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
    protected handlePreLayoutUpdate(_root: Root): void;
    get rotation(): number;
    set rotation(rotation: number);
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};

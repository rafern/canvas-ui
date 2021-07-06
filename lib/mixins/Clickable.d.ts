import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Widget } from '../widgets/Widget';
export declare enum ClickState {
    Released = 0,
    Hover = 1,
    Hold = 2
}
export declare class Clickable extends Widget {
    protected lastClickState: ClickState;
    protected clickState: ClickState;
    protected clickStateChanged: boolean;
    protected wasClick: boolean;
    protected pointerPos: [number, number] | null;
    protected startingPointerPos: [number, number] | null;
    protected getNormalInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): [number, number];
    protected isPointInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): boolean;
    protected isNormalInRect(pX: number, pY: number): boolean;
    private setClickState;
    protected handleClickEvent(event: Event, root: Root, clickArea: [number, number, number, number]): void;
}

import { Clickable } from '../mixins/Clickable';
import { FlexContainer } from './FlexContainer';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
declare const Button_base: import("ts-mixer/dist/types/types").Class<[child: Widget, propagateEvents: boolean, flexRatio?: number | undefined, mainBasis?: number | undefined, crossBasis?: number | undefined, vertical?: boolean | null | undefined, themeOverride?: Theme | null | undefined], Clickable & FlexContainer, {
    prototype: Clickable;
} & {
    prototype: FlexContainer;
}>;
/**
 * A {@link FlexContainer} which can be {@link Clickable | clicked} as a button.
 * Since the button grabs all events, no events are propagated to the child.
 *
 * @category Widget
 */
export declare class Button extends Button_base {
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    callback: (() => void) | null;
    /** Create a new Button. */
    constructor(child: Widget, callback?: (() => void) | null, flexRatio?: number, mainBasis?: number, crossBasis?: number, vertical?: boolean | null, themeOverride?: Theme | null);
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
}
export {};

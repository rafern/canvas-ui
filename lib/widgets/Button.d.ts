import { Clickable } from '../mixins/Clickable';
import { BaseContainer } from './BaseContainer';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
/**
 * A function with no input or return values. Used as callbacks for
 * {@link Button}.
 *
 * Note that this has no background fill. If you want one, use
 * {@link FilledButton} instead.
 *
 * @category Widget
 */
export declare type ButtonCallback = () => void;
declare const Button_base: import("ts-mixer/dist/types/types").Class<[child: Widget, propagateEvents: boolean, themeOverride?: Theme | null | undefined], Clickable & BaseContainer, {
    prototype: Clickable;
} & {
    prototype: BaseContainer;
}>;
/**
 * A {@link BaseContainer} which can be clicked {@link Clickable} as a button.
 * Since the button grabs all events, no events are propagated to the child.
 *
 * @category Widget
 */
export declare class Button extends Button_base {
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    callback: ButtonCallback | null;
    /** Create a new Button. */
    constructor(child: Widget, callback?: ButtonCallback | null, themeOverride?: Theme | null);
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
}
export {};

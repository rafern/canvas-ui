import { /* tree-shaking no-side-effects-when-called */ Mixin } from 'ts-mixer';
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
export type ButtonCallback = () => void;

/**
 * A {@link BaseContainer} which can be clicked {@link Clickable} as a button.
 * Since the button grabs all events, no events are propagated to the child.
 *
 * @category Widget
 */
export class Button extends Mixin(Clickable, BaseContainer) {
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    callback: ButtonCallback | null;

    /** Create a new Button. */
    constructor(child: Widget, callback: ButtonCallback | null = null, themeOverride: Theme | null = null) {
        super(child, false, themeOverride);
        this.callback = callback;
    }

    protected override handleEvent(event: Event, width: number, height: number, root: Root): Widget | null {
        // Abort if no callback, but still absorb events
        if(this.callback === null) {
            this.clickStateChanged = false;
            return this;
        }

        // Check if button was pressed and call callback if so
        this.handleClickEvent(event, root, [0, width, 0, height]);
        if(this.clickStateChanged && this.wasClick) {
            try {
                this.callback();
            }
            catch(e) {
                console.error('Exception in Icon callback', e);
            }
        }

        return this;
    }
}

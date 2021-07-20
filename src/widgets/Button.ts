import { /* tree-shaking no-side-effects-when-called */ Mixin } from 'ts-mixer';
import { Clickable } from '../mixins/Clickable';
import { FlexContainer } from './FlexContainer';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';

/**
 * A {@link FlexContainer} which can be {@link Clickable | clicked} as a button.
 * Since the button grabs all events, no events are propagated to the child.
 *
 * @category Widget
 */
export class Button extends Mixin(Clickable, FlexContainer) {
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    callback: (() => void) | null;

    /** Create a new Button. */
    constructor(child: Widget, callback: (() => void) | null = null, flexRatio = 1, mainBasis = 0, crossBasis = 0, vertical: boolean | null = null, themeOverride: Theme | null = null) {
        super(child, false, flexRatio, mainBasis, crossBasis, vertical, themeOverride);
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

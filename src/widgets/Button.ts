import { ClickHelper } from '../aggregates/ClickHelper';
import { PointerWheel } from '../events/PointerWheel';
import { BaseContainer } from './BaseContainer';
import type { ThemeProperties } from '../theme/ThemeProperties';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';

/**
 * A {@link BaseContainer} which can be {@link Clickable | clicked} as a button.
 * Since the button grabs all events, no events are propagated to the child.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export class Button<W extends Widget = Widget> extends BaseContainer<W> {
    /** The helper for handling pointer clicks */
    protected clickHelper: ClickHelper;
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    callback: (() => void) | null;

    /** Create a new Button. */
    constructor(child: W, callback: (() => void) | null = null, themeProperties?: ThemeProperties) {
        super(child, false, themeProperties);
        this.clickHelper = new ClickHelper(this);
        this.callback = callback;
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        // Ignore wheel events
        if(event instanceof PointerWheel)
            return null;

        // Abort if no callback, but still absorb events
        if(this.callback === null) {
            this.clickHelper.clickStateChanged = false;
            return this;
        }

        // Check if button was pressed and call callback if so
        this.clickHelper.handleClickEvent(event, root, [this.x, this.x + this.width, this.y, this.y + this.height]);
        if(this.clickHelper.clickStateChanged && this.clickHelper.wasClick) {
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

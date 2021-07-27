import { ClickHelper } from '../aggregates/ClickHelper';
import { BaseContainer } from './BaseContainer';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
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
export declare class Button<W extends Widget = Widget> extends BaseContainer<W> {
    /** The helper for handling pointer clicks */
    protected clickHelper: ClickHelper;
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    callback: (() => void) | null;
    /** Create a new Button. */
    constructor(child: W, callback?: (() => void) | null, themeOverride?: Theme | null);
    protected handleEvent(event: Event, root: Root): Widget | null;
}

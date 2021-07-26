import { ClickHelper } from '../aggregates/ClickHelper';
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
export declare class Button extends FlexContainer {
    /** The helper for handling pointer clicks */
    protected clickHelper: ClickHelper;
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    callback: (() => void) | null;
    /** Create a new Button. */
    constructor(child: Widget, callback?: (() => void) | null, flexRatio?: number, mainBasis?: number, crossBasis?: number, vertical?: boolean | null, themeOverride?: Theme | null);
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
}

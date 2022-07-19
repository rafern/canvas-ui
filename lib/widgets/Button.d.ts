import { ButtonClickHelper } from '../helpers/ButtonClickHelper';
import type { ThemeProperties } from '../theme/ThemeProperties';
import type { FocusType } from '../core/FocusType';
import { BaseContainer } from './BaseContainer';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
/**
 * A {@link BaseContainer} which can be {@link ClickHelper | clicked} as a
 * button. Since the button grabs all events, no events are propagated to the
 * child.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export declare class Button<W extends Widget = Widget> extends BaseContainer<W> {
    /** The helper used for handling pointer clicks and enter presses */
    protected clickHelper: ButtonClickHelper;
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    callback: (() => void) | null;
    /** Create a new Button. */
    constructor(child: W, callback?: (() => void) | null, themeProperties?: ThemeProperties);
    /**
     * Click the button. If there is a callback, then the callback will be
     * called
     */
    click(): void;
    onFocusGrabbed(focusType: FocusType, _root: Root): void;
    onFocusDropped(focusType: FocusType, _root: Root): void;
    protected handleEvent(event: Event, root: Root): Widget | null;
}

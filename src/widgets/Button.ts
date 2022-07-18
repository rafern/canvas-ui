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
export class Button<W extends Widget = Widget> extends BaseContainer<W> {
    /** The helper used for handling pointer clicks and enter presses */
    protected clickHelper: ButtonClickHelper;
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    callback: (() => void) | null;

    /** Create a new Button. */
    constructor(child: W, callback: (() => void) | null = null, themeProperties?: ThemeProperties) {
        super(child, false, themeProperties);
        this.clickHelper = new ButtonClickHelper(this);
        this.callback = callback;
        this.tabFocusable = true;
    }

    /**
     * Click the button. If there is a callback, then the callback will be
     * called
     */
    click(): void {
        if(this.callback !== null) {
            try {
                this.callback();
            }
            catch(e) {
                console.error('Exception in Icon callback', e);
            }
        }
    }

    override onFocusGrabbed(focusType: FocusType, _root: Root): void {
        this.clickHelper.onFocusGrabbed(focusType);
    }

    override onFocusDropped(focusType: FocusType, _root: Root): void {
        this.clickHelper.onFocusDropped(focusType);
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        const [wasClick, capture] = this.clickHelper.handleEvent(
            event,
            root,
            this.callback !== null,
            [this.x, this.x + this.width, this.y, this.y + this.height]
        );

        if(wasClick)
            this.click();

        return capture ? this : null;
    }
}

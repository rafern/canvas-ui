import { CompoundClickHelper } from '../helpers/CompoundClickHelper';
import { GenericClickHelper } from '../helpers/GenericClickHelper';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { PointerWheel } from '../events/PointerWheel';
import { ClickHelper } from '../helpers/ClickHelper';
import { KeyRelease } from '../events/KeyRelease';
import { BaseContainer } from './BaseContainer';
import { KeyEvent } from '../events/KeyEvent';
import { KeyPress } from '../events/KeyPress';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
import { ClickState } from '../helpers/ClickState';

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
    /** The helper for handling pointer clicks */
    protected pointerClickHelper: ClickHelper;
    /** The helper for handling pointer clicks */
    protected keyboardClickHelper: GenericClickHelper;
    /** {@link pointerClickHelper} and {@link keyboardClickHelper} combined */
    protected clickHelper: CompoundClickHelper;
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    callback: (() => void) | null;

    /** Create a new Button. */
    constructor(child: W, callback: (() => void) | null = null, themeProperties?: ThemeProperties) {
        super(child, false, themeProperties);
        this.pointerClickHelper = new ClickHelper(this);
        this.keyboardClickHelper = new GenericClickHelper(this);
        this.clickHelper = new CompoundClickHelper([this.pointerClickHelper, this.keyboardClickHelper]);
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
        if(focusType === FocusType.Keyboard)
            this.keyboardClickHelper.setClickState(ClickState.Hover, true);
    }

    override onFocusDropped(focusType: FocusType, _root: Root): void {
        if(focusType === FocusType.Keyboard)
            this.keyboardClickHelper.setClickState(ClickState.Released, false);
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        // Ignore wheel events
        if(event instanceof PointerWheel)
            return null;

        // Discard non-enter key events
        if(event instanceof KeyEvent) {
            // don't capture tab presses so that tab selection works, but
            // capture any other key press so that focus isn't lost when
            // accidentally pressing other keys (or when pressing a modifier
            // key)
            if(event.key === 'Tab')
                return null;
            else if(event.key !== 'Enter')
                return this;
        }

        // Abort if no callback, but still absorb events
        if(this.callback === null) {
            this.pointerClickHelper.clickStateChanged = false;
            this.keyboardClickHelper.clickStateChanged = false;
            return this;
        }

        // Update button state
        if(event instanceof KeyPress) {
            this.pointerClickHelper.clickStateChanged = false;
            this.keyboardClickHelper.setClickState(ClickState.Hold, true);
        }
        else if(event instanceof KeyRelease) {
            this.pointerClickHelper.clickStateChanged = false;
            this.keyboardClickHelper.setClickState(ClickState.Hover, true);
        }
        else {
            this.keyboardClickHelper.clickStateChanged = false;
            this.pointerClickHelper.handleClickEvent(event, root, [this.x, this.x + this.width, this.y, this.y + this.height]);
        }

        // Check if button was pressed and call callback if so
        if(this.clickHelper.clickStateChanged && this.clickHelper.wasClick)
            this.click();

        return this;
    }
}

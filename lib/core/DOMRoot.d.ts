import type { Widget } from '../widgets/Widget';
import { Theme } from '../theme/Theme';
import { Root } from './Root';
/**
 * Like Root, but for easy use in an HTML page.
 *
 * Instead of calling each individual update method, simply call {@link update}
 * on every animation frame. {@link Driver | Drivers} still need to be manually
 * registered.
 *
 * @category Core
 */
export declare class DOMRoot extends Root {
    /** This root's canvas element. Add this to the HTML body */
    readonly domElem: HTMLCanvasElement;
    /** This root's canvas element's context. Used for painting */
    private domCanvasContext;
    /**
     * Create a new DOMRoot.
     *
     * Sets {@link child} and {@link child}'s
     * {@link Widget.inheritedTheme | inherited theme}. Also sets up a
     * {@link pointerStyleHandler} which simply sets the CSS cursor style of
     * {@link domElem}. Creates {@link domElem} and {@link domCanvasContext}.
     *
     * @param theme If none supplied, then the default theme found in {@link Theme.constructor} is used
     */
    constructor(child: Widget, theme?: Theme);
    /**
     * Update DOMRoot.
     *
     * If root is disabled, {@link domElem}'s display style is set to 'none',
     * hiding it.
     *
     * Calls {@link preLayoutUpdate}, {@link resolveLayout},
     * {@link postLayoutUpdate} and {@link paint}.
     */
    update(): void;
    get resolution(): number;
    set resolution(resolution: number);
    /** Apply CSS scaling to the DOM element depending on the Root resolution */
    private autoScale;
}

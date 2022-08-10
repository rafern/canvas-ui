import type { Widget } from '../widgets/Widget';
import { Root, RootProperties } from './Root';
/**
 * Like Root, but for easy use in an HTML page.
 *
 * Instead of calling each individual update method, simply call
 * {@link DOMRoot#update} on every animation frame. {@link Driver | Drivers}
 * still need to be manually registered.
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
     * Sets {@link Root#child} and {@link Root#child}'s
     * {@link Widget#inheritedTheme | inherited theme}. Also sets up a
     * {@link Root#pointerStyleHandler} which simply sets the CSS cursor style
     * of {@link DOMRoot#domElem}, unless a handler is already supplied in the
     * optional properties argument. Creates {@link DOMRoot#domElem} and
     * {@link DOMRoot#domCanvasContext}.
     */
    constructor(child: Widget, properties?: Readonly<RootProperties>);
    /**
     * Update DOMRoot.
     *
     * If root is disabled, {@link DOMRoot#domElem}'s display style is set to
     * 'none', hiding it.
     *
     * Calls {@link Root#preLayoutUpdate}, {@link Root#resolveLayout},
     * {@link Root#postLayoutUpdate} and {@link Root#paint}.
     */
    update(): void;
    /** Update the width and height of {@link DOMRoot#domElem} */
    private updateDOMDims;
    /**
     * Counter Root viewport scaling with an opposite CSS scale (via width and
     * height, not CSS transforms).
     */
    private autoScale;
}

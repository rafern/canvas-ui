import { defaultTheme } from '../theme/defaultTheme';
import type { Widget } from '../widgets/Widget';
import type { Theme } from '../theme/Theme';
import { Root } from './Root';

/**
 * Like Root, but for easy use in an HTML page.
 *
 * Instead of calling each individual update method, simply call {@link update}
 * on every animation frame. {@link Driver | Drivers} still need to be manually
 * registered.
 */
export class DOMRoot extends Root {
    /** This root's canvas element. Add this to the HTML body */
    readonly domElem: HTMLCanvasElement;
    /** This root's canvas element's context. Used for painting */
    private domCanvasContext: CanvasRenderingContext2D;

    /**
     * Create a new DOMRoot.
     *
     * Sets {@link child} and {@link child}'s
     * {@link Widget.inheritedTheme | inherited theme}. Also sets up a
     * {@link pointerStyleHandler} which simply sets the CSS cursor style of
     * {@link domElem}. Creates {@link domElem} and {@link domCanvasContext}.
     *
     * By default, the theme is {@link defaultTheme}.
     */
    constructor(child: Widget, theme: Theme = defaultTheme) {
        super(child, null, theme);

        // Make DOM element, which is a canvas, and get a 2D context for it
        this.domElem = document.createElement('canvas');
        this.domElem.tabIndex = 1;
        [this.domElem.width, this.domElem.height] = this.dimensions;

        const context = this.domElem.getContext('2d', { alpha: true });
        if(context === null)
            throw 'Failed to get DOM canvas context';

        this.domCanvasContext = context;

        // Setup pointer style handler
        this.pointerStyleHandler = (newPointerStyle: string): void => {
            this.domElem.style.cursor = newPointerStyle;
        };
    }

    /**
     * Update DOMRoot.
     *
     * If root is disabled, {@link domElem}'s display style is set to 'none',
     * hiding it.
     *
     * Calls {@link preLayoutUpdate}, {@link resolveLayout},
     * {@link postLayoutUpdate} and {@link paint}.
     */
    update(): void {
        if(!this.enabled) {
            this.domElem.style.display = 'none';
            return;
        }
        else
            this.domElem.style.removeProperty('display');

        this.preLayoutUpdate();
        if(this.resolveLayout())
            [this.domElem.width, this.domElem.height] = this.dimensions;
        this.postLayoutUpdate();
        if(this.paint()) {
            this.domCanvasContext.globalCompositeOperation = 'copy';
            this.domCanvasContext.drawImage(this.canvas, 0, 0);
        }
    }
}
import { TextPasteEvent } from '../events/TextPasteEvent';
import type { Widget } from '../widgets/Widget';
import { Theme } from '../theme/Theme';
import { Msg } from './Strings';
import { Root } from './Root';

/**
 * Like Root, but for easy use in an HTML page.
 *
 * Instead of calling each individual update method, simply call
 * {@link DOMRoot#update} on every animation frame. {@link Driver | Drivers}
 * still need to be manually registered.
 *
 * @category Core
 */
export class DOMRoot extends Root {
    /** This root's canvas element. Add this to the HTML body */
    readonly domElem: HTMLCanvasElement;
    /** This root's canvas element's context. Used for painting */
    private domCanvasContext: CanvasRenderingContext2D;

    /**
     * Create a new DOMRoot.
     *
     * Sets {@link Root#child} and {@link Root#child}'s
     * {@link Widget#inheritedTheme | inherited theme}. Also sets up a
     * {@link Root#pointerStyleHandler} which simply sets the CSS cursor style
     * of {@link DOMRoot#domElem}. Creates {@link DOMRoot#domElem} and
     * {@link DOMRoot#domCanvasContext}.
     *
     * @param theme - If none supplied, then the default theme found in {@link (Theme:constructor)} is used
     */
    constructor(child: Widget, theme: Theme = new Theme()) {
        super(child, null, theme);

        // Make DOM element, which is a canvas, and get a 2D context for it
        this.domElem = document.createElement('canvas');
        this.domElem.tabIndex = 1;
        this.updateDOMDims();

        const context = this.domElem.getContext('2d', { alpha: true });
        if(context === null)
            throw new Error(Msg.REUSABLE_CANVAS_CONTEXT);

        this.domCanvasContext = context;

        // Setup pointer style handler
        this.pointerStyleHandler = (newPointerStyle: string): void => {
            this.domElem.style.cursor = newPointerStyle;
        };

        // Listen to paste events
        this.domElem.addEventListener('paste', event => {
            event.preventDefault();
            if(event.clipboardData !== null)
                this.dispatchEvent(new TextPasteEvent(event.clipboardData.getData('text')));
        });
        this.domElem.contentEditable = 'true';

        // Remove styling added by contenteditable
        this.domElem.style.outline = '0px solid transparent';
        this.domElem.style.caretColor = 'transparent';
        this.domElem.style.cursor = 'default';
    }

    /**
     * Update DOMRoot.
     *
     * If root is disabled, {@link DOMRoot#domElem}'s display style is set to
     * 'none', hiding it.
     *
     * Calls {@link Root#preLayoutUpdate}, {@link Root#resolveLayout},
     * {@link Root#postLayoutUpdate} and {@link Root#paint}.
     */
    update(): void {
        if(!this.enabled) {
            this.domElem.style.display = 'none';
            return;
        }
        else
            this.domElem.style.removeProperty('display');

        this.preLayoutUpdate();
        if(this.resolveLayout()) {
            this.updateDOMDims();
            this.autoScale();
        }
        this.postLayoutUpdate();
        if(this.paint()) {
            this.domCanvasContext.globalCompositeOperation = 'copy';
            this.domCanvasContext.drawImage(this.canvas, 0, 0);
        }
    }

    override get resolution(): number {
        return super.resolution;
    }

    override set resolution(resolution: number) {
        super.resolution = resolution;
        this.autoScale();
    }

    /** Update the width and height of {@link DOMRoot#domElem} */
    private updateDOMDims(): void {
        const [scaleX, scaleY] = this.effectiveScale;
        const [dimsX, dimsY] = this.dimensions;
        // XXX canvas width/height is auto-truncated, so manually round it
        // so that values such as 99.9997 don't get turned into 99 instead
        // of 100
        this.domElem.width = Math.round(dimsX * scaleX);
        this.domElem.height = Math.round(dimsY * scaleY);
    }

    /** Apply CSS scaling to the DOM element depending on the Root resolution */
    private autoScale(): void {
        const [scaleX, scaleY] = this.effectiveScale;
        this.domElem.style.width = (this.domElem.width / this.resolution / scaleX).toString() + 'px';
        this.domElem.style.height = (this.domElem.height / this.resolution / scaleY).toString() + 'px';
    }
}
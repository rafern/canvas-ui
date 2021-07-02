import type { PointerStyleHandler } from './PointerStyleHandler';
import { defaultTheme } from '../theme/DefaultTheme';
import type { Widget } from '../widgets/Widget';
import type { Theme } from '../theme/Theme';
import { Root } from './Root';

export class DOMRoot extends Root {
    // Like Root, but for easy use in an HTML page. Instead of calling each
    // individual update method, simply call update every frame. Drivers still
    // need to be manually registered
    readonly domElem: HTMLCanvasElement;
    #domCanvasContext: CanvasRenderingContext2D;

    constructor(child: Widget, pointerStyleHandler: PointerStyleHandler | null = null, theme: Theme = defaultTheme) {
        super(child, pointerStyleHandler, theme);

        // Make DOM element, which is a canvas, and get a 2D context for it
        this.domElem = document.createElement('canvas');
        [this.domElem.width, this.domElem.height] = this.dimensions;

        const context = this.domElem.getContext('2d', { alpha: true });
        if(context === null)
            throw 'Failed to get DOM canvas context';
        context.globalCompositeOperation = 'copy';

        this.#domCanvasContext = context;
    }

    update(): void {
        this.preLayoutUpdate();
        if(this.resolveLayout())
            [this.domElem.width, this.domElem.height] = this.dimensions;
        this.postLayoutUpdate();
        if(this.paint())
            this.#domCanvasContext.drawImage(this.canvas, 0, 0);
    }
}
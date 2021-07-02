import type { PointerStyleHandler } from './PointerStyleHandler';
import type { Widget } from '../widgets/Widget';
import type { Theme } from '../theme/Theme';
import { Root } from './Root';
export declare class DOMRoot extends Root {
    #private;
    readonly domElem: HTMLCanvasElement;
    constructor(child: Widget, pointerStyleHandler?: PointerStyleHandler | null, theme?: Theme);
    update(): void;
}

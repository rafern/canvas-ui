import type { Widget } from '../widgets/Widget';
import type { Theme } from '../theme/Theme';
import { Root } from './Root';
export declare class DOMRoot extends Root {
    #private;
    readonly domElem: HTMLCanvasElement;
    constructor(child: Widget, theme?: Theme);
    update(): void;
}

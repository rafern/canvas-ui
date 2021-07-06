import type { Widget } from '../widgets/Widget';
import type { Theme } from '../theme/Theme';
import { Root } from './Root';
export declare class DOMRoot extends Root {
    readonly domElem: HTMLCanvasElement;
    private domCanvasContext;
    constructor(child: Widget, theme?: Theme);
    update(): void;
}

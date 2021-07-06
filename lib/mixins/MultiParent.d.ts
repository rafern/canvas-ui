import type { Widget } from '../widgets/Widget';
import type { Theme } from '../theme/Theme';
import { Parent } from './Parent';
export declare class MultiParent extends Parent {
    constructor(children: Array<Widget>, themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean);
    add(children: Widget | Array<Widget>): this;
    remove(children: Widget | Array<Widget>): this;
    clearChildren(): this;
}

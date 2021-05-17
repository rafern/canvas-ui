import { MultiParent } from '../interfaces/MultiParent';
import { ParentWidget } from './ParentWidget';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';
export declare class MultiParentWidget extends ParentWidget implements MultiParent {
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean, children: Array<Widget>);
    add(children: Widget | Array<Widget>): this;
    remove(children: Widget | Array<Widget>): this;
    clearChildren(): this;
}

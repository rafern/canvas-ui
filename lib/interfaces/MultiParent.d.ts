import type { Widget } from '../widgets/Widget';
export interface MultiParent extends Widget {
    add(children: Widget | Array<Widget>): this;
    remove(children: Widget | Array<Widget>): this;
    clearChildren(): this;
    getChildCount(): number;
}

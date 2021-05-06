import { MultiParent } from '../interfaces/MultiParent';
import { ParentWidget } from './ParentWidget';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';

export class MultiParentWidget extends ParentWidget implements MultiParent {
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean, children: Array<Widget>) {
        super(themeOverride, needsClear, propagatesEvents, children);
    }

    // Add child(ren) to widget. Chainable method
    add(children: Widget | Array<Widget>): this {
        if(Array.isArray(children)) {
            for(const child of children)
                this.children.push(child);
        }
        else
            this.children.push(children);

        this.updateInheritedTheme();

        this.layoutDirty = true;
        this.dirty = true;
        return this;
    }

    // Clear widget's children. Chainable method
    clearChildren(): this {
        this.children.length = 0;
        this.layoutDirty = true;
        this.dirty = true;
        return this;
    }
}
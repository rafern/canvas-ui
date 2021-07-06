import type { Widget } from '../widgets/Widget';
import type { Theme } from '../theme/Theme';
import { Parent } from './Parent';

export class MultiParent extends Parent {
    constructor(children: Array<Widget>, themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean) {
        super(children, themeOverride, needsClear, propagatesEvents);
    }

    // Add child(ren) to widget. Chainable method
    add(children: Widget | Array<Widget>): this {
        if(Array.isArray(children)) {
            for(const child of children)
                this._children.push(child);
        }
        else
            this._children.push(children);

        this.updateInheritedTheme();

        this._layoutDirty = true;
        this._dirty = true;
        return this;
    }

    // Remove child(ren) from widget. Chainable method
    remove(children: Widget | Array<Widget>): this {
        if(Array.isArray(children)) {
            for(const child of children) {
                const pos = this._children.indexOf(child);
                if(pos !== -1)
                    this._children.splice(pos, 1);
            }
        }
        else {
            const pos = this._children.indexOf(children);
            if(pos !== -1)
                this._children.splice(pos, 1);
        }

        this.updateInheritedTheme();

        this._layoutDirty = true;
        this._dirty = true;
        return this;
    }

    // Clear widget's children. Chainable method
    clearChildren(): this {
        this._children.length = 0;
        this._layoutDirty = true;
        this._dirty = true;
        return this;
    }
}
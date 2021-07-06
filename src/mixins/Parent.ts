import type { Theme } from '../theme/Theme';
import { Widget } from '../widgets/Widget';

export class Parent extends Widget {
    // This widget's children
    protected readonly _children: Array<Widget> = [];

    constructor(children: Array<Widget>, themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean) {
        super(themeOverride, needsClear, propagatesEvents);

        for(const child of children)
            this._children.push(child);
    }

    // Called when the inherited theme of this Widget is updated. Can be
    // overridden. Propagates to children.
    protected override updateInheritedTheme(): void {
        const inheritedTheme = this.inheritedTheme;
        if(inheritedTheme !== null) {
            for(const child of this.children)
                child.inheritedTheme = inheritedTheme;
        }
    }

    // Forcefully mark layout as dirty. If overridden, original must be called.
    // Call only when absolutely neccessary, such as in a resize. Propagates to
    // children
    override forceLayoutDirty(): void {
        super.forceLayoutDirty();
        if(this.enabled) {
            if(this._children !== null) {
                for(const child of this.children)
                    child.forceLayoutDirty();
            }
        }
    }

    // Get amount of children
    get childCount(): number {
        return this._children.length;
    }

    // Get iterator for children
    get children(): Iterable<Widget> {
        return this._children.values();
    }
}
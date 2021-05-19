import type { GConstructor } from './GConstructor';
import { Widget } from '../widgets/Widget';

// A widget with child(ren)
// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME the return type of mixin constructors is a mess, so linter is disabled
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Parent<TBase extends GConstructor<Widget>>(Base: TBase) {
    return class Parent extends Base {
        // This widget's children
        readonly children: Array<Widget> = []; // XXX protected

        // Called when the inherited theme of this Widget is updated. Can be
        // overridden. Propagates to children.
        updateInheritedTheme(): void { // XXX protected
            const inheritedTheme = this.getInheritedTheme();
            if(inheritedTheme !== null) {
                for(const child of this.children)
                    child.inheritTheme(inheritedTheme);
            }
        }

        // Forcefully mark layout as dirty. If overridden, original must be called.
        // Call only when absolutely neccessary, such as in a resize. Propagates to
        // children
        forceLayoutDirty(): void {
            super.forceLayoutDirty();
            if(this.enabled) {
                if(this.children !== null) {
                    for(const child of this.children)
                        child.forceLayoutDirty();
                }
            }
        }

        // Get number of children
        getChildCount() {
            return this.children.length;
        }
    };
}
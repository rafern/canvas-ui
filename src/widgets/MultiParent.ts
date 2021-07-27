import type { Widget } from '../widgets/Widget';
import { Parent } from './Parent';

/**
 * A specialised version of the {@link Parent} mixin class for parents with any
 * amount of children and public access to modifying this list of children.
 *
 * @category Widget
 */
export abstract class MultiParent extends Parent {
    /**
     * Add child(ren) to this widget.
     *
     * {@link _layoutDirty} and {@link _dirty} are set to true and
     * {@link updateInheritedTheme} is called so that new children inherit this
     * widget's theme.
     *
     * @param children If this is a widget, then it is pushed to {@link _children}. If this is an array of widgets, then each widget is pushed to {@link _children}.
     * @returns Returns this so that the method is chainable.
     */
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

    /**
     * Remove child(ren) from this widget.
     *
     * {@link _layoutDirty} and {@link _dirty} are set to true and
     * {@link updateInheritedTheme} is called so that new children inherit this
     * widget's theme.
     *
     * @param children If this is a widget, then it is removed from {@link _children}. If this is an array of widgets, then each widget is removed from {@link _children}.
     * @returns Returns this so that the method is chainable.
     */
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

    /**
     * Remove all children from this widget.
     *
     * {@link _layoutDirty} and {@link _dirty} are set to true.
     *
     * @returns Returns this so that the method is chainable.
     */
    clearChildren(): this {
        this._children.length = 0;
        this._layoutDirty = true;
        this._dirty = true;
        return this;
    }
}
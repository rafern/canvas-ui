import type { Widget } from '../widgets/Widget';
import { Parent } from './Parent';

/**
 * A specialised version of the {@link Parent} mixin class for parents with any
 * amount of children and public access to modifying this list of children.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export abstract class MultiParent<W extends Widget = Widget> extends Parent<W> {
    /**
     * Add child(ren) to this widget.
     *
     * {@link Widget#_layoutDirty} and {@link Widget#_dirty} are set to true and
     * each child's {@link Widget#inheritedTheme} is set so that new children
     * inherit this widget's theme.
     *
     * @param children - If this is a widget, then it is pushed to {@link Parent#_children}. If this is an array of widgets, then each widget is pushed to {@link Parent#_children}.
     * @returns Returns this so that the method is chainable.
     */
    add(children: W | Array<W>): this {
        if(Array.isArray(children)) {
            for(const child of children) {
                this._children.push(child);
                child.inheritedTheme = this.inheritedTheme;
            }
        }
        else {
            this._children.push(children);
            children.inheritedTheme = this.inheritedTheme;
        }

        this.forceDirty();
        return this;
    }

    /**
     * Remove child(ren) from this widget.
     *
     * {@link Widget#_layoutDirty} and {@link Widget#_dirty} are set to true.
     *
     * @param children - If this is a widget, then it is removed from {@link Parent#_children}. If this is an array of widgets, then each widget is removed from {@link Parent#_children}.
     * @returns Returns this so that the method is chainable.
     */
    remove(children: W | Array<W>): this {
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

        this.forceDirty();
        return this;
    }

    /**
     * Remove all children from this widget.
     *
     * {@link Widget#_layoutDirty} and {@link Widget#_dirty} are set to true.
     *
     * @returns Returns this so that the method is chainable.
     */
    clearChildren(): this {
        this._children.length = 0;
        this.forceDirty();
        return this;
    }
}
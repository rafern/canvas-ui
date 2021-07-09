import type { Widget } from '../widgets/Widget';
import { Parent } from './Parent';
/**
 * A specialised version of the {@link Parent} mixin class for parents with any
 * amount of children and public access to modifying this list of children.
 *
 * @category Mixin
 */
export declare class MultiParent extends Parent {
    /**
     * Add child(ren) to this widget.
     *
     * {@link _layoutDirty} and {@link _dirty} are set to true and
     * {@link updateInheritedTheme} is called so that new children inherit this
     * widget's theme.
     *
     * @param children If this is a widget, then it is pushed to
     * {@link _children}. If this is an array of widgets, then each widget is
     * pushed to {@link _children}.
     *
     * @returns Returns this so that the method is chainable.
     */
    add(children: Widget | Array<Widget>): this;
    /**
     * Remove child(ren) from this widget.
     *
     * {@link _layoutDirty} and {@link _dirty} are set to true and
     * {@link updateInheritedTheme} is called so that new children inherit this
     * widget's theme.
     *
     * @param children If this is a widget, then it is removed from
     * {@link _children}. If this is an array of widgets, then each widget is
     * removed from {@link _children}.
     *
     * @returns Returns this so that the method is chainable.
     */
    remove(children: Widget | Array<Widget>): this;
    /**
     * Remove all children from this widget.
     *
     * {@link _layoutDirty} and {@link _dirty} are set to true.
     *
     * @returns Returns this so that the method is chainable.
     */
    clearChildren(): this;
}

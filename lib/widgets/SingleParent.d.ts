import type { Widget, WidgetProperties } from '../widgets/Widget';
import { Parent } from './Parent';
/**
 * A specialised version of the {@link Parent} class for parents with a single
 * mandatory child.
 *
 * @category Widget
 */
export declare abstract class SingleParent<W extends Widget = Widget> extends Parent<W> {
    /**
     * Create a new SingleParent instance.
     *
     * @param child - The mandatory single child of this widget. Cannot be changed later, unless {@link Parent#_children} is changed directly via the widget using this mixin.
     */
    constructor(child: W, needsClear: boolean, propagatesEvents: boolean, properties?: Readonly<WidgetProperties>);
    /** This widget's child. */
    get child(): W;
}

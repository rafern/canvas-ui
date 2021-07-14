import type { Widget } from '../widgets/Widget';
import type { Theme } from '../theme/Theme';
import { Parent } from './Parent';
/**
 * A specialised version of the {@link Parent} mixin class for parents with a
 * single mandatory child.
 *
 * @category Mixin
 */
export declare class SingleParent extends Parent {
    /**
     * Create a new SingleParent instance.
     *
     * @param child The mandatory single child of this widget. Cannot be changed later, unless {@link _children} is changed directly via the widget using this mixin.
     */
    constructor(child: Widget, themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean);
    /** This widget's child. */
    get child(): Widget;
}

import type { ThemeProperties } from '../theme/ThemeProperties';
import type { Theme } from '../theme/Theme';
import { Widget } from '../widgets/Widget';
/**
 * A mixin class for widgets which may have children.
 *
 * Overrides {@link updateInheritedTheme} so that inherited themes are
 * propagated to children, and {@link forceLayoutDirty} so that forcing layout
 * as dirty is propagated to children. Also provides utilities for getting the
 * amount of children, a public iterator for children and a protected child
 * list. This way, widgets that use this mixin can decide if modifying the list
 * of children should be public or not.
 *
 * Can be constrained to a specific type of children.
 *
 * See {@link MultiParent} and {@link SingleParent} for more specialised
 * versions.
 *
 * @category Widget
 */
export declare abstract class Parent<W extends Widget = Widget> extends Widget {
    /**
     * This widget's children. Note that this is marked as readonly so that it
     * cannot be accidentally replaced with a new array. This way, references to
     * this array are always valid. If you want to clear this array, set the
     * length to zero instead of creating a new instance. readonly still means
     * that you can add/remove elements to/from the array.
     *
     * See {@link children} for the public iterator getter.
     */
    protected readonly _children: Array<W>;
    /**
     * Create a new Parent. Automatically adds all widgets in the input array
     * to {@link _children}.
     */
    constructor(children: Array<W>, needsClear: boolean, propagatesEvents: boolean, themeProperties?: ThemeProperties);
    set inheritedTheme(theme: Theme | undefined);
    get inheritedTheme(): Theme | undefined;
    dryPaint(): void;
    /** Get amount of children of this parent widget. */
    get childCount(): number;
    /**
     * Get iterator for children of this parent widget. Cannot modify list of
     * children via this iterator; for read-only purposes only.
     */
    get children(): Iterable<W>;
}

import { PassthroughWidget } from './PassthroughWidget';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';
/**
 * A {@link PassthroughWidget} which imposes further layout constraints onto a
 * child.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export declare class ArtificialConstraint<W extends Widget = Widget> extends PassthroughWidget<W> {
    /** See {@link constraints}. For internal use only */
    private _constraints;
    /**
     * The further constraints given to the child. A 4-tuple containing,
     * respectively, minimum width, maximum width, minimum height and maximum
     * height. Changing this sets {@link _layoutDirty} to true. Constraints are
     * only applied if they are more restrictive than the original constraints.
     */
    set constraints(constraints: [number, number, number, number]);
    get constraints(): [number, number, number, number];
    /** Create a new PassthroughWidget. */
    constructor(child: W, constraints?: [number, number, number, number], themeOverride?: Theme | null);
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
}
import type { ThemeProperties } from '../theme/ThemeProperties';
import { layoutArrayField } from '../decorators/FlagFields';
import { PassthroughWidget } from './PassthroughWidget';
import type { Widget } from './Widget';

/**
 * A {@link PassthroughWidget} which imposes further layout constraints onto a
 * child.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export class ArtificialConstraint<W extends Widget = Widget> extends PassthroughWidget<W> {
    /** See {@link constraints}. For internal use only */
    private _constraints: [number, number, number, number] = [0, Infinity, 0, Infinity];

    /**
     * The further constraints given to the child. A 4-tuple containing,
     * respectively, minimum width, maximum width, minimum height and maximum
     * height. Changing this sets {@link _layoutDirty} to true. Constraints are
     * only applied if they are more restrictive than the original constraints.
     */
    @layoutArrayField()
    constraints: [number, number, number, number] = [0, Infinity, 0, Infinity];

    /** Create a new PassthroughWidget. */
    constructor(child: W, constraints: [number, number, number, number] = [0, Infinity, 0, Infinity], themeProperties?: ThemeProperties) {
        super(child, themeProperties);

        this._constraints = [...constraints];
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Further restrict constraints. Make sure that minimum constraints
        // aren't greater than maximum constraints
        maxWidth = Math.min(this._constraints[1], maxWidth);
        maxHeight = Math.min(this._constraints[3], maxHeight);
        minWidth = Math.min(Math.max(this._constraints[0], minWidth), maxWidth);
        minHeight = Math.min(Math.max(this._constraints[2], minHeight), maxHeight);

        // Resolve dimensions
        super.handleResolveDimensions(minWidth, maxWidth, minHeight, maxHeight);
    }
}
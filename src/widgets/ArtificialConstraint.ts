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
export class ArtificialConstraint<W extends Widget = Widget> extends PassthroughWidget<W> {
    /** See {@link constraints}. For internal use only */
    private _constraints: [number, number, number, number] = [0, Infinity, 0, Infinity];

    /**
     * The further constraints given to the child. A 4-tuple containing,
     * respectively, minimum width, maximum width, minimum height and maximum
     * height. Changing this sets {@link _layoutDirty} to true. Constraints are
     * only applied if they are more restrictive than the original constraints.
     */
    set constraints(constraints: [number, number, number, number]) {
        if(this._constraints[0] !== constraints[0] ||
           this._constraints[1] !== constraints[1] ||
           this._constraints[2] !== constraints[2] ||
           this._constraints[3] !== constraints[3]) {
            this._constraints[0] = constraints[0];
            this._constraints[1] = constraints[1];
            this._constraints[2] = constraints[2];
            this._constraints[3] = constraints[3];
            this._layoutDirty = true;
        }
    }

    get constraints(): [number, number, number, number] {
        return [...this._constraints];
    }

    /** Create a new PassthroughWidget. */
    constructor(child: W, constraints: [number, number, number, number] = [0, Infinity, 0, Infinity], themeOverride: Theme | null = null) {
        super(child, themeOverride);

        this._constraints = [...constraints];
    }

    protected override handleResolveLayout(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Further restrict constraints
        if(this._constraints[0] > minWidth)
            minWidth = this._constraints[0];
        if(this._constraints[1] < maxWidth)
            maxWidth = this._constraints[1];
        if(this._constraints[2] > minHeight)
            minHeight = this._constraints[2];
        if(this._constraints[3] < maxHeight)
            maxHeight = this._constraints[3];

        // Resolve layout
        super.handleResolveLayout(minWidth, maxWidth, minHeight, maxHeight);
    }
}
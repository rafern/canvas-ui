import type { LayoutConstraints } from '../core/LayoutConstraints';
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
    /** See {@link ArtificialConstraint#constraints}. For internal use only */
    private _constraints: LayoutConstraints = [0, Infinity, 0, Infinity];

    /**
     * The further constraints given to the child. A 4-tuple containing,
     * respectively, minimum width, maximum width, minimum height and maximum
     * height. Changing this sets {@link Widget#_layoutDirty} to true.
     * Constraints are only applied if they are more restrictive than the
     * original constraints.
     *
     * Will be automatically scaled depending on the current {@link Root}'s
     * resolution.
     *
     * @decorator `@layoutArrayField()`
     */
    @layoutArrayField()
    constraints: LayoutConstraints = [0, Infinity, 0, Infinity];

    /** Create a new PassthroughWidget. */
    constructor(child: W, constraints: LayoutConstraints = [0, Infinity, 0, Infinity], themeProperties?: ThemeProperties) {
        super(child, themeProperties);

        this._constraints = [...constraints];
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Further restrict constraints if possible. Scale custom constraints
        // with resolution
        const res = this.root?.resolution ?? 1;
        let newMinWidth = Math.min(Math.max(this._constraints[0] * res, minWidth), maxWidth);
        let newMinHeight = Math.min(Math.max(this._constraints[2] * res, minHeight), maxHeight);
        const newMaxWidth = Math.min(Math.max(this._constraints[1] * res, minWidth), maxWidth);
        const newMaxHeight = Math.min(Math.max(this._constraints[3] * res, minHeight), maxHeight);

        if(newMinWidth > newMaxWidth)
            newMinWidth = newMaxWidth;

        if(newMinHeight > newMaxHeight)
            newMinHeight = newMaxHeight;

        // Resolve dimensions
        super.handleResolveDimensions(newMinWidth, newMaxWidth, newMinHeight, newMaxHeight);
    }
}
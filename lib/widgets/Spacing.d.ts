import { FlexLayout } from '../mixins/FlexLayout';
import type { Theme } from '../theme/Theme';
/**
 * A flexbox widget with empty space.
 *
 * Since flexbox layout will always try to expand the UI, it might not be the
 * best solution for, for example, aligning simple components inside a
 * {@link MultiContainer}. For that, use the {@link Container} widget instead,
 * with an alignment mode of choice. By default will fully expand with no basis
 * in the same direction of the layout context.
 *
 * @category Widget
 */
export declare class Spacing extends FlexLayout {
    /** Create a new Spacing. */
    constructor(flexRatio?: number, mainBasis?: number, crossBasis?: number, vertical?: boolean | null, themeOverride?: Theme | null);
}

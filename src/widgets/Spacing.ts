import { FlexLayout } from '../mixins/FlexLayout';
import type { Theme } from '../theme/Theme';

export class Spacing extends FlexLayout {
    // Expands using a flex sizing policy, but only fills things with blank
    // space. However, since this will always try to expand the UI, it might not
    // be the best solution for, for example, aligning simple components inside
    // a container. For that, use the Box component instead, with an alignment
    // mode of choice. By default will fully expand with no basis in the same
    // direction of the layout context
    constructor(flexRatio = 1, mainBasis = 0, crossBasis = 0, vertical: boolean | null = null, themeOverride: Theme | null = null) {
        // Spacing needs clear, never has children and doesn't propagate events
        super(themeOverride, true, false);

        this.flexRatio = flexRatio;
        this.mainBasis = mainBasis;
        this.crossBasis = crossBasis;
        this.vertical = vertical;
    }
}

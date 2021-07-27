import type { Theme } from '../theme/Theme';
import { Widget } from './Widget';

/**
 * A widget with empty space.
 *
 * Will always try to expand if the layout is constrained, so make sure to set
 * flex or pass it along the constructor
 *
 * @category Widget
 */
export class Spacing extends Widget {
    /** The minimum width this will try to expand */
    minWidth: number;
    /** The minimum height this will try to expand */
    minHeight: number;

    /** Create a new Spacing. */
    constructor(flex = 1, minWidth = 0, minHeight = 0, themeOverride: Theme | null = null) {
        // Spacing needs clear, never has children and doesn't propagate events
        super(themeOverride, true, false);

        this.flex = flex;
        this.minWidth = minWidth;
        this.minHeight = minHeight;
    }

    protected override handleResolveLayout(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Try to expand each axis. If axis is not constrained (can't expand),
        // then try to use the biggest minimum length
        if(maxWidth !== Infinity)
            this.width = maxWidth;
        else
            this.width = Math.max(minWidth, this.minWidth);

        if(maxHeight !== Infinity)
            this.height = maxHeight;
        else
            this.height = Math.max(minHeight, this.minHeight);
    }
}

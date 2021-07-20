import { FilledButton } from './FilledButton';
import type { Theme } from '../theme/Theme';
import type { TextGetter } from './Label';
/**
 * A {@link FilledButton} with a {@link Label} inside a {@link TextMargin}.
 *
 * @category Widget
 */
export declare class TextButton extends FilledButton {
    /** Create a new TextButton. */
    constructor(text: string | TextGetter, callback?: (() => void) | null, flexRatio?: number, mainBasis?: number, crossBasis?: number, vertical?: boolean | null, themeOverride?: Theme | null);
}

import { Label, LabelProperties } from './Label';
import { FilledButton } from './FilledButton';
/**
 * A {@link FilledButton} with a {@link Label}. Alignment is forced to be
 * horizontally centered and vertically stretching like in {@link TextMargin}.
 * Text-wrapping is disabled so that text is centered properly.
 *
 * @category Widget
 * @category Aggregate Widget
 */
export declare class TextButton extends FilledButton<Label> {
    /** Create a new TextButton. */
    constructor(text: string, callback?: (() => void) | null, properties?: Readonly<LabelProperties>);
}

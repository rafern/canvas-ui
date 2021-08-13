import type { ThemeProperties } from '../theme/ThemeProperties';
import type { VariableCallback } from '../helpers/Variable';
import type { TextGetter } from './Label';
import { Row } from './Row';
/**
 * A {@link Row} with a {@link Label}, {@link Spacing} and a {@link Checkbox}.
 *
 * @category Widget
 */
export declare class LabelledCheckbox extends Row {
    constructor(text: string | TextGetter, callback?: VariableCallback<boolean> | null, initialValue?: boolean, themeProperties?: ThemeProperties);
}

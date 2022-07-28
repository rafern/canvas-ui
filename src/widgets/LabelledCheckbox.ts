import type { VariableCallback } from '../helpers/VariableCallback';
import type { ThemeProperties } from '../theme/ThemeProperties';
import type { TextGetter } from './Label';
import { Checkbox } from './Checkbox';
import { Spacing } from './Spacing';
import { Label } from './Label';
import { Row } from './Row';

/**
 * A {@link Row} with a {@link Label}, {@link Spacing} and a {@link Checkbox}.
 *
 * @category Widget
 * @category Aggregate Widget
 */
export class LabelledCheckbox extends Row {
    constructor(text: string | TextGetter, callback: VariableCallback<boolean> | null = null, initialValue = false, themeProperties?: ThemeProperties) {
        super(themeProperties);

        this.add([
            new Label(text, themeProperties),
            new Spacing(1, 0, 0, themeProperties),
            new Checkbox(callback, initialValue, themeProperties),
        ]);
    }
}

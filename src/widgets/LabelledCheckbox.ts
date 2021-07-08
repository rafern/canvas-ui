import type { VariableCallback } from '../mixins/Variable';
import type { Theme } from '../theme/Theme';
import type { TextGetter } from './Label';
import { Checkbox } from './Checkbox';
import { Spacing } from './Spacing';
import { Label } from './Label';
import { Row } from './Row';

/**
 * A {@link Row} with a {@link Label}, {@link Spacing} and a {@link Checkbox}.
 *
 * @category Widget
 */
export class LabelledCheckbox extends Row {
    constructor(text: string | TextGetter, callback: VariableCallback<boolean> | null = null, initialValue = false, themeOverride: Theme | null = null) {
        super(themeOverride);

        this.add([
            new Label(text, themeOverride),
            new Spacing(1, 0, 0, false, themeOverride),
            new Checkbox(callback, initialValue, themeOverride),
        ]);
    }
}

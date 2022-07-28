import { WatchableVariable } from '../helpers/WatchableVariable';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { RadioButton } from './RadioButton';
import type { TextGetter } from './Label';
import { Spacing } from './Spacing';
import { Label } from './Label';
import { Row } from './Row';

/**
 * A {@link Row} with a {@link Label}, {@link Spacing} and a
 * {@link RadioButton}.
 *
 * @category Widget
 * @category Aggregate Widget
 */
export class LabelledRadioButton<V> extends Row {
    constructor(text: string | TextGetter, variable: WatchableVariable<V>, value: V, themeProperties?: ThemeProperties) {
        super(themeProperties);

        this.add([
            new Label(text, themeProperties),
            new Spacing(1, 0, 0, themeProperties),
            new RadioButton(variable, value, themeProperties),
        ]);
    }
}

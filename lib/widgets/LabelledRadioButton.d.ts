import type { ThemeProperties } from '../theme/ThemeProperties';
import { WatchableVariable } from '../state/WatchableVariable';
import type { TextGetter } from './Label';
import { Row } from './Row';
/**
 * A {@link Row} with a {@link Label}, {@link Spacing} and a
 * {@link RadioButton}.
 *
 * @category Widget
 * @category Aggregate Widget
 */
export declare class LabelledRadioButton<V> extends Row {
    constructor(text: string | TextGetter, variable: WatchableVariable<V>, value: V, themeProperties?: ThemeProperties);
}

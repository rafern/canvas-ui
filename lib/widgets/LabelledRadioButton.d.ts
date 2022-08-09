import { SpacingProperties } from './Spacing';
import type { Variable } from '../state/Variable';
import { LabelProperties } from './Label';
import { Row } from './Row';
/**
 * A {@link Row} with a {@link Label}, {@link Spacing} and a
 * {@link RadioButton}.
 *
 * @category Widget
 * @category Aggregate Widget
 */
export declare class LabelledRadioButton<V> extends Row {
    constructor(text: string, variable: Variable<V>, value: V, properties?: Readonly<LabelProperties & SpacingProperties>);
}

import { SpacingProperties } from './Spacing';
import type { Variable } from '../state/Variable';
import { LabelProperties } from './Label';
import { Row } from './Row';
/**
 * A {@link Row} with a {@link Label}, {@link Spacing} and a {@link Checkbox}.
 *
 * @category Widget
 * @category Aggregate Widget
 */
export declare class LabelledCheckbox extends Row {
    constructor(text: string, variable?: Variable<boolean>, properties?: Readonly<LabelProperties & SpacingProperties>);
}

import type { VariableCallback } from '../mixins/Variable';
import type { Theme } from '../theme/Theme';
import type { TextGetter } from './Label';
import { Row } from './Row';
export declare class LabelledCheckbox extends Row {
    constructor(text: string | TextGetter, callback?: VariableCallback<boolean> | null, initialValue?: boolean, themeOverride?: Theme | null);
}

import type { VariableCallback } from '../mixins/Variable';
import type { TextGetter } from '../widgets/Label';
import type { Theme } from '../theme/Theme';
import type { MultiContainer } from '../widgets/MultiContainer';
export declare function LabelledCheckbox(text: string | TextGetter, callback?: VariableCallback<boolean | null> | null, initialValue?: boolean, themeOverride?: Theme | null): MultiContainer;

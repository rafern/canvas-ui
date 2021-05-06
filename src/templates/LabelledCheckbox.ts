import type { VariableCallback } from '../mixins/Variable';
import type { TextGetter } from '../widgets/Label';
import { Checkbox } from '../widgets/Checkbox';
import { Spacing } from '../widgets/Spacing';
import type { Theme } from '../theme/Theme';
import { Label } from '../widgets/Label';
import { Row } from './Row';

import type { MultiContainer } from '../widgets/MultiContainer';

// Template for Row with a Label, Spacing and a Checkbox
export function LabelledCheckbox(text: string | TextGetter, callback: VariableCallback<boolean | null> | null = null, initialValue = false, themeOverride: Theme | null = null): MultiContainer {
    return Row(themeOverride).add([
        new Label(text, themeOverride),
        new Spacing(1, 0, 0, false, themeOverride),
        new Checkbox(callback, initialValue, themeOverride),
    ]);
}

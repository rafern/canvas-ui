import type { TextGetter } from '../../widgets/Label';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';

// A TextButton that calls a callback with keycode on click
export class BasicKey extends TextButton {
    constructor(text: string | TextGetter, keyCode: string, keyContext: KeyContext, themeOverride: Theme | null = null) {
        super(text, () => keyContext.callback(keyCode), themeOverride);
    }
}

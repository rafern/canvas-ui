import type { FilledButton } from '../../widgets/FilledButton';
import type { TextGetter } from '../../widgets/Label';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';

// Template for TextButton that calls callback with keycode on click
export function BasicKey(text: string | TextGetter, keyCode: string, keyContext: KeyContext, themeOverride: Theme | null = null): FilledButton {
    return TextButton(text, () => keyContext.callback(keyCode), themeOverride);
}

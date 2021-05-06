import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

// Template for backspace BasicKey
export function BackspaceKey(keyContext: KeyContext, themeOverride: Theme | null = null): FilledButton {
    return BasicKey('Backspace', 'Backspace', keyContext, themeOverride);
}

import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

// Template for escape BasicKey
export function EscapeKey(keyContext: KeyContext, themeOverride: Theme | null = null): FilledButton {
    return BasicKey('Esc', 'Escape', keyContext, themeOverride);
}

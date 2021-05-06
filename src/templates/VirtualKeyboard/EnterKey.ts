import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

// Template for enter BasicKey
export function EnterKey(keyContext: KeyContext, themeOverride: Theme | null = null): FilledButton {
    return BasicKey('Enter', 'Enter', keyContext, themeOverride);
}

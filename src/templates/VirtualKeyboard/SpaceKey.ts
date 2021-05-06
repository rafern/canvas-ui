import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

// Template for space BasicKey
export function SpaceKey(keyContext: KeyContext, themeOverride: Theme | null = null): FilledButton {
    return BasicKey('Space', ' ', keyContext, themeOverride);
}

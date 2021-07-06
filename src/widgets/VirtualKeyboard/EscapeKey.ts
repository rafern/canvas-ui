import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

// An escape BasicKey
export class EscapeKey extends BasicKey {
    constructor(keyContext: KeyContext, themeOverride: Theme | null = null) {
        super('Esc', 'Escape', keyContext, themeOverride);
    }
}

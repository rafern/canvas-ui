import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

// A backspace BasicKey
export class BackspaceKey extends BasicKey {
    constructor(keyContext: KeyContext, themeOverride: Theme | null = null) {
        super('Backspace', 'Backspace', keyContext, themeOverride);
    }
}

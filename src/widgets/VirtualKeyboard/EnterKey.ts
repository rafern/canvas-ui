import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

// An enter BasicKey
export class EnterKey extends BasicKey {
    constructor(keyContext: KeyContext, themeOverride: Theme | null = null) {
        super('Enter', 'Enter', keyContext, themeOverride);
    }
}

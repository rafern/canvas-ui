import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

// Template for space BasicKey
export class SpaceKey extends BasicKey {
    constructor(keyContext: KeyContext, themeOverride: Theme | null = null) {
        super('Space', ' ', keyContext, themeOverride);
    }
}

import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';
export declare class BackspaceKey extends BasicKey {
    constructor(keyContext: KeyContext, themeOverride?: Theme | null);
}

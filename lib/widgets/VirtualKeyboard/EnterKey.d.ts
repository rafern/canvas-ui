import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';
export declare class EnterKey extends BasicKey {
    constructor(keyContext: KeyContext, themeOverride?: Theme | null);
}

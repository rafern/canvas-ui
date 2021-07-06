import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';
export declare class ShiftKey extends TextButton {
    constructor(keyContext: KeyContext, themeOverride?: Theme | null);
}

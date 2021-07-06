import type { TextGetter } from '../../widgets/Label';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';
export declare class BasicKey extends TextButton {
    constructor(text: string | TextGetter, keyCode: string, keyContext: KeyContext, themeOverride?: Theme | null);
}

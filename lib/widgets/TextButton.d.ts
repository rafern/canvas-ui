import type { ButtonCallback } from './Button';
import { FilledButton } from './FilledButton';
import type { Theme } from '../theme/Theme';
import type { TextGetter } from './Label';
export declare class TextButton extends FilledButton {
    constructor(text: string | TextGetter, callback?: ButtonCallback | null, themeOverride?: Theme | null);
}

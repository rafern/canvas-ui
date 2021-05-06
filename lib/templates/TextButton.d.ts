import type { ButtonCallback } from '../widgets/Button';
import { FilledButton } from '../widgets/FilledButton';
import type { TextGetter } from '../widgets/Label';
import type { Theme } from '../theme/Theme';
export declare function TextButton(text: string | TextGetter, callback?: ButtonCallback | null, themeOverride?: Theme | null): FilledButton;

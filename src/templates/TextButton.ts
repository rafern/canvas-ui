import type { ButtonCallback } from '../widgets/Button';
import { FilledButton } from '../widgets/FilledButton';
import type { TextGetter } from '../widgets/Label';
import type { Theme } from '../theme/Theme';
import { Label } from '../widgets/Label';

// Template for FilledButton with Label
export function TextButton(text: string | TextGetter, callback: ButtonCallback | null = null, themeOverride: Theme | null = null): FilledButton {
    return new FilledButton(
        new Label(text, themeOverride),
        callback,
        themeOverride,
    );
}

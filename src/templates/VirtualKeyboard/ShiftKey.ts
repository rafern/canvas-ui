import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';

// Template for TextButton that calls callback with 'Shift' and updates key
// context accordingly on click
export function ShiftKey(keyContext: KeyContext, themeOverride: Theme | null = null): FilledButton {
    const virtualKey = TextButton(
        'Shift',
        () => {
            keyContext.shift = !keyContext.shift;
            virtualKey.forced = keyContext.shift;
            keyContext.callback('Shift');
        },
        themeOverride,
    );

    virtualKey.forced = keyContext.shift;
    return virtualKey;
}

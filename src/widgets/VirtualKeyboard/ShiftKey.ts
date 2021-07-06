import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';

// A TextButton that calls a callback with 'Shift' and updates a key context
// accordingly on click
export class ShiftKey extends TextButton {
    constructor(keyContext: KeyContext, themeOverride: Theme | null = null) {
        super(
            'Shift',
            () => {
                keyContext.shift = !keyContext.shift;
                this.forced = keyContext.shift;
                keyContext.callback('Shift');
            },
            themeOverride,
        );

        this.forced = keyContext.shift;
    }
}

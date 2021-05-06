import type { FilledButton } from '../../widgets/FilledButton';
import type { TextGetter } from '../../widgets/Label';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
export declare function BasicKey(text: string | TextGetter, keyCode: string, keyContext: KeyContext, themeOverride?: Theme | null): FilledButton;

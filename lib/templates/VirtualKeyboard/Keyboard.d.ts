import type { MultiContainer } from '../../widgets/MultiContainer';
import type { KeyTemplateFunction } from './KeyRow';
import type { Theme } from '../../theme/Theme';
import type { KeyContext } from './KeyContext';
export declare function VirtualKeyboard(keyContext: KeyContext, keyboardTemplate?: Array<Array<string[] | KeyTemplateFunction>> | null, themeOverride?: Theme | null): MultiContainer;

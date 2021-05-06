import type { MultiContainer } from '../../widgets/MultiContainer';
import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
export declare type KeyTemplateFunction = (keyContext: KeyContext, themeOverride: Theme | null) => FilledButton;
export declare function KeyRow(rowTemplate: Array<string[] | KeyTemplateFunction>, keyContext: KeyContext, themeOverride?: Theme | null): MultiContainer;

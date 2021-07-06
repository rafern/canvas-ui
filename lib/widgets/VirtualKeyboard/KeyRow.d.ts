import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { Row } from '../Row';
export declare type KeyTemplateFunction = (keyContext: KeyContext, themeOverride: Theme | null) => FilledButton;
export declare class KeyRow extends Row {
    constructor(rowTemplate: Array<string[] | KeyTemplateFunction>, keyContext: KeyContext, themeOverride?: Theme | null);
}

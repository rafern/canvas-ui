import type { KeyTemplateFunction } from '../templates/VirtualKeyboard/KeyRow';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import { MultiContainer } from './/MultiContainer';
import type { Theme } from '../theme/Theme';
export declare type VirtualKeyboardTemplate = Array<Array<string[] | KeyTemplateFunction>>;
export declare class VirtualKeyboard extends MultiContainer {
    #private;
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate?: VirtualKeyboardTemplate | null, themeOverride?: Theme | null);
}

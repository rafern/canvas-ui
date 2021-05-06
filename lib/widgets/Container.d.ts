import { BaseContainer } from './BaseContainer';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';
export declare class Container extends BaseContainer {
    constructor(child: Widget, themeOverride?: Theme | null);
}

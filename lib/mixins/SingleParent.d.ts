import type { Widget } from '../widgets/Widget';
import type { Theme } from '../theme/Theme';
import { Parent } from './Parent';
export declare class SingleParent extends Parent {
    constructor(child: Widget, themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean);
    get child(): Widget;
}

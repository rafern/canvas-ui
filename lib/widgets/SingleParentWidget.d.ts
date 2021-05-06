import { SingleParent } from '../interfaces/SingleParent';
import { ParentWidget } from './ParentWidget';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';
export declare class SingleParentWidget extends ParentWidget implements SingleParent {
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean, child: Widget);
    getChild(): Widget;
}

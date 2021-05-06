import { SingleParent } from '../interfaces/SingleParent';
import { ParentWidget } from './ParentWidget';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';

export class SingleParentWidget extends ParentWidget implements SingleParent {
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean, child: Widget) {
        super(themeOverride, needsClear, propagatesEvents, [child]);
    }

    getChild(): Widget {
        return this.children[0];
    }
}
import type { Widget } from '../widgets/Widget';
import type { Theme } from '../theme/Theme';
import { Parent } from './Parent';

export class SingleParent extends Parent {
    constructor(child: Widget, themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean) {
        super([child], themeOverride, needsClear, propagatesEvents);
    }

    get child(): Widget {
        return this._children[0];
    }
}
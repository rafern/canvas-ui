import type { Theme } from '../theme/Theme';
import { Parent } from '../mixins/Parent';
import { Widget } from './Widget';

export class ParentWidget extends Parent(Widget) {
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean, children: Array<Widget>) {
        super(themeOverride, needsClear, propagatesEvents);

        for(const child of children)
            this.children.push(child);
    }
}
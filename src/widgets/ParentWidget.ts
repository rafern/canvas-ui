import { /* tree-shaking no-side-effects-when-called */ Parent } from '../mixins/Parent';
import type { Theme } from '../theme/Theme';
import { Widget } from './Widget';

export class ParentWidget extends Parent(Widget) {
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean, children: Array<Widget>) {
        super(themeOverride, needsClear, propagatesEvents);

        for(const child of children)
            this.children.push(child);
    }
}
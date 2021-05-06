import type { Widget } from '../widgets/Widget';

export interface SingleParent extends Widget {
    getChild(): Widget;
}
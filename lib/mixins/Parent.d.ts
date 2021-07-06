import type { Theme } from '../theme/Theme';
import { Widget } from '../widgets/Widget';
export declare class Parent extends Widget {
    protected readonly _children: Array<Widget>;
    constructor(children: Array<Widget>, themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean);
    protected updateInheritedTheme(): void;
    forceLayoutDirty(): void;
    get childCount(): number;
    get children(): Iterable<Widget>;
}

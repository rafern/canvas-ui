import { BaseContainer } from './BaseContainer';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';

export class Container extends BaseContainer {
    // A BaseContainer that propagates events
    constructor(child: Widget, themeOverride: Theme | null = null) {
        super(child, true, themeOverride);
    }
}

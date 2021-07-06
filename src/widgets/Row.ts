import { MultiContainer } from './MultiContainer';
import type { Theme } from '../theme/Theme';

// A horizontal MultiContainer
export class Row extends MultiContainer {
    constructor(themeOverride: Theme | null = null) {
        super(false, themeOverride);
    }
}

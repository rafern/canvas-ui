import { MultiContainer } from './MultiContainer';
import type { Theme } from '../theme/Theme';

// A vertical MultiContainer
export class Column extends MultiContainer {
    constructor(themeOverride: Theme | null = null) {
        super(true, themeOverride);
    }
}

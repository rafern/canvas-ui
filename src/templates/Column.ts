import { MultiContainer } from '../widgets/MultiContainer';
import type { Theme } from '../theme/Theme';

// Template for vertical MultiContainer
export function Column(themeOverride: Theme | null = null): MultiContainer {
    return new MultiContainer(true, themeOverride);
}

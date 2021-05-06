import { MultiContainer } from '../widgets/MultiContainer';
import type { Theme } from '../theme/Theme';

// Template for horizontal MultiContainer
export function Row(themeOverride: Theme | null = null): MultiContainer {
    return new MultiContainer(false, themeOverride);
}

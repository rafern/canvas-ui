/**
 * Check if a debug feature is enabled.
 *
 * @param debugFeature The debug feature name, for example, "watchflag.Widget._dirty"
 * @returns Returns true if the debug feature is enabled. If the feature doesn't exist, returns false.
 */
export declare function isDebugFeatureEnabled(debugFeature: string): boolean;
/**
 * Enable or disable a debug feature.
 *
 * @param debugFeature The debug feature name, for example, "watchflag.Widget._dirty"
 * @param enabled Should the feature be enabled or disabled? If undefined, toggles the feature
 */
export declare function toggleDebugFeature(debugFeature: string, enabled?: boolean): void;
/** List all debug features in the console. */
export declare function listDebugFeatures(): void;
/**
 * Inject code for a new debug feature that watches when a class' property is
 * set to true and prints to the console.
 *
 * @param classObj The class. Widget for example
 * @param flagKey The key of the property to watch. "_dirty" for example
 */
export declare function injectWatchflagFeature(classObj: any, flagKey: string): void;
/**
 * Inject code for a new debug feature that traces when a class' method is
 * called, if the class calls the same method for other objects (prints tree)
 * and how long each call took in milliseconds.
 *
 * @param classObj The class. Widget for example
 * @param methodKey The key of the property to watch. "paint" for example
 * @param messageGenerator A function that returns a string with extra information about the function call. For example, a function which returns " (forced)" if Widget.paint is called with forced set to true
 */
export declare function injectTraceFeature(classObj: any, methodKey: string, messageGenerator?: ((...args: any[]) => string) | null): void;
/**
 * Inject code for a new debug feature that returns a random fill colour in a
 * given property when enabled.
 *
 * @param classObj The class. BaseTheme for example
 * @param themePropertyKey The key of the property to override. "canvasFill" for example
 */
export declare function injectRandomFillFeature(classObj: any, themePropertyKey: string): void;
export declare function injectDebugCode(): void;

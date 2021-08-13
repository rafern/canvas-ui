/**
 * A decorator for a public field which sets calls a callback if the property's
 * value is changed.
 *
 * @param callback The callback to call if the value changes. `this` is bound.
 * @category Decorator
 */
export declare function watchField(callback: (oldValue: any) => void): (target: any, propertyKey: string) => void;
/**
 * A {@link watchField} which sets a given flag to true.
 *
 * @param flagKey The key of the flag property to set to true
 * @category Decorator
 */
export declare function flagField(flagKey: string): (target: any, propertyKey: string) => void;
/**
 * A {@link flagField} where the flag key is `_dirty`.
 *
 * @category Decorator
 */
export declare const paintField: (target: any, propertyKey: string) => void;
/**
 * A {@link flagField} where the flag key is `_layoutDirty`.
 *
 * @category Decorator
 */
export declare const layoutField: (target: any, propertyKey: string) => void;
/**
 * A {@link watchField} which sets a given array of flags to true.
 *
 * @param flagKeys An array containing the keys of each flag property to set to true
 * @category Decorator
 */
export declare function multiFlagField(flagKeys: Array<string>): (target: any, propertyKey: string) => void;
/**
 * A {@link multiFlagField} where the flag keys are `_dirty` and `_layoutDirty`.
 *
 * @category Decorator
 */
export declare const paintLayoutField: (target: any, propertyKey: string) => void;
/**
 * Similar to {@link watchField}, but for array fields, like tuples. Getting the
 * property returns a shallow copy of the tuple, setting the value uses a
 * shallow copy of the input value if the current value is not an array. If both
 * the new value and the current value are arrays, then the current value's
 * members are updated; no shallow copy is created.
 *
 * @param callback The callback to call if the value changes. `this` is bound.
 * @param allowNonArrays Allow values which are not arrays to be used?
 * @category Decorator
 */
export declare function watchArrayField(callback: () => void, allowNonArrays?: boolean): (target: any, propertyKey: string) => void;
/**
 * A {@link watchArrayField} which sets a given flag to true.
 *
 * @param flagKey The key of the flag property to set to true
 * @param allowNonArrays Allow values which are not arrays to be used?
 * @category Decorator
 */
export declare function flagArrayField(flagKey: string, allowNonArrays?: boolean): (target: any, propertyKey: string) => void;
/**
 * A {@link flagArrayField} where the flag key is `_dirty`.
 *
 * @param allowNonArrays Allow values which are not arrays to be used?
 * @category Decorator
 */
export declare function paintArrayField(allowNonArrays?: boolean): (target: any, propertyKey: string) => void;
/**
 * A {@link flagArrayField} where the flag key is `_layoutDirty`.
 *
 * @param allowNonArrays Allow values which are not arrays to be used?
 * @category Decorator
 */
export declare function layoutArrayField(allowNonArrays?: boolean): (target: any, propertyKey: string) => void;
/**
 * A {@link watchArrayField} which sets a given array of flags to true.
 *
 * @param flagKeys An array containing the keys of each flag property to set to true
 * @param allowNonArrays Allow values which are not arrays to be used?
 * @category Decorator
 */
export declare function multiFlagArrayField(flagKeys: Array<string>, allowNonArrays?: boolean): (target: any, propertyKey: string) => void;
/**
 * A {@link multiFlagArrayField} where the flag keys are `_dirty` and
 * `_layoutDirty`.
 *
 * @param allowNonArrays Allow values which are not arrays to be used?
 * @category Decorator
 */
export declare function paintLayoutArrayField(allowNonArrays?: boolean): (target: any, propertyKey: string) => void;

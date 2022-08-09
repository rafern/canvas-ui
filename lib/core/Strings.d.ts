/**
 * Standard static console messages.
 *
 * @category Core
 */
export declare const Msg: {
    CANVAS_CONTEXT: string;
    REUSABLE_CANVAS_CONTEXT: string;
    NEGATIVE_TEXT_GROUP: string;
    EMPTY_LINE_RANGE: string;
    ROGUE_NEWLINE: string;
    VIDEO_API_AVAILABLE: string;
    DIMENSIONLESS_CANVAS: string;
    NON_POW2_CANVAS: string;
    DOM_DRIVER_REBIND: string;
    PARENTLESS_CLIPVP: string;
};
/**
 * Standard dynamic console messages.
 *
 * @category Core
 */
export declare const DynMsg: {
    INVALID_BACKGROUND_FILL: (backgroundProperty: string | symbol) => string;
    SWAPPED_MIN_MAX_NAMED: (minValue: unknown, maxValue: unknown, minName: string | symbol, maxName: string | symbol) => string;
    SWAPPED_MIN_MAX: (minValue: unknown, maxValue: unknown) => string;
    INVALID_VALUE: (name: string | symbol, value: unknown, nonNegative?: boolean) => string;
    NEGATIVE_VALUE: (name: string | symbol, value: unknown) => string;
    NON_ARRAY_VALUE: (name: string | symbol, value: unknown) => string;
    INVALID_MIN: (value: unknown) => string;
    INVALID_MAX: (value: unknown) => string;
    INVALID_INC: (value: unknown) => string;
    NEGATIVE_INC: (value: unknown) => string;
    SWAPPED_MIN_MAX_DIMS: (minValue: unknown, maxValue: unknown, minName: string | symbol, maxName: string | symbol) => string;
    NEGATIVE_DIMS: (value: unknown, name: string | symbol) => string;
    BROKEN_CONSTRAINTS: (value: unknown, limit: unknown, horizontal: boolean, overflow: boolean) => string;
    INVALID_DIMS: (horizontal: boolean, value: unknown) => string;
    INACTIVE_WIDGET: (name: string) => string;
    INVALID_ACTIVATION: (activating: boolean) => string;
    INVALID_KB_ROW_TEMPLATE: (entry: unknown) => string;
    INVALID_ENUM: (value: unknown, enumName: string, variableName: string) => string;
    OVERCAPTURING_WIDGET: (capturer: object) => string;
    MAYBE_DIMENSIONLESS: (axisName: string) => string;
    UNTARGETABLE_EVENT: (eventName: string) => string;
};
/**
 * Print a stack trace inside a collapsed group to the console.
 *
 * @category Core
 */
export declare function groupedStackTrace(): void;

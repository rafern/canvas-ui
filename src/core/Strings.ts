const baseCanvasContextMsg = 'Failed to get DOM canvas context. Make sure the 2D canvas context is supported';
const badTextImpl = 'Text render group generation is incorrectly implemented. Please report this bug if you are not responsible for text rendering for this Widget.';

export const Msg = {
    CANVAS_CONTEXT: `${baseCanvasContextMsg}.`,
    REUSABLE_CANVAS_CONTEXT: `${baseCanvasContextMsg} and the canvas is not being reused with a different rendering context.`,
    NEGATIVE_TEXT_GROUP: `Unexpected text render group with negative width detected. ${badTextImpl}`,
    EMPTY_LINE_RANGE: `Unexpected line range without any text render groups. Empty lines must contain a zero-width text render group. ${badTextImpl}`,
    ROGUE_NEWLINE: `Unexpected line range with newline character in the middle of the range instead of at the end. Text after newline character was ignored. ${badTextImpl}`,
    VIDEO_API_AVAILABLE: 'HTMLVideoElement.requestVideoFrameCallback is available and will be used; if video playback is choppy or broken, please report it on Github',
    MAX_RELAYOUTS: 'Maximum re-layouts exceeded. Is there a Widget type that is immediately marking the layout as dirty after resolving it?',
    DIMENSIONLESS_CANVAS: 'Canvas has 0 width or height. Are you using an empty Root? If not, make sure to not over-constrain the Widgets.',
    NON_POW2_CANVAS: 'Canvas has a width or height that is not a power of 2, which may create mipmapping issues for 3D engines. Make sure to use power of 2 starting and maximum canvas dimensions.',
    DOM_DRIVER_REBIND: 'Re-binding DOM driver. Are you calling bindDOMElem with the same HTML element multiple times?',
};

function propStr(name: string | symbol): string {
    if(typeof name === 'string')
        return name;
    else
        return '<Symbol()>';
}

function valueStr(value: unknown): string {
    if(typeof value === 'string')
        return `"${value}"`;
    else
        return String(value);
}

const fpCause = 'This may be caused by floating pointer precision errors.';

export const DynMsg = {
    INVALID_BACKGROUND_FILL: (backgroundProperty: string | symbol) => `Unknown theme property: ${propStr(backgroundProperty)}. Valid background fill theme properties: "primaryFill", "accentFill", "backgroundGlowFill" and "backgroundFill".`,
    SWAPPED_MIN_MAX_NAMED: (minValue: unknown, maxValue: unknown, minName: string | symbol, maxName: string | symbol) => `${propStr(maxName)} value (${valueStr(maxValue)}) can't be smaller than ${propStr(minName)} value (${valueStr(minValue)}).`,
    SWAPPED_MIN_MAX: (minValue: unknown, maxValue: unknown) => DynMsg.SWAPPED_MIN_MAX_NAMED(minValue, maxValue, 'Minimum', 'Maximum'),
    INVALID_VALUE: (name: string | symbol, value: unknown, nonNegative = false) => `${propStr(name)} value (${valueStr(value)}) must be a valid${nonNegative ? ' non-negative' : ''} finite number. Make sure that it's not infinite and not NaN.`,
    NEGATIVE_VALUE: (name: string | symbol, value: unknown) => `${propStr(name)} value (${valueStr(value)}) must be greater or equal to zero.`,
    NON_ARRAY_VALUE: (name: string | symbol, value: unknown) => `${propStr(name)} value (${valueStr(value)}) must be an array.`,
    INVALID_MIN: (value: unknown) => DynMsg.INVALID_VALUE('Minimum', value),
    INVALID_MAX: (value: unknown) => DynMsg.INVALID_VALUE('Maximum', value),
    INVALID_INC: (value: unknown) => DynMsg.INVALID_VALUE('Increment', value),
    NEGATIVE_INC: (value: unknown) => DynMsg.NEGATIVE_VALUE('Increment', value),
    SWAPPED_MIN_MAX_DIMS: (minValue: unknown, maxValue: unknown, minName: string | symbol, maxName: string | symbol) => `${DynMsg.SWAPPED_MIN_MAX_NAMED(minValue, maxValue, minName, maxName)} Set ${propStr(minName)} to ${propStr(maxName)}. ${fpCause}`,
    NEGATIVE_DIMS: (value: unknown, name: string | symbol) => `${DynMsg.NEGATIVE_VALUE(name, value)} Set ${propStr(name)} to 0. ${fpCause}`,
    BROKEN_CONSTRAINTS: (value: unknown, limit: unknown, horizontal: boolean, overflow: boolean) => `${horizontal ? 'Horizont' : 'Vertic'}al ${overflow ? 'ov' : 'und'}erflow in Widget; Limit: ${limit}, actual value: ${value}.`,
    INVALID_DIMS: (horizontal: boolean, value: unknown) => DynMsg.INVALID_VALUE(horizontal ? 'Width' : 'Height', value, true),
    INACTIVE_WIDGET: (name: string) => `Cannot get ${name} property; Widget is not active. Make sure the Widget is in a UI tree and to never directly call Widget update, layout resolution or painting methods.`,
    INVALID_ACTIVATION: (activating: boolean) => `Attempt to ${activating ? '' : 'de'}activate ${activating ? '' : 'in'}active Widget. Make sure the Widget is not being reused in another Root without first removing it from the first Root.`,
    INVALID_KB_ROW_TEMPLATE: (entry: unknown) => `Unknown virtual key row template format for entry: ${entry}. A key row template must either be a function that returns a VirtualKey instance, or a pair of symbols.`,
    INVALID_DELTAMODE: (deltaMode: unknown) => `Unknown PointerWheelMode value: ${deltaMode}. Make sure deltaMode is being passed as an enum value instead of an integer.`,
    OVERCAPTURING_WIDGET: (capturer: object) => `TabSelect event captured by widget (${capturer.constructor.name}), but reachedRelative was false; a widget type is probably capturing events by default. Make sure to only capture events that you need so that other Widgets aren't broken.`,
    RELAYOUTS: (relayouts: number) => `The last frame required ${relayouts - 1} re-layouts. Make sure to only mark a layout as dirty while resolving the layout unless absolutely necessary`,
    MAYBE_DIMENSIONLESS: (axisName: string) => `ViewportWidget has no minimum ${axisName} and ${axisName} isn't bi-directionally coupled, therefore, it may be dimensionless. Set a minimum ${axisName} and/or bi-directionally couple the ${axisName}.`,
    UNTARGETABLE_EVENT: (eventName: string) => `${eventName} events cannot be targetted to a specific widget. Target ignored`,
};

export function groupedStackTrace() {
    console.groupCollapsed('Stack trace');
    console.trace();
    console.groupEnd();
}

// Need to use unsafe code which abuses the any type
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TextRenderGroup } from '../helpers/TextHelper';
import { MultiContainer } from '../widgets/MultiContainer';
import { BaseContainer } from '../widgets/BaseContainer';
import type { FillStyle } from '../theme/FillStyle';
import { TextHelper } from '../helpers/TextHelper';
import { BaseTheme } from '../theme/BaseTheme';
import { Widget } from '../widgets/Widget';

const features: Map<string, [enabled: boolean, description: string]> = new Map();

/**
 * Check if a debug feature is enabled.
 *
 * @param debugFeature The debug feature name, for example, "watchflag.Widget._dirty"
 * @returns Returns true if the debug feature is enabled. If the feature doesn't exist, returns false.
 */
export function isDebugFeatureEnabled(debugFeature: string): boolean {
    const featureConfig = features.get(debugFeature);
    if(featureConfig === undefined) {
        console.warn(`Unknown debug feature "${debugFeature}"; defaulting to not enabled`);
        return false;
    }

    return featureConfig[0];
}

/**
 * Enable or disable a debug feature.
 *
 * @param debugFeature The debug feature name, for example, "watchflag.Widget._dirty"
 * @param enabled Should the feature be enabled or disabled? If undefined, toggles the feature
 */
export function toggleDebugFeature(debugFeature: string, enabled?: boolean): void {
    const featureConfig = features.get(debugFeature);
    if(featureConfig === undefined) {
        console.warn(`Unknown debug feature "${debugFeature}"; ignored`);
        return;
    }

    const [wasEnabled, _description] = featureConfig;

    if(enabled === undefined)
        enabled = !wasEnabled;

    if(wasEnabled !== enabled) {
        featureConfig[0] = enabled;
        console.info(`[canvas-ui] ${enabled ? 'En' : 'Dis'}abled "${debugFeature}" debug feature`);
    }
}

/** List all debug features in the console. */
export function listDebugFeatures(): void {
    for(const [feature, featureConfig] of features)
        console.info(`[canvas-ui] "${feature}" (${featureConfig[0] ? 'en' : 'dis'}abled): ${featureConfig[1]}`);
}

/**
 * Inject code for a new debug feature that watches when a class' property is
 * set to true and prints to the console.
 *
 * @param classObj The class. Widget for example
 * @param flagKey The key of the property to watch. "_dirty" for example
 */
export function injectWatchflagFeature(classObj: any, flagKey: string): void {
    const propertyPath = `${classObj.name}.${flagKey}`;
    const featureName = `watchflag.${propertyPath}`;
    if(features.has(featureName)) {
        console.warn(`[canvas-ui] Already injected debug feature with name ${featureName}; ignored`);
        return;
    }

    const featureNameStrace = `watchflag.${propertyPath}.strace`;
    if(features.has(featureNameStrace)) {
        console.warn(`[canvas-ui] Already injected debug feature with name ${featureNameStrace}; ignored`);
        return;
    }

    const valueMap: WeakMap<any, boolean> = new WeakMap();
    Object.defineProperty(classObj.prototype, flagKey, {
        get() {
            return valueMap.get(this);
        },
        set(newValue) {
            if(isDebugFeatureEnabled(featureName)) {
                const oldVal = valueMap.get(this);
                if(!oldVal && newValue) {
                    const msg = `[canvas-ui ${featureName}] ${this.constructor.name}.${flagKey} set to true`;
                    if(isDebugFeatureEnabled(featureNameStrace)) {
                        console.groupCollapsed(msg);
                        console.trace();
                        console.groupEnd();
                    }
                    else
                        console.debug(msg);
                }
            }

            valueMap.set(this, newValue);
        },
    });

    features.set(featureName, [false, `Show when ${propertyPath} is set to true`]);
    features.set(featureNameStrace, [false, `Print stack trace when ${featureName} shows that a flag has been set`]);
}

/**
 * Inject code for a new debug feature that traces when a class' method is
 * called, if the class calls the same method for other objects (prints tree)
 * and how long each call took in milliseconds.
 *
 * @param classObj The class. Widget for example
 * @param methodKey The key of the property to watch. "paint" for example
 * @param messageGenerator A function that returns a string with extra information about the function call. For example, a function which returns " (forced)" if Widget.paint is called with forced set to true
 */
export function injectTraceFeature(classObj: any, methodKey: string, messageGenerator: ((...args: any[]) => string) | null = null): void {
    const methodPath = `${classObj.name}.${methodKey}`;
    const featureName = `trace.${methodPath}`;
    if(features.has(featureName)) {
        console.warn(`[canvas-ui] Already injected debug feature with name ${featureName}; ignored`);
        return;
    }

    const msgStack: Array<string> = [];
    const msgIndices: Map<any, number> = new Map();
    const methodOrig = classObj.prototype[methodKey];
    let traceLevel = 0;

    function logMsgStack(): void {
        if(traceLevel === 0) {
            if(isDebugFeatureEnabled(featureName))
                console.debug(`[canvas-ui ${featureName}] Trace:\n${msgStack.join('\n')}`);

            traceLevel = 0;
            msgStack.length = 0;
            msgIndices.clear();
        }
    }

    classObj.prototype[methodKey] = function(...args: any[]) {
        traceLevel++;
        let msgIndex = msgIndices.get(this);

        if(msgIndex === undefined) {
            msgIndex = msgStack.length;
            msgIndices.set(this, msgIndex);
            let prefix;
            if(traceLevel > 1)
                prefix = '  '.repeat(traceLevel - 2) + '> ';
            else
                prefix = '';

            msgStack.push(`${prefix}${this.constructor.name}`);
        }
        else
            msgStack[msgIndex] += ', recall';

        if(messageGenerator !== null)
            msgStack[msgIndex] += messageGenerator.apply(this, args);

        const startTime = (new Date()).getTime();

        try {
            const returnVal = methodOrig.apply(this, args);
            msgStack[msgIndex] += ` <${(new Date()).getTime() - startTime} ms>`;
            return returnVal;
        }
        catch(e) {
            msgStack[msgIndex] += ' <exception thrown>';
            throw e;
        }
        finally {
            traceLevel--;
            logMsgStack();
        }
    }

    features.set(featureName, [false, `Trace ${methodPath} method calls`]);
}

/**
 * Inject code for a new debug feature that returns a random fill colour in a
 * given property when enabled.
 *
 * @param classObj The class. BaseTheme for example
 * @param themePropertyKey The key of the property to override. "canvasFill" for example
 */
export function injectRandomFillFeature(classObj: any, themePropertyKey: string): void {
    const propertyPath = `${classObj.name}.${themePropertyKey}`;
    const featureName = `randomfill.${propertyPath}`;
    if(features.has(featureName)) {
        console.warn(`[canvas-ui] Already injected debug feature with name ${featureName}; ignored`);
        return;
    }

    const propertyOrig = Object.getOwnPropertyDescriptor(classObj.prototype, themePropertyKey);
    Object.defineProperty(classObj.prototype, themePropertyKey, {
        get() {
            if(isDebugFeatureEnabled(featureName))
                return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
            else if(propertyOrig?.get !== undefined)
                return propertyOrig.get.apply(this);
        },
        set(newValue) {
            if(propertyOrig?.set !== undefined)
                propertyOrig.set.apply(this, [newValue]);
        },
    });

    features.set(featureName, [false, `Show when ${propertyPath} is set to true`]);
}

/**
 * Inject all default debug code. Call this before doing anything if you want to
 * enable debugging. Has no effect when called more than once.
 */
let injected = false;
export function injectDebugCode(): void {
    if(injected) {
        console.warn('[canvas-ui] Already injected debug code; ignored');
        return;
    }

    injected = true;

    // trace.Widget.paint
    injectTraceFeature(Widget, 'paint', (_ctx, forced) => {
        return forced ? ' (forced)' : '';
    });
    // trace.Widget.resolveDimensions
    injectTraceFeature(Widget, 'resolveDimensions', (minWidth, maxWidth, minHeight, maxHeight) => {
        return ` (${minWidth}, ${maxWidth}, ${minHeight}, ${maxHeight})`;
    });
    // trace.Widget.resolvePosition
    injectTraceFeature(Widget, 'resolvePosition', (x, y) => {
        return ` (${x}, ${y})`;
    });
    // trace.Widget.dispatchEvent
    injectTraceFeature(Widget, 'dispatchEvent', (event, _root) => {
        return ` (${event.constructor.name})`;
    });
    // watchflag.Widget._dirty
    injectWatchflagFeature(Widget, '_dirty');
    // watchflag.Widget._layoutDirty
    injectWatchflagFeature(Widget, '_layoutDirty');
    // watchflag.BaseContainer.backgroundDirty
    injectWatchflagFeature(BaseContainer, 'backgroundDirty');
    // watchflag.MultiContainer.backgroundDirty
    injectWatchflagFeature(MultiContainer, 'backgroundDirty');
    // randomfill.BaseTheme.canvasFill
    injectRandomFillFeature(BaseTheme, 'canvasFill');
    // randomfill.BaseTheme.primaryFill
    injectRandomFillFeature(BaseTheme, 'primaryFill');
    // randomfill.BaseTheme.accentFill
    injectRandomFillFeature(BaseTheme, 'accentFill');
    // randomfill.BaseTheme.backgroundFill
    injectRandomFillFeature(BaseTheme, 'backgroundFill');
    // randomfill.BaseTheme.backgroundGlowFill
    injectRandomFillFeature(BaseTheme, 'backgroundGlowFill');
    // randomfill.BaseTheme.bodyTextFill
    injectRandomFillFeature(BaseTheme, 'bodyTextFill');
    // randomfill.BaseTheme.inputBackgroundFill
    injectRandomFillFeature(BaseTheme, 'inputBackgroundFill');
    // randomfill.BaseTheme.inputSelectBackgroundFill
    injectRandomFillFeature(BaseTheme, 'inputSelectBackgroundFill');
    // randomfill.BaseTheme.inputTextFill
    injectRandomFillFeature(BaseTheme, 'inputTextFill');
    // randomfill.BaseTheme.inputTextFillDisabled
    injectRandomFillFeature(BaseTheme, 'inputTextFillDisabled');
    // randomfill.BaseTheme.inputTextFillInvalid
    injectRandomFillFeature(BaseTheme, 'inputTextFillInvalid');

    // textrendergroups; special debug feature for TextRenderGroup
    features.set(
        'textrendergroups',
        [
            false,
            `Draw text render groups in a TextHelper with alternating background colours (green and red). Width overriding groups have a blue background and zero-width groups have a black background. Throws an exception on negative width groups`,
        ]
    );

    const textHelperAlternate: WeakMap<TextHelper, boolean> = new Map();
    const textHelperPaintOrig = TextHelper.prototype.paint;
    TextHelper.prototype.paint = function(ctx: CanvasRenderingContext2D, fillStyle: FillStyle, x: number, y: number): void {
        textHelperAlternate.set(this, false);
        textHelperPaintOrig.apply(this, [ctx, fillStyle, x, y]);
    };

    const textHelperPaintGroupOrig = TextHelper.prototype.paintGroup;
    TextHelper.prototype.paintGroup = function(ctx: CanvasRenderingContext2D, group: TextRenderGroup, left: number, x: number, y: number): void {
        if(isDebugFeatureEnabled('textrendergroups')) {
            const origFillStyle = ctx.fillStyle;
            const height = this.actualLineHeight;
            const fullHeight = this.fullLineHeight;
            if(!group[3] && group[2] > left) {
                const alternate = textHelperAlternate.get(this);
                ctx.fillStyle = alternate ? 'rgba(255, 0, 0, 0.5)'
                                          : 'rgba(0, 255, 0, 0.5)';
                ctx.fillRect(x, y - height, group[2] - left, fullHeight);
                textHelperAlternate.set(this, !alternate);
                ctx.fillStyle = origFillStyle;
            }
            else {
                let debugWidth = group[2] - left;
                ctx.fillStyle = debugWidth > 0 ? 'rgba(0, 0, 255, 0.5)'
                                               : 'rgba(0, 0, 0, 0.5)';
                if(debugWidth == 0)
                    debugWidth = 4;
                else if(debugWidth < 0)
                    throw new Error('Unexpected group with negative width');

                ctx.fillRect(x, y - height, debugWidth, fullHeight);
            }
        }

        textHelperPaintGroupOrig.apply(this, [ctx, group, left, x, y]);
    };

    // Make debug functions available in global scope
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).canvasDebug = {
        enabled: isDebugFeatureEnabled,
        toggle: toggleDebugFeature,
        list: listDebugFeatures,
    };

    console.info('[canvas-ui] Injected debug code; the library will be slower');
    console.info('[canvas-ui] Check if a debug feature is enabled in the console with canvasDebug.enabled(debugFeature: string)');
    console.info('[canvas-ui] Enable a debug feature in the console with canvasDebug.toggle(debugFeature: string, enabled?: boolean)');
    console.info('[canvas-ui] List debug features in the console with canvasDebug.list()');
}
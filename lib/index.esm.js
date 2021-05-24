function DefaultTextInputHandler(initialInput) {
    return new Promise((accept, _reject) => {
        function closePopup() {
            // Close text input popup
            document.body.removeChild(containerElem);
            document.body.removeChild(overlayElem);
        }
        function cancelHandler() {
            // Click cancel; close popup and accept with initial input string
            closePopup();
            accept(initialInput);
        }
        function okHandler() {
            // Click OK; close popup and accept with new input string
            closePopup();
            accept(inElem.value);
        }
        function enterChecker(event) {
            // Check if enter key was pressed
            if (event.keyCode == 13) {
                event.preventDefault();
                okHandler();
            }
        }
        // Create overlay
        const overlayElem = document.createElement('div');
        overlayElem.id = 'textInputHandlerOverlay';
        // Create container
        const containerElem = document.createElement('div');
        containerElem.id = 'textInputHandler';
        // Create text element
        const textElem = document.createElement('p');
        textElem.textContent = 'Change text:';
        // Create input element
        const inElem = document.createElement('input');
        inElem.addEventListener('keyup', enterChecker);
        inElem.value = initialInput;
        // Create button row element
        const buttonRowElem = document.createElement('div');
        // Create cancel button element
        const cancelButtonElem = document.createElement('button');
        cancelButtonElem.addEventListener('click', cancelHandler);
        cancelButtonElem.textContent = 'Cancel';
        // Create OK button element
        const okButtonElem = document.createElement('button');
        okButtonElem.addEventListener('click', okHandler);
        okButtonElem.textContent = 'OK';
        // Add to row
        buttonRowElem.appendChild(cancelButtonElem);
        buttonRowElem.appendChild(okButtonElem);
        // Add to container
        containerElem.appendChild(textElem);
        containerElem.appendChild(inElem);
        containerElem.appendChild(buttonRowElem);
        // Add overlay and container to body
        document.body.appendChild(overlayElem);
        document.body.appendChild(containerElem);
        // Focus input
        inElem.focus({ preventScroll: false });
    });
}

var FocusType;
(function (FocusType) {
    FocusType[FocusType["Pointer"] = 0] = "Pointer";
    FocusType[FocusType["Keyboard"] = 1] = "Keyboard";
})(FocusType || (FocusType = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var ThemeProperty;
(function (ThemeProperty) {
    ThemeProperty[ThemeProperty["CanvasFill"] = 0] = "CanvasFill";
    ThemeProperty[ThemeProperty["ContainerPadding"] = 1] = "ContainerPadding";
    ThemeProperty[ThemeProperty["ContainerSpacing"] = 2] = "ContainerSpacing";
    ThemeProperty[ThemeProperty["ContainerAlignment"] = 3] = "ContainerAlignment";
    ThemeProperty[ThemeProperty["PrimaryFill"] = 4] = "PrimaryFill";
    ThemeProperty[ThemeProperty["AccentFill"] = 5] = "AccentFill";
    ThemeProperty[ThemeProperty["BackgroundFill"] = 6] = "BackgroundFill";
    ThemeProperty[ThemeProperty["BackgroundGlowFill"] = 7] = "BackgroundGlowFill";
    ThemeProperty[ThemeProperty["SliderFlexRatio"] = 8] = "SliderFlexRatio";
    ThemeProperty[ThemeProperty["SliderMainBasis"] = 9] = "SliderMainBasis";
    ThemeProperty[ThemeProperty["SliderCrossBasis"] = 10] = "SliderCrossBasis";
    ThemeProperty[ThemeProperty["BodyTextFont"] = 11] = "BodyTextFont";
    ThemeProperty[ThemeProperty["BodyTextFill"] = 12] = "BodyTextFill";
    ThemeProperty[ThemeProperty["LabelMinWidth"] = 13] = "LabelMinWidth";
    ThemeProperty[ThemeProperty["LabelMinAscent"] = 14] = "LabelMinAscent";
    ThemeProperty[ThemeProperty["LabelMinDescent"] = 15] = "LabelMinDescent";
    ThemeProperty[ThemeProperty["CheckboxLength"] = 16] = "CheckboxLength";
    ThemeProperty[ThemeProperty["CheckboxInnerPadding"] = 17] = "CheckboxInnerPadding";
    ThemeProperty[ThemeProperty["InputBackgroundFill"] = 18] = "InputBackgroundFill";
    ThemeProperty[ThemeProperty["InputTextFont"] = 19] = "InputTextFont";
    ThemeProperty[ThemeProperty["InputTextFill"] = 20] = "InputTextFill";
    ThemeProperty[ThemeProperty["InputTextFlexRatio"] = 21] = "InputTextFlexRatio";
    ThemeProperty[ThemeProperty["InputTextMinWidth"] = 22] = "InputTextMinWidth";
    ThemeProperty[ThemeProperty["InputTextMinAscent"] = 23] = "InputTextMinAscent";
    ThemeProperty[ThemeProperty["InputTextMinDescent"] = 24] = "InputTextMinDescent";
    ThemeProperty[ThemeProperty["BlinkRate"] = 25] = "BlinkRate";
    ThemeProperty[ThemeProperty["CursorPadding"] = 26] = "CursorPadding";
    ThemeProperty[ThemeProperty["CursorThickness"] = 27] = "CursorThickness";
    ThemeProperty[ThemeProperty["ScrollBarThickness"] = 28] = "ScrollBarThickness";
})(ThemeProperty || (ThemeProperty = {}));

var Alignment;
(function (Alignment) {
    Alignment[Alignment["Stretch"] = 0] = "Stretch";
    Alignment[Alignment["Start"] = 1] = "Start";
    Alignment[Alignment["Center"] = 2] = "Center";
    Alignment[Alignment["End"] = 3] = "End";
})(Alignment || (Alignment = {}));

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class Theme {
    // Constructor. Makes theme from given theme properties and fallback theme.
    // These can be changed later
    constructor(properties, fallback = null) {
        // Theme properties
        this.properties = new Map();
        // Fallback theme
        this.fallback = null;
        this.properties = properties;
        this.fallback = fallback;
    }
    // Get a theme property. This may be a string with a colour, string with a
    // font, number, etc... If a theme property is not available, the theme will
    // try to get it from the fallback theme. If there is no fallback theme set,
    // an exception is thrown
    getProperty(themeProperty) {
        // Get property's value
        let value = this.properties.get(themeProperty);
        // If property is missing, get property from fallback theme
        if (value === undefined) {
            if (this.fallback === null)
                throw new Error(`Theme property ${themeProperty} is not available`);
            value = this.fallback.getProperty(themeProperty);
        }
        return value;
    }
    // See getProperty
    getString(themeProperty) {
        const value = this.getProperty(themeProperty);
        if (typeof value !== 'string')
            throw new Error(`Theme property ${themeProperty} is not a string`);
        return value;
    }
    // See getProperty
    getNumber(themeProperty) {
        const value = this.getProperty(themeProperty);
        if (typeof value !== 'number')
            throw new Error(`Theme property ${themeProperty} is not a number`);
        return value;
    }
    // See getProperty
    getPadding(themeProperty) {
        // TODO proper type safety
        return this.getProperty(themeProperty);
    }
    // See getProperty
    getAlignment(themeProperty) {
        // TODO proper type safety
        return this.getProperty(themeProperty);
    }
    // See getProperty
    getAlignment2D(themeProperty) {
        // TODO proper type safety
        return this.getProperty(themeProperty);
    }
    // See getProperty
    // @deprecated
    getFill(themeProperty) {
        return this.getString(themeProperty);
    }
    // See getProperty
    // @deprecated
    getFont(themeProperty) {
        return this.getString(themeProperty);
    }
    // See getProperty
    // @deprecated
    getSize(themeProperty) {
        return this.getNumber(themeProperty);
    }
}

const defaultTheme = new Theme(new Map([
    [ThemeProperty.CanvasFill, 'rgba(0,0,0,0.5)'],
    [ThemeProperty.ContainerPadding, {
            left: 4,
            right: 4,
            top: 4,
            bottom: 4,
        }],
    [ThemeProperty.ContainerAlignment, {
            horizontal: Alignment.Start, vertical: Alignment.Start
        }],
    [ThemeProperty.ContainerSpacing, 4],
    [ThemeProperty.PrimaryFill, 'rgb(0,127,255)'],
    [ThemeProperty.AccentFill, 'rgb(0,195,255)'],
    [ThemeProperty.BackgroundFill, 'rgb(32,32,32)'],
    [ThemeProperty.BackgroundGlowFill, 'rgb(48,48,48)'],
    [ThemeProperty.SliderFlexRatio, 1],
    [ThemeProperty.SliderMainBasis, 100],
    [ThemeProperty.SliderCrossBasis, 10],
    [ThemeProperty.BodyTextFont, '16px sans'],
    [ThemeProperty.BodyTextFill, 'white'],
    [ThemeProperty.LabelMinWidth, 0],
    [ThemeProperty.LabelMinAscent, 0],
    [ThemeProperty.LabelMinDescent, 3],
    [ThemeProperty.CheckboxLength, 12],
    [ThemeProperty.CheckboxInnerPadding, 2],
    [ThemeProperty.InputBackgroundFill, 'white'],
    [ThemeProperty.InputTextFont, '16px mono'],
    [ThemeProperty.InputTextFill, 'black'],
    [ThemeProperty.InputTextFlexRatio, 1],
    [ThemeProperty.InputTextMinWidth, 100],
    [ThemeProperty.InputTextMinAscent, 16],
    [ThemeProperty.InputTextMinDescent, 3],
    [ThemeProperty.BlinkRate, 0.8],
    [ThemeProperty.CursorPadding, 2],
    [ThemeProperty.CursorThickness, 2],
    [ThemeProperty.ScrollBarThickness, 10],
]));

class Event {
    constructor(target, focusType, needsFocus) {
        this.target = target;
        this.focusType = focusType;
        this.needsFocus = needsFocus;
    }
}

class Leave extends Event {
    constructor(target = null) {
        super(target, FocusType.Pointer, true);
    }
    cloneWithTarget(target) {
        return new Leave(target);
    }
}

class LayoutContext {
    constructor(maxWidth, maxHeight, vertical) {
        this.hBasis = 0;
        this.vBasis = 0;
        this.hFlex = 0;
        this.vFlex = 0;
        this.sizeChanged = false;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.vertical = vertical;
    }
    clone() {
        const layoutCtx = new LayoutContext(this.maxWidth, this.maxHeight, this.vertical);
        layoutCtx.hBasis = this.hBasis;
        layoutCtx.vBasis = this.vBasis;
        layoutCtx.hFlex = this.hFlex;
        layoutCtx.vFlex = this.vFlex;
        return layoutCtx;
    }
    addBasis(hBasis, vBasis) {
        // Add length to main-axis basis and update biggest cross-axis basis
        if (this.vertical) {
            this.vBasis += vBasis;
            if (hBasis > this.hBasis)
                this.hBasis = hBasis;
        }
        else {
            this.hBasis += hBasis;
            if (vBasis > this.vBasis)
                this.vBasis = vBasis;
        }
    }
}

function roundToPower2 (number, roundUp = true) {
    let roundFun = roundUp ? Math.ceil : Math.floor;
    return Math.pow(2, roundFun(Math.log2(number)));
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class Viewport {
    constructor(startingWidth = 64, startingHeight = 64) {
        // Maximum size of viewport. This is passed as a hint to children.  If an
        // axis' maximum length is 0, then there is no maximum for that axis, but it
        // also means that flex components won't expand in that axis.
        this._maxDimensions = [0, 0]; // XXX private
        // Is the layout context vertical?
        this.vertical = true;
        // Does the viewport need to force-mark layout as dirty?
        this.forceLayout = false; // XXX private
        // Create internal canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = startingWidth;
        this.canvas.height = startingHeight;
        // Get context out of canvas
        const context = this.canvas.getContext('2d', { alpha: true });
        if (context === null)
            throw 'Failed to get canvas context';
        this.context = context;
    }
    get canvasDimensions() {
        return [this.canvas.width, this.canvas.height];
    }
    set maxDimensions(maxDimensions) {
        if (this._maxDimensions[0] !== maxDimensions[0] ||
            this._maxDimensions[1] !== maxDimensions[1]) {
            this._maxDimensions[0] = maxDimensions[0];
            this._maxDimensions[1] = maxDimensions[1];
            this.forceLayout = true;
        }
    }
    get maxDimensions() {
        return [this._maxDimensions[0], this._maxDimensions[1]];
    }
    populateChildsLayout(child) {
        // Force layout resolution
        if (this.forceLayout) {
            this.forceLayout = false;
            child.forceLayoutDirty();
        }
        // If layout is not dirty, no context is returned; update not needed
        if (!child.layoutDirty)
            return null;
        // Populate layout context
        const layoutCtx = new LayoutContext(this._maxDimensions[0], this._maxDimensions[1], this.vertical);
        child.populateLayout(layoutCtx);
        return layoutCtx;
    }
    resolveChildsLayout(child, layoutCtx) {
        if (!child.layoutDirty || layoutCtx === null)
            return false;
        // Resolve child's layout
        const oldWidth = child.resolvedWidth;
        const oldHeight = child.resolvedHeight;
        child.resolveLayout(layoutCtx);
        const newWidth = child.resolvedWidth;
        const newHeight = child.resolvedHeight;
        let childResized = false;
        if (newWidth !== oldWidth || newHeight !== oldHeight) {
            // Re-scale canvas if neccessary.
            // Canvas dimensions are rounded to the nearest power of 2, favoring
            // bigger powers. This is to avoid issues with mipmapping, which
            // requires texture sizes to be powers of 2.
            const potentialCWidth = roundToPower2(newWidth);
            if (potentialCWidth > this.canvas.width)
                this.canvas.width = potentialCWidth;
            const potentialCHeight = roundToPower2(newHeight);
            if (potentialCHeight > this.canvas.height)
                this.canvas.height = potentialCHeight;
            childResized = true;
        }
        // Force-mark child as dirty if a resize occurred. A resize of
        // child components still counts as a resize, hence why this flag is
        // used instead of the conditional for comparing the old size and the
        // new size. If it didn't count, then a flex component that expands to
        // its maximum size would never trigger a redraw even if it changed size
        if (layoutCtx.sizeChanged || childResized)
            child.forceLayoutDirty();
        return childResized;
    }
    paintToCanvas(child) {
        // Paint child
        const wasDirty = child.dirty;
        if (wasDirty)
            child.paint(0, 0, child.resolvedWidth, child.resolvedHeight, this.context);
        return wasDirty;
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class Root {
    // A Root is the parent of all widgets, but not a widget itself. It contains
    // a single child and manages dimensions and input handling
    constructor(child, pointerStyleHandler = null, theme = defaultTheme /*debugTheme*/) {
        // The internal viewport. Manages drawing
        this.viewport = new Viewport(); // XXX protected
        // The list of drivers
        this.drivers = new Set(); // XXX protected
        // Is the Root enabled?
        this._enabled = true; // XXX protected
        // Pointer style and last pointer style
        this.pointerStyle = 'default';
        this._currentPointerStyle = 'default'; // XXX protected
        // Current component foci (event targets for each focus type) and last
        // capturer for each focus
        this.foci = new Map([
            [FocusType.Keyboard, null],
            [FocusType.Pointer, null],
        ]);
        this.lastFociCapturers = new Map([
            [FocusType.Keyboard, null],
            [FocusType.Pointer, null],
        ]);
        // Handler for mobile-friendly text input
        this.textInputHandler = null;
        // Is the mobile-friendly text input in use?
        this._mobileTextInUse = false; // XXX protected
        this.child = child;
        this.pointerStyleHandler = pointerStyleHandler;
        this.child.inheritTheme(theme);
    }
    get maxDimensions() {
        return this.viewport.maxDimensions;
    }
    set maxDimensions(maxDimensions) {
        this.viewport.maxDimensions = maxDimensions;
    }
    get canvasDimensions() {
        return this.viewport.canvasDimensions;
    }
    get dimensions() {
        return [
            this.child.resolvedWidth,
            this.child.resolvedHeight,
        ];
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(newEnabled) {
        const oldEnabled = this._enabled;
        if (oldEnabled !== newEnabled) {
            this._enabled = newEnabled;
            // Call driver hooks and reset pointer style if UI disabled
            if (newEnabled) {
                for (const driver of this.drivers) {
                    if (driver.onEnable)
                        driver.onEnable(this);
                }
            }
            else {
                for (const driver of this.drivers) {
                    if (driver.onDisable)
                        driver.onDisable(this);
                }
                this.updatePointerStyle('default');
            }
        }
    }
    get canvas() {
        return this.viewport.canvas;
    }
    resolveLayout() {
        // Don't do anything if Root is disabled
        if (!this.enabled)
            return false;
        const layoutCtx = this.viewport.populateChildsLayout(this.child);
        return this.viewport.resolveChildsLayout(this.child, layoutCtx);
    }
    paint() {
        // Don't do anything if Root is disabled
        if (!this.enabled)
            return false;
        return this.viewport.paintToCanvas(this.child);
    }
    dispatchEvent(event) {
        // Ignore event if Root is disabled
        if (!this.enabled)
            return;
        // If event is focusable and is missing a target...
        if (event.focusType !== null && event.target === null) {
            // Ignore event if it needs a focus but there is no component
            // focused in the needed focus
            let focus = this.foci.get(event.focusType);
            if (typeof focus === 'undefined')
                focus = null;
            if (event.needsFocus && focus === null) {
                //console.warn('Dropped event due to lack of target', event);
                return;
            }
            // Set event target
            event = event.cloneWithTarget(focus);
        }
        // Clear pointer style. This will be set by children if neccessary
        this.pointerStyle = 'default';
        // Pass event down to internal Container
        const [width, height] = this.dimensions;
        const captured = this.child.dispatchEvent(event, width, height, this);
        if (captured === null) {
            // If the event wasn't captured but it had a focus, clear the focus
            // NOTE: This is for preventing a component that is no longer
            // present in the UI from capturing events
            if (event.focusType !== null) {
                //console.warn('Focus cleared due to uncaptured focused event', event);
                this.clearFocus(event.focusType);
            }
        }
        /*else
            console.info('Event captured by widget:', captured.constructor.name);*/
        // Update last focus capturer
        if (event.focusType !== null) {
            // Special case: when the pointer focus capturer changes, dispatch a
            // leave event to the last capturer
            // XXX should this be moved to pointer drivers?
            if (event.focusType === FocusType.Pointer) {
                const lastPointerCapturer = this.lastFociCapturers.get(event.focusType);
                if (lastPointerCapturer !== captured) {
                    this.child.dispatchEvent(new Leave(lastPointerCapturer), width, height, this);
                }
            }
            this.lastFociCapturers.set(event.focusType, captured);
        }
    }
    preLayoutUpdate() {
        // Skip if UI is disabled
        if (!this.enabled)
            return;
        // Update drivers
        for (const driver of this.drivers)
            driver.update(this);
        // Pre-layout update child
        this.child.preLayoutUpdate(this);
    }
    postLayoutUpdate() {
        // Skip if UI is disabled
        if (!this.enabled)
            return;
        // Post-layout update child
        this.child.postLayoutUpdate(this);
        // Update pointer style
        this.updatePointerStyle();
    }
    updatePointerStyle(newStyle = null) {
        if (newStyle !== null)
            this.pointerStyle = newStyle;
        if (this.pointerStyle !== this._currentPointerStyle) {
            this._currentPointerStyle = this.pointerStyle;
            if (this.pointerStyleHandler !== null)
                this.pointerStyleHandler(this._currentPointerStyle);
        }
    }
    requestFocus(focusType, widget) {
        if (widget !== null) {
            // Replace focus if current focus is not the desired one
            const currentFocus = this.foci.get(focusType);
            if (widget !== currentFocus) {
                this.clearFocus(focusType);
                //console.log('Set focus type', focusType, 'to widget', widget);
                this.foci.set(focusType, widget);
            }
        }
    }
    dropFocus(focusType, widget) {
        // NOTE: Use this instead of clearFocus if your intent is to make sure a
        // SPECIFIC COMPONENT is no longer focused, NOT ANY COMPONENT
        const currentFocus = this.foci.get(focusType);
        if (widget === currentFocus)
            this.clearFocus(focusType);
    }
    clearFocus(focusType) {
        const currentFocus = this.foci.get(focusType);
        if (currentFocus !== null && typeof currentFocus !== 'undefined') {
            //console.log('Dropped focus type', focusType, 'from widget', currentFocus);
            if (currentFocus.onFocusDropped)
                currentFocus.onFocusDropped(focusType, this);
            this.foci.set(focusType, null);
        }
    }
    registerDriver(driver) {
        // If driver is not registered, register it
        if (this.drivers.has(driver))
            return;
        this.drivers.add(driver);
        if (this._enabled && driver.onEnable)
            driver.onEnable(this);
    }
    unregisterDriver(driver) {
        // If driver is registered, unregister it
        if (!this.drivers.delete(driver))
            return;
        if (this._enabled && driver.onDisable)
            driver.onDisable(this);
    }
    clearDrivers() {
        // Unregister all drivers
        if (this._enabled) {
            for (const driver of this.drivers)
                this.unregisterDriver(driver);
        }
    }
    get hasMobileTextInput() {
        return this.textInputHandler !== null && !this._mobileTextInUse;
    }
    get usingMobileTextInput() {
        return this._mobileTextInUse;
    }
    getTextInput(initialInput = '') {
        return __awaiter(this, void 0, void 0, function* () {
            // Only get if text input is currently available
            // XXX even though this if statement is equivalent to
            // hasMobileTextInput, typescript type inference is bad and only works
            // if its done this way, else it thinks that textInputHandler may be
            // null and throws an error when compiling
            if (this.textInputHandler !== null && !this._mobileTextInUse) {
                // Flag text input as in-use
                this._mobileTextInUse = true;
                // Get input from handler
                const newInput = yield this.textInputHandler(initialInput);
                // Flag text input as not in-use
                this._mobileTextInUse = false;
                // Return new value
                return newInput;
            }
            return null;
        });
    }
}

class KeyEvent extends Event {
    constructor(key, target) {
        super(target, FocusType.Keyboard, true);
        this.key = key;
    }
}

class KeyRelease extends KeyEvent {
    cloneWithTarget(target) {
        return new KeyRelease(this.key, target);
    }
}

class KeyPress extends KeyEvent {
    cloneWithTarget(target) {
        return new KeyPress(this.key, target);
    }
}

class KeyboardDriver {
    constructor(listenElem) {
        this.eventQueue = [];
        // Listen for keyboard events, filling event queue
        listenElem.addEventListener('keydown', (event) => {
            this.eventQueue.push([event.key, true]);
        });
        listenElem.addEventListener('keyup', (event) => {
            this.eventQueue.push([event.key, false]);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onEnable(_root) { }
    onDisable(_root) {
        this.eventQueue = [];
    }
    update(root) {
        // Parse each keyboard event
        for (const event of this.eventQueue) {
            // Dispatch event
            if (event[1])
                root.dispatchEvent(new KeyPress(event[0], null));
            else
                root.dispatchEvent(new KeyRelease(event[0], null));
        }
        // Clear event queue
        this.eventQueue = [];
    }
}

class PointerEvent extends Event {
    constructor(x, y, target = null, focusType = null) {
        super(target, focusType, false);
        this.x = x;
        this.y = y;
    }
}

class PointerMove extends PointerEvent {
    constructor(x, y, target = null) {
        super(x, y, target, FocusType.Pointer);
    }
    correctOffset(xOffset, yOffset) {
        return new PointerMove(this.x - xOffset, this.y - yOffset, this.target);
    }
    cloneWithTarget(target) {
        return new PointerMove(this.x, this.y, target);
    }
}

class PointerPress extends PointerEvent {
    constructor(x, y, target = null) {
        super(x, y, target);
    }
    correctOffset(xOffset, yOffset) {
        return new PointerPress(this.x - xOffset, this.y - yOffset, this.target);
    }
    cloneWithTarget(target) {
        return new PointerPress(this.x, this.y, target);
    }
}

class PointerRelease extends PointerEvent {
    constructor(x, y, target = null) {
        super(x, y, target, FocusType.Pointer);
    }
    correctOffset(xOffset, yOffset) {
        return new PointerRelease(this.x - xOffset, this.y - yOffset, this.target);
    }
    cloneWithTarget(target) {
        return new PointerRelease(this.x, this.y, target);
    }
}

var ClickState;
(function (ClickState) {
    ClickState[ClickState["Released"] = 0] = "Released";
    ClickState[ClickState["Hover"] = 1] = "Hover";
    ClickState[ClickState["Hold"] = 2] = "Hold";
})(ClickState || (ClickState = {}));
// A Clickable is a Widget that can be clicked. It keeps its current click state
// as well as its last click state, last pointer position and whether the last
// click state change resulted in an actual click
// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME the return type of mixin constructors is a mess, so linter is disabled
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Clickable(Base) {
    return class Clickable extends Base {
        constructor() {
            super(...arguments);
            // Last and current click state
            this.lastClickState = ClickState.Released; // XXX protected
            this.clickState = ClickState.Released; // XXX protected
            // Did the last click event handle result in a click state change?
            this.clickStateChanged = false; // XXX protected
            // Did the last click state change result in a click?
            this.wasClick = false; // XXX protected
            // Last pointer position in normalised coordinates ([0,0] to [1,1]). If
            // there is no last pointer position, such as after a leave event, this
            // will be null. If pointer position was outside box, it will be beyond
            // the [0,0] to [1,1] range
            this.pointerPos = null; // XXX protected
            // Like pointer position, but only updated when a hold state begins.
            // Useful for implementing draggable widgets
            this.startingPointerPos = null; // XXX protected
        }
        // Normalise pointer coordinates inside a rectangle
        getNormalInRect(pX, pY, rLeft, rRight, rTop, rBottom) {
            return [(pX - rLeft) / (rRight - rLeft), (pY - rTop) / (rBottom - rTop)];
        }
        // Check if a point is inside a rectangle
        isPointInRect(pX, pY, rLeft, rRight, rTop, rBottom) {
            return pX >= rLeft && pX < rRight && pY >= rTop && pY < rBottom;
        }
        // Check if a normalised point is inside a rectangle (1x1)
        isNormalInRect(pX, pY) {
            return pX >= 0 && pX < 1 && pY >= 0 && pY < 1;
        }
        // Set click state and update last one if current one differs. Updates
        // wasClick and clickStateChanged flags
        setClickState(clickState, inside) {
            if (this.clickState !== clickState) {
                this.lastClickState = this.clickState;
                this.clickState = clickState;
                // If last state was a hold and pointer is still inside click
                // area, this was a click
                this.wasClick = inside && this.lastClickState === ClickState.Hold;
                this.clickStateChanged = true;
            }
            else
                this.clickStateChanged = false;
        }
        // Updates the current click state given an event, as well as focus,
        // pointer style, wasClick and clickStateChanged flags
        handleClickEvent(event, root, clickArea) {
            if (event instanceof Leave) {
                // Drop focus on this widget if this is a leave event
                root.dropFocus(FocusType.Pointer, this);
                this.pointerPos = null;
                return this.setClickState(ClickState.Released, false);
            }
            else if (event instanceof PointerEvent) {
                // Ignore non-pointer events
                // Normalise pointer coordinates in click area
                this.pointerPos = this.getNormalInRect(event.x, event.y, ...clickArea);
                // If pointer is over the clickable rectangle, then change the
                // pointer style, else, if not targetted, drop focus
                const inside = this.isNormalInRect(...this.pointerPos);
                if (inside)
                    root.pointerStyle = 'pointer';
                else if (event.target === null) {
                    root.dropFocus(FocusType.Pointer, this);
                    return this.setClickState(ClickState.Released, false);
                }
                // If this is a press event, request focus and set starting
                // pointer coordinates
                if (event instanceof PointerPress) {
                    this.startingPointerPos = this.pointerPos;
                    root.requestFocus(FocusType.Pointer, this);
                    return this.setClickState(ClickState.Hold, inside);
                }
                // If this is a release event, drop focus
                if (event instanceof PointerRelease) {
                    root.dropFocus(FocusType.Pointer, this);
                    if (inside)
                        return this.setClickState(ClickState.Hover, inside);
                    else
                        return this.setClickState(ClickState.Released, inside);
                }
                // If event was focused, then it's a hold, else, it's a hover
                if (event.target === null)
                    return this.setClickState(ClickState.Hover, inside);
                else
                    return this.setClickState(ClickState.Hold, inside);
            }
            else
                this.clickStateChanged = false;
        }
    };
}

let measureContext = null;
const measurePadding = new Map();
const CIRCUMFIX_CHAR = '-';
function measureTextDims(text, font) {
    // Special case for empty strings. measureText likes to give out some bogus
    // values on empty strings, which doesn't make much sense
    if (text === '')
        return [0, 0, 0];
    // Like ctx.measureText(), but it manages a shared canvas for you and gives
    // you the correct bounding box
    if (measureContext === null) {
        const tempCanvas = document.createElement('canvas');
        measureContext = tempCanvas.getContext('2d');
        if (measureContext === null)
            throw 'Failed to get canvas context';
    }
    measureContext.font = font;
    // Get circumfix length in pixels with current font
    let suffixLength;
    if (measurePadding.has(font))
        suffixLength = measurePadding.get(font);
    else {
        // Circumfix length not cached yet, measure it
        const suffixDims = measureContext.measureText(CIRCUMFIX_CHAR);
        suffixLength = Math.abs(suffixDims.actualBoundingBoxLeft) + Math.abs(suffixDims.actualBoundingBoxRight);
        measurePadding.set(font, suffixLength);
    }
    // Measure text dimensions with a circumfix character so that whitespaces
    // are measurable, correcting for circumfix character's length
    const dims = measureContext.measureText(CIRCUMFIX_CHAR + text + CIRCUMFIX_CHAR);
    return [
        Math.abs(dims.actualBoundingBoxLeft) + Math.abs(dims.actualBoundingBoxRight) - suffixLength * 2,
        Math.abs(dims.actualBoundingBoxAscent),
        Math.abs(dims.actualBoundingBoxDescent),
    ];
}
// A Labelable is a widget that contains labels (text). It has utilities for
// measuring text dimensions and painting text
// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME the return type of mixin constructors is a mess, so linter is disabled
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Labelable(Base) {
    return class Labelable extends Base {
        constructor() {
            super(...arguments);
            // Label variables
            this._text = ''; // XXX protected
            this._font = ''; // XXX protected
            this._minLabelWidth = 0; // XXX protected
            this._minLabelAscent = 0; // XXX protected
            this._minLabelDescent = 0; // XXX protected
            // Text dimensions corrected for minimum dimensions
            this._labelWidth = 0; // XXX private
            this._labelAscent = 0; // XXX private
            this._labelDescent = 0; // XXX private
            // Does the label need to be re-measured?
            this.labelDirty = true; // XXX private
        }
        updateTextDims() {
            // Abort if not dirty
            if (!this.labelDirty)
                return;
            // Measure text dimensions
            const [width, ascent, descent] = measureTextDims(this._text, this._font);
            this._labelWidth = Math.max(width, this._minLabelWidth);
            this._labelAscent = Math.max(ascent, this._minLabelAscent);
            this._labelDescent = Math.max(descent, this._minLabelDescent);
            // Mark as clean
            this.labelDirty = false;
        }
        findOffsetFromIndex(index) {
            // If index is 0 or an invalid negative number, it is at the beginning
            if (index <= 0)
                return 0;
            // Cut text up to given index and measure its length, this length is the
            // offset at the given index
            return measureTextDims(this._text.substring(0, index), this._font)[0];
        }
        findIndexOffsetFromOffset(offset) {
            // If offset is before first character, default to index 0
            if (offset <= 0)
                return [0, 0];
            // TODO This has linear complexity, use a binary search instead
            // For each character, find index at which offset is smaller than
            // total length minus half length of current character
            let index = 0, buffer = '', lastLength = 0;
            for (const char of this._text) {
                // Add next character to buffer
                buffer += char;
                // Measure text buffer length and critical offset, which is text
                // buffer's length minus length of half character, equivalent to
                // average between last length and current length
                const bufferLength = measureTextDims(buffer, this._font)[0];
                // bl - (bl - ll) / 2 = bl - bl / 2 + ll / 2 = (bl + ll) / 2
                const criticalOffset = (bufferLength + lastLength) / 2;
                // If offset is before critical offset, this is the index we're
                // looking for
                if (offset < criticalOffset)
                    return [index, lastLength];
                // Update index and last length
                index++;
                lastLength = bufferLength;
            }
            // Offset is after full length of text, return index after end
            return [this._text.length, lastLength];
        }
        setLabelDirty() {
            this.labelDirty = true;
            this.layoutDirty = true;
        }
        get labelWidth() {
            this.updateTextDims();
            return this._labelWidth;
        }
        get labelAscent() {
            this.updateTextDims();
            return this._labelAscent;
        }
        get labelDescent() {
            this.updateTextDims();
            return this._labelDescent;
        }
        get labelHeight() {
            this.updateTextDims();
            return this._labelAscent + this._labelDescent;
        }
        setText(text) {
            if (this._text !== text) {
                this._text = text;
                this.dirty = true;
                this.setLabelDirty();
            }
        }
        setFont(font) {
            if (this._font !== font) {
                this._font = font;
                this.dirty = true;
                this.setLabelDirty();
            }
        }
        setMinLabelWidth(minLabelWidth) {
            if (this._minLabelWidth !== minLabelWidth) {
                this._minLabelWidth = minLabelWidth;
                this.setLabelDirty();
            }
        }
        setMinLabelAscent(minLabelAscent) {
            if (this._minLabelAscent !== minLabelAscent) {
                this._minLabelAscent = minLabelAscent;
                this.setLabelDirty();
            }
        }
        setMinLabelDescent(minLabelDescent) {
            if (this._minLabelDescent !== minLabelDescent) {
                this._minLabelDescent = minLabelDescent;
                this.setLabelDirty();
            }
        }
    };
}

// A widget with child(ren)
// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME the return type of mixin constructors is a mess, so linter is disabled
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Parent(Base) {
    return class Parent extends Base {
        constructor() {
            super(...arguments);
            // This widget's children
            this.children = []; // XXX protected
        }
        // Called when the inherited theme of this Widget is updated. Can be
        // overridden. Propagates to children.
        updateInheritedTheme() {
            const inheritedTheme = this.getInheritedTheme();
            if (inheritedTheme !== null) {
                for (const child of this.children)
                    child.inheritTheme(inheritedTheme);
            }
        }
        // Forcefully mark layout as dirty. If overridden, original must be called.
        // Call only when absolutely neccessary, such as in a resize. Propagates to
        // children
        forceLayoutDirty() {
            super.forceLayoutDirty();
            if (this.enabled) {
                if (this.children !== null) {
                    for (const child of this.children)
                        child.forceLayoutDirty();
                }
            }
        }
    };
}

// A Variable is a Widget that contains a value of a specified type
// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME the return type of mixin constructors is a mess, so linter is disabled
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Variable(Base) {
    return class Variable extends Base {
        constructor() {
            super(...arguments);
            // The callback for when the value is changed
            this.callback = null;
            // The current value
            this._value = null; // XXX protected
        }
        get value() {
            return this._value;
        }
        set value(value) {
            this.setValue(value);
        }
        setValue(value, doCallback = true) {
            if (this._value === value)
                return;
            this._value = value;
            this.dirty = true;
            if (doCallback && this.callback !== null) {
                try {
                    this.callback(value);
                }
                catch (e) {
                    console.error('Exception in Variable callback', e);
                }
            }
        }
    };
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME I would make this class abstract, but that would prevent Mixins from
// working (see issue TypeScript#29653)
class Widget {
    // Constructor
    constructor(themeOverride, needsClear, propagatesEvents) {
        // Is this widget enabled? If it isn't, it will act as if it didn't exist
        this._enabled = true; // XXX private
        // Widget will only be drawed if dirty is true
        this.dirty = true;
        // Widget will only have the layout resolved if layoutDirty is true
        this.layoutDirty = true;
        // The current theme in use by the Widget
        this._theme = null; // XXX private
        // The inherited theme
        this.inheritedTheme = null; // XXX private
        // The resolved width and height
        this.resolvedWidth = 0;
        this.resolvedHeight = 0;
        this.needsClear = needsClear;
        this.propagatesEvents = propagatesEvents;
        this.themeOverride = themeOverride;
    }
    // Called when the inherited theme of this Widget is updated. Can be
    // overridden. Does nothing by default
    updateInheritedTheme() { } // XXX protected
    // Update this widget's current theme, with theme override set up. Must not
    // be overridden
    updateTheme() {
        if (this.themeOverride === null)
            this._theme = this.inheritedTheme;
        else {
            this.themeOverride.fallback = this.inheritedTheme;
            this._theme = this.themeOverride;
        }
    }
    // The current theme in use by the Widget. If there is no theme, throws an
    // exception
    get theme() {
        if (this._theme === null)
            throw 'Widget theme is not ready';
        return this._theme;
    }
    // Is this widget enabled?
    get enabled() {
        return this._enabled;
    }
    // Enable this widget
    enable() {
        if (!this._enabled) {
            this._enabled = true;
            this.layoutDirty = true;
            this.dirty = true;
        }
    }
    // Disable this widget
    disable() {
        if (this._enabled) {
            this._enabled = false;
            this.layoutDirty = true;
            this.dirty = false;
        }
    }
    // Set the theme override of this widget. Should not be overridden, but can
    // be. If overridden, the original method should still be called.
    setThemeOverride(theme) {
        // Abort if theme hasn't changed
        if (this.themeOverride === theme)
            return;
        this.themeOverride = theme;
        this.updateTheme();
        if (this._enabled) {
            this.layoutDirty = true;
            this.dirty = true;
        }
    }
    // Get the theme override of this widget. Must not be overridden
    getThemeOverride() {
        return this.themeOverride;
    }
    // Set the inherited theme of this Widget. Should not be overridden, but can
    // be. If overridden, the original method should still be called.
    inheritTheme(theme) {
        // Abort if theme hasn't changed
        if (this.inheritedTheme === theme)
            return;
        this.inheritedTheme = theme;
        this.updateInheritedTheme();
        this.updateTheme();
        if (this._enabled) {
            this.layoutDirty = true;
            this.dirty = true;
        }
    }
    // Get the inherited theme of this widget. Must not be overridden
    getInheritedTheme() {
        return this.inheritedTheme;
    }
    // Called when a focus type owned by this Widget has been dropped. Does
    // nothing by default. Can be overridden
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onFocusDropped(_focusType, _root) { }
    // Widget event handling callback. If the event is to be captured, the
    // capturer is returned, else, null. By default, this will do nothing and
    // capture the event if it is targetted at itself or is a PointerEvent.
    // Should be overridden
    handleEvent(event, _width, _height, _root) {
        if (event.target === this ||
            ((event instanceof PointerEvent) && (event.target === null)))
            return this;
        else
            return null;
    }
    // Called when an event is passed to the Widget. Checks if the target
    // matches the Widget, unless the Widget propagates events, or if the event
    // is a PointerEvent and is in the bounds of the Widget. If neither of the
    // conditions are true, the event is not captured (null is returned), else,
    // the handleEvent method is called and its result is returned. Must not be
    // overridden
    dispatchEvent(event, width, height, root) {
        if (!this._enabled)
            return null;
        if (event.target === null) {
            if (event instanceof PointerEvent) {
                if (event.x < 0 || event.y < 0 || event.x >= width || event.y >= height)
                    return null;
            }
        }
        else if (event.target !== this && !this.propagatesEvents)
            return null;
        return this.handleEvent(event, width, height, root);
    }
    // Does nothing by default. Should be implemented
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handlePreLayoutUpdate(_root) { }
    // Called before the layout is resolved. Calls its handler if widget is
    // enabled. Must not be implemented
    preLayoutUpdate(root) {
        if (this._enabled)
            this.handlePreLayoutUpdate(root);
    }
    // Widget layout resolution callbacks. handlePopulateLayout is called on the
    // first stage, which fills the layout context with what the Widget wants in
    // terms of layout, while handleResolveLayout is called on the second stage,
    // where the final width and height are resolved. Must be implemented
    // XXX I would make these abstract, but Typescript has a bug that prevents
    // Mixins from being constrained to abstract classes, so this would prevent
    // Mixins like Clickable from existing. See issue #29653:
    // https://github.com/microsoft/TypeScript/issues/29653
    handlePopulateLayout(_layoutCtx) {
        throw new Error('Widget.handlePopulateLayout not implemented');
    }
    handleResolveLayout(_layoutCtx) {
        throw new Error('Widget.handleResolveLayout not implemented');
    }
    // Wrappers for handlePopulateLayout and handleResolveLayout. Only call
    // callbacks when the layout is dirty, except when populating. If the layout
    // was dirty and is resolved, the dirty flag is also set (used for
    // painting). Must not be overridden
    populateLayout(layoutCtx) {
        if (!this._enabled)
            return;
        this.handlePopulateLayout(layoutCtx);
    }
    resolveLayout(layoutCtx) {
        if (!this._enabled) {
            this.resolvedWidth = 0;
            this.resolvedHeight = 0;
            this.layoutDirty = false;
            return;
        }
        if (this.layoutDirty) {
            const oldWidth = this.resolvedWidth;
            const oldHeight = this.resolvedHeight;
            this.handleResolveLayout(layoutCtx);
            this.layoutDirty = false;
            if (oldWidth !== this.resolvedWidth || oldHeight !== this.resolvedHeight)
                this.dirty = true;
            //console.log('Resolved layout of', this.constructor.name);
        }
    }
    // Forcefully mark layout as dirty. If overridden, original must be called.
    // Call only when absolutely neccessary, such as in a resize
    forceLayoutDirty() {
        if (this._enabled) {
            this.layoutDirty = true;
            this.dirty = true;
        }
    }
    // Does nothing by default. Should be implemented
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handlePostLayoutUpdate(_root) { }
    // Called after the layout is resolved. Calls its handler if widget is
    // enabled. Must not be implemented
    postLayoutUpdate(root) {
        if (this._enabled)
            this.handlePostLayoutUpdate(root);
    }
    // Paiting utility: clears background of widget. Should not be overridden
    clear(x, y, width, height, ctx) {
        ctx.save();
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = this.theme.getFill(ThemeProperty.CanvasFill);
        ctx.beginPath();
        // These are rounded because clipping and filling doesn't
        // work properly with decimal points
        ctx.rect(Math.trunc(x), Math.trunc(y), Math.ceil(width), Math.ceil(height));
        ctx.clip();
        ctx.fill();
        ctx.restore();
    }
    // Widget painting callback. By default does nothing. Do painting logic here
    // when extending Widget. Should be overridden
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handlePainting(_x, _y, _width, _height, _ctx) { } // XXX protected
    // Called when the Widget is dirty and the Root is being rendered. Does
    // nothing if dirty flag is not set, else, clears the background if
    // needsClear is true, calls the handlePainting method and unsets the dirty
    // flag. Must not be overridden
    paint(x, y, width, height, ctx) {
        if (!this.dirty)
            return;
        //console.log('Painted', this.constructor.name);
        if (this._enabled) {
            if (this.needsClear)
                this.clear(x, y, width, height, ctx);
            ctx.save();
            this.handlePainting(x, y, width, height, ctx);
            ctx.restore();
        }
        this.dirty = false;
    }
}

class ParentWidget extends Parent(Widget) {
    constructor(themeOverride, needsClear, propagatesEvents, children) {
        super(themeOverride, needsClear, propagatesEvents);
        for (const child of children)
            this.children.push(child);
    }
}

class SingleParentWidget extends ParentWidget {
    constructor(themeOverride, needsClear, propagatesEvents, child) {
        super(themeOverride, needsClear, propagatesEvents, [child]);
    }
    getChild() {
        return this.children[0];
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class BaseContainer extends SingleParentWidget {
    // A widget that contains a single child widget with padding and alignment
    // and may or may not propagate events to that child
    constructor(child, propagateEvents, themeOverride = null) {
        // Containers clear their own background, have a child and propagate
        // events
        super(themeOverride, false, propagateEvents, child);
        // Is the container's whole background dirty (including padding)?
        this.backgroundDirty = true; // XXX protected
    }
    handleEvent(event, width, height, root) {
        // Correct pointer events for padding
        const [vpl, vpr, vpt, vpb] = this.calcChildViewport(0, 0, width, height);
        if (event instanceof PointerEvent)
            event = event.correctOffset(vpl, vpt);
        // Dispatch event to child
        return this.getChild().dispatchEvent(event, vpr - vpl, vpb - vpt, root);
    }
    handlePreLayoutUpdate(root) {
        // Pre-layout update child
        const child = this.getChild();
        child.preLayoutUpdate(root);
        // If child's layout is dirty, set self's layout as dirty
        if (child.layoutDirty)
            this.layoutDirty = true;
    }
    handlePostLayoutUpdate(root) {
        // Post-layout update child
        const child = this.getChild();
        child.postLayoutUpdate(root);
        // If child is dirty, set self as dirty
        if (child.dirty)
            this.dirty = true;
    }
    forceLayoutDirty() {
        this.backgroundDirty = true;
        super.forceLayoutDirty();
    }
    handlePopulateLayout(layoutCtx) {
        // Setup temporary context with reduced maxWidth or maxHeight
        // XXX This is extremely hacky, but it's the only way I could think of
        // doing padding properly
        const padding = this.theme.getPadding(ThemeProperty.ContainerPadding);
        let maxWidth = layoutCtx.maxWidth;
        const hPadding = padding.left + padding.right;
        if (layoutCtx.vertical)
            maxWidth -= hPadding;
        let maxHeight = layoutCtx.maxHeight;
        const vPadding = padding.top + padding.bottom;
        if (!layoutCtx.vertical)
            maxHeight -= vPadding;
        const tempContext = new LayoutContext(maxWidth, maxHeight, layoutCtx.vertical);
        // Populate temporary context with what child wants
        this.getChild().populateLayout(tempContext);
        // Add container box to outer context's basis, with padding
        layoutCtx.addBasis(tempContext.hBasis + hPadding, tempContext.vBasis + vPadding);
        // Merge other properties from temporary context to outer context
        layoutCtx.hFlex += tempContext.hFlex;
        layoutCtx.vFlex += tempContext.vFlex;
        // Expand maxWidth and maxHeight if needed
        const candidateMaxWidth = tempContext.hBasis + hPadding;
        if (candidateMaxWidth > layoutCtx.maxWidth)
            layoutCtx.maxWidth = candidateMaxWidth;
        const candidateMaxHeight = tempContext.vBasis + vPadding;
        if (candidateMaxHeight > layoutCtx.maxHeight)
            layoutCtx.maxHeight = candidateMaxHeight;
    }
    handleResolveLayout(layoutCtx) {
        // Setup temporary context again by cloning outer context, but use a
        // reduced maxWidth or maxHeight
        const padding = this.theme.getPadding(ThemeProperty.ContainerPadding);
        const hPadding = padding.left + padding.right;
        let maxWidth = layoutCtx.maxWidth;
        if (layoutCtx.vertical)
            maxWidth -= hPadding;
        const vPadding = padding.top + padding.bottom;
        let maxHeight = layoutCtx.maxHeight;
        if (!layoutCtx.vertical)
            maxHeight -= vPadding;
        const tempCtx = layoutCtx.clone();
        tempCtx.maxWidth = maxWidth;
        tempCtx.maxHeight = maxHeight;
        // Resolve layout of child with temporary context
        const child = this.getChild();
        child.resolveLayout(tempCtx);
        const newWidth = child.resolvedWidth;
        const newHeight = child.resolvedHeight;
        if (isNaN(newWidth) || isNaN(newHeight) || newWidth < 0 || newHeight < 0) {
            console.error('Child resolved to invalid dimensions:', newWidth, newHeight, child);
            throw new Error('Child resolved to invalid dimensions');
        }
        // Set outer context's sizeChanged flag if needed
        if (tempCtx.sizeChanged)
            layoutCtx.sizeChanged = true;
        // Container's resolved dimensions are the child's with padding added
        const oldWidth = this.resolvedWidth;
        const oldHeight = this.resolvedHeight;
        this.resolvedWidth = newWidth + hPadding;
        this.resolvedHeight = newHeight + vPadding;
        // If dimensions changed, mark background as dirty
        if (oldWidth !== this.resolvedWidth || oldHeight !== this.resolvedHeight)
            this.backgroundDirty = true;
    }
    handlePainting(x, y, width, height, ctx) {
        // Clear background if it is dirty
        if (this.backgroundDirty)
            this.clear(x, y, width, height, ctx);
        this.backgroundDirty = false;
        // Paint child
        const [left, right, top, bottom] = this.calcChildViewport(x, y, width, height);
        this.getChild().paint(left, top, right - left, bottom - top, ctx);
    }
    calcChildViewport(x, y, width, height) {
        // Calculate viewport of the child (rectangle where the child widget is
        // drawed) given the position and dimensions of the container, and by
        // using its resolved dimensions, padding and alignment
        // Resolve viewport taking only padding, position and dimensions into
        // account
        const padding = this.theme.getPadding(ThemeProperty.ContainerPadding);
        let left = x + padding.left;
        let right = x + width - padding.right;
        let top = y + padding.top;
        let bottom = y + height - padding.bottom;
        // If there isn't enough space for padding, fall back to stretching
        // everything out without padding
        if (left > right || top > bottom) {
            console.warn('Not enough space for padding in Container widget! Falling back to using no padding');
            return [x, y, width, height];
        }
        // Take alignment and resolved dimensions into account for each axis.
        // Stretch alignment completely disables this behaviour, i.e. it is
        // equivalent to using no alignment, all the available space is given to
        // the child, not only the space that the child wanted
        // Horizontal axis
        const alignment = this.theme.getAlignment2D(ThemeProperty.ContainerAlignment);
        if (alignment.horizontal !== Alignment.Stretch) {
            // Get free space for this axis
            const freeSpace = (right - left) - this.resolvedWidth;
            // Ignore if free space is negative or zero, as in, the child didn't
            // even get the space they requested or just enough space
            if (freeSpace > 0) {
                // Distribute free space according to chosen alignment mode
                // XXX Couldn't this be simplified by using a ratio instead of
                // an enum?
                switch (alignment.horizontal) {
                    case Alignment.Start:
                        right -= freeSpace;
                        break;
                    case Alignment.Center:
                        left += freeSpace / 2;
                        right -= freeSpace / 2;
                        break;
                    case Alignment.End:
                        left += freeSpace;
                        break;
                }
            }
        }
        // Vertical axis
        if (alignment.vertical !== Alignment.Stretch) {
            // Same logic as above, but for vertical axis
            const freeSpace = (bottom - top) - this.resolvedHeight;
            if (freeSpace > 0) {
                switch (alignment.vertical) {
                    case Alignment.Start:
                        bottom -= freeSpace;
                        break;
                    case Alignment.Center:
                        top += freeSpace / 2;
                        bottom -= freeSpace / 2;
                        break;
                    case Alignment.End:
                        top += freeSpace;
                        break;
                }
            }
        }
        return [left, right, top, bottom];
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class Button extends Clickable(BaseContainer) {
    // A clickable container that doesn't propagate events
    constructor(child, callback = null, themeOverride = null) {
        super(child, false, themeOverride);
        this.callback = callback;
    }
    handleEvent(event, width, height, root) {
        // Abort if no callback, but still absorb events
        if (this.callback === null) {
            this.clickStateChanged = false;
            return this;
        }
        // Check if button was pressed and call callback if so
        this.handleClickEvent(event, root, [0, width, 0, height]);
        if (this.clickStateChanged && this.wasClick) {
            try {
                this.callback();
            }
            catch (e) {
                console.error('Exception in Icon callback', e);
            }
        }
        return this;
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// A Button, but overrides the canvas colour; normally a Button itself is
// invisible, but not a FilledButton
class FilledButton extends Button {
    constructor() {
        super(...arguments);
        // Theme property used for overriding the canvas colour
        this.backgroundProperty = ThemeProperty.BackgroundFill; // XXX private
        // Is the button currently forced down?
        this._forced = false; // XXX private
    }
    updateBackground() {
        var _a;
        if (this._forced)
            this.backgroundProperty = ThemeProperty.PrimaryFill;
        else {
            switch (this.clickState) {
                case ClickState.Hold:
                    this.backgroundProperty = ThemeProperty.AccentFill;
                    break;
                case ClickState.Hover:
                    this.backgroundProperty = ThemeProperty.BackgroundGlowFill;
                    break;
                default:
                    this.backgroundProperty = ThemeProperty.BackgroundFill;
                    break;
            }
        }
        // Update inherited theme
        const overrideValue = this.theme.getFill(this.backgroundProperty);
        const modifiedTheme = new Theme(new Map([
            [ThemeProperty.CanvasFill, overrideValue],
        ]), (_a = this.getInheritedTheme()) === null || _a === void 0 ? void 0 : _a.fallback);
        super.inheritTheme(modifiedTheme);
        this.backgroundDirty = true;
    }
    set forced(forced) {
        if (forced !== this._forced) {
            this._forced = forced;
            this.updateBackground();
        }
    }
    get forced() {
        return this._forced;
    }
    setThemeOverride(theme) {
        this.backgroundDirty = true;
        if (theme === null)
            return super.setThemeOverride(null);
        // Create new theme with the canvas colour set to the override's
        // background and use that as the theme override. If override doesn't
        // have the wanted property, it will throw an exception.
        try {
            const overrideValue = theme.getFill(this.backgroundProperty);
            const modifiedTheme = new Theme(new Map([
                [ThemeProperty.CanvasFill, overrideValue],
            ]));
            super.setThemeOverride(modifiedTheme);
        }
        catch (_e) {
            return super.setThemeOverride(null);
        }
    }
    inheritTheme(theme) {
        this.backgroundDirty = true;
        // Create theme with fallback to new theme with overridden canvas colour
        const canvasValue = theme.getFill(this.backgroundProperty);
        const modifiedTheme = new Theme(new Map([
            [ThemeProperty.CanvasFill, canvasValue],
        ]), theme);
        super.inheritTheme(modifiedTheme);
    }
    handlePostLayoutUpdate(root) {
        super.handlePostLayoutUpdate(root);
        if (this.dirty)
            this.backgroundDirty = true;
    }
    handleEvent(event, width, height, root) {
        const capturer = super.handleEvent(event, width, height, root);
        if (this.clickStateChanged)
            this.updateBackground();
        return capturer;
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FXIME I would make this class abstract, but that would prevent Mixins from
// working (see issue TypeScript#29653)
class FlexWidget extends Widget {
    constructor() {
        // A widget with flexbox layout resolution
        super(...arguments);
        // The flex ratio of the flexbox
        this._flexRatio = 1; // XXX private
        // The minimum main-axis and cross-axis lengths
        this._mainBasis = 0; // XXX private
        this._crossBasis = 0; // XXX private
        // Like mainBasis and crossBasis, but meant to be updated per frame. The
        // biggest of the two sets will be used
        this._internalMainBasis = 0; // XXX private
        this._internalCrossBasis = 0; // XXX private
        // The last effective mainBasis and crossBasis, aka, the last used maximum
        // between the internal and normal set of basis
        this.effectiveMainBasis = 0; // XXX private
        this.effectiveCrossBasis = 0; // XXX private
        // Growth direction of flexbox. Is it vertical? If null, it will inherit the
        // verticality of the layout context
        this._vertical = null; // XXX private
        // Was the last layout vertical or not? Never null
        this.lastVertical = true;
    }
    get flexRatio() {
        return this._flexRatio;
    }
    set flexRatio(flexRatio) {
        if (this._flexRatio !== flexRatio) {
            this._flexRatio = flexRatio;
            this.layoutDirty = true;
        }
    }
    get vertical() {
        return this._vertical;
    }
    set vertical(vertical) {
        if (this._vertical !== vertical) {
            this._vertical = vertical;
            this.layoutDirty = true;
        }
    }
    get mainBasis() {
        return this._mainBasis;
    }
    set mainBasis(mainBasis) {
        if (this._mainBasis !== mainBasis) {
            this._mainBasis = mainBasis;
            this.updateEffectiveMainBasis();
        }
    }
    get crossBasis() {
        return this._crossBasis;
    }
    set crossBasis(crossBasis) {
        if (this._crossBasis !== crossBasis) {
            this._crossBasis = crossBasis;
            this.updateEffectiveCrossBasis();
        }
    }
    get internalMainBasis() {
        return this._internalMainBasis;
    }
    set internalMainBasis(internalMainBasis) {
        if (this._internalMainBasis !== internalMainBasis) {
            this._internalMainBasis = internalMainBasis;
            this.updateEffectiveMainBasis();
        }
    }
    get internalCrossBasis() {
        return this._internalCrossBasis;
    }
    set internalCrossBasis(internalCrossBasis) {
        if (this._internalCrossBasis !== internalCrossBasis) {
            this._internalCrossBasis = internalCrossBasis;
            this.updateEffectiveCrossBasis();
        }
    }
    updateEffectiveMainBasis() {
        const effectiveMainBasis = Math.max(this._mainBasis, this._internalMainBasis);
        if (this.effectiveMainBasis !== effectiveMainBasis) {
            this.effectiveMainBasis = effectiveMainBasis;
            this.layoutDirty = true;
        }
    }
    updateEffectiveCrossBasis() {
        const effectiveCrossBasis = Math.max(this._crossBasis, this._internalCrossBasis);
        if (this.effectiveCrossBasis !== effectiveCrossBasis) {
            this.effectiveCrossBasis = effectiveCrossBasis;
            this.layoutDirty = true;
        }
    }
    handlePopulateLayout(layoutCtx) {
        var _a;
        // Add basis and flex ratio to context
        const vertical = (_a = this.vertical) !== null && _a !== void 0 ? _a : layoutCtx.vertical;
        this.lastVertical = vertical;
        if (layoutCtx.vertical === vertical) {
            if (vertical) {
                if (this._flexRatio > 0)
                    layoutCtx.vFlex += this._flexRatio;
                layoutCtx.vBasis += this.effectiveMainBasis;
                if (this.effectiveCrossBasis > layoutCtx.hBasis)
                    layoutCtx.hBasis = this.effectiveCrossBasis;
            }
            else {
                if (this._flexRatio > 0)
                    layoutCtx.hFlex += this._flexRatio;
                layoutCtx.hBasis += this.effectiveMainBasis;
                if (this.effectiveCrossBasis > layoutCtx.vBasis)
                    layoutCtx.vBasis = this.effectiveCrossBasis;
            }
        }
        else {
            if (vertical) {
                layoutCtx.hBasis += this.effectiveCrossBasis;
                if (this.effectiveMainBasis > layoutCtx.vBasis)
                    layoutCtx.vBasis = this.effectiveMainBasis;
            }
            else {
                layoutCtx.vBasis += this.effectiveCrossBasis;
                if (this.effectiveMainBasis > layoutCtx.hBasis)
                    layoutCtx.hBasis = this.effectiveMainBasis;
            }
        }
    }
    handleResolveLayout(layoutCtx) {
        var _a;
        // Length is flex ratio of available space plus minimum length.
        // If the context's verticality is different, expand fully, unless the
        // flex ratio is not set.
        let length;
        const vertical = (_a = this.vertical) !== null && _a !== void 0 ? _a : layoutCtx.vertical;
        if (layoutCtx.vertical !== vertical) {
            if (this._flexRatio > 0) {
                if (vertical)
                    length = layoutCtx.maxHeight;
                else
                    length = layoutCtx.maxWidth;
            }
            else
                length = this.effectiveMainBasis;
        }
        else {
            if (this._flexRatio > 0) {
                if (vertical)
                    length = (layoutCtx.maxHeight - layoutCtx.vBasis) * this._flexRatio / layoutCtx.vFlex;
                else
                    length = (layoutCtx.maxWidth - layoutCtx.hBasis) * this._flexRatio / layoutCtx.hFlex;
                length = this.effectiveMainBasis + Math.max(0, length);
            }
            else
                length = this.effectiveMainBasis;
        }
        if (vertical) {
            this.resolvedWidth = this.effectiveCrossBasis;
            this.resolvedHeight = length;
        }
        else {
            this.resolvedWidth = length;
            this.resolvedHeight = this.effectiveCrossBasis;
        }
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class Label extends Labelable(FlexWidget) {
    // A widget that renders a single line of text. If text is dynamic, a
    // function may be passed as the text
    constructor(text, themeOverride = null) {
        // Labels need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);
        // The text getter. If this is not null, text will be updated with the
        // return value of this callback, every update
        this.textGetter = null; // XXX private
        this.text = text;
        // Default to no flex ratio. This can be overridden
        this.flexRatio = 0;
        // Labels are always horizontal
        // XXX japanese vertical text? completely out of scope for this project,
        // but if this library is ever published it might be a good idea to add
        // support
        this.vertical = false;
    }
    set text(text) {
        if (text instanceof Function)
            this.textGetter = text;
        else
            this.setText(text);
    }
    get text() {
        if (this.textGetter !== null)
            return this.textGetter;
        else
            return this._text;
    }
    get currentText() {
        return this._text;
    }
    handlePreLayoutUpdate(_root) {
        // Update Labelable variables
        if (this.textGetter !== null)
            this.setText(this.textGetter());
        this.setFont(this.theme.getFont(ThemeProperty.BodyTextFont));
        this.setMinLabelWidth(this.theme.getSize(ThemeProperty.LabelMinWidth));
        this.setMinLabelAscent(this.theme.getSize(ThemeProperty.LabelMinAscent));
        this.setMinLabelDescent(this.theme.getSize(ThemeProperty.LabelMinDescent));
        this.internalMainBasis = this.labelWidth;
        this.internalCrossBasis = this.labelHeight;
    }
    handlePainting(x, y, _width, height, ctx) {
        ctx.font = this._font;
        ctx.fillStyle = this.theme.getFill(ThemeProperty.BodyTextFill);
        ctx.fillText(this._text, x, y + height - this.labelDescent);
    }
}

// Template for FilledButton with Label
function TextButton(text, callback = null, themeOverride = null) {
    return new FilledButton(new Label(text, themeOverride), callback, themeOverride);
}

// Template for TextButton that calls callback with keycode on click
function BasicKey(text, keyCode, keyContext, themeOverride = null) {
    return TextButton(text, () => keyContext.callback(keyCode), themeOverride);
}

// Template for backspace BasicKey
function BackspaceKey(keyContext, themeOverride = null) {
    return BasicKey('Backspace', 'Backspace', keyContext, themeOverride);
}

// Template for enter BasicKey
function EnterKey(keyContext, themeOverride = null) {
    return BasicKey('Enter', 'Enter', keyContext, themeOverride);
}

// Template for escape BasicKey
function EscapeKey(keyContext, themeOverride = null) {
    return BasicKey('Esc', 'Escape', keyContext, themeOverride);
}

// Template for TextButton that calls callback with glyph or alternative glyph
// depending on key context on click
function GlyphKey(glyph, altGlyph = null, keyContext, themeOverride = null) {
    if (altGlyph === null)
        altGlyph = glyph;
    function getGlyph() {
        if (keyContext.shift) {
            if (altGlyph === null)
                return glyph;
            else
                return altGlyph;
        }
        else
            return glyph;
    }
    return TextButton(getGlyph, () => keyContext.callback(getGlyph()), themeOverride);
}

// Template for TextButton that calls callback with 'Shift' and updates key
// context accordingly on click
function ShiftKey(keyContext, themeOverride = null) {
    const virtualKey = TextButton('Shift', () => {
        keyContext.shift = !keyContext.shift;
        virtualKey.forced = keyContext.shift;
        keyContext.callback('Shift');
    }, themeOverride);
    virtualKey.forced = keyContext.shift;
    return virtualKey;
}

// Template for space BasicKey
function SpaceKey(keyContext, themeOverride = null) {
    return BasicKey('Space', ' ', keyContext, themeOverride);
}

class MultiParentWidget extends ParentWidget {
    constructor(themeOverride, needsClear, propagatesEvents, children) {
        super(themeOverride, needsClear, propagatesEvents, children);
    }
    // Add child(ren) to widget. Chainable method
    add(children) {
        if (Array.isArray(children)) {
            for (const child of children)
                this.children.push(child);
        }
        else
            this.children.push(children);
        this.updateInheritedTheme();
        this.layoutDirty = true;
        this.dirty = true;
        return this;
    }
    // Remove child(ren) from widget. Chainable method
    remove(children) {
        if (Array.isArray(children)) {
            for (const child of children) {
                const pos = this.children.indexOf(child);
                if (pos !== -1)
                    this.children.splice(pos, 1);
            }
        }
        else {
            const pos = this.children.indexOf(children);
            if (pos !== -1)
                this.children.splice(pos, 1);
        }
        this.updateInheritedTheme();
        this.layoutDirty = true;
        this.dirty = true;
        return this;
    }
    // Clear widget's children. Chainable method
    clearChildren() {
        this.children.length = 0;
        this.layoutDirty = true;
        this.dirty = true;
        return this;
    }
    // Get number of children
    getChildCount() {
        return this.children.length;
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class MultiContainer extends MultiParentWidget {
    // A widget that contains multiple child widgets and grows along a specified
    // axis
    constructor(vertical, themeOverride = null) {
        // MultiContainers clear their own background, have children and
        // propagate events
        super(themeOverride, false, true, []);
        // Is the container's whole background dirty (including spacing)?
        this.backgroundDirty = true; // XXX private
        // Temporary layout context for layout resolution
        this.innerContext = null; // XXX private
        this.vertical = vertical;
    }
    handleEvent(event, width, height, root) {
        // Find which widget the event should go to
        const spacing = this.theme.getSize(ThemeProperty.ContainerSpacing);
        for (const child of this.children) {
            // Ignore disabled children
            if (!child.enabled)
                continue;
            const length = this.vertical ? child.resolvedHeight : child.resolvedWidth;
            // Dispatch to this widget
            let childWidth, childHeight;
            if (this.vertical) {
                childWidth = width;
                childHeight = length;
            }
            else {
                childWidth = length;
                childHeight = height;
            }
            // Stop if event was captured
            const captured = child.dispatchEvent(event, childWidth, childHeight, root);
            if (captured !== null)
                return captured;
            // Correct event position and offset for next widget if event has
            // position
            if (event instanceof PointerEvent) {
                if (this.vertical)
                    event = event.correctOffset(0, length + spacing);
                else
                    event = event.correctOffset(length + spacing, 0);
            }
        }
        // Event wasn't dispatched to any child
        return null;
    }
    handlePreLayoutUpdate(root) {
        // Pre-layout update children
        let forceLayout = false;
        for (const child of this.children) {
            child.preLayoutUpdate(root);
            // If child's layout is dirty, layout must be forced as dirty, as
            // sibling might need to be resized due to flex ratios
            if (child.layoutDirty)
                forceLayout = true;
        }
        if (forceLayout)
            this.forceLayoutDirty();
    }
    handlePostLayoutUpdate(root) {
        // Post-layout update children
        for (const child of this.children) {
            child.postLayoutUpdate(root);
            // If child is dirty, set own dirty flag
            if (child.dirty)
                this.dirty = true;
        }
    }
    forceLayoutDirty() {
        this.backgroundDirty = true;
        super.forceLayoutDirty();
    }
    handlePopulateLayout(layoutCtx) {
        // Setup context. Use inner context if verticality is different
        const usingInlineContext = (this.vertical === layoutCtx.vertical);
        let usedContext;
        if (usingInlineContext)
            usedContext = layoutCtx;
        else {
            this.innerContext = new LayoutContext(layoutCtx.maxWidth, layoutCtx.maxHeight, this.vertical);
            usedContext = this.innerContext;
        }
        // Populate layout with what children want
        for (const child of this.children)
            child.populateLayout(usedContext);
        // Add spacing to main basis
        const childrenCount = this.children.length;
        const spacing = this.theme.getSize(ThemeProperty.ContainerSpacing);
        if (childrenCount > 1 && spacing > 0) {
            const totalSpacing = spacing * (childrenCount - 1);
            if (usedContext.vertical)
                usedContext.vBasis += totalSpacing;
            else
                usedContext.hBasis += totalSpacing;
        }
        // Add container box to outer context's basis
        if (!usingInlineContext)
            layoutCtx.addBasis(usedContext.hBasis, usedContext.vBasis);
        // Expand maxWidth and maxHeight if needed
        if (usedContext.hBasis > layoutCtx.maxWidth)
            layoutCtx.maxWidth = usedContext.hBasis;
        if (usedContext.vBasis > layoutCtx.maxHeight)
            layoutCtx.maxHeight = usedContext.vBasis;
    }
    handleResolveLayout(layoutCtx) {
        // Update inner context's maximum dimensions. It's the outer maximum
        // dimensions
        const usingInlineContext = (this.vertical === layoutCtx.vertical);
        let usedContext;
        if (usingInlineContext)
            usedContext = layoutCtx;
        else {
            usedContext = this.innerContext;
            if (usedContext === null)
                throw 'Unexpected null innerContext';
            if (layoutCtx.maxWidth > usedContext.maxWidth)
                usedContext.maxWidth = layoutCtx.maxWidth;
            if (layoutCtx.maxHeight > usedContext.maxHeight)
                usedContext.maxHeight = layoutCtx.maxHeight;
        }
        // Resolve children and calculate biggest dimensions and cumulative
        // dimensions
        let widthMax = 0, heightMax = 0, widthSum = 0, heightSum = 0, count = 0;
        for (const child of this.children) {
            // Ignore disabled children, but count and resolve enabled
            if (!child.enabled) {
                // Just so that disabled child gets their layout marked as clean
                child.resolveLayout(usedContext);
                continue;
            }
            count++;
            // Resolve child
            const oldWidth = child.resolvedWidth;
            const oldHeight = child.resolvedHeight;
            child.resolveLayout(usedContext);
            const newWidth = child.resolvedWidth;
            const newHeight = child.resolvedHeight;
            if (isNaN(newWidth) || isNaN(newHeight) || newWidth < 0 || newHeight < 0) {
                console.error('Child resolved to invalid dimensions:', newWidth, newHeight, child);
                throw new Error('Child resolved to invalid dimensions');
            }
            // Check if child's size changed. Ignore cross-axis length, this
            // check is done with the container's cross-length itself
            if (this.vertical) {
                if (newHeight !== oldHeight)
                    usedContext.sizeChanged = true;
            }
            else if (newWidth !== oldWidth)
                usedContext.sizeChanged = true;
            // Find max and sum of widths and heights
            widthSum += newWidth;
            if (newWidth > widthMax)
                widthMax = newWidth;
            heightSum += newHeight;
            if (newHeight > heightMax)
                heightMax = newHeight;
        }
        // Set outer context's sizeChanged flag if inner context's flag was set
        if (!usingInlineContext && usedContext.sizeChanged)
            layoutCtx.sizeChanged = true;
        // Clear inner context
        this.innerContext = null;
        // Dimensions are bounding box of combined resolved children plus
        // spacing
        const spacing = this.theme.getSize(ThemeProperty.ContainerSpacing);
        let totalSpacing = 0;
        if (count > 1 && spacing > 0)
            totalSpacing = spacing * (count - 1);
        // Container's resolved dimensions are the biggest child's cross length
        // and cumulative length with padding
        if (this.vertical) {
            this.resolvedWidth = widthMax;
            this.resolvedHeight = heightSum + totalSpacing;
        }
        else {
            this.resolvedWidth = widthSum + totalSpacing;
            this.resolvedHeight = heightMax;
        }
    }
    handlePainting(x, y, width, height, ctx) {
        // Clear background if never cleared before and there is spacing
        const spacing = this.theme.getSize(ThemeProperty.ContainerSpacing);
        if (this.backgroundDirty && spacing > 0)
            this.clear(x, y, width, height, ctx);
        this.backgroundDirty = false;
        // Calculate helper variables
        const mainAxisMax = this.vertical ? (y + height) : (x + width);
        // Paint children
        for (const child of this.children) {
            // Ignore disabled children
            if (!child.enabled)
                continue;
            // Figure out child width and height and clamp if needed
            let childW, childH;
            let tooBig = false;
            if (this.vertical) {
                childW = width;
                childH = child.resolvedHeight;
                if (y + childH > mainAxisMax) {
                    tooBig = true;
                    childH = mainAxisMax - y;
                }
            }
            else {
                childW = child.resolvedWidth;
                childH = height;
                if (x + childW > mainAxisMax) {
                    tooBig = true;
                    childW = mainAxisMax - x;
                }
            }
            // Paint child
            child.paint(x, y, childW, childH, ctx);
            // Stop paiting if this child couldn't fit fully in the container
            if (tooBig)
                console.warn('MultiContainer overflow, children may be painted with 0 length');
            // Increment position in growth direction, with spacing
            if (this.vertical)
                y += childH + spacing;
            else
                x += childW + spacing;
        }
    }
}

// Template for vertical MultiContainer
function Column(themeOverride = null) {
    return new MultiContainer(true, themeOverride);
}

// Template for horizontal MultiContainer
function Row(themeOverride = null) {
    return new MultiContainer(false, themeOverride);
}

// Template for a Row of virtual keys (BasicKey, ShiftKey, GlyphKey, etc...).
// Generates given a template
function KeyRow(rowTemplate, keyContext, themeOverride = null) {
    const row = Row(themeOverride);
    for (const entry of rowTemplate) {
        if (typeof entry === 'function') {
            // Entry is in template function format
            const templateFunction = entry;
            row.add(templateFunction(keyContext, themeOverride));
        }
        else if (typeof entry[0] === 'string' && typeof entry[1] === 'string') {
            // Entry is in multiple glyphs format
            const glyphs = entry[0];
            const altGlyphs = entry[1];
            for (let i = 0; i < glyphs.length; i++) {
                let altGlyph = null;
                if (i < altGlyphs.length)
                    altGlyph = altGlyphs[i];
                row.add(GlyphKey(glyphs[i], altGlyph, keyContext, themeOverride));
            }
        }
        else {
            throw new Error(`Unknown virtual key row template format for entry: ${entry}`);
        }
    }
    return row;
}

const defaultVirtualKeyboardTemplate = [
    // First row
    [['`1234567890-=', '~!@#$%^&*()_+']],
    // Second row
    [['qwertyuiop[]\\', 'QWERTYUIOP{}|']],
    // Third row
    [['asdfghjkl;\'', 'ASDFGHJKL:"'], EnterKey],
    // Fourth row
    [ShiftKey, ['zxcvbnm,./', 'ZXCVBNM<>?']],
    // Fifth row
    [BackspaceKey, SpaceKey, EscapeKey],
];
// Template for entire virtual keyboard, which is a Column of KeyRows sharing a
// key context. If no keyboard template is given, the default QUERTY one is used
function VirtualKeyboard(keyContext, keyboardTemplate = null, themeOverride = null) {
    if (keyboardTemplate === null)
        keyboardTemplate = defaultVirtualKeyboardTemplate;
    const column = Column(themeOverride);
    for (const rowTemplate of keyboardTemplate)
        column.add(KeyRow(rowTemplate, keyContext, themeOverride));
    return column;
}

class Container extends BaseContainer {
    // A BaseContainer that propagates events
    constructor(child, themeOverride = null) {
        super(child, true, themeOverride);
    }
}

// Template for Container with no padding and center alignment on both axis
function Center(child) {
    const themeOverride = new Theme(new Map([
        [
            ThemeProperty.ContainerAlignment,
            {
                horizontal: Alignment.Center, vertical: Alignment.Center,
            },
        ],
        [
            ThemeProperty.ContainerPadding,
            {
                left: 0, right: 0, top: 0, bottom: 0,
            },
        ],
    ]));
    return new Container(child, themeOverride);
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME I would make this class abstract, but that would prevent Mixins from
// working (see issue TypeScript#29653)
class BoxWidget extends Widget {
    constructor() {
        // A widget with simple box layout resolution
        super(...arguments);
        // The wanted box width and height
        this._boxWidth = 0; // XXX private
        this._boxHeight = 0; // XXX private
    }
    get boxWidth() {
        return this._boxWidth;
    }
    set boxWidth(boxWidth) {
        if (this._boxWidth !== boxWidth) {
            this._boxWidth = boxWidth;
            this.layoutDirty = true;
        }
    }
    get boxHeight() {
        return this._boxHeight;
    }
    set boxHeight(boxHeight) {
        if (this._boxHeight !== boxHeight) {
            this._boxHeight = boxHeight;
            this.layoutDirty = true;
        }
    }
    handlePopulateLayout(layoutCtx) {
        layoutCtx.addBasis(this._boxWidth, this._boxHeight);
    }
    handleResolveLayout(_layoutCtx) {
        this.resolvedWidth = this._boxWidth;
        this.resolvedHeight = this._boxHeight;
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class Checkbox extends Clickable(Variable(BoxWidget)) {
    constructor(callback = null, initialValue = false, themeOverride = null) {
        // Checkboxes need a clear background, have no children and don't
        // propagate events
        super(themeOverride, true, false);
        // Save callback and initial value
        this.callback = callback;
        this._value = initialValue;
    }
    getBoxRect(x, y, width, height) {
        // Find actual length
        const length = this.theme.getSize(ThemeProperty.CheckboxLength);
        const actualLength = Math.min(length, width, height);
        // Find offset
        const bx = x + (width - actualLength) / 2;
        const by = y + (height - actualLength) / 2;
        return [bx, bx + actualLength, by, by + actualLength];
    }
    handleEvent(event, width, height, root) {
        // Check if checkbox rectangle was pressed and swap value if so
        const clickArea = this.getBoxRect(0, 0, width, height);
        this.handleClickEvent(event, root, clickArea);
        if (this.clickStateChanged && this.wasClick)
            this.value = !this.value;
        return this;
    }
    handlePreLayoutUpdate(_root) {
        // Update box width and height from checkbox length
        const length = this.theme.getSize(ThemeProperty.CheckboxLength);
        this.boxWidth = length;
        this.boxHeight = length;
    }
    handlePainting(x, y, width, height, ctx) {
        // Find checkbox rect
        const [bx, br, by, _bb] = this.getBoxRect(x, y, width, height);
        const actualLength = br - bx;
        // Should we use glow colours? (background glow and accent)
        const useGlow = [ClickState.Hover, ClickState.Hold].includes(this.clickState);
        // Draw unchecked part of checkbox
        if (useGlow)
            ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundGlowFill);
        else
            ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundFill);
        ctx.fillRect(bx, by, actualLength, actualLength);
        // Draw checked part of checkbox
        if (this.value) {
            if (useGlow)
                ctx.fillStyle = this.theme.getFill(ThemeProperty.AccentFill);
            else
                ctx.fillStyle = this.theme.getFill(ThemeProperty.PrimaryFill);
            const innerPadding = this.theme.getSize(ThemeProperty.CheckboxInnerPadding);
            const innerLength = actualLength - innerPadding * 2;
            if (innerLength <= 0)
                ctx.fillRect(bx, by, actualLength, actualLength);
            else
                ctx.fillRect(bx + innerPadding, by + innerPadding, innerLength, innerLength);
        }
    }
}

class Spacing extends FlexWidget {
    // Expands using a flex sizing policy, but only fills things with blank
    // space. However, since this will always try to expand the UI, it might not
    // be the best solution for, for example, aligning simple components inside
    // a container. For that, use the Box component instead, with an alignment
    // mode of choice. By default will fully expand with no basis in the same
    // direction of the layout context
    constructor(flexRatio = 1, mainBasis = 0, crossBasis = 0, vertical = null, themeOverride = null) {
        // Spacing needs clear, never has children and doesn't propagate events
        super(themeOverride, true, false);
        this.flexRatio = flexRatio;
        this.mainBasis = mainBasis;
        this.crossBasis = crossBasis;
        this.vertical = vertical;
    }
}

// Template for Row with a Label, Spacing and a Checkbox
function LabelledCheckbox(text, callback = null, initialValue = false, themeOverride = null) {
    return Row(themeOverride).add([
        new Label(text, themeOverride),
        new Spacing(1, 0, 0, false, themeOverride),
        new Checkbox(callback, initialValue, themeOverride),
    ]);
}

// Container template like Center, but with default padding which acts as a
// margin for the child widget
function Margin(child) {
    const themeOverride = new Theme(new Map([
        [
            ThemeProperty.ContainerAlignment,
            {
                horizontal: Alignment.Center, vertical: Alignment.Center,
            },
        ],
    ]));
    return new Container(child, themeOverride);
}

class DebugTheme extends Theme {
    constructor(fallback) {
        super(new Map(), fallback);
    }
    getFill(themeProperty) {
        // Always return a random fill color if the original method didn't throw
        // an exception
        void super.getFill(themeProperty);
        return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    }
}
const debugTheme = new DebugTheme(defaultTheme);

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class Icon extends Clickable(BoxWidget) {
    // A widget that renders an image. Optionally, this can act as a button by
    // having a callback set. Aspect ratio of the wanted size is preserved.
    // viewBox may be passed to only draw a section of the image. It can also
    // be transformed
    constructor(image, width = null, height = null, viewBox = null, callback = null, themeOverride = null) {
        // Icons need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);
        // The last source that the current image was using
        this.lastSrc = null; // XXX private
        // The image rotation in radians
        this._rotation = 0; // XXX private
        this.image = image;
        this.width = width;
        this.height = height;
        this.viewBox = viewBox;
        this.callback = callback;
        this.updateDimensions();
    }
    updateDimensions() {
        let wantedWidth = this.width;
        if (wantedWidth === null) {
            if (this.viewBox === null)
                wantedWidth = this.image.width;
            else
                wantedWidth = this.viewBox[2];
        }
        if (this.boxWidth !== wantedWidth)
            this.boxWidth = wantedWidth;
        let wantedHeight = this.height;
        if (wantedHeight === null) {
            if (this.viewBox === null)
                wantedHeight = this.image.height;
            else
                wantedHeight = this.viewBox[3];
        }
        if (this.boxHeight !== wantedHeight)
            this.boxHeight = wantedHeight;
    }
    setImage(image) {
        if (image !== this.image) {
            this.image = image;
            this.lastSrc = null;
        }
    }
    getIconRect(x, y, width, height) {
        // Find icon rectangle, preserving aspect ratio
        const widthRatio = width / this.boxWidth;
        const heightRatio = height / this.boxHeight;
        const scale = Math.min(widthRatio, heightRatio);
        const iconWidth = this.boxWidth * scale;
        const iconHeight = this.boxHeight * scale;
        return [
            x + (width - iconWidth) / 2,
            y + (height - iconHeight) / 2,
            iconWidth,
            iconHeight,
        ];
    }
    handleEvent(event, width, height, root) {
        // If there is a callback, check if icon was pressed and do callback if
        // so
        if (this.callback === null) {
            // Drop pointer focus on this component since there is no callback
            root.dropFocus(FocusType.Pointer, this);
            return this;
        }
        const [x, y, w, h] = this.getIconRect(0, 0, width, height);
        this.handleClickEvent(event, root, [x, x + w, y, y + h]);
        if (this.clickStateChanged && this.wasClick) {
            try {
                this.callback();
            }
            catch (e) {
                console.error('Exception in Icon callback', e);
            }
        }
        return this;
    }
    handlePreLayoutUpdate(_root) {
        var _a, _b;
        // Icons only needs to be re-drawn if image changed, which is tracked by
        // the image setter, or if the source changed, but not if the icon isn't
        // loaded yet
        if (((_a = this.image) === null || _a === void 0 ? void 0 : _a.src) !== this.lastSrc && ((_b = this.image) === null || _b === void 0 ? void 0 : _b.complete))
            this.dirty = true;
        // Update dimensions, in case the width or height were changed
        this.updateDimensions();
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(rotation) {
        if (rotation !== this._rotation) {
            this._rotation = rotation;
            this.dirty = true;
        }
    }
    handlePainting(x, y, width, height, ctx) {
        var _a;
        // Abort if icon isn't ready yet
        if (!((_a = this.image) === null || _a === void 0 ? void 0 : _a.complete)) {
            this.lastSrc = null;
            return;
        }
        // Mark as not needing to be drawn by setting the source
        this.lastSrc = this.image.src;
        const [dx, dy, dw, dh] = this.getIconRect(x, y, width, height);
        let tdx = dx, tdy = dy;
        // Translate and rotate if rotation is not 0
        if (this.rotation !== 0) {
            ctx.save();
            ctx.translate(dx + dw / 2, dy + dh / 2);
            tdx = -dw / 2;
            tdy = -dh / 2;
            ctx.rotate(this.rotation);
        }
        // Draw image, with viewBox if it is not null
        // XXX I would use the spread operator, but it seems to break with
        // TypeScript. It works fine with vanilla JS, not sure what the cause
        // is, probably a bug?
        if (this.viewBox === null)
            ctx.drawImage(this.image, tdx, tdy, dw, dh);
        else {
            const [sx, sy, sw, sh] = this.viewBox;
            ctx.drawImage(this.image, sx, sy, sw, sh, tdx, tdy, dw, dh);
        }
        // Revert transformation
        if (this.rotation !== 0)
            ctx.restore();
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class PassthroughWidget extends SingleParentWidget {
    // A widget that contains a single child and acts as if it doesn't exist,
    // passing all events through to its child. Useful for Widgets that are only
    // used for logic
    constructor(child, themeOverride = null) {
        // Passthrough widgets dont need a clear background, have a child and
        // propagate events
        super(themeOverride, false, true, child);
    }
    handleEvent(event, width, height, root) {
        // Dispatch event to child
        return this.getChild().dispatchEvent(event, width, height, root);
    }
    handlePreLayoutUpdate(root) {
        // Pre-layout update child
        const child = this.getChild();
        child.preLayoutUpdate(root);
        // If child's layout is dirty, set self's layout as dirty
        if (child.layoutDirty)
            this.layoutDirty = true;
    }
    handlePostLayoutUpdate(root) {
        // Post-layout update child
        const child = this.getChild();
        child.postLayoutUpdate(root);
        // If child is dirty, set self as dirty
        if (child.dirty)
            this.dirty = true;
    }
    handlePopulateLayout(layoutCtx) {
        // Populate child's layout
        this.getChild().populateLayout(layoutCtx);
    }
    handleResolveLayout(layoutCtx) {
        // Resolve child's layout and set own resolved dimensions to be equal to
        // the child's
        const child = this.getChild();
        child.resolveLayout(layoutCtx);
        this.resolvedWidth = child.resolvedWidth;
        this.resolvedHeight = child.resolvedHeight;
    }
    handlePainting(x, y, width, height, ctx) {
        // Paint child
        this.getChild().paint(x, y, width, height, ctx);
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class ViewportWidget extends Parent(FlexWidget) {
    // A widget which has a single child bigger than itself. To achieve this,
    // the child is rendered in a dedicated canvas.
    constructor(child, mainBasisTied = false, crossBasisTied = false, themeOverride = null) {
        // Viewport clears its own background, has a single child and propagates
        // events
        super(themeOverride, false, true);
        // Offset of child. Positional events will take this into account, as well
        // as rendering. Useful for implementing scrolling.
        this._offset = [0, 0]; // XXX private
        // Layout context used by child. Can be null if no layout update required
        this.lastChildLayoutCtx = null;
        // What were the last dimensions of the viewport widget? Useful for
        // scrolling
        this.lastViewportDims = [0, 0];
        this.viewport = new Viewport();
        this.mainBasisTied = mainBasisTied;
        this.crossBasisTied = crossBasisTied;
        this.children.push(child);
    }
    get canvasDimensions() {
        return this.viewport.canvasDimensions;
    }
    get offset() {
        return [...this._offset];
    }
    set offset(offset) {
        if (this._offset[0] !== offset[0] || this._offset[1] !== offset[1]) {
            this._offset = offset;
            this.dirty = true;
        }
    }
    get maxDimensions() {
        return [...this.viewport.maxDimensions];
    }
    set maxDimensions(maxDimensions) {
        const [mw, mh] = this.maxDimensions;
        if (mw !== maxDimensions[0] || mh !== maxDimensions[1])
            this.viewport.maxDimensions = maxDimensions;
    }
    get dimensions() {
        // Get child's width and height, cropping to maximum dimensions
        const [maxWidth, maxHeight] = this.viewport.maxDimensions;
        const child = this.getChild();
        let width = child.resolvedWidth;
        if (maxWidth > 0 && width > maxWidth)
            width = maxWidth;
        let height = child.resolvedHeight;
        if (maxHeight > 0 && height > maxHeight)
            height = maxHeight;
        return [width, height];
    }
    getChildMainBasis(vertical) {
        if (this.lastChildLayoutCtx === null)
            return 0;
        const innerLength = vertical ? this.lastChildLayoutCtx.hBasis
            : this.lastChildLayoutCtx.vBasis;
        if (isNaN(innerLength))
            return 0;
        return innerLength;
    }
    getChildCrossBasis(vertical) {
        return this.getChildMainBasis(!vertical);
    }
    getMaxMainBasis(vertical) {
        return vertical ? this.viewport.maxDimensions[1]
            : this.viewport.maxDimensions[0];
    }
    getMaxCrossBasis(vertical) {
        return this.getMaxMainBasis(!vertical);
    }
    handleEvent(event, _width, _height, root) {
        // Ignore events with no position and no target
        if (event.target === null && !(event instanceof PointerEvent))
            return null;
        // Drop event if it is a positional event with no target outside the
        // child's viewport
        const [innerWidth, innerHeight] = this.dimensions;
        const vpl = this.offset[0];
        const vpr = vpl + innerWidth;
        const vpt = this.offset[1];
        const vpb = vpt + innerHeight;
        if (event instanceof PointerEvent) {
            if (event.target === null) {
                if (event.x < vpl)
                    return null;
                if (event.x >= vpr)
                    return null;
                if (event.y < vpt)
                    return null;
                if (event.y >= vpb)
                    return null;
            }
            event = event.correctOffset(vpl, vpt);
        }
        // Dispatch event to child
        return this.getChild().dispatchEvent(event, vpr - vpl, vpb - vpt, root);
    }
    handlePreLayoutUpdate(root) {
        // If verticality was changed, update it and set dirty. Assume that null
        // verticality means that it's vertical as Viewports don't inherit
        // verticality
        let currentVerticality = this.vertical;
        if (currentVerticality === null)
            currentVerticality = true;
        const child = this.getChild();
        if (currentVerticality !== this.viewport.vertical) {
            this.viewport.vertical = currentVerticality;
            child.layoutDirty = true;
            child.dirty = true;
        }
        // If child's layout is dirty set self's layout as dirty
        if (child.layoutDirty)
            this.layoutDirty = true;
        else
            return;
        // Pre-layout update child
        child.preLayoutUpdate(root);
        // Populate child's layout context
        this.lastChildLayoutCtx = this.viewport.populateChildsLayout(child);
        // If a basis is tied, update internal basis to be equal to child's
        // basis, taking maximum dimensions into account
        if (this.mainBasisTied) {
            this.internalMainBasis = this.getChildMainBasis(currentVerticality);
            const maxMainBasis = this.getMaxMainBasis(currentVerticality);
            if (maxMainBasis != 0)
                this.internalMainBasis = Math.min(this.internalMainBasis, maxMainBasis);
        }
        if (this.crossBasisTied) {
            this.internalCrossBasis = this.getChildCrossBasis(currentVerticality);
            const maxCrossBasis = this.getMaxCrossBasis(currentVerticality);
            if (maxCrossBasis != 0)
                this.internalCrossBasis = Math.min(this.internalCrossBasis, maxCrossBasis);
        }
    }
    handlePostLayoutUpdate(root) {
        const child = this.getChild();
        if (this.lastChildLayoutCtx !== null) {
            // Update max dimensions if basis is tied
            const newMaxDimensions = this.maxDimensions;
            if ((this.viewport.vertical && this.crossBasisTied) || (!this.viewport.vertical && this.mainBasisTied)) {
                newMaxDimensions[0] = this.resolvedWidth;
                this.lastChildLayoutCtx.maxWidth = this.resolvedWidth;
            }
            if ((this.viewport.vertical && this.mainBasisTied) || (!this.viewport.vertical && this.crossBasisTied)) {
                newMaxDimensions[1] = this.resolvedHeight;
                this.lastChildLayoutCtx.maxHeight = this.resolvedHeight;
            }
            this.maxDimensions = newMaxDimensions;
            // Resolve child's layout
            this.viewport.resolveChildsLayout(child, this.lastChildLayoutCtx);
            // Clear layout context, no longer needed\
            this.lastChildLayoutCtx = null;
        }
        // Post-layout update child
        child.postLayoutUpdate(root);
        // If child is dirty, set self as dirty
        if (child.dirty)
            this.dirty = true;
    }
    handlePainting(x, y, width, height, ctx) {
        this.lastViewportDims = [width, height];
        // Paint child to viewport's canvas
        this.viewport.paintToCanvas(this.getChild());
        // Save context
        ctx.save();
        // Clip to drawing area
        // These are rounded because clipping and filling doesn't work properly
        // with decimal points
        const drawAreaClip = new Path2D();
        drawAreaClip.rect(Math.trunc(x), Math.trunc(y), Math.ceil(width), Math.ceil(height));
        ctx.clip(drawAreaClip);
        // Clear background
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = this.theme.getFill(ThemeProperty.CanvasFill);
        ctx.fill(drawAreaClip);
        // Draw canvas with offset in passed context
        const [innerWidth, innerHeight] = this.dimensions;
        const [xOffset, yOffset] = this.offset;
        const xDst = x + xOffset;
        const yDst = y + yOffset;
        const offsetClip = new Path2D();
        offsetClip.rect(Math.trunc(xDst), Math.trunc(yDst), Math.ceil(innerWidth), Math.ceil(innerHeight));
        ctx.clip(offsetClip);
        ctx.drawImage(this.viewport.canvas, 0, 0, innerWidth, innerHeight, xDst, yDst, innerWidth, innerHeight);
        // Restore context
        ctx.restore();
    }
    getChild() {
        return this.children[0];
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME Should this really be a flex widget? flexRatio with scrollbars
// introduce a lot of issues because they tend to expand beyond what they should
class ScrollBar extends Clickable(Variable(FlexWidget)) {
    constructor(callback = null, end = 100, barLength = 100, initialValue = 0, themeOverride = null) {
        // Scrollbars need a clear background, have no children and don't
        // propagate events
        super(themeOverride, true, false);
        this.callback = callback;
        this._value = initialValue;
        this._end = end;
        this._barLength = barLength;
        this.dragValue = initialValue;
    }
    get end() {
        return this._end;
    }
    set end(end) {
        if (this._end !== end) {
            this._end = end;
            this.dirty = true;
        }
    }
    get barLength() {
        return this._barLength;
    }
    set barLength(barLength) {
        if (this._barLength !== barLength) {
            this._barLength = barLength;
            this.dirty = true;
        }
    }
    setValue(value, doCallback = true) {
        super.setValue(Math.max(Math.min(this._end - this._barLength, value), 0), doCallback);
    }
    getBarRect(x, y, width, height) {
        if (this.lastVertical) {
            const thickness = Math.min(this.crossBasis, width);
            const bx = x + (width - thickness) / 2;
            return [bx, bx + thickness, y, y + height];
        }
        else {
            const thickness = Math.min(this.crossBasis, height);
            const by = y + (height - thickness) / 2;
            return [x, x + width, by, by + thickness];
        }
    }
    handleEvent(event, width, height, root) {
        // Handle click event
        this.handleClickEvent(event, root, this.getBarRect(0, 0, width, height));
        // If the bar is currently being held, update value
        if (this.clickState == ClickState.Hold && this.pointerPos !== null) {
            // Interpolate and update value, taking drag into account
            if (this.clickStateChanged) {
                // If not inside filled part of bar, snap value
                let clickVal;
                if (this.lastVertical)
                    clickVal = this.pointerPos[1] * this._end;
                else
                    clickVal = this.pointerPos[0] * this._end;
                let value = this._value;
                if (value === null)
                    value = 0;
                if (clickVal < value || clickVal >= (value + this._barLength)) {
                    value = clickVal - this._barLength / 2;
                    this.value = value;
                }
                this.dragValue = value;
            }
            else {
                if (this.startingPointerPos !== null) {
                    let dragChange;
                    if (this.lastVertical)
                        dragChange = this.pointerPos[1] - this.startingPointerPos[1];
                    else
                        dragChange = this.pointerPos[0] - this.startingPointerPos[0];
                    this.value = this.dragValue + dragChange * this._end;
                }
            }
        }
        // Always flag as dirty if the click state changed (so glow colour takes
        // effect)
        if (this.clickStateChanged)
            this.dirty = true;
        return this;
    }
    handlePreLayoutUpdate(_root) {
        // Use theme settings for thickness and forbid flex ratio
        this.flexRatio = 0;
        this.crossBasis = this.theme.getSize(ThemeProperty.ScrollBarThickness);
    }
    handlePainting(x, y, width, height, ctx) {
        // Find bar start and length percentage
        const [sl, sr, st, sb] = this.getBarRect(x, y, width, height);
        const [sw, sh] = [sr - sl, sb - st];
        let value = this._value;
        if (value === null)
            value = 0;
        const start = value / this._end;
        const percent = this._barLength / this._end;
        // Draw empty part of bar
        ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundFill);
        ctx.fillRect(sl, st, sw, sh);
        // Draw filled part of bar
        // Use accent colour if hovering or holding
        const accentStates = [ClickState.Hover, ClickState.Hold];
        if (accentStates.includes(this.clickState))
            ctx.fillStyle = this.theme.getFill(ThemeProperty.AccentFill);
        else
            ctx.fillStyle = this.theme.getFill(ThemeProperty.PrimaryFill);
        if (this.lastVertical) {
            let barHeight = percent * sh;
            if (barHeight > sh)
                barHeight = sh;
            ctx.fillRect(sl, st + start * sh, sw, barHeight);
        }
        else {
            let barWidth = percent * sw;
            if (barWidth > sw)
                barWidth = sw;
            ctx.fillRect(sl + start * sw, st, barWidth, sh);
        }
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class ScrollableViewportWidget extends PassthroughWidget {
    // late because of limitations with the layout system; you can only get the
    // used width and height in the update function after the widget has already
    // drawed. this variable is used as a workaround for avoiding a one frame
    // flash of a scrollbar, when you know the scrollbar visibility will change,
    // disable the scrollbars manually
    constructor(child, vertical, mainBasisTied = false, crossBasisTied = false, themeOverride = null) {
        // Create grid
        const viewport = new ViewportWidget(child, mainBasisTied, crossBasisTied, themeOverride);
        viewport.vertical = vertical;
        const vScroll = new ScrollBar(null, 0, 0, 0, themeOverride);
        vScroll.vertical = true;
        const row = Row(themeOverride).add([viewport, vScroll]);
        const hScroll = new ScrollBar(null, 0, 0, 0, themeOverride);
        hScroll.vertical = false;
        const grid = Column(themeOverride).add([row, hScroll]);
        super(grid, themeOverride);
        this.viewport = viewport;
        this.vScroll = vScroll;
        this.hScroll = hScroll;
        this.forceHideScrollBars = false;
        hScroll.callback = (newScroll) => {
            if (newScroll === null)
                newScroll = 0;
            this.viewport.offset = [-newScroll, this.viewport.offset[1]];
        };
        vScroll.callback = (newScroll) => {
            if (newScroll === null)
                newScroll = 0;
            this.viewport.offset = [this.viewport.offset[0], -newScroll];
        };
    }
    get maxDimensions() {
        return this.viewport.maxDimensions;
    }
    set maxDimensions(maxDimensions) {
        this.viewport.maxDimensions = maxDimensions;
    }
    get flexRatio() {
        return this.viewport.flexRatio;
    }
    set flexRatio(flexRatio) {
        this.viewport.flexRatio = flexRatio;
    }
    get mainBasis() {
        return this.viewport.mainBasis;
    }
    set mainBasis(mainBasis) {
        this.viewport.mainBasis = mainBasis;
    }
    get crossBasis() {
        return this.viewport.crossBasis;
    }
    set crossBasis(crossBasis) {
        this.viewport.crossBasis = crossBasis;
    }
    get containedChild() {
        return this.viewport.getChild();
    }
    resetScroll() {
        this.hScroll.value = 0;
        this.vScroll.value = 0;
    }
    handlePreLayoutUpdate(root) {
        const [innerW, innerH] = this.viewport.dimensions;
        if (this.viewport.resolvedWidth < innerW && !this.forceHideScrollBars)
            this.hScroll.enable();
        else {
            this.hScroll.value = 0;
            this.hScroll.disable();
        }
        if (this.viewport.resolvedHeight < innerH && !this.forceHideScrollBars)
            this.vScroll.enable();
        else {
            this.vScroll.value = 0;
            this.vScroll.disable();
        }
        super.handlePreLayoutUpdate(root);
    }
    handlePostLayoutUpdate(root) {
        [this.hScroll.end, this.vScroll.end] = this.viewport.dimensions;
        this.hScroll.barLength = this.viewport.lastViewportDims[0];
        this.vScroll.barLength = this.viewport.lastViewportDims[1];
        super.handlePostLayoutUpdate(root);
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class Slider extends Clickable(Variable(FlexWidget)) {
    constructor(callback = null, minValue = 0, maxValue = 1, snapIncrement = 0, initialValue = 0, themeOverride = null) {
        // Sliders need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);
        this.callback = callback;
        this._value = initialValue;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.snapIncrement = snapIncrement;
        // Sliders are always horizontal
        this.vertical = false;
    }
    getSliderRect(x, y, width, height) {
        const thickness = Math.min(this.crossBasis, height);
        const sy = y + (height - thickness) / 2;
        return [x, x + width, sy, sy + thickness];
    }
    handleEvent(event, width, height, root) {
        // Handle click event
        this.handleClickEvent(event, root, this.getSliderRect(0, 0, width, height));
        // If this was a click or the slider is currently being held, update
        // value
        if (((this.clickStateChanged && this.wasClick) || this.clickState == ClickState.Hold)
            && this.pointerPos !== null) {
            // Interpolate value
            const percent = this.pointerPos[0];
            let newValue = this.minValue + percent * (this.maxValue - this.minValue);
            // Snap to increments if needed
            if (this.snapIncrement > 0)
                newValue = Math.round(newValue / this.snapIncrement) * this.snapIncrement;
            // Clamp value
            if (newValue < this.minValue)
                newValue = this.minValue;
            else if (newValue > this.maxValue)
                newValue = this.maxValue;
            // Update value
            this.value = newValue;
        }
        // Always flag as dirty if the click state changed (so glow colour takes
        // effect)
        if (this.clickStateChanged)
            this.dirty = true;
        return this;
    }
    handlePreLayoutUpdate(_root) {
        // Use theme settings for flex ratio and basis
        this.flexRatio = this.theme.getSize(ThemeProperty.SliderFlexRatio);
        this.mainBasis = this.theme.getSize(ThemeProperty.SliderMainBasis);
        this.crossBasis = this.theme.getSize(ThemeProperty.SliderCrossBasis);
    }
    handlePainting(x, y, width, height, ctx) {
        // Find slider fill percentage
        const [sl, sr, st, sb] = this.getSliderRect(x, y, width, height);
        const [sw, sh] = [sr - sl, sb - st];
        let value = this._value;
        if (value === null)
            value = 0;
        const percent = (value - this.minValue) / (this.maxValue - this.minValue);
        // Draw filled part of slider
        // Use accent colour if hovering or holding
        const accentStates = [ClickState.Hover, ClickState.Hold];
        if (accentStates.includes(this.clickState))
            ctx.fillStyle = this.theme.getFill(ThemeProperty.AccentFill);
        else
            ctx.fillStyle = this.theme.getFill(ThemeProperty.PrimaryFill);
        const fullWidth = percent * sw;
        ctx.fillRect(sl, st, fullWidth, sh);
        // Draw empty part of slider
        ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundFill);
        const emptyWidth = sw - fullWidth;
        ctx.fillRect(sl + fullWidth, st, emptyWidth, sh);
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class TextInput extends Labelable(Variable(FlexWidget)) {
    // A widget that accepts keyboard input and holds a text value
    constructor(callback = null, initialValue = '', themeOverride = null) {
        // TextInputs clear their own background, have no children and don't
        // propagate events
        super(themeOverride, false, false);
        // At what timestamp did the blinking start
        this.blinkStart = 0; // XXX private
        // Was the cursor shown last frame due to blinking?
        this.blinkWasOn = null; // XXX private
        // Current cursor position (index)
        this.cursorPos = 0; // XXX private
        // Current cursor offset (pixels)
        this.cursorOffset = 0; // XXX private
        // Does the cursor offset need to be updated?
        this.cursorOffsetDirty = false; // XXX private
        this.callback = callback;
        this._value = initialValue;
        // TextInputs are always horizontal
        this.vertical = false;
    }
    get blinkOn() {
        if (this.blinkStart === 0)
            return null;
        const blinkRate = this.theme.getSize(ThemeProperty.BlinkRate);
        return Math.trunc(((Date.now() - this.blinkStart) / (500 * blinkRate)) % 2) === 0;
    }
    moveCursorTo(index) {
        // Update cursor position, checking for boundaries
        if (index < 0)
            this.cursorPos = 0;
        else if (this._value === null)
            this.cursorPos = 0;
        else if (index > this._value.length)
            this.cursorPos = this._value.length;
        else
            this.cursorPos = index;
        // Update cursor offset
        this.cursorOffsetDirty = true;
        this.dirty = true;
    }
    moveCursor(delta) {
        this.moveCursorTo(this.cursorPos + delta);
    }
    insertText(str) {
        let value = this._value;
        // Special case for null value
        if (value === null) {
            this.value = str;
            this.moveCursorTo(str.length);
            return;
        }
        // Insert string in current cursor position
        this.value = value.substring(0, this.cursorPos) + str + value.substring(this.cursorPos);
        // Move cursor neccessary amount forward
        this.moveCursor(str.length);
    }
    deleteText(delta) {
        // Special case for null value
        if (this._value === null)
            return;
        // Delete characters forwards if delta is positive, backwards if delta
        // is negative. Deleting characters backwards results in moving the
        // cursor
        if (delta > 0)
            this.value = this._value.substring(0, this.cursorPos) + this._value.substring(this.cursorPos + delta);
        else if (delta < 0) {
            // NOTE, still checking if delta < 0 so that nothing is done if
            // delta is 0
            this.value = this._value.substring(0, this.cursorPos + delta) + this._value.substring(this.cursorPos);
            this.moveCursor(delta);
        }
    }
    onFocusDropped(focusType, _root) {
        // Stop blinking cursor if keyboard focus lost
        if (focusType === FocusType.Keyboard)
            this.blinkStart = 0;
    }
    handleEvent(event, _width, _height, root) {
        if (event instanceof PointerEvent) {
            // If this is a pointer event, set pointer style and handle clicks
            root.pointerStyle = 'text';
            // Request keyboard focus if this is a pointer press
            if (event instanceof PointerPress) {
                // Update cursor position (and offset) from click position
                [this.cursorPos, this.cursorOffset] = this.findIndexOffsetFromOffset(event.x);
                // Start blinking cursor and mark component as dirty, to
                // make sure that cursor blink always resets for better
                // feedback
                this.blinkStart = Date.now();
                this.dirty = true;
                // Request focus
                root.requestFocus(FocusType.Keyboard, this);
            }
            // Get mobile-friendly text input if available
            else if (event instanceof PointerRelease && root.hasMobileTextInput) {
                let initialValue = this.value;
                if (initialValue === null)
                    initialValue = '';
                root.getTextInput(initialValue).then((newValue) => {
                    if (newValue === null)
                        return;
                    if (this.value !== newValue) {
                        this.value = newValue;
                        this.moveCursorTo(newValue.length);
                    }
                });
            }
            return this;
        }
        else if (event instanceof KeyPress) {
            // If this is a key press, do the key's action
            if (event.key.length === 1)
                this.insertText(event.key); // Insert character
            else if (event.key === 'Backspace')
                this.deleteText(-1); // Delete backwards
            else if (event.key === 'Delete')
                this.deleteText(1); // Delete forwards
            else if (event.key === 'ArrowLeft')
                this.moveCursor(-1); // Move cursor left
            else if (event.key === 'ArrowRight')
                this.moveCursor(1); // Move cursor right
            else if (event.key === 'Home')
                this.moveCursorTo(0); // Move cursor to beginning
            else if (event.key === 'End')
                this.moveCursorTo(this.valueLength); // Move cursor to end
            else if (event.key === 'Escape') {
                root.dropFocus(FocusType.Keyboard, this); // Drop focus
                return this;
            }
            else
                return this; // Ignore key if it is unknown
            // Reset blink time for better feedback
            this.blinkStart = Date.now();
        }
        return this;
    }
    handlePreLayoutUpdate(_root) {
        var _a;
        // Mark as dirty when a blink needs to occur
        if (this.blinkOn !== this.blinkWasOn)
            this.dirty = true;
        // Update Labelable variables
        const cursorPadding = this.theme.getSize(ThemeProperty.CursorPadding);
        const cursorThickness = this.theme.getSize(ThemeProperty.CursorThickness);
        const widthError = cursorPadding + cursorThickness;
        this.setText((_a = this._value) !== null && _a !== void 0 ? _a : '');
        this.setFont(this.theme.getFont(ThemeProperty.InputTextFont));
        this.setMinLabelWidth(this.theme.getSize(ThemeProperty.InputTextMinWidth) - widthError);
        this.setMinLabelAscent(this.theme.getSize(ThemeProperty.InputTextMinAscent));
        this.setMinLabelDescent(this.theme.getSize(ThemeProperty.InputTextMinDescent));
        if (this.cursorOffsetDirty) {
            this.cursorOffset = this.findOffsetFromIndex(this.cursorPos);
            this.cursorOffsetDirty = false;
        }
        this.flexRatio = this.theme.getSize(ThemeProperty.InputTextFlexRatio);
        this.internalMainBasis = this.labelWidth + widthError;
        this.internalCrossBasis = this.labelHeight;
    }
    handlePainting(x, y, width, height, ctx) {
        var _a;
        // Paint background
        ctx.fillStyle = this.theme.getFill(ThemeProperty.InputBackgroundFill);
        ctx.fillRect(x, y, width, height);
        // Paint current text value
        ctx.font = this.theme.getFont(ThemeProperty.InputTextFont);
        ctx.fillStyle = this.theme.getFill(ThemeProperty.InputTextFill);
        ctx.fillText((_a = this._value) !== null && _a !== void 0 ? _a : '', x, y + height - this.labelDescent);
        // Paint blink
        const blinkOn = this.blinkOn;
        this.blinkWasOn = blinkOn;
        if (!blinkOn)
            return;
        const cursorPadding = this.theme.getSize(ThemeProperty.CursorPadding);
        const cursorThickness = this.theme.getSize(ThemeProperty.CursorThickness);
        ctx.fillRect(x + this.cursorOffset, y + cursorPadding, cursorThickness, height - cursorPadding * 2);
    }
    get valueLength() {
        if (this._value === null)
            return 0;
        return this._value.length;
    }
}

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
class ThemeScope extends PassthroughWidget {
    // A passthrough widget that changes the theme of all children to a
    // different given one
    constructor(child, themeOverride) {
        super(child, null);
        this.scopeTheme = themeOverride;
    }
    // Set the scope theme
    setThemeOverride(scopeTheme) {
        this.scopeTheme = scopeTheme;
        super.inheritTheme(this.scopeTheme);
    }
    inheritTheme(_theme) {
        // Ignore theme and use scope theme instead
        super.inheritTheme(this.scopeTheme);
    }
}

export { Alignment, BackspaceKey, BaseContainer, BasicKey, BoxWidget, Button, Center, Checkbox, ClickState, Clickable, Column, Container, DefaultTextInputHandler, EnterKey, EscapeKey, Event, FilledButton, FlexWidget, FocusType, GlyphKey, Icon, KeyEvent, KeyPress, KeyRelease, KeyRow, KeyboardDriver, Label, Labelable, LabelledCheckbox, LayoutContext, Leave, Margin, MultiContainer, MultiParentWidget, Parent, ParentWidget, PassthroughWidget, PointerEvent, PointerMove, PointerPress, PointerRelease, Root, Row, ScrollBar, ScrollableViewportWidget, ShiftKey, SingleParentWidget, Slider, SpaceKey, Spacing, TextButton, TextInput, Theme, ThemeProperty, ThemeScope, Variable, Viewport, ViewportWidget, VirtualKeyboard, Widget, debugTheme, defaultTheme };

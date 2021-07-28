/**
 * The default implementation of {@link TextInputHandler}.
 *
 * Creates a new popup div with a CSS ID of 'textInputHandler' and an overlay
 * div with CSS ID 'textInputHandlerOverlay', adding both to the HTML body.
 * Resolves the promise once user input is finished by clicking the OK or Cancel
 * buttons.
 *
 * @category Core
 */
export declare function DefaultTextInputHandler(initialInput: string): Promise<string>;

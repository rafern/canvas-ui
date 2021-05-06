export function DefaultTextInputHandler(initialInput: string): Promise<string> {
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

        function enterChecker(event: KeyboardEvent) {
            // Check if enter key was pressed
            if(event.keyCode == 13) {
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

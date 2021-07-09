# Example

A simple example with a single canvas, pointer and keyboard input.


### Source code

```typescript
import {
    DOMRoot, Label, Margin, Column, Row, Center, BasicTextInput,
    TextButton, DOMKeyboardDriver, DOMPointerDriver
} from '../lib/index.esm.js';

// Create the root
const label = new Label('Hello world!');
const inputLabel = new Label('');
const root = new DOMRoot(
    new Margin(
        new Column()
        .add(label)
        .add(inputLabel)
        .add(new BasicTextInput(text => inputLabel.text = `Text input: ${text}`))
        .add(
            new Center(
                new Row()
                .add(new TextButton('Button 1', () => label.text = 'Button 1 clicked!'))
                .add(new TextButton('Button 2', () => label.text = 'Button 2 clicked!'))
            )
        )
    )
);

// Create, bind DOM and register the keyboard driver
const keyboardDriver = new DOMKeyboardDriver();
keyboardDriver.bindDOMElem(root.domElem);
root.registerDriver(keyboardDriver);

// Create, bind DOM and register the pointer driver
const pointerDriver = new DOMPointerDriver();
pointerDriver.bindDOMElem(root, root.domElem);
root.registerDriver(pointerDriver);

// Run the update loop
function updateLoop() {
    root.update();
    window.requestAnimationFrame(updateLoop);
}

window.requestAnimationFrame(updateLoop);

// Add root to body
document.getElementById('canvas-ui-root-div').appendChild(root.domElem);
```

### Live example

<script type='module'>
    import {
        DOMRoot, Label, Margin, Column, Row, Center, BasicTextInput,
        TextButton, DOMKeyboardDriver, DOMPointerDriver
    } from '../lib/index.esm.js';

    // Create the root
    const label = new Label('Hello world!');
    const inputLabel = new Label('');
    const root = new DOMRoot(
        new Margin(
            new Column()
            .add(label)
            .add(inputLabel)
            .add(new BasicTextInput(text => inputLabel.text = `Text input: ${text}`))
            .add(
                new Center(
                    new Row()
                    .add(new TextButton('Button 1', () => label.text = 'Button 1 clicked!'))
                    .add(new TextButton('Button 2', () => label.text = 'Button 2 clicked!'))
                )
            )
        )
    );

    // Create, bind DOM and register the keyboard driver
    const keyboardDriver = new DOMKeyboardDriver();
    keyboardDriver.bindDOMElem(root.domElem);
    root.registerDriver(keyboardDriver);

    // Create, bind DOM and register the pointer driver
    const pointerDriver = new DOMPointerDriver();
    pointerDriver.bindDOMElem(root, root.domElem);
    root.registerDriver(pointerDriver);

    // Run the update loop
    function updateLoop() {
        root.update();
        window.requestAnimationFrame(updateLoop);
    }

    window.requestAnimationFrame(updateLoop);

    // Add root to body
    document.getElementById('canvas-ui-root-div').appendChild(root.domElem);
</script>
<noscript>
    Please enable Javascript. This example may not work if running via file:// URIs
</noscript>
<div id='canvas-ui-root-div'></div>


# Using mixins

Mixins are a type of class which provides partial functionality. canvas-ui uses
mixins to provide more reusability. Mixins are created with
[ts-mixer](https://www.npmjs.com/package/ts-mixer), so if you want to create
custom classes which uses mixins, make sure to install this package with:

```sh
npm install --save-dev ts-mixer
```

If you are creating a class which only extends a single mixin, then that class
can be created with regular inheritance:

```typescript
class ExampleClass extends MixinClass {
    // Implementation goes here
}
```

If you are creating a class which extends multiple mixins, or a class and
multiple mixins, then ts-mixer must be used:

```typescript
import { Mixin } from 'ts-mixer';

class ExampleClass1 extends Mixin(Mixin1, Mixin2) {
    // Implementation goes here
}

class ExampleClass2 extends Mixin(Mixin1, Mixin2, BaseClass) {
    // Implementation goes here
}
```

Note that this does not work with generic classes. For that, follow the
[ts-mixer documentation](https://www.npmjs.com/package/ts-mixer#mixing-generic-classes).
There are other special cases which can also be found in the documentation.
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
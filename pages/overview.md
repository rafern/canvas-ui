![Overview flowchart](media://overview.png)

## Widgets

In the Widget's perspective, the following methods are called, in this order:
1. {@link Widget#dispatchEvent} ({@link Widget#handleEvent}) for every event queued by a {@link Driver}.
2. {@link Widget#preLayoutUpdate} ({@link Widget#handlePreLayoutUpdate}), even if the layout is not dirty.
3. Assuming the top-most Widget has a dirty layout:
    1. {@link Widget#resolveDimensions} ({@link Widget#handleResolveDimensions}). This calculates the ideal dimensions (width and height).
    2. {@link Widget#resolvePosition}. This calculates the ideal coordinates (X and Y).
    3. {@link Widget#finalizeBounds}. This rounds ideal dimensions and coordinates to the nearest scale-aligned whole pixels to prevent clipping artifacts.
4. {@link Widget#postLayoutUpdate} ({@link Widget#handlePostLayoutUpdate}), even if the layout is not dirty.
5. {@link Widget#paint}. If the Widget needs to be painted (marked as dirty), then the implementation method ({@link Widget#handlePainting}) is called, otherwise, the Widget is not painted (and neither are any of its children).

## Roots

In the Root's perspective, the following methods are (normally) called, in this order:
1. {@link Root#preLayoutUpdate}, which calls {@link Driver#update} for each Driver attached to the Root, and calls {@link Widget#preLayoutUpdate} for the top-most Widget.
2. {@link Root#resolveLayout}, which calls the {@link Widget#resolveDimensions}, {@link Widget#resolvePosition} and {@link Widget#finalizeBounds} methods of the top-most Widget.
3. {@link Root#postLayoutUpdate}, which calls {@link Widget#postLayoutUpdate} for the top-most Widget.
4. {@link Root#paint}, which calls {@link Widget#paint} for the top-most Widget.

Note that {@link DOMRoot} already wraps all of these calls, in this order, in the {@link DOMRoot#update} method.

Drivers are expected to accumulate events and, when their {@link Driver#update} method is called, dispatch those events to a relevant Root they are attached to.
1. Root.preLayoutUpdate
  1. Driver.update
    - Root.dispatchEvent
      - Widget.dispatchEvent (calls children)
  2. Widget.preLayoutUpdate (calls children)
2. Root.resolveLayout
  - Viewport.resolveChildsLayout
    - if not Widget.layoutDirty (root widget)
      - Widget.postFinalizeBounds (calls children)
    - while Widget.layoutDirty (root widget)
      1. Widget.resolveDimensions (calls children)
      2. Widget.resolvePosition (calls children)
      3. Widget.finalizeBounds (calls children)
      4. Widget.postFinalizeBounds (calls children)
3. Root.postLayoutUpdate
  1. Widget.postLayoutUpdate (calls children)
  2. Root.updatePointerStyle
4. Root.paint
  - Viewport.paintToCanvas
    - Widget.paint (calls children)
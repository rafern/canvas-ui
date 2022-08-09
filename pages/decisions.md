This document contains the reasoning behind some design and administrative
decisions made when making this library.

## Why is canvas-ui-unity private?

The unity integration library ended up never being used because Unity WebGL was
deemed too slow to make games in it, so it's in a very outdated and unfinished
state. Because of this, it was decided not to release the library, but the link
is still in the README for completeness' sake.

## Why are there activate() and deactivate() methods?

Before {@link RadioButton} was implemented in version 4, the {@link Variable}
class could have a single callback. However, radio buttons change a shared
variable and therefore need to know when another radio button causes the value
to change; multiple callbacks are needed. Because of this, the {@link Variable}
class was updated to work with (any amount of) callbacks instead of a dirty
flag. When a radio button is created, the used variable has a callback added and
everything works.

However, before version 4 {@link Widget | Widgets} had no method for knowing
when they are removed from a {@link Root}'s UI tree. On most projects, this
isn't a problem because the UI is static, however, if a project uses a dynamic
UI by removing and adding children to a {@link MultiContainer} (such as
{@link Row} or {@link Column}), this will leave stale references. This means
that, whenever a variable changes, it can update a widget that is no longer in
the UI tree if that widget was removed from the UI tree and added a callback to
the variable. This is a waste of performance and memory.

Another nice byproduct of this addition is that a Widget is always guaranteed to
know what the its Root is, meaning that root parameters in painting and layout
resolution methods are no longer needed, and a Widget always knows its parent
Widget; Widget activation essentially binds a widget to an optional parent
Widget and a Root, it doesn't just mark a Widget as not stale.

## Why not use WeakRef instead of manual memory management?

When re-implementing the {@link Variable} class, the first iteration used
WeakRef for callbacks because it would avoid any manual memory management and
therefore avoid the addition of {@link Widget#activate} and
{@link Widget#deactivate}. This would be preferrable because it would not
require any changes to the {@link Widget} class.

In practice, callbacks create so many strong references that the objects that
create callbacks never get cleaned up by the garbage collector (even after
manually invoking garbage collection in the browser console). This not only
created a memory leak, but it also made the Variable think that a removed
Widget's callback was still in use, causing them to update stale Widgets.

Even if WeakRef worked with callbacks, callbacks only get cleaned up when the
browser does garbage collection, which is very unpredictable, or might never
happen.

## Why are UIs forced to be trees?

Because the library would be much more complicated if they weren't.

For example, for a widget to know whether it needs to be repainted or not, it
checks the {@link Widget#_dirty} flag. However, if a Widget was allowed to be in
multiple {@link Root | Roots} at the same time, then it would need a dirty flag
per Root. Another issue is that layouts are dependent on the entire UI; a widget
can have a size of 100x100 in one Root and 200x150 in another, meaning that it
would have to store a cached version of the resolved dimensions per Root.
Eventually, you end up creating a Map for almost every property of the Widget,
where they key is a Root, (or a Map where the key is a Root, but the value is a
context object will all of the Root-dependent properties), which boils down to
the same as just having one Widget instance per Root, but more complicated and
bug prone.

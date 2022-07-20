## What are UI trees?

UI trees are an abstraction and not an actual part of the library. A
{@link Widget} can only have 1 parent at a time, and be in 1 {@link Root} at a
time; they can't be in 2+ Roots/have 2+ parents at the same time. This means
that Widgets end up forming a tree data structure, where the root node is a
single Widget, every other Widget is a descendant of this Widget, and the Root
class is a wrapper around the whole tree, creating a context.

## Why are UIs forced to be trees?

See the {@page decisions.md decisions page}.

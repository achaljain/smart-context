---
sidebar_position: 4
---

# Config options

## displayName

**`string (mandatory)`**

A unique name for context store, required to access the store.

## initialState

**`object`**

Declare some initial state for predictable behavior during initial render.

## actionsConfig

**`object: { actionName: [string] | function }`**

**camelCase** is recommended for `actionName`.

A `reset` action is auto-generated (if not provided) that restores `initialState`.

## debug

**`boolean`**

Log errors and state updates to console for easy debugging.

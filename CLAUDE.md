# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running files

No build system or package manager. Run any file directly:

```bash
node <file>.js
# or
bun <file>.js
```

## Repository structure

A collection of standalone JavaScript study files for interview preparation and design pattern practice. Each file is self-contained and can be run independently.

```
PATTERNS/
  BEHAVIORAL/   # Observer, Strategy, Command, Chain-of-Responsibility, etc.
  CREATIONAL/   # Factory, Builder, Singleton, Prototype, etc.
  STRUCTURAL/   # Adapter, Decorator, Proxy, Facade, Flyweight, etc.
  REACT_PATTERNS/ # HOC, Render Props, Compound Pattern, Container/Presentational
PROMISES/       # Async utilities: custom Promise impl, mapAsync, retry, priority queue, etc.
SOLID/          # One file per SOLID principle with illustrative examples
linked-list.js  # Singly linked list with push/pop/shift/unshift/get/set/insert/remove/reverse
epam-intervew.js # Interview snippet scratchpad: hoisting, closures, `this`, event loop, coercion
```

## Code conventions

- All files use plain ES6+ JavaScript (classes, arrow functions, destructuring, async/await).
- Each pattern file typically exports or demonstrates one concept with a usage example at the bottom.
- `PROMISES/` files tend to export a utility function and include a usage/test block at the end.
- No TypeScript, no modules (`import`/`export`) — everything uses `class` or `function` declarations in script scope.

# @kitsra/kavio-schema

Canonical JSON Schema, TypeScript types, validation, and migration scaffolding
for Kavio compositions.

## Install

```bash
corepack pnpm add @kitsra/kavio-schema
```

## Usage

```ts
import { validateComposition } from "@kitsra/kavio-schema";

const result = validateComposition(document);
if (!result.ok) {
  console.error(result.errors);
}
```

The package also exports the current `schemaVersion`, shared document/layer
types, and the bundled schema at `@kitsra/kavio-schema/schema`.

## Links

- Repository: https://github.com/kitsra/kavio
- Schema docs: https://github.com/kitsra/kavio/blob/main/docs/schema.md
- License: Elastic-2.0

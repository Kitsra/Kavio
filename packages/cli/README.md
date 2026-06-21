# @kitsra/kavio-cli

Local command-line interface for Kavio validation, inspection, preview, and
rendering.

## Install

```bash
corepack pnpm add -D @kitsra/kavio-cli
```

## Usage

```bash
kavio validate examples/basic-json/composition.json
kavio inspect examples/basic-json/composition.json
kavio preview examples/basic-json/composition.json
kavio presets
kavio render composition.json --export reels --out renders/demo
```

The CLI is intended for local automation, CI validation, preview handoff, and
render smoke tests.

## Links

- Repository: https://github.com/kitsra/kavio
- CLI docs: https://github.com/kitsra/kavio/blob/main/docs/cli.md
- Examples: https://github.com/kitsra/kavio/tree/main/examples
- License: Elastic-2.0

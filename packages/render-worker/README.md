# @kitsra/kavio-render-worker

Browser automation and frame capture contracts for Kavio render workers.

## Install

```bash
corepack pnpm add @kitsra/kavio-render-worker
```

## What It Does

- Defines browser-driver interfaces.
- Models frame capture results and render output metadata.
- Provides deterministic browser metadata helpers.
- Expands batch render rows and output names.
- Provides cleanup stack utilities.

This package contains orchestration contracts and helpers. The concrete local
Playwright and FFmpeg execution layer lives in `@kitsra/kavio-render`.

## Links

- Repository: https://github.com/kitsra/kavio
- Rendering docs: https://github.com/kitsra/kavio/blob/main/docs/rendering.md
- Package overview: https://github.com/kitsra/kavio/blob/main/docs/packages.md
- License: Elastic-2.0

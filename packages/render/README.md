# @kitsra/kavio-render

Concrete local render execution for Kavio: browser frame capture plus FFmpeg
encoding.

## Install

```bash
corepack pnpm add @kitsra/kavio-render
```

## Render Binaries

`@kitsra/kavio-render` declares `ffmpeg-static` and `playwright` as optional
dependencies. Projects that render MP4, MOV, or WebM outputs should provision
those binaries after install:

```bash
corepack pnpm rebuild ffmpeg-static
corepack pnpm exec playwright install chromium
```

## What It Does

- Provides `PlaywrightDriver` for browser frame capture.
- Resolves FFmpeg binaries.
- Assembles render commands.
- Renders a single composition/export.
- Expands and renders batch jobs.

## Links

- Repository: https://github.com/kitsra/kavio
- Rendering docs: https://github.com/kitsra/kavio/blob/main/docs/rendering.md
- Render pipeline docs: https://github.com/kitsra/kavio/blob/main/docs/render-pipeline.md
- License: Elastic-2.0

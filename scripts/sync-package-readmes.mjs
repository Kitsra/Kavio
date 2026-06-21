#!/usr/bin/env node
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const mode = process.argv.includes("--write") ? "write" : "check";
const packageRoot = join(root, "packages");
const failures = [];
let updated = 0;

for (const entry of await readdir(packageRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) {
    continue;
  }

  const dir = join(packageRoot, entry.name);
  const packagePath = join(dir, "package.json");
  const readmePath = join(dir, "README.md");
  const manifest = JSON.parse(await readFile(packagePath, "utf8"));

  if (manifest.private || !manifest.name?.startsWith("@kitsra/kavio-")) {
    continue;
  }

  const readme = await readFile(readmePath, "utf8").catch(() => "");
  if (readme.trim().length === 0) {
    failures.push(`${manifest.name} is missing a non-empty README.md.`);
    continue;
  }

  if (mode === "write") {
    manifest.readme = readme;
    manifest.readmeFilename = "README.md";
    await writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);
    updated += 1;
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}

if (mode === "write") {
  console.log(`Injected README metadata into ${updated} package manifests for npm publish.`);
} else {
  console.log("Package README files are ready for npm publish.");
}

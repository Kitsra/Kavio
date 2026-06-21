import assert from "node:assert/strict";
import test from "node:test";
import { spawn } from "node:child_process";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const binPath = join(dirname(fileURLToPath(import.meta.url)), "../dist/bin.js");

function run(args, cwd) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(process.execPath, [binPath, ...args], { cwd });
    child.on("error", reject);
    child.on("close", (code) => resolvePromise(code));
  });
}

test("emit-adapters writes three valid provider files", async () => {
  const out = await mkdtemp(join(tmpdir(), "kavio-adapters-"));
  const code = await run(["emit-adapters", "--out", out]);
  assert.equal(code, 0);
  for (const file of ["anthropic.tools.json", "openai.tools.json", "gemini.tools.json"]) {
    const parsed = JSON.parse(await readFile(join(out, file), "utf8"));
    assert.ok(Array.isArray(parsed) ? parsed.length > 0 : parsed.length !== 0 || parsed[0]);
  }
});

test("emit-adapters requires --out", async () => {
  const code = await run(["emit-adapters"]);
  assert.notEqual(code, 0);
});

test("emit-skill writes the vendor-neutral Kavio skill", async () => {
  const out = await mkdtemp(join(tmpdir(), "kavio-skill-"));
  const code = await run(["emit-skill", "--out", out]);
  assert.equal(code, 0);

  const skill = await readFile(join(out, "kavio-ai", "SKILL.md"), "utf8");
  assert.match(skill, /^---\nname: kavio-ai\n/m);
  assert.match(skill, /vendor-neutral skill/);
  assert.doesNotMatch(skill, /Codex/);
});

test("emit-skill requires --out", async () => {
  const code = await run(["emit-skill"]);
  assert.notEqual(code, 0);
});

test("npm package includes Claude, Codex, and Gemini metadata next to the skill", async () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const pluginRoot = join(root, "plugins", "kavio-ai");
  const claudeManifest = JSON.parse(await readFile(join(pluginRoot, ".claude-plugin", "plugin.json"), "utf8"));
  const codexManifest = JSON.parse(await readFile(join(pluginRoot, ".codex-plugin", "plugin.json"), "utf8"));
  const geminiManifest = JSON.parse(await readFile(join(pluginRoot, "gemini-extension.json"), "utf8"));
  const antigravityManifest = JSON.parse(await readFile(join(pluginRoot, "plugin.json"), "utf8"));

  assert.equal(claudeManifest.name, "kavio-ai");
  assert.equal(claudeManifest.skills, "./skills/");
  assert.equal(codexManifest.name, "kavio-ai");
  assert.equal(codexManifest.interface.displayName, "Kavio");
  assert.equal(codexManifest.skills, "./skills/");
  assert.equal(geminiManifest.name, "kavio-ai");
  assert.equal(antigravityManifest.name, "kavio-ai");

  const skill = await readFile(join(pluginRoot, "skills", "kavio-ai", "SKILL.md"), "utf8");
  assert.match(skill, /vendor-neutral skill/);
});

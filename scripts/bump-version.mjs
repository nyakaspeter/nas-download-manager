import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import semver from "semver";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bumpKind = process.argv[2];

if (!["major", "minor", "patch"].includes(bumpKind)) {
  console.error("usage: pnpm bump-version <major|minor|patch>");
  process.exit(1);
}

const status = execFileSync("git", ["status", "--porcelain"], {
  cwd: root,
  encoding: "utf8",
});

if (status.trim()) {
  console.error("working directory dirty; refusing to continue");
  console.error(status.trimEnd());
  process.exit(1);
}

const manifestPath = path.join(root, "manifest.json");
const packagePath = path.join(root, "package.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const packageJson = JSON.parse(await readFile(packagePath, "utf8"));
const nextVersion = semver.inc(manifest.version, bumpKind);

if (!nextVersion) {
  throw new Error(`Cannot increment invalid version: ${manifest.version}`);
}

manifest.version = nextVersion;
packageJson.version = nextVersion;

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

execFileSync("git", ["add", "manifest.json", "package.json"], { cwd: root });
execFileSync("git", ["commit", "-m", `v${nextVersion}`], { cwd: root, stdio: "inherit" });
execFileSync("git", ["tag", "-a", `v${nextVersion}`, "-m", nextVersion], {
  cwd: root,
  stdio: "inherit",
});

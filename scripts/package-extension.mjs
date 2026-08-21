import { createWriteStream } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import archiver from "archiver";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "manifest.json"), "utf8"));
const artifactsDirectory = path.join(root, "artifacts");
const artifactPath = path.join(artifactsDirectory, `nas-download-manager-${manifest.version}.zip`);

await mkdir(artifactsDirectory, { recursive: true });

const output = createWriteStream(artifactPath);
const archive = archiver("zip", { zlib: { level: 9 } });

const completed = new Promise((resolve, reject) => {
  output.on("close", resolve);
  output.on("error", reject);
  archive.on("error", reject);
});

archive.pipe(output);
archive.file(path.join(root, "manifest.json"), { name: "manifest.json" });

for (const directory of ["dist", "html", "icons", "_locales", "vendor"]) {
  archive.directory(path.join(root, directory), directory);
}

await archive.finalize();
await completed;

console.log(`Created ${path.relative(root, artifactPath)} (${archive.pointer()} bytes)`);

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const sourceRoot = path.join(rootDir, "playground");
const targetRoot = path.join(rootDir, "docs", ".vuepress", "public", "playground");
const manifestPath = path.join(rootDir, "playground-manifest.json");

function readManifest() {
  const manifestRaw = fs.readFileSync(manifestPath, "utf8");
  const manifest = JSON.parse(manifestRaw);

  return {
    files: Array.isArray(manifest.files) ? manifest.files : [],
    directories: Array.isArray(manifest.directories) ? manifest.directories : [],
  };
}

function ensureInsideRoot(root, relativePath) {
  const absolutePath = path.resolve(root, relativePath);
  const relativeToRoot = path.relative(root, absolutePath);

  if (relativeToRoot.startsWith("..") || path.isAbsolute(relativeToRoot)) {
    throw new Error(`Path is outside root: ${relativePath}`);
  }

  return absolutePath;
}

function resetTargetDirectory() {
  fs.rmSync(targetRoot, { recursive: true, force: true });
  fs.mkdirSync(targetRoot, { recursive: true });
}

function copyEntry(relativePath, type) {
  const sourcePath = ensureInsideRoot(sourceRoot, relativePath);
  const targetPath = path.join(targetRoot, relativePath);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing ${type}: ${relativePath}`);
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.cpSync(sourcePath, targetPath, { recursive: type === "directory" });
}

function main() {
  const manifest = readManifest();

  resetTargetDirectory();

  manifest.files.forEach((file) => copyEntry(file, "file"));
  manifest.directories.forEach((directory) => copyEntry(directory, "directory"));

  const copiedCount = manifest.files.length + manifest.directories.length;
  console.log(`Synced ${copiedCount} playground entr${copiedCount === 1 ? "y" : "ies"} to ${targetRoot}`);
}

main();

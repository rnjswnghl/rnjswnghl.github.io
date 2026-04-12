import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function rmIfExists(p) {
  if (await exists(p)) {
    await fs.rm(p, { recursive: true, force: true });
  }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  await Promise.all(
    entries.map(async (e) => {
      const s = path.join(src, e.name);
      const d = path.join(dest, e.name);
      if (e.isDirectory()) return copyDir(s, d);
      await fs.copyFile(s, d);
    }),
  );
}

/** dist 빌드 결과를 정적 사이트 디렉터리(루트 또는 docs)에 그대로 반영 */
async function deployDistTo(dir) {
  const distIndex = path.join(dist, "index.html");
  const distAssets = path.join(dist, "assets");

  if (!(await exists(distIndex))) {
    throw new Error("dist/index.html not found. Run build first.");
  }

  await fs.mkdir(dir, { recursive: true });
  await fs.copyFile(distIndex, path.join(dir, "index.html"));
  await rmIfExists(path.join(dir, "assets"));
  if (await exists(distAssets)) {
    await copyDir(distAssets, path.join(dir, "assets"));
  }
  await fs.writeFile(path.join(dir, ".nojekyll"), "", "utf8");
}

async function main() {
  await deployDistTo(root);
  await deployDistTo(path.join(root, "docs"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

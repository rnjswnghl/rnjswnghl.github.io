import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "index.dev.html");
const dest = path.join(root, "index.html");

async function main() {
  const html = await fs.readFile(src, "utf8");
  await fs.writeFile(dest, html, "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import fs from "node:fs";
import fsp from "node:fs/promises";
import { fileURLToPath } from "node:url";
 
function project4DistDevStatic(): Plugin {
  const urlPrefix = "/projects/project4/dist/";
  const distDir = path.resolve(
    fileURLToPath(new URL(".", import.meta.url)),
    "projects/project4/dist",
  );

  const contentTypeByExt: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".json": "application/json; charset=utf-8",
    ".map": "application/json; charset=utf-8",
  };

  return {
    name: "project4-dist-dev-static",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? "";
        if (!url.startsWith(urlPrefix)) return next();

        // /projects/project4/dist/  -> index.html
        const rel = url.slice(urlPrefix.length).split("?")[0].split("#")[0];
        const relPath = rel.length ? rel : "index.html";
        const filePath = path.join(distDir, relPath);

        try {
          const stat = await fsp.stat(filePath);
          if (!stat.isFile()) return next();

          const ext = path.extname(filePath).toLowerCase();
          res.statusCode = 200;
          res.setHeader("Content-Type", contentTypeByExt[ext] ?? "application/octet-stream");
          // Avoid caching during dev
          res.setHeader("Cache-Control", "no-store");
          fs.createReadStream(filePath).pipe(res);
        } catch {
          return next();
        }
      });
    },
  };
}

export default defineConfig({
  // GitHub Pages: user site(rnjswnghl.github.io)는 루트지만, 상대 경로면 /docs 배포·미러 경로 모두 안전
  base: "./",
  plugins: [react(), tailwindcss(), basicSsl(), project4DistDevStatic()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  server: {
    // 일부 환경/브라우저에서 localhost를 https로 강제 업그레이드하는 경우가 있어
    // 개발 서버도 https로 띄워 접근 문제(무한 로딩처럼 보이는 현상)를 예방합니다.
    https: true,
    host: true,
    port: 5173,
    strictPort: true,
  },
  build: {
    // GitHub Pages: 저장소 설정에서 Publishing source를 `main` 브랜치의 `/docs`로 두면 이 폴더가 라이브 사이트가 됩니다.
    outDir: "dist",
    emptyOutDir: true,
  },
});


import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, "../dist");
const DIST_SERVER = path.resolve(__dirname, "../dist/server");

async function ensureDir(dirPath) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

async function prerender() {
  const templatePath = path.join(DIST_DIR, "index.html");
  const template = await fs.promises.readFile(templatePath, "utf-8");

  const { render } = await import(path.join(DIST_SERVER, "entry-server.js"));

  const routes = [
    "/",
    "/en",
    "/es",
    "/projects/uala",
    "/projects/unaje",
    "/projects/chester",
    "/en/projects/uala",
    "/en/projects/unaje",
    "/en/projects/chester",
    "/es/projects/uala",
    "/es/projects/unaje",
    "/es/projects/chester",
  ];

  for (const url of routes) {
    let { html } = render(url);
    if (!html || !html.trim()) {
      html = '<noscript><div style="color:#fff;padding:24px;font-family:system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">This page is available but requires JavaScript for full experience.</div></noscript>';
    }
    // Inject into either the SSR outlet placeholder or the root div
    let rendered = template.replace("<!--ssr-outlet-->", html);
    if (rendered === template) {
      rendered = template.replace(
        /<div id="root">\s*<\/div>/,
        `<div id="root">${html}</div>`
      );
    }

    const outFile = url === "/"
      ? path.join(DIST_DIR, "index.html")
      : path.join(DIST_DIR, url.slice(1), "index.html");

    await ensureDir(path.dirname(outFile));
    await fs.promises.writeFile(outFile, rendered, "utf-8");
    // eslint-disable-next-line no-console
    console.log(`prerendered: ${url} -> ${outFile}`);
  }
}

prerender().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});



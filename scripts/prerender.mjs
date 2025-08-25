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
    "/projects/uala",
    "/projects/unaje",
    "/projects/chester",
    "/en/projects/uala",
    "/en/projects/unaje",
    "/en/projects/chester",
  ];

  for (const url of routes) {
    let { html } = render(url);
    if (!html || !html.trim()) {
      html = '<noscript><div style="color:#fff;padding:24px;font-family:system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">This page is available but requires JavaScript for full experience.</div></noscript>';
    }
    
    // Generate language-specific meta tags based on URL
    let rendered = template.replace("<!--ssr-outlet-->", html);
    if (rendered === template) {
      // Fallback: replace the root div content
      rendered = template.replace(
        /<div id="root">[^<]*<\/div>/,
        `<div id="root">${html}</div>`
      );
    }

    // Update meta tags based on the route
    rendered = updateMetaTagsForRoute(rendered, url);

    const outFile = url === "/"
      ? path.join(DIST_DIR, "index.html")
      : path.join(DIST_DIR, url.slice(1), "index.html");

    await ensureDir(path.dirname(outFile));
    await fs.promises.writeFile(outFile, rendered, "utf-8");
    // eslint-disable-next-line no-console
    console.log(`prerendered: ${url} -> ${outFile}`);
  }
}

function updateMetaTagsForRoute(html, url) {
  const pathSegments = url.split("/").filter(Boolean);
  const currentLanguage = pathSegments[0] && ["en", "es"].includes(pathSegments[0]) ? pathSegments[0] : "es";
  const baseUrl = "https://reforceinfinity.com";
  const currentUrl = `${baseUrl}${url}`;
  
  // Language-specific meta descriptions
  const descriptions = {
    en: "Digital Marketing with AI → Web Development and Design → Content Generation and Social Media Management → Ad Campaigns. Transform your business with data-driven strategies and innovative digital solutions that deliver results.",
    es: "Marketing Digital con IA → Desarrollo y diseño Web → Generación de contenido y Manejo de Redes Sociales → Campañas de anuncios. Transforma tu negocio con estrategias basadas en datos y soluciones digitales innovadoras que generan resultados."
  };

  // Language-specific titles
  const titles = {
    en: "Reforce Infinity - AI-Powered Digital Marketing Agency",
    es: "Reforce Infinity - Agencia de Marketing Digital Impulsada por IA"
  };

  // Update HTML lang attribute
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${currentLanguage}"`);

  // Update title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${titles[currentLanguage]}</title>`
  );

      // Update meta description (handle multi-line meta tags)
    html = html.replace(
      /<meta\s+name="description"[^>]*content="[^"]*"[^>]*>/,
      `<meta name="description" content="${descriptions[currentLanguage]}" />`
    );

    // Update meta title
    html = html.replace(
      /<meta name="title"[^>]*>/,
      `<meta name="title" content="${titles[currentLanguage]}" />`
    );

      // Update Open Graph meta tags
    html = html.replace(
      /<meta property="og:url"[^>]*>/,
      `<meta property="og:url" content="${currentUrl}" />`
    );
    
    html = html.replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${titles[currentLanguage]}" />`
    );
    
    // Update Open Graph description (handle multi-line meta tags)
    html = html.replace(
      /<meta\s+property="og:description"[^>]*content="[^"]*"[^>]*>/,
      `<meta property="og:description" content="${descriptions[currentLanguage]}" />`
    );

      // Update Twitter meta tags
    html = html.replace(
      /<meta property="twitter:url"[^>]*>/,
      `<meta property="twitter:url" content="${currentUrl}" />`
    );
    
    html = html.replace(
      /<meta property="twitter:title"[^>]*>/,
      `<meta property="twitter:title" content="${titles[currentLanguage]}" />`
    );
    
    // Update Twitter description (handle multi-line meta tags)
    html = html.replace(
      /<meta\s+property="twitter:description"[^>]*content="[^"]*"[^>]*>/,
      `<meta property="twitter:description" content="${descriptions[currentLanguage]}" />`
    );

  // Update canonical URL
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${currentUrl}" />`
  );

  // Update og:locale
  const locale = currentLanguage === "es" ? "es_ES" : "en_US";
  html = html.replace(
    /<meta property="og:locale"[^>]*>/,
    `<meta property="og:locale" content="${locale}" />`
  );

  // Add hreflang links
  const hreflangLinks = `
    <link rel="alternate" hreflang="en" href="${baseUrl}/en${url.startsWith('/en') ? url.substring(3) : url}" />
    <link rel="alternate" hreflang="es" href="${baseUrl}${url.startsWith('/en') ? url.substring(3) : url}" />
    <link rel="alternate" hreflang="x-default" href="${baseUrl}${url.startsWith('/en') ? url.substring(3) : url}" />
  `;
  
  // Insert hreflang links after the canonical link
  html = html.replace(
    /(<link rel="canonical"[^>]*>)/,
    `$1${hreflangLinks}`
  );

  return html;
}

prerender().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});



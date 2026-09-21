/**
 * Post-build prerender.
 *
 * The app is a client-side SPA, so `dist/index.html` ships an empty <div id="app">. Crawlers that do not run
 * JavaScript (and reviewers fetching the raw HTML) therefore see no content. This script writes one static HTML
 * file per public route (dist/<route>/index.html) with a route-specific <title>, description, canonical URL and
 * real readable content plus plain <a href> navigation. Vue replaces the content on mount, so users still get the
 * normal interactive app.
 */
import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import { parse as parseYaml } from 'yaml';

const ORIGIN = 'https://www.armytool.site';
const root = process.cwd();
const dist = path.join(root, 'dist');
const md = new MarkdownIt({ html: false, linkify: true });

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const locale = parseYaml(fs.readFileSync(path.join(root, 'locales/en.yml'), 'utf8'));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const humanize = slug => slug.replace(/-/g, ' ').replace(/^./, c => c.toUpperCase());

// ---- data sources -------------------------------------------------------------------------------------------
const toolsDir = path.join(root, 'src/tools');
const tools = fs.readdirSync(toolsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map((d) => {
    const indexPath = path.join(toolsDir, d.name, 'index.ts');
    if (!fs.existsSync(indexPath)) {
      return null;
    }
    const match = fs.readFileSync(indexPath, 'utf8').match(/path:\s*'\/([^']+)'/);
    if (!match) {
      return null;
    }
    const slug = match[1];
    const entry = locale.tools?.[slug] ?? {};
    const detailsPath = path.join(toolsDir, d.name, 'details.md');
    return {
      slug,
      title: entry.title ?? humanize(slug),
      description: entry.description ?? `${humanize(slug)} - free online tool.`,
      detailsHtml: fs.existsSync(detailsPath) ? md.render(fs.readFileSync(detailsPath, 'utf8')) : '',
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.title.localeCompare(b.title));

const blogsSource = fs.readFileSync(path.join(root, 'src/data/blogs.data.ts'), 'utf8');
const blogs = [...blogsSource.matchAll(/slug:\s*'([^']+)',\s*title:\s*(['"])(.*?)\2,\s*description:\s*(['"])(.*?)\4/gs)]
  .map(m => ({
    slug: m[1],
    title: m[3].replace(/\\'/g, '\''),
    description: m[5].replace(/\\'/g, '\''),
  }));

const pages = [
  { path: '/about', title: 'About', description: 'About the developer behind Armytool and why the tools are built privacy-first.', markdown: locale.about?.content },
  { path: '/contact', title: locale.contact?.title ?? 'Contact', description: 'Contact the Armytool maintainer for support, feedback and tool requests.', markdown: locale.contact?.content },
  { path: '/privacy-policy', title: locale.privacyPolicy?.title ?? 'Privacy Policy', description: 'How Armytool handles your data: client-side processing and minimal collection.', markdown: locale.privacyPolicy?.content },
  { path: '/terms-of-service', title: locale.termsOfService?.title ?? 'Terms of Service', description: 'Terms of Service for using Armytool.', markdown: locale.termsOfService?.content },
  { path: '/disclaimer', title: locale.disclaimer?.title ?? 'Disclaimer', description: 'Disclaimer for Armytool, including non-affiliation with any military or government body.', markdown: locale.disclaimer?.content },
  { path: '/cookie-policy', title: locale.cookiePolicy?.title ?? 'Cookie Policy', description: 'Cookie Policy for Armytool.', markdown: locale.cookiePolicy?.content },
];

// ---- shared HTML --------------------------------------------------------------------------------------------
const nav = `<header><nav aria-label="Main"><a href="/">Armytool</a> | <a href="/blogs">Blogs</a> | <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/sitemap">Sitemap</a></nav></header>`;

const footer = `<footer><nav aria-label="Legal"><a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a> | <a href="/disclaimer">Disclaimer</a> | <a href="/cookie-policy">Cookie Policy</a> | <a href="/sitemap">Sitemap</a></nav><p>Armytool is an independent site and is not affiliated with any military or government organization.</p></footer>`;

const toolList = `<section><h2>All tools</h2><ul>${tools.map(t => `<li><a href="/${t.slug}">${esc(t.title)}</a> - ${esc(t.description)}</li>`).join('')}</ul></section>`;
const blogList = `<section><h2>Guides and articles</h2><ul>${blogs.map(b => `<li><a href="/blogs/${b.slug}">${esc(b.title)}</a> - ${esc(b.description)}</li>`).join('')}</ul></section>`;

function render({ route, title, description, main, withIndexes = true }) {
  const url = `${ORIGIN}${route === '/' ? '' : route}`;
  const fullTitle = route === '/' ? title : `${title} - Armytool`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(/(<meta\s+(?:name|itemprop)="description"\s+content=")[^"]*(")/g, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(fullTitle)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace('</head>', `<link rel="canonical" href="${url}" />\n</head>`);

  const body = `<div id="app">${nav}<main>${main}</main>${withIndexes ? toolList + blogList : ''}${footer}</div>`;
  html = html.replace('<div id="app"></div>', body);
  return html;
}

function write(route, html) {
  const target = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}

// ---- routes -------------------------------------------------------------------------------------------------
let count = 0;

write('/', render({
  route: '/',
  title: 'Armytool - High-Performance Online Tools for Developers',
  description: 'Armytool is a privacy-first collection of essential online utilities for modern developers. Format JSON, decode JWTs, generate UUIDs, and more - all client-side.',
  main: `<h1>Armytool: free online tools for developers and IT professionals</h1>
<p>Armytool is a collection of ${tools.length} browser-based utilities for developers, system administrators and IT professionals: data formatters and converters, hashing and encryption helpers, network calculators, text tools and more. Everything runs in your browser, so the text, tokens and files you paste are not uploaded to a server.</p>
<p>Every tool comes with a written guide explaining what it does, how to use it, worked examples, how to read the results, common mistakes and frequently asked questions.</p>
<p>Armytool is an independent site. Despite the name, it is not affiliated with any army, armed force or government body.</p>`,
}));
count++;

for (const t of tools) {
  write(`/${t.slug}`, render({
    route: `/${t.slug}`,
    title: t.title,
    description: t.description,
    main: `<h1>${esc(t.title)}</h1><p>${esc(t.description)}</p><p>Enable JavaScript to use the interactive tool. The guide below explains how it works.</p>${t.detailsHtml}`,
  }));
  count++;
}

for (const b of blogs) {
  const file = path.join(root, 'src/blogs', `${b.slug}.md`);
  if (!fs.existsSync(file)) {
    continue;
  }
  write(`/blogs/${b.slug}`, render({
    route: `/blogs/${b.slug}`,
    title: b.title,
    description: b.description,
    main: `<article>${md.render(fs.readFileSync(file, 'utf8'))}</article>`,
    withIndexes: false,
  }));
  count++;
}

write('/blogs', render({
  route: '/blogs',
  title: 'Blogs',
  description: 'Guides on security, web development, DevOps and data formats, written to go with the Armytool utilities.',
  main: '<h1>Armytool blog</h1><p>In-depth guides on security, web development, DevOps and data formats.</p>',
}));
count++;

write('/sitemap', render({
  route: '/sitemap',
  title: locale.sitemap?.title ?? 'Sitemap',
  description: locale.sitemap?.description ?? 'A complete directory of all pages on Armytool.',
  main: '<h1>Sitemap</h1><p>A complete directory of all resources, tools and guides available on Armytool.</p>',
}));
count++;

for (const p of pages) {
  if (!p.markdown) {
    continue;
  }
  write(p.path, render({
    route: p.path,
    title: p.title,
    description: p.description,
    main: md.render(p.markdown),
    withIndexes: false,
  }));
  count++;
}

console.log(`Prerendered ${count} routes.`);

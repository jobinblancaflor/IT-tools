import fs from 'fs';
import path from 'path';

const getTools = () => {
  const toolsPath = path.join(process.cwd(), 'src/tools');
  return fs.readdirSync(toolsPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
};

const getBlogs = () => {
  const blogsPath = path.join(process.cwd(), 'src/blogs');
  return fs.readdirSync(blogsPath)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
};

const tools = getTools();
const blogs = getBlogs();

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

const today = new Date().toISOString().split('T')[0];

const addUrl = (loc, priority, freq) => {
  xml += '  <url>\n';
  xml += `    <loc>https://www.armytool.site${loc}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${freq}</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  xml += '  </url>\n';
};

// Core Pages
addUrl('', '1.0', 'weekly');
addUrl('/blogs', '0.9', 'daily');
addUrl('/about', '0.8', 'monthly');
addUrl('/contact', '0.8', 'monthly');
addUrl('/privacy-policy', '0.5', 'monthly');
addUrl('/terms-of-service', '0.5', 'monthly');
addUrl('/cookie-policy', '0.5', 'monthly');
addUrl('/disclaimer', '0.5', 'monthly');

// Blogs
blogs.sort().forEach(b => addUrl(`/blogs/${b}`, '0.7', 'monthly'));

// Tools
tools.sort().forEach(t => addUrl(`/${t}`, '0.8', 'weekly'));

xml += '</urlset>';

fs.writeFileSync('public/sitemap.xml', xml);
console.log('Sitemap generated successfully with ' + (tools.length + blogs.length + 8) + ' URLs.');

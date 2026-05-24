import fs from 'fs';

const tools = [
  "base64-file-converter", "base64-string-converter", "basic-auth-generator", "email-normalizer",
  "ascii-text-drawer", "text-to-unicode", "safelink-decoder", "xml-to-json", "json-to-xml",
  "regex-tester", "regex-memo", "markdown-to-html", "pdf-signature-checker", "numeronym-generator",
  "mac-address-generator", "text-to-binary", "ulid-generator", "iban-validator-and-parser",
  "string-obfuscator", "text-diff", "emoji-picker", "password-strength-analyser", "yaml-to-toml",
  "json-to-toml", "toml-to-yaml", "toml-to-json", "json-to-csv", "camera-recorder", "list-converter",
  "phone-parser-and-formatter", "json-diff", "ipv4-range-expander", "http-status-codes",
  "yaml-to-json-converter", "json-to-yaml-converter", "ipv6-ula-generator", "ipv4-address-converter",
  "benchmark-builder", "user-agent-parser", "ipv4-subnet-calculator",
  "docker-run-to-docker-compose-converter", "html-wysiwyg-editor", "rsa-key-pair-generator",
  "text-to-nato-alphabet", "slugify-string", "keycode-info", "json-minify", "bcrypt",
  "bip39-generator", "case-converter", "chmod-calculator", "chronometer", "color-converter",
  "crontab-generator", "date-time-converter", "device-information", "encryption", "eta-calculator",
  "percentage-calculator", "git-memo", "hash-text", "hmac-generator", "html-entities",
  "integer-base-converter", "json-viewer", "jwt-parser", "lorem-ipsum-generator", "math-evaluator",
  "meta-tag-generator", "mime-types", "otp-code-generator-and-validator", "qr-code-generator",
  "wifi-qr-code-generator", "random-port-generator", "roman-numeral-converter", "sql-prettify",
  "svg-placeholder-generator", "temperature-converter", "text-statistics", "token-generator",
  "url-encoder", "url-parser", "uuid-generator", "mac-address-lookup", "xml-formatter", "yaml-viewer"
];

const blogs = [
  "ultimate-developer-toolbox-productivity-guide", "mastering-web-security-bcrypt-jwt-otp",
  "art-of-clean-data-json-xml-sql-formatting", "networking-deep-dive-ip-subnetting-mac-addresses",
  "frontend-ui-excellence-svg-color-tools", "mastering-uuids-comprehensive-guide",
  "ultimate-guide-qr-codes-create-use", "understanding-base64-encode-files-images",
  "mastering-cron-jobs-guide-scheduling-crontab", "understanding-linux-permissions-guide-chmod",
  "security-deep-dive-mastering-jwt-bcrypt-and-otp", "architects-guide-to-data-transformation",
  "networking-essentials-ip-mac-url-parsing", "boosting-developer-productivity-docker-git-regex",
  "typography-and-content-ascii-art-to-text-statistics",
  "mathematical-precision-math-evaluators-unit-converters",
  "seo-and-meta-tags-optimize-web-presence", "anatomy-of-perfect-password-strength-key-generation",
  "modern-web-standards-http-mime-user-agents", "global-finance-communication-iban-phone-formatting",
  "frontend-utility-masterclass-svg-camera-color"
];

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
blogs.forEach(b => addUrl(`/blogs/${b}`, '0.7', 'monthly'));

// Tools
tools.forEach(t => addUrl(`/${t}`, '0.8', 'weekly'));

xml += '</urlset>';

fs.writeFileSync('public/sitemap.xml', xml);
console.log('Sitemap generated successfully with ' + (tools.length + blogs.length + 8) + ' URLs.');

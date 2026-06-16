# Meta Tag Generator

## What it does
The Meta Tag Generator is a comprehensive tool for creating HTML meta tags that control how your website appears in search engines and on social media platforms like Facebook, Twitter, and LinkedIn. It simplifies the process of generating Open Graph (OG) tags and Twitter Cards, ensuring your content looks professional when shared.

## Why professionals use it
- **SEO Optimization:** Improving how search engines index and display your site with accurate titles and descriptions.
- **Social Media Branding:** Customizing the image, title, and description that appear when your link is shared on social platforms.
- **Improved Click-Through Rate (CTR):** Creating compelling previews that encourage users to click on your links.
- **Standardization:** Ensuring all necessary tags are present and follow the correct specifications (Open Graph, Twitter Cards).

## Instructions
1. **Website Details:** Fill in the basic site information, such as Title, Description, and URL.
2. **Image Details:** Provide the URL of the image you want to appear in social media previews.
3. **Twitter Options:** Choose your Twitter Card type (e.g., `summary_large_image`) and add your Twitter handle.
4. **Additional Schema:** Select a specific type (e.g., Article, Book, Profile) to generate specialized Open Graph tags.
5. **Real-time Generation:** The tool generates the HTML code instantly in the "Your meta tags" section.
6. **Copy and Paste:** Click the copy icon to save the tags and paste them into the `<head>` section of your website's HTML.

## Examples
**Basic Input:**
- **Title:** My Awesome App
- **Description:** The best utility for developers.
- **URL:** `https://example.com`
- **Image:** `https://example.com/og-image.png`

**Generated Output Snippet:**
```html
<title>My Awesome App</title>
<meta name="description" content="The best utility for developers.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com">
<meta property="og:title" content="My Awesome App">
<meta property="og:image" content="https://example.com/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

## FAQs
- **What is Open Graph?** Open Graph is a protocol that allows any web page to become a rich object in a social graph, primarily used by Facebook and LinkedIn.
- **Where do I put these tags?** These tags should be placed within the `<head>` section of your HTML document.
- **Why isn't my social preview updating?** Social platforms often cache meta tags. You may need to use tools like the "Facebook Sharing Debugger" or "Twitter Card Validator" to force a refresh.

## Common Mistakes
- **Broken Image URLs:** Providing a relative path (like `/img/og.png`) instead of an absolute URL (like `https://site.com/img/og.png`).
- **Missing Tags:** Forgetting the `og:type` or `twitter:card` tags, which are essential for correct rendering.
- **Too Long Descriptions:** Writing descriptions longer than 155-160 characters, which may get truncated in search results.

## Use Cases
- **Marketing Campaigns:** Creating specific landing pages with custom shareable previews.
- **Blog Posts:** Ensuring each article has a unique title and featured image when shared.
- **E-commerce:** Generating product-specific tags to showcase price, availability, and high-quality product photos.

## Related Tools
- **User Agent Parser:** Test how different browsers might interpret your site.
- **Sitemap Generator:** Create a map of your site for search engines.
- **JSON to XML Converter:** Useful if you manage metadata in different data formats.

# HTML Entities: Escape and Unescape Utility

## 1. What the Tool Does
The HTML Entities tool is a dual-purpose utility designed to handle the conversion of special characters into their corresponding HTML entities and vice versa. In web development, certain characters (like `<`, `>`, and `&`) have special meanings in the HTML language. To display these characters as literal text on a webpage, they must be "escaped" into a safe format.

This tool provides two distinct interfaces:
1. **Escape HTML entities:** Converts literal characters into entities (e.g., `<` becomes `&lt;`).
2. **Unescape HTML entities:** Converts entities back into their literal character counterparts (e.g., `&amp;` becomes `&`).

By automating this conversion, the tool ensures that your code remains valid and your content is displayed correctly without being misinterpreted by the browser's HTML parser.

## 2. Why Someone Uses It
Handling HTML entities is a fundamental task for anyone working with web content, from developers to technical writers.

### Key Reasons for Use:
- **Preventing XSS (Cross-Site Scripting):** Escaping user-generated content before rendering it is a critical security measure. It ensures that any `<script>` tags entered by a user are displayed as plain text rather than executed by the browser.
- **Displaying Code Snippets:** If you are writing a blog post about HTML, you need to escape your examples. Otherwise, the browser will try to render your `<div>` tags instead of showing the code.
- **Data Sanitization:** When moving data between a database and a web form, characters like quotes (`"` and `'`) need to be handled carefully to avoid breaking the HTML structure.
- **Fixing Broken Layouts:** Sometimes, an unescaped `&` in a URL or a title can cause a webpage to fail validation or display improperly.
- **Readability for Developers:** Manually typing `&nbsp;` or `&copy;` is tedious. This tool allows you to paste the literal text and get the correct entities instantly.

## 3. Step-by-Step Instructions

### Escaping Text (Literal to Entity)
1. Find the card titled **"Escape html entities"**.
2. In the **"Your string :"** box, enter the text you want to transform (e.g., `<h1>Hello</h1>`).
3. The result will immediately appear in the **"Your string escaped :"** box (e.g., `&lt;h1&gt;Hello&lt;/h1&gt;`).
4. Click the **"Copy"** button below the output to save it to your clipboard.

### Unescaping Text (Entity to Literal)
1. Find the card titled **"Unescape html entities"**.
2. In the **"Your escaped string :"** box, paste the HTML entities you want to decode (e.g., `&copy; 2024`).
3. The literal text will appear in the **"Your string unescaped :"** box (e.g., `© 2024`).
4. Click the **"Copy"** button below the output to save the result.

## 4. Examples

### Scenario A: Security First
Input: `<script>alert('pwned')</script>`
Escaped Output: `&lt;script&gt;alert('pwned')&lt;/script&gt;`
*This output is safe to display in a comment section.*

### Scenario B: Technical Documentation
Input: `Use the <a> tag for links.`
Escaped Output: `Use the &lt;a&gt; tag for links.`

### Scenario C: Decoding Legacy Data
Input: `Fish &amp; Chips &quot;Special&quot;`
Unescaped Output: `Fish & Chips "Special"`

## 5. FAQs

**Q: Which characters are escaped by this tool?**
A: This tool primarily focuses on the five "special" characters defined in the HTML specification:
- `&` becomes `&amp;`
- `<` becomes `&lt;`
- `>` becomes `&gt;`
- `"` becomes `&quot;`
- `'` becomes `&#39;` (or `&apos;` in some environments)

**Q: Does this tool handle "Named Entities" like `&euro;` or `&trade;`?**
A: Yes, the "Unescape" function will convert common named entities into their Unicode characters (like `€` and `™`).

**Q: Is escaping the same as URL encoding?**
A: No. HTML escaping is for displaying text inside an HTML document. URL encoding (like `%20` for a space) is for making strings safe for use in a web address.

**Q: Should I escape my text before saving it to a database?**
A: Generally, no. It is best practice to save the "raw" data in your database and escape it only at the moment you are rendering it in an HTML context (the "Late Escaping" principle).

## 6. Common Mistakes

1. **Double Escaping:** Escaping text that is already escaped. This results in messy strings like `&amp;lt;div&amp;gt;`.
2. **Forgetting the Semicolon:** HTML entities must end with a `;`. Typing `&lt` instead of `&lt;` is a common source of bugs.
3. **Mixing Up HTML Escaping and URL Encoding:** Using HTML entities in a URL query parameter will usually fail.
4. **Trusting "Unescaped" Input:** Never take unescaped input from this tool and immediately execute it as code. Always assume data from external sources is untrusted.
5. **Incomplete Escaping:** Only escaping `<` and `>` but forgetting `&`. The ampersand is the most common cause of HTML validation errors.

## 7. Use Cases

### Content Management (CMS)
Editors who need to insert code examples or special symbols into a CMS that doesn't have a built-in "Code" mode.

### Email Marketing
When crafting HTML emails, ensure that subject lines or pre-header text containing special characters won't break the email client's rendering.

### SEO Professionals
Checking how metadata (like titles and descriptions) will look once they are encoded for search engine result pages.

### Localization Teams
Converting special accented characters or currency symbols into a safe format for legacy web systems that might not fully support UTF-8.

## 8. Related Tools
- **URL Encoder/Decoder:** For preparing strings to be used in URLs rather than HTML content.
- **Markdown to HTML:** A higher-level tool that converts an entire document, handling the escaping for you.
- **HTML WYSIWYG Editor:** An interactive editor where you can see the results of your HTML rendering in real-time.
- **JSON Viewer:** Often used alongside this tool when you need to escape strings inside a JSON object.
- **Base64 Converter:** For converting entire files or strings into a different encoding format altogether.

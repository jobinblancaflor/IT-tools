# Text Statistics

## What it does
Text Statistics counts the characters, words and lines in whatever you type or paste, and reports the size of the text in bytes. Results update live with every keystroke.

## Why someone uses it
- Staying within limits: short social posts, meta descriptions, SMS segments, form fields with a maximum length.
- Estimating reading or speaking time from a word count.
- Checking the storage or payload size of a string before sending it through an API or storing it in a database column.
- Meeting essay, assignment or article length requirements.

## Step-by-step instructions
1. Paste or type your text into the box.
2. Read the four figures underneath: character count, word count, line count and byte size.
3. Edit the text and watch the figures change.

## Examples
- `Hello world` → 11 characters, 2 words, 1 line, 11 bytes.
- `Café` → 4 characters but 5 bytes, because "é" needs two bytes in UTF-8.
- A three-line poem separated by line breaks → 3 lines.
- A single emoji takes 4 bytes and is counted as 2 characters by the browser (see below).

## Understanding the results
**Characters** are counted using the browser's string length, which counts UTF-16 code units. Most letters count as one, but some emoji and rare symbols count as two. **Words** are groups of text separated by whitespace, so "well-known" is one word. **Lines** are separated by line breaks; a blank line counts as a line. **Byte size** is the UTF-8 encoded size, which is what matters for network payloads, file sizes and database limits. Plain English text is roughly one byte per character; accented letters use two, most Asian scripts three, and emoji four.

## FAQs
- **Why do characters and bytes differ?** Because UTF-8 stores non-ASCII characters in multiple bytes.
- **Do spaces count as characters?** Yes, spaces, tabs and line breaks are all counted.
- **Does it count words in every language?** It splits on whitespace, so languages that do not separate words with spaces (such as Chinese or Japanese) will show very low word counts.
- **Is my text stored?** No. Counting happens locally in your browser.

## Common mistakes
- Using the character count where a byte limit applies. A 200-character string of accented text may exceed a 255-byte column.
- Leaving spaces at the start or end of the text; the word count splits on whitespace, so leading or trailing spaces can inflate it by one.
- Assuming an emoji counts as one character in every system; platforms differ in how they count.

## Use cases
- Writing SEO titles and descriptions of the right length.
- Sizing payloads for APIs with request limits.
- Editors and students checking length targets.
- Developers validating input-length rules.

## Related tools
- **Lorem Ipsum Generator:** Produce text of a chosen length for layout testing.
- **Text to Binary:** See the bit-level representation of your text.
- **Case Converter:** Change capitalisation before counting or publishing.

# Text to Unicode

## What it does
This tool converts text into decimal HTML character references (such as `&#72;` for "H") and converts those references back into text. It gives you the numeric code behind every character, in a form that can be pasted directly into HTML.

## Why someone uses it
- Embedding special characters in HTML or email templates where the source file must stay plain ASCII.
- Finding out the numeric code of an unfamiliar or look-alike character.
- Decoding a string of `&#...;` references found in scraped or legacy content.
- Teaching how characters map to numbers.

## Step-by-step instructions
1. **Text to Unicode:** type or paste text in the first card; the entity string appears below. Copy it with the button.
2. **Unicode to text:** paste a string of decimal references such as `&#72;&#105;` into the second card to see the readable text.
3. Both cards work independently, so you can test a round trip.

## Examples
- `Hi` → `&#72;&#105;`
- `A` → `&#65;`
- `&#67;&#97;&#102;&#233;` → `Café`
- `©` → `&#169;`

## Understanding the results
Each number is the character's code point in the Unicode table, written in decimal between `&#` and `;`. Codes 0–127 match ASCII, so English letters give small numbers (A is 65, a is 97). Higher numbers cover accented letters, symbols and other scripts. Note that the converter works on JavaScript's 16-bit units, so characters outside the Basic Multilingual Plane, including most emoji, are output as two separate surrogate-pair references rather than one. Browsers may not display such a pair correctly if you paste it into HTML on its own; for emoji, the single-code-point form (for example `&#128578;`) is safer.

## FAQs
- **Is this the same as `H` escapes?** No. That is a JavaScript/JSON notation using hexadecimal. This tool produces decimal HTML references.
- **Does it encode hex references like `&#x48;`?** It outputs decimal only, and decodes decimal only.
- **Is this encryption?** No. It is a reversible representation that anyone can decode.
- **Is my text uploaded?** No, conversion runs entirely in your browser.

## Common mistakes
- Forgetting the closing semicolon when writing references by hand; the decoder expects `&#number;`.
- Pasting hex references (`&#x41;`) and seeing them left unchanged.
- Using the output as a security measure. Entity-encoding text does not hide it and is not a substitute for escaping user input.

## Use cases
- Preparing HTML snippets that must survive ASCII-only systems.
- Investigating look-alike (homoglyph) characters in suspicious text.
- Documenting character codes for a style guide.
- Debugging encoding problems in legacy web pages.

## Related tools
- **HTML Entities:** Escape and unescape named entities such as `&amp;`.
- **Text to Binary:** See the bit patterns behind the same characters.
- **URL Encoder:** Percent-encode text for safe use in URLs.

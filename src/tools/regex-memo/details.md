# Regex Cheatsheet

## What it does
The Regex Cheatsheet is a quick-reference guide for JavaScript Regular Expressions (RegExp). It organizes complex regex syntax into readable tables, covering everything from basic character matching and quantifiers to advanced concepts like lookaheads, backreferences, and capturing groups.

## Why someone uses it
- **Memory Aid:** Regex syntax is famously difficult to remember; this tool provides instant access to the correct symbols.
- **Learning Resource:** Developers can quickly learn how to use character sets, boundaries, and grouping.
- **Saves Time:** Avoids searching through lengthy documentation to find a specific escaping rule or quantifier.
- **Accuracy:** Ensures you are using the correct syntax for the JavaScript engine, which may differ slightly from other languages like PHP or Python.

## Step-by-step instructions
1. **Browse Categories:** The guide is divided into logical sections like "Normal characters", "Quantifiers", and "Boundaries".
2. **Identify Syntax:** Find the pattern you need in the left column of the table.
3. **Verify Behavior:** Read the description on the right to ensure it matches your intended logic.
4. **Implementation:** Copy the pattern into your JavaScript code or use it in the **Regex Tester** tool to verify it against your specific data.

## Examples
- **Email Validation:** You might look up `\s` to handle whitespace or `+` to match one or more characters.
- **Password Requirements:** Use `{8,}` from the "Quantifiers" section to ensure a minimum length.
- **URL Sanitization:** Use the "Character set" section to find how to exclude certain characters using `[^...]`.

## FAQs
- **Is this cheatsheet applicable to Python or Java?** Mostly yes, but be careful. JavaScript has its own quirks (like support for specific lookbehind syntax in older versions). This guide is specifically for JS.
- **What does `\b` match?** It matches a "word boundary"—the invisible position between a word character (like a letter) and a non-word character (like a space or the start of the string).
- **When should I use `(?:...)`?** Use it when you need to group part of your regex for a quantifier (like `(?:abc)+`) but don't want the performance hit or messy results of "capturing" that group.

## Common mistakes
- **Over-escaping:** Escaping characters inside a character set `[ ]` that don't need it (like `.` or `*`).
- **Unescaped Special Characters:** Forgetting that characters like `(`, `[`, `{`, `\`, `^`, `$`, `|`, `?`, `*`, `+`, and `.` have special meanings and must be escaped with a backslash if you want to match them literally.
- **Greedy vs. Lazy:** Forgetting that `*` and `+` are "greedy" and will match as much as possible unless you follow them with a `?`.

## Use cases
- **Frontend Validation:** Creating patterns for HTML5 `pattern` attributes or JavaScript form validation.
- **Code Refactoring:** Using regex-based "Find and Replace" in VS Code or other IDEs.
- **Log Analysis:** Writing patterns to extract specific data from server log files.

## Related tools
- **Regex Tester:** The perfect companion to test the patterns you find in this cheatsheet in real-time.
- **Slugify String:** Uses regex-like logic to transform titles into URL-friendly strings.
- **String Obfuscator:** Useful for hiding parts of a string while keeping its general structure.

# String Obfuscator

## What it does
The String Obfuscator is a visual utility designed to mask sensitive information while preserving the general structure or a "hint" of the original content. It allows you to specify how many characters at the beginning and end of a string should remain visible, replacing everything else with dots. It also includes an option to preserve spaces, which is useful for obfuscating sentences or phrases while maintaining their layout.

## Why someone uses it
- **Privacy in Documentation:** Showing examples of API keys, tokens, or passwords in guides without revealing actual secrets.
- **Data Masking:** Displaying partial information in admin dashboards (e.g., "Email: jo****@example.com") to protect user privacy.
- **Screenshots & Presentations:** Quickly hiding personal or sensitive data in a UI before taking a screenshot for a public demo.
- **Log Cleaning:** Sanitizing data before pasting it into a bug report or a public forum.

## Step-by-step instructions
1. **Input String:** Type or paste the text you want to hide into the **String to obfuscate** field.
2. **Set Visibility:**
   - Adjust **Keep first** to set how many characters stay visible at the start.
   - Adjust **Keep last** to set how many characters stay visible at the end.
3. **Toggle Spaces:** Use the **Keep spaces** switch to decide if space characters should be replaced or left alone.
4. **Copy Result:** The obfuscated text appears in the card below. Click the copy icon to save it.

## Examples
- **API Key:** `sk-live-51Mz...92j` (Keep first 7, Keep last 3) -> `sk-live................92j`.
- **Full Name:** `Alexander Hamilton` (Keep first 1, Keep last 1, Keep spaces ON) -> `A........ H.......n`.
- **Long Sentence:** `My secret password` (Keep first 2, Keep last 2, Keep spaces OFF) -> `My................rd`.

## FAQs
- **Is this a form of encryption?** No. Obfuscation is a "one-way" visual transformation. There is no way to "de-obfuscate" the result back into the original string. It is for display purposes only.
- **Should I use this to store passwords?** Absolutely not. Passwords should be hashed using tools like **Bcrypt**. This tool is for making data unreadable to human eyes on a screen.
- **Can I choose the masking character?** Currently, the tool uses dots (`.`) as they provide a clean and predictable visual width.

## Common mistakes
- **Revealing too much:** For short strings, keeping 4 characters at both ends might reveal the entire string or enough of it to be easily guessed.
- **Using for Security:** Confusing visual obfuscation with actual data security. Always assume the obfuscated string carries no information about the original other than its approximate length.

## Use cases
- **Software Tutorials:** Creating "Before and After" examples for configuration files.
- **Customer Support:** Masking a customer's physical address or phone number in a support ticket screenshot.
- **Mockups:** Generating realistic-looking "protected" data for UI prototypes.

## Related tools
- **Bcrypt:** Use this for securely hashing passwords before storing them in a database.
- **Hash Text:** For creating a unique "fingerprint" of a string (MD5, SHA-256) that cannot be reversed.
- **Slugify String:** For cleaning up strings to be used in URLs, which is another form of string transformation.

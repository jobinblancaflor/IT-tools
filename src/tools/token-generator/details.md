# Token Generator

## What it does
The Token Generator creates random strings from a character set you choose: uppercase letters, lowercase letters, digits and symbols, at any length from 1 to 512. Adjust the switches or the slider and a new token is shown ready to copy. A refresh button produces another one with the same settings.

## Why someone uses it
- Creating placeholder API keys, session identifiers or test fixtures.
- Making unique strings for file names, cache-busting parameters or database seed data.
- Generating throwaway secrets for local development and documentation examples.
- Producing random passwords for low-stakes accounts.

## Step-by-step instructions
1. Toggle the character groups you want: uppercase, lowercase, numbers, symbols.
2. Drag the length slider (default 64).
3. Read the token in the box.
4. Press *Refresh* for a new one, or *Copy* to put it on the clipboard.
5. The settings are kept in the page address, so you can bookmark a configuration.

## Examples
- Length 16, letters and digits → something like `k9QzT2mWb7XpR4nA`.
- Length 32, digits only → a 32-digit numeric string.
- Length 24 with symbols on → a mixed string like `Xn4.R#p2{Wq-8T+kZ*m3H!aY`.

## Understanding the results
The length is the number of characters, and the strength depends on both length and the size of the character set. A 16-character token drawn from 62 characters (letters and digits) offers about 95 bits of entropy in theory; adding symbols increases the pool and the entropy per character. **Important:** this generator uses the browser's standard pseudo-random function, not the cryptographic random-number generator. That is fine for test data, identifiers and placeholders, but you should not rely on it to generate production secrets, encryption keys or signing keys. For those, use a cryptographically secure generator such as your operating system's, a password manager, or a tool designed for the purpose.

## FAQs
- **Can I use these as passwords?** For low-risk accounts, yes. For anything sensitive, use a password manager's generator.
- **Are the tokens stored?** No. They are created in your browser and never sent anywhere; only the settings appear in the URL.
- **Why does the token change on each visit?** It is generated fresh every time; it is not saved.
- **Does the token exclude confusing characters?** No; it may contain look-alikes such as `1`, `l` and `0`.

## Common mistakes
- Turning every group off. With no characters available the token is empty.
- Using a short token where uniqueness matters. Collisions become plausible at small lengths.
- Treating a random-looking string as secure without considering how it was generated.
- Pasting production secrets into screenshots or tickets.

## Use cases
- Filling test databases and mock API responses.
- Generating unique names for temporary files.
- Making example credentials for tutorials.
- Creating one-off codes for internal, low-risk workflows.

## Related tools
- **Password Strength Analyser:** Estimate how long a string would resist guessing.
- **UUID Generator:** Standardised unique identifiers.
- **Bcrypt:** Hash passwords securely before storing them.

# Bcrypt: The Industry Standard for Secure Password Hashing

## What the tool does
The **Bcrypt Tool** is a cryptographic utility that provides a user-friendly interface for hashing plain-text strings and comparing existing hashes against a specific input. Based on the Blowfish cipher, Bcrypt is a "salted" hashing algorithm that incorporates a "work factor" (or cost) to purposefully slow down the hashing process, making it incredibly resilient to modern brute-force attacks.

This tool allows you to:
1. **Generate Hashes:** Enter any string (like a test password) and generate a secure Bcrypt hash using a customizable cost factor.
2. **Verify Passwords:** Take an existing Bcrypt hash (from your database, for example) and check if a plain-text string matches it.
3. **Control Cost:** Adjust the "rounds" or cost factor to see how it affects the generation time and the resulting hash security.

## Why someone uses it
In the realm of security, storing plain-text passwords is an unpardonable sin. Even traditional fast hashing algorithms like MD5 or SHA-1 are now obsolete for password storage because specialized hardware (GPUs and ASICs) can calculate billions of these hashes per second.

Developers use Bcrypt because:
- **Resilience to Brute Force:** By increasing the cost factor, you can make the hashing process take hundreds of milliseconds. While a human won't notice a 300ms delay, an attacker trying to guess millions of passwords will find it impossible.
- **Built-in Salting:** Bcrypt automatically generates a unique salt for every hash. This ensures that if two users have the same password, their stored hashes will still be completely different, protecting against "Rainbow Table" attacks.
- **Adaptive Security:** As hardware becomes faster, developers can simply increase the cost factor to maintain the same level of security without changing their entire architecture.
- **Cross-Platform Compatibility:** Bcrypt is a mature, battle-tested standard with high-quality implementations in every major programming language (Node.js, Python, Java, Go, PHP, etc.).

## Step-by-step instructions
### To Generate a Hash:
1. **Enter your text:** Type the password or string you want to hash into the input field.
2. **Adjust the Rounds (Optional):** Set the cost factor (usually between 10 and 12 for modern servers). Higher numbers are more secure but take longer.
3. **Generate:** The hash will appear instantly. It will always start with a prefix like `$2a$`, `$2b$`, or `$2y$`.
4. **Copy:** Use the copy button to save the hash for your configuration or test database.

### To Verify a Hash:
1. **Paste the Hash:** Paste the Bcrypt hash you want to verify into the "Hash to check" field.
2. **Enter the Password:** Type the plain-text password you want to test against that hash.
3. **Check Result:** The tool will provide a clear "Match" or "No Match" indicator.

## Examples
### Generating a Secure Hash
**Input:** `my-secret-password`
**Cost:** `10`
**Result:** `$2b$10$eInqF0mPj3P.g8O6pZ6N2uVn5N2G7xH6B1r2i3v4a5s6d7f8g9h0` (Note: Every generation produces a different result due to the unique salt).

### Verifying a Match
**Input Password:** `correct-password`
**Hash:** `$2b$10$pL3UeR...` (a valid hash for that password)
**Indicator:** ✅ **Match**

## FAQs
### What is the "Cost Factor"?
The cost factor represents the number of iterations performed by the algorithm (specifically, 2 to the power of the cost). A cost of 10 means 1024 iterations. Increasing the cost by 1 doubles the time required to calculate the hash.

### Why does the hash change every time I click refresh?
Bcrypt uses a cryptographically secure random number generator to create a "salt" for every new hash. This is a feature, not a bug. It prevents attackers from using pre-calculated tables of hashes to find passwords.

### Which prefix should I use ($2a, $2b, $2y)?
For most modern applications, `$2b$` is the current standard. `$2y$` is common in PHP environments to fix a specific historical bug. Our tool handles these differences automatically during verification.

### Is it safe to put my production passwords here?
Our tool runs **entirely in your browser**. No data is ever sent to our servers. However, as a best practice, we recommend only using this tool for development, testing, and debugging purposes. Never share your production hashes in public environments.

## Common mistakes
1. **Using a Cost Factor that is Too Low:** A cost of 4 or 5 is extremely fast and provides little protection against modern hardware. We recommend a minimum of 10.
2. **Using a Cost Factor that is Too High:** Setting the cost to 18 or 20 might make your login process take several seconds or even minutes, potentially causing your server to time out or creating a Denial of Service (DoS) vulnerability.
3. **Comparing Hashes Manually:** Never try to check if two Bcrypt hashes are equal using a string comparison (`hash1 === hash2`). Because of the unique salt, they will never be equal. You must always use a proper Bcrypt verification function.
4. **Truncating Long Passwords:** Most Bcrypt implementations have a maximum password length of 72 bytes. Any characters beyond that are ignored.

## Use cases
- **Backend Testing:** Manually generating a hash to insert into a "seed" database for local development.
- **Security Auditing:** Verifying that a legacy hash from an old database actually matches the expected user password.
- **Learning & Education:** Understanding how the cost factor and salting mechanism work in practice.
- **Configuration Management:** Creating a hashed password for a configuration file (like a basic auth password for a proxy) where Bcrypt is supported.

## Related tools
- **JWT Parser:** For inspecting the tokens that are often generated after a successful Bcrypt password verification.
- **Hmac Generator:** For understanding simpler hash-based message authentication.
- **Password Strength Analyser:** To check the quality of the password *before* you hash it.
- **Token Generator:** For creating the random shared secrets used in secure authentication systems.

---

*Note: Security is an evolving field. Always stay updated with the latest recommendations from organizations like OWASP regarding password storage.*
